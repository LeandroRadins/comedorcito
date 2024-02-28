"use client";
import { useToast } from "@/components/ui/use-toast";
import { registerSchema } from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormField from "../../components/FormField";
import { PageHeader } from "../../components/PageHeader";
import Link from "next/link";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      dni: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const { toast } = useToast();

  const validateData = (data: z.infer<typeof registerSchema>) => {
    const isValid = registerSchema.safeParse(data);
    return isValid.success;
  };

  const onsubmit = async (data: z.infer<typeof registerSchema>) => {
    if (!validateData(data)) {
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
  };

  return (
    <>
      <div className="flex max-h-full flex-1 flex-col justify-center px-6 py-28 lg:px-8 border-2 border-orange-600">
        <PageHeader
          title="Registrarse"
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
                labelName="Nombre"
                name="name"
                type="text"
                placeholder="Cosme Gonzalo"
                register={register}
                error={errors.name}
              />
            </div>

            <div>
              <FormField
                labelName="Apellido"
                name="surname"
                type="text"
                placeholder="Fulanito"
                register={register}
                error={errors.surname}
              />
            </div>

            <div>
              <FormField
                labelName="DNI"
                name="dni"
                type="number"
                placeholder="12345678"
                register={register}
                error={errors.dni}
              />
            </div>

            <div>
              <FormField
                labelName="Correo Electrónico"
                name="email"
                type="email"
                placeholder="email@email.com"
                register={register}
                error={errors.email}
              />
            </div>

            <div>
              <FormField
                labelName="Contraseña"
                name="password"
                type="password"
                placeholder="********"
                register={register}
                error={errors.password}
              />
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
            <Link
              href="/auth/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
