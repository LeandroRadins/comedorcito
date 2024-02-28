import { z } from "zod";
import { Prisma } from "@lib/db";

type LoginFormProps = Partial<Prisma.UserCreateInput>

export const loginSchema: z.ZodType<LoginFormProps> = z.object({
  email: z.string().email({ message: "¡No olvides tu correo electrónico!" }),
  password: z
    .string()
    .min(8, { message: "Contraseña demasiado corta (min. 8 caracteres)" }),
});

export type loginSchema = z.infer<typeof loginSchema>;
