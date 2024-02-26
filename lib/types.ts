import { FieldError, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/schema/register.schema";

export type FormFieldProps = {
    labelName: string;
    type: string;
    placeholder: string;
    name: keyof z.infer<typeof registerSchema>;
    register: UseFormRegister<z.infer<typeof registerSchema>>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};