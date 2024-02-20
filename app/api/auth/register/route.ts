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

  if (userFound) {

    const { password: _, ...user } = userFound;

    return NextResponse.json(
      { user },
      { status: 404, statusText: "El usuario ya existe..." }
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
}
