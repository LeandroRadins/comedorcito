import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "¡No olvides tu nombre!" })
      .min(2, { message: "Nombre demasiado corto (min. 2 caracteres)" })
      .max(50, { message: "Nombre demasiado largo (máx. 50 caracteres)" })
      .toUpperCase(),
    surname: z
      .string()
      .min(2, { message: "Apellido demasiado corto (min. 2 caracteres)" })
      .max(50, { message: "Apellido demasiado largo (máx. 50 caracteres)" })
      .toUpperCase(),

    dni: z.string().regex(/^[\d]{1,3}?[\d]{3,3}?([\d]{3,3})?$/, {
      message: "DNI no valido (5-9 dígitos sin puntos)",
    }),

    email: z
      .string()
      .email({ message: "¡No olvides tu correo electrónico!" })
      .toLowerCase(),

    password: z
      .string()
      .min(8, { message: "Contraseña demasiado corta (min. 8 caracteres)" }),

    confirmPassword: z
      .string({
        required_error: "Confirme su contraseña",
      })
      .min(1, { message: "Confirme su contraseña" }),
  })
  .refine((data) => data.password !== data.confirmPassword, {
    message: "Las contraseñas no coinciden",
  });

export type UserModel = z.infer<typeof registerSchema>;
