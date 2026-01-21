"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { REDES_SOCIALES } from "@/lib/constants";
import { RegistroFormValues } from "@/lib/validations";
import { Plus, Trash2 } from "lucide-react";

interface RedesSocialesFieldProps {
  form: UseFormReturn<RegistroFormValues>;
}

export function RedesSocialesField({ form }: RedesSocialesFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "redesSociales",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel>Redes Sociales (opcional)</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ red_social: "", valor: "" })}
        >
          <Plus className="h-4 w-4 mr-1" />
          Agregar
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No has agregado redes sociales
        </p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-2 p-3 border rounded-md relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(index)}
            className="absolute top-1 right-1 h-8 w-8"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>

          <FormField
            control={form.control}
            name={`redesSociales.${index}.red_social`}
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona red social" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {REDES_SOCIALES.map((red) => (
                      <SelectItem key={red.value} value={red.value}>
                        {red.label}
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
            name={`redesSociales.${index}.valor`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Usuario o URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
}
