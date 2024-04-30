"use client";

import { FieldValues, Path } from "react-hook-form";
import { PasswordField } from "./PasswordField";
import { InputProps } from "./InputProps";

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
			{name === "password" ? (
				<PasswordField
					error={error}
					register={register}
					name={name}
					label={label}
					{...props}
				/>
			) : (
				<input id={name} {...props} {...register(name)} />
			)}
			<span className="ml-2.5 block text-sm font-medium text-red-700">
				{error}
			</span>
		</div>
	);
}
