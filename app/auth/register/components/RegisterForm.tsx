"use client";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { FormHeader } from "./FormHeader";
import { Label } from "../../../components/Label";

// TODO: armar los datos dinamicos para el manejo de datos desde front y back

interface FormFields {
  name: string;
  surname: string;
  dni: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const [confirmation, setConfirmation] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const onsubmit = async (data: FormFields) => {
    if (data.password !== data.confirmPassword) {
      setConfirmation(true);
      return;
    }

    const res = await fetch("/api/auth/register", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/auth/login");
    } else {
      const { message } = await res.json();
      toast({
        title: "Error inesperado",
        description: message,
        variant: "danger",
      });
    }
    setConfirmation(false);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-28 lg:px-8">
        
        <FormHeader title="Registrarse" />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
            <div>
              <Label htmlFor="name">Nombre</Label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  placeholder=""
                  {...register("name", {
                    required: {
                      value: true,
                      message: "¡No olvides tu nombre! ✍️",
                    },
                    minLength: {
                      value: 2,
                      message: "Nombre demasiado corto (min. 2 caracteres)",
                    },
                    maxLength: {
                      value: 50,
                      message: "Nombre demasiado largo (máx. 50 caracteres)",
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <span className="text-red-600">{errors.name.message}</span>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="surname">Apellido</Label>
              <div className="mt-1">
                <input
                  id="surname"
                  type="text"
                  {...register("surname", {
                    required: {
                      value: true,
                      message: "¡No olvides tu apellido! ✍️",
                    },
                    minLength: {
                      value: 2,
                      message: "Apellido demasiado corto (min. 2 caracteres)",
                    },
                    maxLength: {
                      value: 50,
                      message: "Apellido demasiado largo (máx. 50 caracteres)",
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.surname && (
                  <span className="text-red-600">{errors.surname.message}</span>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="dni">DNI</Label>
              <div className="mt-1">
                <input
                  id="dni"
                  type="number"
                  {...register("dni", {
                    required: {
                      value: true,
                      message: "¡No olvides tu DNI! ✍️",
                    },
                    pattern: {
                      value: /^[\d]{1,3}?[\d]{3,3}?([\d]{3,3})?$/,
                      message:
                        "¡Uy! DNI no valido ⛔️ (5-9 dígitos sin puntos)",
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.dni && (
                  <span className="text-red-600">{errors.dni.message}</span>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "¡No olvides tu correo electrónico! ✍️",
                    },
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "¡Epa! Correo no valido ⛔️. Revisa el formato",
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "¡No olvides ingresar una contraseña! ✍️",
                    },
                    minLength: {
                      value: 8,
                      message: "Contraseña demasiado corta (min. 8 caracteres)",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      message:
                        "Contraseña insegura. Debe tener 8 caracteres, letras, números y símbolos.",
                    },
                  })}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Repetir Contraseña</Label>

              <div className="mt-1">
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "¡No olvides confirmar tu contraseña! ✍️",
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && (
                  <span className="text-red-600">
                    {errors.confirmPassword.message}
                  </span>
                )}
                {confirmation && (
                  <span className="text-red-600">
                    Las contraseñas no coinciden
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md mt-8 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrarse
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
