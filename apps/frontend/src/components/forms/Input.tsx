import { UseFormRegister } from "react-hook-form";
import { InputHTMLAttributes } from "react";
import { FieldValues, Path } from "react-hook-form";
import clsxm from "@/utils/clsxm";

interface InputProps<D extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  register: UseFormRegister<D>;
  name: Path<D>;
  label: string;
}

export default function Input<D extends FieldValues>({
  error,
  register,
  name,
  label,
  ...props
}: InputProps<D>) {
  return (
    <div className="space-y-1">
      <label className="block" htmlFor={name}>
        <span>{label}</span>{" "}
        {(register(name).required || props.required) && (
          <span className="text-red-500">*</span>
        )}
      </label>
      <input
        id={name}
        {...props}
        {...register(name)}
        className={clsxm(
          "mt-1 p-2 bg-primary-200 placeholder-gray-500 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300",
          props.className
        )}
      />
      <span className="ml-2.5 block text-sm font-medium text-red-700">
        {error}
      </span>
    </div>
  );
}
