"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormFields {
  name: string;
  surname: string;
  dni: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onsubmit = async (data: FormFields) => {
    const res = await fetch("/api/auth/register", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((data) => {
        console.log(data);
      })
      .catch((data) => {
        console.log(data.errors);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <input type="text" {...register("name")} />
        <input type="text" {...register("surname")} />
        <input type="text" {...register("dni")} />
        <input type="email" {...register("email")} />
        <input type="password" {...register("password")} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default RegisterForm;
