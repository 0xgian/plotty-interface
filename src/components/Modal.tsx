import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, ReactNode, useState } from "react";

export default function Modal({
  buttonRender,
  children,
  preventClick = false,
  viewOnly = false,
  show = false,
}: {
  buttonRender?: (renderProps: { openModal: () => void }) => ReactNode;
  children: (renderProps: {
    openModal: () => void;
    closeModal: () => void;
  }) => ReactNode;
  preventClick?: boolean;
  viewOnly?: boolean;
  show?: boolean;
}) {
  let [isOpen, setIsOpen] = useState(show);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div onClick={openModal}>
        {buttonRender && buttonRender({ openModal })}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[2]"
          onClose={() => !show && closeModal()}
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
            <div
              className={clsx(
                "fixed inset-0",
                viewOnly
                  ? "bg-opacity-25 bg-primary-text"
                  : "sm:bg-opacity-25 bg-primary-white sm:bg-primary-text"
              )}
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div
              className={clsx(
                "flex justify-center min-h-full text-center",
                viewOnly ? "items-center" : "sm:items-center sm:p-4"
              )}
              onClick={(e) => {
                if (preventClick) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-150"
                enterFrom="opacity-0 translate-y-full"
                enterTo="opacity-100 translate-y-0"
                leave="ease-out duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-full"
              >
                <Dialog.Panel
                  className={clsx(
                    "text-left align-middle transition-all transform",
                    "bg-primary-white sm:shadow-xl rounded-2xl",
                    !viewOnly && "w-full h-max p-4 sm:p-6 max-w-[600px]"
                  )}
                >
                  {children({ openModal, closeModal })}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
