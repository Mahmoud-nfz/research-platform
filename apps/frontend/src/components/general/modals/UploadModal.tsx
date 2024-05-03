'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadSchema, UploadSchema } from '@/types/schemas/upload.schema';
import Input from '@/components/forms/Input';

import { zodResolver } from '@hookform/resolvers/zod';
import useUploadFile from '@/hooks/upload/useUploadFile';
import { CloudUploadIcon, FileIcon, UploadIcon } from '@/assets';
import toHumanReadableSize from '@/utils/toHumanReadableSize';

export default function UploadModal() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm<UploadSchema>({
		resolver: zodResolver(uploadSchema),
		mode: 'onTouched',
	});

	const [isOpen, setIsOpen] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);

	const { mutate: uploadFile, isError, isPending } = useUploadFile();

	const handleUpload = useCallback((data: UploadSchema) => {
		uploadFile({
			data,
			setUploadProgress,
		});
	}, []);

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="items-center w-fit rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 flex flex-row"
			>
				<CloudUploadIcon />
				<p className="ml-1">Téléverser des données</p>
			</button>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					open={isOpen}
					onClose={() => setIsOpen(false)}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full space-y-10 max-w-md transform overflow-hidden rounded-2xl bg-white px-12 py-20 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="font-bold text-center text-4xl"
									>
										Téléverser des données
									</Dialog.Title>

									<form
										onSubmit={handleSubmit(handleUpload)}
										className="space-y-4"
									>
										<div className="space-y-2">
											<div className="flex items-center justify-between gap-4">
												<UploadIcon height={36} width={36} className="mx-2" />
												<label htmlFor="files" className="text-sm font-medium">
													Selectionne un fichier ou bien drag'N'drop ici
												</label>
												<label
													htmlFor="files"
													className="text-center cursor-pointer p-2 text-xs font-bold uppercase bg-primary-300 hover:bg-primary-400 transition rounded-lg"
												>
													Sélectionner un fichier
												</label>
												<input
													id="files"
													type="file"
													{...register('files')}
													className="hidden"
												/>
											</div>
											{watch('files')?.length > 0 && (
												<div className="relative select-none p-3 gap-3 bg-gray-300 rounded-lg flex items-center justify-between">
													<FileIcon width={12} height={18} />
													<div className="flex grow basis-full items-center justify-between">
														<span className="font-semibold text-xs">
															{watch('files')[0]?.name}
														</span>
														<span className="font-semibold text-xs">
															{toHumanReadableSize(watch('files')[0]?.size)}
														</span>
													</div>
													<button
														onClick={() => setValue('files', undefined)}
														className="rounded-full text-xs bg-black size-4 text-white absolute -top-1.5 -right-1.5"
													>
														x
													</button>
												</div>
											)}
											<span className="ml-2.5 block text-sm font-medium text-red-700">
												{errors.files?.message?.toString()}
											</span>
										</div>
										<Input
											name="parentFolder"
											register={register}
											label="Dossier parent"
											error={errors.parentFolder?.message}
										/>
										<Input
											name="description"
											register={register}
											label="Description"
											error={errors.description?.message}
										/>
										<div className="flex items-center justify-center">
											<button
												type="submit"
												className="mt-5 w-1/2 bg-primary-700 text-white font-semibold p-2 rounded-md hover:bg-primary-900 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
											>
												{isPending ? (
													<div
														className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-[#332d2d] motion-reduce:animate-[spin_1.5s_linear_infinite]"
														role="status"
													>
														<span className="rounded-lg !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
															Loading...
														</span>
													</div>
												) : (
													'Terminé'
												)}
											</button>
										</div>
										{isError && (
											<div className="mt-4 text-sm text-red-600 text-center">
												<p>Une erreur est survenue. Veuillez réessayer.</p>
											</div>
										)}
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
