import { NextResponse } from "next/server";
import db from "@lib/db";
import {Prisma} from "@prisma/client";
import * as bcrypt from "bcryptjs";

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const userFound = await db.user.findFirst({
      where: {
        OR: [{ dni: data.dni }, { email: data.email }],
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message:
            "¡Ups! Parece que este usuario ya está registrado. Por favor, intenta iniciar sesión o utiliza otro nombre de usuario.",
        },
        { status: 400 }
      );
    } else {
      const hashedPassword = await hashPassword(data.password);
      const newUser = await db.user.create({
        data: {
          dni: data.dni,
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: hashedPassword,
        },
      });

      const { password: _, ...user } = newUser;

      return NextResponse.json(
        { user },
        { status: 201, statusText: "Usuario creado correctamente" }
      );
    }
  } catch (error) {
    // TODO: armar tipado para diferentes errores
    /*
    type Error = {
      message: string;
      status: number;
    }

    Base de datos
    Servidor
    Validacion de datos

    */
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: "Ocurrio un error en la base de datos" , code: error.code },
        { status: 500 }
      );
    }
    //return NextResponse.json({ message: error }, { status: 500 });
  }
}
