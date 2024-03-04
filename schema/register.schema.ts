import { z } from "zod";
import { Prisma } from "@lib/db";

export const registerSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    name: z
      .string()
      .min(2, { message: "Nombre demasiado corto (min. 2 caracteres)" })
      .max(50, { message: "Nombre demasiado largo (máx. 50 caracteres)" })
      .toUpperCase(),

    surname: z
      .string()
      .min(2, { message: "Apellido demasiado corto (min. 2 caracteres)" })
      .max(50, { message: "Apellido demasiado largo (máx. 50 caracteres)" })
      .toUpperCase(),

    dni: z
      .string()
      .regex(/^[\d]{1,3}(?:[\d]{3})?(?:[\d]{3})?$/, {
        message: "DNI no valido (5-9 dígitos, sin puntos y guiones)",
      }),

    email: z.string().email({ message: "¡No olvides tu correo electrónico!" })
    .toLowerCase(),

    password: z
      .string()
      .min(8, { message: "Contraseña demasiado corta (min. 8 caracteres)" }),
  });

export type RegisterInput = z.infer<typeof registerSchema>;
