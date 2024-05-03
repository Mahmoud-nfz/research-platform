'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import welcomeImage from '~/welcome-image.png';
import companyLogo from '~/company-logo.png';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/forms/Input';
import useLogin from '@/hooks/auth/useLogin';
import { useRouter } from 'next/navigation';
import { LoginSchema, loginSchema } from '@/types/schemas';

export default function Login(): JSX.Element {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		mode: 'onTouched',
	});

	const { mutate: login, isError, isPending } = useLogin();

	const onSubmit = useCallback((data: LoginSchema) => {
		login(
			{
				email: data.email,
				password: data.password,
				redirect: false,
			},
			{
				onSuccess() {
					router.replace('/platform', { scroll: false });
				},
			}
		);
	}, []);

	return (
		<div className="flex h-screen">
			<div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black -mr-10">
				<Image
					src={welcomeImage}
					alt="Logo"
					className="h-full object-cover"
					priority={true}
				/>
			</div>
			<div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center rounded-l-3xl">
				<div className="max-w-md w-full p-6">
					<Image src={companyLogo} alt="Logo" className="h-full object-cover" />
					<h1 className="text-3xl font-semibold mb-6 text-black text-center">
						Connexion
					</h1>
					<h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
						Join our community with all time access and free{' '}
					</h1>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<Input
								register={register}
								name="email"
								label="Email"
								placeholder="Adresse email"
								type="email"
								error={errors.email?.message}
							/>
						</div>
						<div>
							<Input
								register={register}
								name="password"
								label="Mot de passe"
								placeholder="Mot de passe"
								type="password"
								error={errors.password?.message}
							/>
						</div>
						<div className="flex items-center justify-center">
							<button
								type="submit"
								disabled={isPending}
								className="mt-5 w-1/2 bg-primary-700 flex flex-row items-center justify-around disabled:bg-gray-300 text-white font-semibold p-2 rounded-md hover:bg-primary-900 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
							>
								{isPending && (
									<div
										className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-[#332d2d] motion-reduce:animate-[spin_1.5s_linear_infinite]"
										role="status"
									>
										<span className="rounded-lg !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
											Loading...
										</span>
									</div>
								)}
								Se connecter
							</button>
						</div>
					</form>
					{isError && (
						<div className="mt-4 text-sm text-red-600 text-center">
							<p>Vos identifiants sont incorrects. Veuillez réessayer</p>
						</div>
					)}
					<div className="mt-4 text-sm text-gray-600 text-center">
						<p>
							Vous rencontrer des problèmes?{' '}
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
