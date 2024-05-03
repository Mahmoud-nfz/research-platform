import { InputHTMLAttributes } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export interface InputProps<D extends FieldValues>
	extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	register: UseFormRegister<D>;
	name: Path<D>;
	label: string;
}
