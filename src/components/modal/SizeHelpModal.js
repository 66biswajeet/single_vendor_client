import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

const SizeHelpModal = ({ isOpen, onClose }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <IoClose className="h-6 w-6" />
                </button>

                {/* Title */}
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-gray-900 mb-4"
                >
                  Need help picking a size?
                </Dialog.Title>

                {/* Content */}
                <div className="mt-2 space-y-4">
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">
                        Most importantly you don't have to be exact when
                        selecting a size
                      </span>
                      . We'll determine your exact size based on your artwork
                      and update your final price accordingly during your final
                      proofing.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">
                      For example, when you order 76 mm × 76 mm stickers your
                      exact size may be more like 76 mm × 71 mm. When you
                      receive your proof, you'll see the exact sizing and
                      updated pricing. You can also request changes to your size
                      during proofing until you're happy.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-700 font-medium">
                      Here are a few common objects and their sizes for
                      reference:
                    </p>
                  </div>

                  {/* Size Reference Image */}
                  <div className="relative w-full rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src="/sizeHelp/sh.jpg"
                      alt="Size reference guide showing common objects"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain"
                      priority
                    />
                  </div>

                  {/* Contact Link */}
                  {/* <div className="pt-2">
                    <p className="text-sm text-gray-600">
                      Are you still not sure or think we can do more to help
                      with size selection?{" "}
                      <a
                        href="/contact-us"
                        className="text-blue-600 hover:text-blue-700 font-medium underline"
                      >
                        Contact us
                      </a>
                    </p>
                  </div> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SizeHelpModal;
