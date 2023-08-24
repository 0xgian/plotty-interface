import Image from "next/image";
import Modal from "components/Modal";
import clsx from "clsx";
import _ from "lodash";
import { ReactEditor } from "slate-react";
import IconButton from "components/IconButton";
import { HiOutlineX } from "react-icons/hi";
import { Transforms } from "slate";

/**
 * MediaRenderer, only pass editor or media, not both.
 * @param {editor} props pass `slate` editor
 * @param {media} props.submitting pass `media` url string[]
 */
export default function MediaRenderer({
  editor,
  media,
}: {
  editor?: any;
  media?: string[];
}) {
  const mediaArray = editor
    ? editor.children.filter((el: any) => el.type === "image")
    : media;

  return !_.isEmpty(mediaArray) ? (
    <div
      className={clsx(
        mediaArray && "rtedt-" + mediaArray.length,
        media && "border border-secondary-text border-opacity-20",
        "rounded-2xl mt-4 overflow-hidden -mb-[3px] text-[0px]"
      )}
    >
      {mediaArray
        // .filter((url) => isSupportMedia(url))
        .slice(0, 4)
        .map((el: any, i: number) => {
          const isViewOnly = typeof el === "string";
          const url = isViewOnly ? el : el.url;
          const path =
            editor && ReactEditor.findPath(editor as ReactEditor, el);

          const createThumbnail = (openModal?: () => void) => (
            <div className="relative select-none">
              <Image
                alt="media"
                src={url}
                width={0}
                height={0}
                sizes={"100vw"}
                className="block object-cover cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openModal && openModal();
                }}
              />
              {editor && (
                <div
                  className={clsx(
                    "absolute top-[6px] right-[6px] inline p-1",
                    "rounded-full text-white bg-primary-text bg-opacity-50"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    Transforms.removeNodes(editor, { at: path });
                  }}
                >
                  <IconButton
                    icon={<HiOutlineX size={20} />}
                    activeColor="white"
                    preventClick={false}
                  />
                </div>
              )}
            </div>
          );

          return (
            <div key={i} className="relative inline-block select-none imel">
              {isViewOnly ? (
                <Modal
                  buttonRender={({ openModal }) => createThumbnail(openModal)}
                  preventClick
                  viewOnly
                >
                  {({ closeModal }) => (
                    <Image
                      alt="media"
                      src={url}
                      width={0}
                      height={0}
                      sizes={"100vw"}
                      className="block object-contain w-screen sm:w-full h-auto max-h-[80dvh] sm:h-[80dvh]"
                    />
                  )}
                </Modal>
              ) : (
                createThumbnail()
              )}
            </div>
          );
        })}
    </div>
  ) : null;
}
