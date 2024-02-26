import { FormFieldProps } from "@/lib/types";

export const FormField: React.FC<FormFieldProps> = ({
  labelName,
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <label
      htmlFor={name}
      className="block text-1xl font-medium leading-6 text-gray-900"
    >
      {labelName}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-1"
    />
    {error && <span className="text-red-600">{error.message}</span>}
  </>
);
export default FormField;
