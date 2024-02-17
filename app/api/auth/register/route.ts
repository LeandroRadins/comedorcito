import { NextResponse } from "next/server";
import db from "@libs/db";
import * as bcrypt from "bcryptjs";

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export async function POST(request: Request) {
  const data = await request.json();

  const userFound = await db.user.findFirst({
    where: {
      OR: [{ dni: data.dni }, { email: data.email }],
    },
  });

  console.log(userFound);

  if (userFound) {
    console.log("Este usuario ya existe...");
    return NextResponse.json(
      {
        message: "El usuario ya existe...",
      },
      {
        status: 400,
      }
    );
  } else {
    const hashedPassword = await hashPassword(data.password);
    await db.user.create({
      data: {
        dni: data.dni,
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  return NextResponse.json({ message: "Usuario creado correctamente..." });
}
