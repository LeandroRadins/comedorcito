import { z } from "zod";
import { Prisma } from "@lib/db";

interface RegisterFormProps extends Prisma.UserCreateInput {
  confirmPassword: string;
}

export const registerSchema: z.ZodType<RegisterFormProps> = z
  .object({
    name: z
      .string()
      .min(2, { message: "Nombre demasiado corto (min. 2 caracteres)" })
      .max(50, { message: "Nombre demasiado largo (máx. 50 caracteres)" }),

    surname: z
      .string()
      .min(2, { message: "Apellido demasiado corto (min. 2 caracteres)" })
      .max(50, { message: "Apellido demasiado largo (máx. 50 caracteres)" }),

    dni: z
      //TODO: Ver el error Expected string, received nan
      .string()
      .regex(/^[\d]{1,3}(?:[\d]{3})?(?:[\d]{3})?$/, {
        message: "DNI no valido (5-9 dígitos, sin puntos y guiones)",
      }),

    email: z.string().email({ message: "¡No olvides tu correo electrónico!" }),

    password: z
      .string()
      .min(8, { message: "Contraseña demasiado corta (min. 8 caracteres)" }),

    confirmPassword: z
      .string({
        required_error: "Confirme su contraseña",
      })
      .min(1, { message: "Confirme su contraseña" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
