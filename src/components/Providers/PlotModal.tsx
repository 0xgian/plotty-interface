import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { usePlotModal } from "state/plotModal";
import IconButton from "components/IconButton";
import { HiOutlineX } from "react-icons/hi";
import Button from "components/Button";
import { Avatar } from "components/Avatar";
import clsx from "clsx";
import RichTextRenderer from "components/RichTextRenderer";
import PlotCard from "components/PlotCard";

export default function PlotModal() {
  const { showPlotModal, closePlotModal, replyingTo } = usePlotModal();
  return (
    <Transition appear show={showPlotModal} as={Fragment}>
      <Dialog as="div" className="relative z-[1]" onClose={closePlotModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 sm:bg-opacity-25 bg-primary-white sm:bg-primary-text" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex justify-center min-h-full sm:px-4 sm:py-[60px] text-center">
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
                  "w-full max-w-[600px] h-max text-left transition-all",
                  "transform bg-primary-white sm:shadow-xl rounded-2xl"
                )}
              >
                <PlotCard
                  maxHeight={
                    replyingTo?.plotDetails
                      ? "max-h-[calc(62dvh-180px)]"
                      : "max-h-[62dvh]"
                  }
                  placeHolder={
                    replyingTo?.plotDetails ? "Plot your reply!" : undefined
                  }
                  onSuccess={closePlotModal}
                >
                  {({ editor, plot, parsedContent, tools }) => {
                    return (
                      <>
                        <Dialog.Title className="flex items-center justify-between px-4 pt-4 sm:pt-4 sm:px-6">
                          <IconButton
                            icon={<HiOutlineX size={20} />}
                            activeColor="black"
                            kind="header"
                            onClick={() => {
                              closePlotModal();
                            }}
                          />
                        </Dialog.Title>

                        <div className="w-full h-full pl-4 sm:pl-6">
                          {replyingTo && replyingTo?.plotDetails && (
                            <div className="relative flex gap-3 pt-3">
                              <div className="flex flex-col items-center gap-3">
                                <Avatar
                                  address={
                                    replyingTo.plotDetails?.avatarUrl ?? "0x0"
                                  }
                                  size={40}
                                />
                                <div className="w-[2px] h-full bg-secondary-text bg-opacity-10" />
                              </div>
                              <div className="flex flex-col w-[calc(100%-40px-12px)]">
                                <div className="flex gap-[6px] w-full items-end">
                                  <div className="font-semibold">
                                    {replyingTo.to}
                                  </div>
                                  <div className="text-secondary-text">
                                    {replyingTo.plotDetails.desc}
                                  </div>
                                  <div className="text-secondary-text">·</div>
                                  <div className="text-secondary-text">
                                    {replyingTo.plotDetails.timestamp}
                                  </div>
                                </div>
                                <div className="w-full mb-3 break-words">
                                  <RichTextRenderer
                                    content={replyingTo.plotDetails.content}
                                    viewOnly
                                  />
                                </div>
                                <div className="mb-3 text-secondary-text">
                                  Replying to{" "}
                                  <span className="text-primary">
                                    {replyingTo.to}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          {editor}
                        </div>

                        <Dialog.Title className="px-4 pb-4 sm:px-6 sm:pb-6">
                          <div
                            className={clsx(
                              "flex items-center justify-between pt-3",
                              "border-t border-secondary-text border-opacity-10"
                            )}
                          >
                            {tools}

                            <Button
                              size="sm"
                              onClick={() =>
                                plot(replyingTo?.plotDetails?.plotId)
                              }
                              disabled={!parsedContent.valid}
                            >
                              Post
                            </Button>
                          </div>
                        </Dialog.Title>
                      </>
                    );
                  }}
                </PlotCard>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
