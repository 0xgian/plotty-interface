import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { useAuthModal } from "state/authModal";
import { IconIntelligence, IconPlotty } from "custom-icons";
import Button from "components/Button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { slideUpAnimate } from "config/transitions";

export default function AuthModal() {
  const { showAuthModal, closeAuthModal } = useAuthModal();
  const { openConnectModal } = useConnectModal();
  return (
    <Transition appear show={showAuthModal} as={Fragment}>
      <Dialog as="div" className="relative z-[1]" onClose={closeAuthModal}>
        <div className="fixed inset-0">
          <div className="flex justify-center min-h-full text-center">
            <Transition.Child as={Fragment} {...slideUpAnimate}>
              <Dialog.Panel
                className={clsx(
                  "text-left align-middle transition-all transform",
                  "bg-primary-white w-full flex"
                )}
              >
                <div className="items-center justify-center hidden w-1/2 lg:flex bg-primary-text">
                  <IconPlotty size={348} className="text-primary-white" />
                </div>
                <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
                  <div className="flex flex-col w-full max-w-[348px] px-4 lg:w-fit lg:max-w-full lg:px-0">
                    <div className="flex flex-col w-full text-3xl font-semibold mb-7 md:mb-12 sm:text-5xl lg:text-6xl lg:w-fit">
                      <IconPlotty size={45} className="flex justify-center w-full h-[38vh] lg:hidden" />
                      <div className="block truncate">Approachable</div>
                      <div className="flex items-center gap-[6px] sm:gap-3 text-primary w-fit">
                        <IconIntelligence size={28} />
                        <span>On-chain</span>
                      </div>
                      <div>Data</div>
                    </div>

                    <Button kind="outline-black" onClick={openConnectModal}>
                      Log in
                    </Button>
                    <div className="relative flex items-center justify-center h-7 md:h-12">
                      <div className="h-[1px] bg-secondary-text w-full bg-opacity-10"></div>
                      <div className="absolute px-4 bg-primary-white">or</div>
                    </div>
                    <Button onClick={openConnectModal}>Create Account</Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
