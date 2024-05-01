"use client";

import { EyeClosedIcon, EyeOpenIcon } from "@/assets";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { InputProps } from "./InputProps";

export function PasswordField<D extends FieldValues>({
  error,
  register,
  name,
  label,
  ...props
}: InputProps<D>) {
  const [passwordShown, setPasswordShown] = useState(false);
  const inputType = passwordShown ? "text" : "password";

  return (
    <div className="relative">
      <input id={name} {...props} type={inputType} {...register(name)} />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center text-sm leading-5">
        <button
          className="flex items-center justify-center"
          type="button"
          onClick={() => setPasswordShown((passwordShown) => !passwordShown)}
        >
          {passwordShown ? (
            <EyeOpenIcon className="w-6 h-6 text-gray-500" />
          ) : (
            <EyeClosedIcon className="w-6 h-6 text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
}
