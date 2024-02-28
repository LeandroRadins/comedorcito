import { FieldError, UseFormRegister, FieldValues } from "react-hook-form";

export type FormFieldProps<T extends FieldValues> = {
    labelName: string;
    type: string;
    placeholder: string;
    name: keyof T;
    register: UseFormRegister<T>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
    props?: any;
};