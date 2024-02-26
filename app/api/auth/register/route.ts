import db from "@lib/db";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { registerSchema } from "@/schema";
import { z } from "zod";

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// TODO: Arreglar validacion de datos desde zod
/* const validateData = (data: z.infer<typeof registerSchema>) => {
  const isValid = registerSchema.safeParse(data);
  return isValid.success;
}; */

export async function POST(request: Request) {
  try {
    const data = await request.json();

    /*     console.log(data);

    const validatedData = validateData(data);

    console.log(validatedData);

    if (!validatedData) {
      return NextResponse.json(
        { message: "Ocurrio un error en la validacion de los datos" },
        { status: 400 }
      );
    } */

    const userFound = await db.user.findFirst({
      where: {
        OR: [{ dni: data.dni }, { email: data.email }],
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message:
            "¡Ups! Parece que este usuario ya está registrado. Por favor, intenta iniciar sesión o verifica tu correo  electronico o DNI.",
        },
        { status: 400 }
      );
    } else {
      const hashedPassword = await hashPassword(data.password);

      const newUser = await db.user
        .create({
          data: {
            dni: data.dni,
            name: data.name,
            surname: data.surname,
            email: data.email,
            password: hashedPassword,
          },
        })
        .catch((error) => {
          throw error;
        });

      const { password: _, ...user } = newUser;

      return NextResponse.json(
        { user },
        { status: 201, statusText: "Usuario creado correctamente" }
      );
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: "Ocurrio un error inesperado", code: error.code },
        { status: 500 }
      );
    }
  }
}
