import { z } from "zod";

const redSocialSchema = z.object({
  red_social: z.string().min(1, "Selecciona una red social"),
  valor: z.string().min(1, "Ingresa tu usuario o URL"),
});

// Schema base para tipado de react-hook-form
const baseRegistroSchema = z.object({
  nombres: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  apellidos: z
    .string()
    .min(2, "Los apellidos deben tener al menos 2 caracteres"),
  email: z
    .string()
    .email("Ingresa un email válido")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Formato de email inválido"
    ),
  confirmarEmail: z.string().email("Ingresa un email válido"),
  telefono: z
    .string()
    .regex(/^3\d{9}$/, "El teléfono debe empezar con 3 y tener 10 dígitos"),
  confirmarTelefono: z.string(),
  localidad: z.string().min(1, "Selecciona una localidad"),
  organizacion: z.string().optional(),
  profesion: z.string().optional(),
  genero: z.string().min(1, "Selecciona un género"),
  edad: z
    .number()
    .min(14, "La edad mínima es 14 años")
    .max(100, "La edad máxima es 100 años"),
  perfil: z.string().min(1, "Selecciona un perfil"),
  redesSociales: z.array(redSocialSchema),
  aceptaPolitica: z.boolean(),
});

// Schema completo con refinements para validación
export const registroFormSchema = baseRegistroSchema
  .refine((data) => data.aceptaPolitica === true, {
    message: "Debes aceptar la política de privacidad",
    path: ["aceptaPolitica"],
  })
  .refine((data) => data.email === data.confirmarEmail, {
    message: "Los emails no coinciden",
    path: ["confirmarEmail"],
  })
  .refine((data) => data.telefono === data.confirmarTelefono, {
    message: "Los teléfonos no coinciden",
    path: ["confirmarTelefono"],
  });

// Tipo para react-hook-form (usando el schema base)
export type RegistroFormValues = z.infer<typeof baseRegistroSchema>;
