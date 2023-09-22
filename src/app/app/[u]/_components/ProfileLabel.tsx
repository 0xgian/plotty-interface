import clsx from "clsx";
import Button from "components/Button";
import Dropdown, { DropdownMenu } from "components/Dropdown";
import IconButton from "components/IconButton";
import { useUpdateLabel } from "hooks/useUpdateLabel";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  HiOutlinePlus,
  HiOutlineSpeakerphone,
  HiOutlineX,
  HiTag,
} from "react-icons/hi";

export default function ProfileLabel({
  nametag,
  ownNametag,
  uid,
  queryKey,
  isOwnProfile,
}: {
  nametag?: string;
  ownNametag?: string;
  uid: number;
  queryKey?: any[];
  isOwnProfile?: boolean;
}) {
  return !isOwnProfile || nametag ? (
    <div className="flex mt-[6px]">
      <Dropdown
        button={
          nametag ? (
            <Button size="xs" px="px-3" kind="outline-black">
              <HiTag size={15} />
              <span>{nametag}</span>
            </Button>
          ) : (
            <Button
              size="xs"
              px="px-3"
              kind="outline-black"
              className="border-dashed"
            >
              <HiOutlinePlus size={15} />
              <span>Label</span>
            </Button>
          )
        }
        position="bottom-right"
      >
        {({ close }) => (
          <DropdownLabelWrapper
            isOwnProfile={isOwnProfile}
            close={close}
            uid={uid}
            queryKey={queryKey}
            ownNametag={ownNametag}
          />
        )}
      </Dropdown>
    </div>
  ) : null;
}

const DropdownLabelWrapper = ({
  uid,
  queryKey,
  isOwnProfile,
  ownNametag,
  close,
}: {
  uid: number;
  queryKey?: any[];
  isOwnProfile?: boolean;
  ownNametag?: string;
  close: () => void;
}) => {
  const [mode, setMode] = useState<"" | "report" | "add">("");

  const initValue = ownNametag ?? "";
  const [value, setValue] = useState(ownNametag ?? "");

  const { report } = useUpdateLabel();

  return mode === "report" ? (
    <div className="px-4">
      <div className="pt-3">
        <IconButton
          icon={<HiOutlineX size={20} />}
          activeColor="black"
          onClick={() => {
            setMode("");
            setValue(initValue);
          }}
        />
      </div>
      <div className="py-3 font-bold">Help others identify this address!</div>
      <div className="py-3">
        <input
          className={clsx(
            "w-full px-4 py-3 outline-none bg-inherit rounded-[4px]",
            "border border-secondary-text border-opacity-20"
          )}
          name="label"
          placeholder="Input a label"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        />
      </div>
      <div className="flex justify-end gap-3 pb-3">
        <Button
          size="sm"
          onClick={async () => {
            try {
              report && (await report({ uid: uid, nametag: value, queryKey }));
              close();
            } catch (error) {
              toast("Failed to update label. Please try again later.", {
                id: "fail-to-update-label",
              });
            }
          }}
        >
          Report
        </Button>
      </div>
    </div>
  ) : mode === "add" ? (
    <div className="px-4">
      <div className="pt-3">
        <IconButton
          icon={<HiOutlineX size={20} />}
          activeColor="black"
          onClick={() => {
            setMode("");
            setValue(initValue);
          }}
        />
      </div>
      <div className="py-3 font-bold">
        Add private labels and it can only be viewed by you!
      </div>
      <div className="py-3">
        <input
          className={clsx(
            "w-full px-4 py-3 outline-none bg-inherit rounded-[4px]",
            "border border-secondary-text border-opacity-20"
          )}
          name="label"
          placeholder="Input a label"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        />
      </div>
      <div className="flex justify-end gap-3 pb-3">
        <Button
          size="sm"
          onClick={async () => {
            try {
              report && (await report({ uid: uid, nametag: value, queryKey }));
              close();
            } catch (error) {
              toast("Failed to update label. Please try again later.", {
                id: "fail-to-update-label",
              });
            }
          }}
        >
          Save
        </Button>
      </div>
    </div>
  ) : (
    <div className="py-3">
      <div
        className={clsx(
          "border-b border-secondary-text border-opacity-10",
          "px-4 pb-3 mb-3 font-bold"
        )}
      >
        Address label
      </div>
      <DropdownMenu onClick={() => setMode("report")}>
        <HiOutlineSpeakerphone size={20} />
        <span>Report</span>
      </DropdownMenu>
      {!isOwnProfile && (
        <DropdownMenu onClick={() => setMode("add")}>
          <HiOutlinePlus size={20} />
          <span>Add private</span>
        </DropdownMenu>
      )}
    </div>
  );
};
