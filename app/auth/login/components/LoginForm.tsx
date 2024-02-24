"use client";
import { useToast } from "@/components/ui/use-toast";
import { registerSchema } from "@/schema/index";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Label } from "@/app/components/Label";
import { FormHeader } from "@/app/auth/components/FormHeader";
import { z } from "zod";

// TODO: armar los datos dinamicos para el manejo de datos desde front y back

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>();

  const router = useRouter();

  const { toast } = useToast();

  const onsubmit = async (data: z.infer<typeof registerSchema>) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
    });
    console.log(res);
  };

  return (
    <>
      <div className="flex max-h-full flex-1 flex-col justify-center px-6 py-28 lg:px-8">
        <FormHeader title="Iniciar sesión" />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md mt-8 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿Todavía no tenés una cuenta?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Registrate acá puto, no seas gato loco
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
