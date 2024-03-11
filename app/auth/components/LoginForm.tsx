"use client";
import { useToast } from "@/components/ui/use-toast";
import { loginSchema } from "@/schema/index";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PageHeader } from "@/app/components/PageHeader";
import { z } from "zod";
import FormField from "@/app/components/FormField";
import Link from "next/link";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>();

  const router = useRouter();

  const { toast } = useToast();

  const iniciarConDiscord = async (data: z.infer<typeof loginSchema>) => {
    const res = await signIn("discord", {
    });

    if (res?.error) {
      toast({
        title: "Error de inicio de sesión",
        description:
          "Por favor, verifique sus credenciales e intente nuevamente.",
        variant: "danger",
      });
      return;
    } else {
      router.push("/dashboard");
    }
  };

  const onsubmit = async (data: z.infer<typeof loginSchema>) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      toast({
        title: "Error de inicio de sesión",
        description:
          "Por favor, verifique sus credenciales e intente nuevamente.",
        variant: "danger",
      });
      return;
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <div className="flex max-h-full flex-1 flex-col justify-center px-6 py-28 lg:px-8">
        <PageHeader
          title="Iniciar sesión"
          imageData={{
            src: "/dinner.svg",
            alt: "dinner",
            width: 24,
            height: 24,
          }}
          headerStyle="mx-auto text-center"
        />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
            <div>
              <FormField
                labelName="Correo Electrónico"
                type="email"
                name="email"
                placeholder="email@email.com"
                register={register}
                error={errors.email}
              />
            </div>

            <div>
              <FormField
                labelName="Contraseña"
                type="password"
                name="password"
                placeholder="***********"
                register={register}
                error={errors.email}
              />
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
          <button
                onClick={() => signIn("discord")}
                className="flex w-full justify-center rounded-md mt-8 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar sesión con Discord
              </button>

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿Todavía no tenés una cuenta?{" "}
            <Link
              href="/auth/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Registrate acá
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
