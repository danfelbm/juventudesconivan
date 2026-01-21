"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { registroFormSchema, RegistroFormValues } from "@/lib/validations";
import { LOCALIDADES_BOGOTA, GENEROS, PERFILES } from "@/lib/constants";
import { RedesSocialesField } from "./redes-sociales-field";
import { PoliticaPrivacidadModal } from "./politica-privacidad-modal";
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

// Regex patterns
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^3\d{9}$/;

type ValidationStatus = "idle" | "checking" | "valid" | "invalid" | "duplicate";

interface FieldValidation {
  status: ValidationStatus;
  message?: string;
}

export function RegistroForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Validation states
  const [emailValidation, setEmailValidation] = useState<FieldValidation>({ status: "idle" });
  const [phoneValidation, setPhoneValidation] = useState<FieldValidation>({ status: "idle" });
  const [emailConfirmValidation, setEmailConfirmValidation] = useState<FieldValidation>({ status: "idle" });
  const [phoneConfirmValidation, setPhoneConfirmValidation] = useState<FieldValidation>({ status: "idle" });

  const form = useForm<RegistroFormValues>({
    resolver: zodResolver(registroFormSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      email: "",
      confirmarEmail: "",
      telefono: "",
      confirmarTelefono: "",
      localidad: "",
      organizacion: "",
      profesion: "",
      genero: "",
      edad: undefined,
      perfil: "",
      redesSociales: [],
      aceptaPolitica: false,
    },
    mode: "onBlur",
  });

  const watchEmail = form.watch("email");
  const watchConfirmarEmail = form.watch("confirmarEmail");
  const watchTelefono = form.watch("telefono");
  const watchConfirmarTelefono = form.watch("confirmarTelefono");

  // Check for duplicates in database
  const checkDuplicate = useCallback(async (tipo: "email" | "telefono", valor: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/verificar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo, valor }),
      });
      const data = await response.json();
      return data.existe;
    } catch {
      return false;
    }
  }, []);

  // Validate email
  const validateEmail = useCallback(async (email: string) => {
    if (!email) {
      setEmailValidation({ status: "idle" });
      return;
    }

    // Check regex first
    if (!EMAIL_REGEX.test(email)) {
      setEmailValidation({
        status: "invalid",
        message: "Formato de email inválido"
      });
      return;
    }

    // Check for duplicates
    setEmailValidation({ status: "checking" });
    const isDuplicate = await checkDuplicate("email", email);

    if (isDuplicate) {
      setEmailValidation({
        status: "duplicate",
        message: "Este email ya está registrado"
      });
    } else {
      setEmailValidation({ status: "valid" });
    }
  }, [checkDuplicate]);

  // Validate phone
  const validatePhone = useCallback(async (phone: string) => {
    if (!phone) {
      setPhoneValidation({ status: "idle" });
      return;
    }

    // Check regex first
    if (!PHONE_REGEX.test(phone)) {
      setPhoneValidation({
        status: "invalid",
        message: "Debe empezar con 3 y tener 10 dígitos"
      });
      return;
    }

    // Check for duplicates
    setPhoneValidation({ status: "checking" });
    const isDuplicate = await checkDuplicate("telefono", phone);

    if (isDuplicate) {
      setPhoneValidation({
        status: "duplicate",
        message: "Este teléfono ya está registrado"
      });
    } else {
      setPhoneValidation({ status: "valid" });
    }
  }, [checkDuplicate]);

  // Validate email confirmation
  useEffect(() => {
    if (!watchConfirmarEmail) {
      setEmailConfirmValidation({ status: "idle" });
      return;
    }

    if (watchEmail && watchConfirmarEmail) {
      if (watchEmail === watchConfirmarEmail) {
        setEmailConfirmValidation({ status: "valid" });
      } else {
        setEmailConfirmValidation({
          status: "invalid",
          message: "Los emails no coinciden"
        });
      }
    }
  }, [watchEmail, watchConfirmarEmail]);

  // Validate phone confirmation
  useEffect(() => {
    if (!watchConfirmarTelefono) {
      setPhoneConfirmValidation({ status: "idle" });
      return;
    }

    if (watchTelefono && watchConfirmarTelefono) {
      if (watchTelefono === watchConfirmarTelefono) {
        setPhoneConfirmValidation({ status: "valid" });
      } else {
        setPhoneConfirmValidation({
          status: "invalid",
          message: "Los teléfonos no coinciden"
        });
      }
    }
  }, [watchTelefono, watchConfirmarTelefono]);

  // Debounced validation triggers
  useEffect(() => {
    const timer = setTimeout(() => {
      if (watchEmail && EMAIL_REGEX.test(watchEmail)) {
        validateEmail(watchEmail);
      } else if (watchEmail) {
        setEmailValidation({
          status: "invalid",
          message: "Formato de email inválido"
        });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [watchEmail, validateEmail]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (watchTelefono && watchTelefono.length === 10) {
        validatePhone(watchTelefono);
      } else if (watchTelefono && watchTelefono.length > 0) {
        setPhoneValidation({
          status: "invalid",
          message: "Debe empezar con 3 y tener 10 dígitos"
        });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [watchTelefono, validatePhone]);

  // Validation indicator component
  const ValidationIndicator = ({ validation }: { validation: FieldValidation }) => {
    if (validation.status === "idle") return null;

    if (validation.status === "checking") {
      return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
    }

    if (validation.status === "valid") {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }

    if (validation.status === "invalid" || validation.status === "duplicate") {
      return <XCircle className="h-4 w-4 text-destructive" />;
    }

    return null;
  };

  // Custom validation message component
  const ValidationMessage = ({ validation }: { validation: FieldValidation }) => {
    if (validation.status === "idle" || validation.status === "checking" || validation.status === "valid") {
      return null;
    }

    return (
      <p className="text-sm font-medium text-destructive flex items-center gap-1 mt-1">
        <AlertCircle className="h-3 w-3" />
        {validation.message}
      </p>
    );
  };

  async function onSubmit(data: RegistroFormValues) {
    // Prevent submission if there are validation errors
    if (emailValidation.status === "duplicate" || phoneValidation.status === "duplicate") {
      setSubmitStatus("error");
      setErrorMessage("El email o teléfono ya están registrados");
      return;
    }

    if (emailValidation.status === "invalid" || phoneValidation.status === "invalid") {
      setSubmitStatus("error");
      setErrorMessage("Por favor corrige los errores en el formulario");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al enviar el formulario");
      }

      setSubmitStatus("success");
      form.reset();
      // Reset validation states
      setEmailValidation({ status: "idle" });
      setPhoneValidation({ status: "idle" });
      setEmailConfirmValidation({ status: "idle" });
      setPhoneConfirmValidation({ status: "idle" });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Error desconocido"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitStatus === "success") {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">¡Registro exitoso!</h2>
            <p className="text-muted-foreground mb-6">
              Gracias por registrarte. Hemos enviado un correo de confirmación a
              tu email.
            </p>
            <Button onClick={() => setSubmitStatus("idle")}>
              Registrar otra persona
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Formulario de Registro
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Nombres y Apellidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nombres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres *</FormLabel>
                    <FormControl>
                      <Input placeholder="Tus nombres" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apellidos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellidos *</FormLabel>
                    <FormControl>
                      <Input placeholder="Tus apellidos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email y Confirmación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          className="pr-10"
                          {...field}
                        />
                      </FormControl>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <ValidationIndicator validation={emailValidation} />
                      </div>
                    </div>
                    <FormMessage />
                    <ValidationMessage validation={emailValidation} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmarEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Email *</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Confirma tu email"
                          className="pr-10"
                          {...field}
                        />
                      </FormControl>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <ValidationIndicator validation={emailConfirmValidation} />
                      </div>
                    </div>
                    <FormMessage />
                    <ValidationMessage validation={emailConfirmValidation} />
                  </FormItem>
                )}
              />
            </div>

            {/* Teléfono y Confirmación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono *</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="3001234567"
                          maxLength={10}
                          className="pr-10"
                          {...field}
                        />
                      </FormControl>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <ValidationIndicator validation={phoneValidation} />
                      </div>
                    </div>
                    <FormMessage />
                    <ValidationMessage validation={phoneValidation} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmarTelefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Teléfono *</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Confirma tu teléfono"
                          maxLength={10}
                          className="pr-10"
                          {...field}
                        />
                      </FormControl>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <ValidationIndicator validation={phoneConfirmValidation} />
                      </div>
                    </div>
                    <FormMessage />
                    <ValidationMessage validation={phoneConfirmValidation} />
                  </FormItem>
                )}
              />
            </div>

            {/* Localidad */}
            <FormField
              control={form.control}
              name="localidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localidad *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu localidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LOCALIDADES_BOGOTA.map((localidad) => (
                        <SelectItem key={localidad} value={localidad}>
                          {localidad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Organización y Profesión */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="organizacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organización</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tu organización (opcional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profesion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profesión</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu profesión (opcional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Género, Edad, Perfil */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="genero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Género *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GENEROS.map((genero) => (
                          <SelectItem key={genero.value} value={genero.value}>
                            {genero.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="edad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Edad *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Edad"
                        min={14}
                        max={100}
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? parseInt(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="perfil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perfil *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PERFILES.map((perfil) => (
                          <SelectItem key={perfil.value} value={perfil.value}>
                            {perfil.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Redes Sociales */}
            <RedesSocialesField form={form} />

            {/* Política de Privacidad */}
            <FormField
              control={form.control}
              name="aceptaPolitica"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal">
                      Acepto la{" "}
                      <PoliticaPrivacidadModal
                        trigger={
                          <button
                            type="button"
                            className="underline hover:text-primary"
                          >
                            política de privacidad
                          </button>
                        }
                      />{" "}
                      *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Error Message */}
            {submitStatus === "error" && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={
                isSubmitting ||
                emailValidation.status === "checking" ||
                phoneValidation.status === "checking" ||
                emailValidation.status === "duplicate" ||
                phoneValidation.status === "duplicate"
              }
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Registrarme"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
