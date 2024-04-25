import { Dialog, Transition } from "@headlessui/react";
import { group } from "console";
import { Fragment, useState } from "react";

interface ModalProps {
  buttonPrompt: string;
  buttonclassName?: string;
  buttonIcon?: React.ReactNode;
  uploadIcon?: React.ReactNode;
}
export default function UploadModal(props: ModalProps) {
  let [isOpen, setIsOpen] = useState(false);

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
          className={
            (props.buttonclassName ?? "") +
            "rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          }
        >
          {props.buttonIcon}
          {props.buttonPrompt}
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
            <div className="flex min-h-full items-center justify-center p-4 text-center"
            style={{background: "rgba(0, 0, 0, 0.5)"}}

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
                <Dialog.Panel 
                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                style={{
                    background: "rgba(0, 0, 0, 0.5)",
                    backgroundImage: "url('https://cooperandgracie.com/cdn/shop/articles/Horses_in_Meadow.png?v=1690365162')",
                     
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Téléverser des données
                  </Dialog.Title>

                  <div className="flex flex-col space-y-4">
                    <div className="w-full">
                      
                      <div className="flex justify-between"> {props.uploadIcon }

                        <button className="bg-orange-200 py-3 px-4 rounded-md">
                          <p className="text-xs font-medium">Select file</p>
                        </button>
                      </div>
                    </div>

                    <div className="w-full">
                      <h1 className="text-sm font-semibold">
                        Parent Folder :
                      </h1>
                      <input
                        className="outline-none font-poppins bg-white w-full rounded-lg p-2 text-black border-2 border-white"
                        id="parentFolder"
                        placeholder="No parent folder"
                        type="text"
                      />
                    </div>

                    <div className=" justify-center">
                      <h1 className="justify-center float-left text-sm font-semibold">Share with other projects :</h1>
                      <select className="w-full h-full inline-flex justify-center rounded-md border border-transparent bg-orange-100  text-sm font-medium text-grey-900 hover:bg-grey-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-grey-500 focus-visible:ring-offset-2" />
                      <br />
                      </div>

                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <h1 className="text-sm font-semibold">File Type :</h1>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-4">
                            <input
                              className="cursor-pointer bg-orange"
                              type="radio"
                            />
                            <label className="font-poppins">Model</label>
                          </div>
                          <div className="flex items-center space-x-4">
                            <input
                              className="cursor-pointer"
                              type="radio"
                            />
                            <label className="font-poppins">Raw Data</label>
                          </div>
                          <div className="flex items-center space-x-4">
                            <input
                              className="cursor-pointer"
                              type="radio"
                            />
                            <label className="font-poppins">
                              Preprocessed Data
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2">
                        <h1 className="text-sm font-semibold">Description :</h1>
                        <input
                          className="outline-none font-poppins rounded-lg text-black border-2 border-white w-full"
                          id="Description"
                          placeholder="No parent folder"
                          type="text"
                        />
                                 
                      <h1 className="text-sm font-semibold"> Tags</h1>
                      <input
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
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Upload
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
