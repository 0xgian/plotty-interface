import { Dialog } from "@headlessui/react";
import Button from "components/Button";
import IconButton from "components/IconButton";
import Modal from "components/Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineX } from "react-icons/hi";

export default function EditProfileModal({
  bio,
  updateProfile,
}: {
  bio?: string;
  updateProfile?: (bioValue: string) => Promise<void>;
}) {
  const [bioValue, setBioValue] = useState<string>(bio ?? "");

  return (
    <Modal
      buttonRender={({ openModal }) => (
        <Button
          className="min-w-[114px]"
          kind="outline-black"
          onClick={openModal}
        >
          Edit Bio
        </Button>
      )}
    >
      {({ closeModal }) => (
        <>
          <Dialog.Title className="flex items-center justify-between">
            <IconButton
              icon={<HiOutlineX size={20} />}
              activeColor="black"
              kind="header"
              label="Edit Bio"
              onClick={() => {
                closeModal();
                setBioValue(bio ?? "");
              }}
            />
            <Button
              size="sm"
              kind="solid-black"
              onClick={async () => {
                try {
                  updateProfile && (await updateProfile(bioValue));
                  closeModal();
                } catch (error) {
                  toast("Failed to update profile. Please try again later.", {
                    id: "fail-to-update-profile",
                  });
                }
              }}
            >
              Save
            </Button>
          </Dialog.Title>

          <div className="px-2 pt-2 pb-3 mt-3 border border-secondary-text border-opacity-20 rounded-[4px] flex flex-col gap-[6px]">
            <div className="flex justify-between text-xs text-secondary-text">
              <div>Bio</div>
              <div>{`${bioValue.length}/160`}</div>
            </div>
            <textarea
              maxLength={160}
              className="w-full h-16 outline-none resize-none bg-inherit"
              autoCapitalize="sentences"
              autoComplete="on"
              autoCorrect="on"
              name="description"
              dir="auto"
              spellCheck
              placeholder="Bio"
              onChange={(e) => {
                setBioValue(e.target.value);
              }}
              value={bioValue}
            />
          </div>
        </>
      )}
    </Modal>
  );
}
