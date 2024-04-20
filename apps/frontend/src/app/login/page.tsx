"use client";

import { useCallback } from "react";
import Image from "next/image";
import welcomeImage from "~/welcome-image.png";
import companyLogo from "~/company-logo.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/forms/Input";

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});
type LoginSchema = z.infer<typeof loginSchema>;

export default function Login(): JSX.Element {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = useCallback((data: LoginSchema) => {
		console.log(
			"Form submitted with email:",
			data.email,
			"and password:",
			data.password
		);
	}, []);

	return (
		<div className="flex h-screen">
			<div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black -mr-10">
				<Image
					src={welcomeImage}
					alt="Logo"
					className="h-full object-cover"
				/>
			</div>
			<div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center rounded-l-3xl">
				<div className="max-w-md w-full p-6">
					<Image
						src={companyLogo}
						alt="Logo"
						className="h-full object-cover"
					/>
					<h1 className="text-3xl font-semibold mb-6 text-black text-center">
						Connexion
					</h1>
					<h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
						Join our community with all time access and free{" "}
					</h1>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<div>
							<Input
								register={register}
								name="email"
								label="Email"
								placeholder="Adresse email"
								type="email"
								error={errors.email?.message}
								className="mt-1 p-2 bg-primary-200 placeholder-gray-500 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
							/>
						</div>
						<div>
							<Input
								register={register}
								name="password"
								label="Mot de passe"
								placeholder="Mot de passe"
								type="password"
								error={errors.email?.message}
								className="mt-1 p-2 bg-primary-200 placeholder-gray-500 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
							/>
						</div>
						<div className="flex items-center justify-center">
							<button
								type="submit"
								className="mt-5 w-1/2 bg-primary-700 text-white font-semibold p-2 rounded-md hover:bg-primary-900 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
							>
								Se connecter
							</button>
						</div>
					</form>
					<div className="mt-4 text-sm text-gray-600 text-center">
						<p>
							Vous rencontrer des problèmes?{" "}
							<a href="#" className="text-black hover:underline">
								Contactez votre administrateur
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
