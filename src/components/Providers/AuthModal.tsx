import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useMemo } from "react";
import { useModal } from "state/modal";
import { IconIntelligence, IconPlotty } from "custom-icons";
import Button from "components/Button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { isMobile } from "react-device-detect";
import InstallAppButton from "components/InstallAppButton";
import { useAccount } from "wagmi";
import { useAuthStore } from "state/auth";
import { isPWA } from "lib/isPWA";

export default function AuthModal() {
  const { address } = useAccount();
  const { account } = useAuthStore();

  const { isShowing, closeModal } = useModal();
  const { openConnectModal } = useConnectModal();

  const connected = useMemo(() => address && !account, [address, account]);
  const needsInstall = isMobile && !isPWA();

  return (
    <Transition appear show={isShowing("auth") || needsInstall} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[2]"
        onClose={() => closeModal("auth")}
      >
        <div className="fixed inset-0">
          <div className="flex justify-center min-h-full text-center">
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
                  "bg-primary-white w-full flex"
                )}
              >
                <div className="items-center justify-center hidden w-1/2 lg:flex bg-primary-text">
                  <IconPlotty size={348} className="text-primary-white" />
                </div>

                <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
                  <div className="flex flex-col w-full max-w-[348px] px-4 lg:w-fit lg:max-w-full lg:px-0">
                    <div className="flex flex-col w-full text-3xl font-semibold mb-7 md:mb-12 sm:text-5xl lg:text-6xl lg:w-fit">
                      <IconPlotty
                        size={45}
                        className="flex justify-center w-full h-[38vh] lg:hidden"
                      />
                      <div className="block truncate">Approachable</div>
                      <div className="flex items-center gap-[6px] sm:gap-3 text-primary w-fit">
                        <IconIntelligence size={28} />
                        <span>On-chain</span>
                      </div>
                      <div>Data</div>
                    </div>

                    {needsInstall ? (
                      <div className="flex flex-col gap-3">
                        <div>📲 See Plotty in...</div>
                        <InstallAppButton />
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        {!connected && (
                          <>
                            <Button
                              kind="outline-black"
                              onClick={openConnectModal}
                            >
                              Log in
                            </Button>
                            <div className="relative flex items-center justify-center h-7 md:h-12">
                              <div className="h-[1px] bg-secondary-text w-full bg-opacity-10"></div>
                              <div className="absolute px-4 bg-primary-white">
                                or
                              </div>
                            </div>
                          </>
                        )}
                        <Button onClick={openConnectModal}>
                          {!connected ? "Create Account" : "Verify"}
                        </Button>
                      </div>
                    )}
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
