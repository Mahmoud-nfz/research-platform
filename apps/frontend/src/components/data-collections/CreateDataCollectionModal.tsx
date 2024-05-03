"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useMemo, useState } from "react";
import Input from "../forms/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Select from "../forms/Select";
import {
  CreateDataCollectionSchema,
  createDataCollectionSchema,
} from "@/types/schemas/create-data-collection.schema";
import useCreateDataCollection from "@/hooks/useCreateDataCollection";
import { Project } from "@/types/entities";
import Combobox from "../forms/Combobox";

export const CreateDataCollectionModal = ({
  projectsWithCreatePermission,
}: {
  projectsWithCreatePermission: Project[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateDataCollectionSchema>({
    resolver: zodResolver(createDataCollectionSchema),
    mode: "onTouched",
    defaultValues: {
      tags: [],
    },
  });

  const {
    mutate: createDataCollection,
    isPending,
    isError,
  } = useCreateDataCollection();

  const onSubmit = useCallback((data: CreateDataCollectionSchema) => {
    console.log(data)
    createDataCollection(
      { ...data },
      {
        onSuccess() {
          router.refresh();
        },
      }
    );
  }, []);

  const projectOptions = useMemo(
    () =>
      projectsWithCreatePermission.map((p) => ({
        id: p.id,
        value: p.id,
        label: p.name,
      })),
    []
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary-500 m-2 py-2 px-3 rounded-md"
      >
        Créer une collection
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
                    Créer une collection de données
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                      register={register}
                      name="name"
                      label="Nom"
                      placeholder="Nom"
                      type="text"
                      error={errors.name?.message}
                    />
                    <Input
                      register={register}
                      name="description"
                      label="Description"
                      placeholder="Description"
                      type="text"
                      error={errors.description?.message}
                    />
                    <Input
                      register={register}
                      name="imageUrl"
                      label="Image"
                      placeholder="Image"
                      type="url"
                      error={errors.imageUrl?.message}
                    />
                    <Combobox
                      name="projectId"
                      options={projectOptions}
                      label="Project"
                      setValue={setValue}
                      value={watch('projectId')}
                    />
                    <Select
                      className="mt-1 p-2 bg-primary-200 placeholder-gray-500 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                      getValues={getValues}
                      setValue={setValue}
                      watch={watch}
                      name="tags"
                      label="Tags"
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
                          "Créer"
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
};
