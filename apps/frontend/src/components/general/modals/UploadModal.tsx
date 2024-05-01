import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { uploadSchema, UploadSchema } from "@/types/schemas/upload.schema";
import { ElasticCreateMetaData } from "../../../types/elastic-search";
import cslx from "clsx";
import Input from "@/components/forms/Input";

import { handleFileUpload } from "../../../services/minio/upload.service";
import { createObjectMetadata } from "../../../services/elastic/crud.service";
import { zodResolver } from "@hookform/resolvers/zod";

interface ModalProps {
	buttonPrompt: string;
	buttonIcon?: React.ReactNode;
	uploadIcon?: React.ReactNode;
}


const bucketName = "ddfdfdc";
export default function UploadModal(props: ModalProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UploadSchema>({
		resolver: zodResolver(uploadSchema),
	});

	const [isOpen, setIsOpen] = useState(false);
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [error, setError] = useState<string>("");


	const handleUpload = useCallback((data: UploadSchema) => {
		handleFileUpload(
			data.files[0] as File,
			bucketName ?? "",
			data.parentFolder ?? "",
			(progress) => setUploadProgress(progress),
			(error) => setError(error)
		); 
	}, []);
	const handleCreateObjectMetadata = useCallback((data: UploadSchema) => {
		const metadata: ElasticCreateMetaData = {
			data: { 
				objectName: data.files[0].name,
				description: data.description ?? "",
				tags: data.tags ?? [],
				path: data.path ?? "",
				type: data.selectedFileType ?? "Raw Data",
			},
		};
		createObjectMetadata(metadata);
	}, []);
	const handleCreateFileEntity = useCallback((data: UploadSchema) => {
		handleUpload(data);
		handleCreateObjectMetadata(data);
	}, []);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			<div className="flex items-center justify-center m-1">
				<button
					type="button"
					onClick={openModal}
					className={cslx(
						"items-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 flex flex-row"
					)}
				>
					<div className="mr-1">{props.buttonIcon}</div>
					<div className="ml-1">{props.buttonPrompt}</div>
				</button>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
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
						<div
							className="flex min-h-full items-center justify-center p-4 text-center"
							style={{ background: "rgba(0, 0, 0, 0.5)" }}
						>
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all">
									<div className="relative">
										{/* Background div */}
										<div
											className="rounded-t-lg absolute inset-0 bg-cover bg-center"
											style={{
												backgroundImage:
													// src is a local image from the public folder
													"url('/images/horses.webp')",
												opacity: 0.2,
											}}
										></div>

										{/* Title div */}
										<form
											// on submit handle upload and create object
											onSubmit={handleSubmit(handleCreateFileEntity)}
											
											className="relative p-3 opacity-100 flex flex-col justify-between text-black text-md font-bold"
										>
											<Dialog.Title
												as="h3"
												className="text-lg font-medium leading-6 text-gray-900"
											>
												Téléverser des données
											</Dialog.Title>

											<div className="flex flex-col p-2">
												<div className="w-full my-2">
													<div className="  flex items-center justify-center">
														{props.uploadIcon}
														<Input
															register={register}
															name="files"
															label="File:"
															type="file"
															className="bg-white placeholder:text-gray-400"
                             								//@ts-ignore
															error={
																errors
																	.files
																	?.message
															}
														/>
													</div>
													{uploadProgress > 0 && (
														<p>
															Upload Progress:{" "}
															{uploadProgress}%
														</p>
													)}
													{error && (
														<p
															style={{
																color: "red",
															}}
														>
															{error}
														</p>
													)}
												</div>

												<div className="w-full mb-2">
													<Input
														register={register}
														name="parentFolder"
														label="Parent Folder:"
														placeholder="No parent folder"
														type="text"
														className="bg-white placeholder:text-gray-400"
														
													/>
												</div>

												<div className="mb-2 justify-center">
													<h1 className="justify-center float-left text-sm font-semibold">
														Share with other
														projects :
													</h1>
													<select className="w-full h-full inline-flex justify-center rounded-md border border-transparent bg-orange-50  text-sm font-medium text-grey-900 hover:bg-grey-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-grey-500 focus-visible:ring-offset-2" />
													<br />
												</div>
												<div className="flex flex-row mt-2 py-3">
													<div className="w-1/2"><div className="flex flex-col space-y-2">
														<h1 className="text-sm font-semibold">Data Type:</h1>
															<div className="flex items-center">
																<Input
																	register={register}
																	name="selectedFileType"
																	label=""
																	type="radio"
																	id="model"
																	value="Model"
																	className="cursor-pointer bg-orange"
																/>
																<label htmlFor="model" className="ml-2">Model</label>
															</div>
															<div className="flex items-center">
																<Input
																	register={register}
																	name="selectedFileType"
																	label=""
																	type="radio"
																	id="rawData"
																	value="Raw Data"
																	className="cursor-pointer"
																/>
																<label htmlFor="rawData" className="ml-2">Raw Data</label>
															</div>
															<div className="flex items-center">
																<Input
																	register={register}
																	name="selectedFileType"
																	label=""
																	type="radio"
																	id="preprocessedData"
																	value="Preprocessed Data"
																	className="cursor-pointer"
																/>
																<label htmlFor="preprocessedData" className="ml-2">Pre-processed data</label>
															</div>
														</div>
													</div>
													<div className="w-1/2">
														<Input
															register={register}
															name="description"
															label="Description:"
															className="outline-none font-poppins rounded-lg text-black border-2 border-white w-full"
															id="Description"
															placeholder="Description"
															type="text"
														/>

														<Input
																register={register}
																name="tags"
																label="tags"
															className="outline-none font-poppins bg-white w-full rounded-lg  text-black border-2 border-white"
															id="Tags"
															placeholder="Tags"
															type="text"
														/>
													</div>
												</div>
											</div>

											<div className="flex justify-end mt-4">
												<button
													type="button"
													className="inline-flex justify-center rounded-md border bg-beige-100 px-4 py-2 text-sm font-medium text-black-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
													onClick={closeModal}
												>
													Annuler
												</button>
												<button
													type="submit"
													className="inline-flex justify-center rounded-md border bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
													onClick={handleCreateFileEntity}
												>
													Upload
												</button>
											</div>
										</form>

										{/* Dots of options */}
										<button className="absolute top-0 right-3 font-black">
											...
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}