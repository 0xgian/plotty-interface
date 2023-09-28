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
import { usePrivateLabels } from "state/privateLabels";
import { IconUserTag } from "custom-icons";
import _ from "lodash";

export default function ProfileLabel({
  profile,
  queryKey,
  isOwnProfile,
}: {
  profile: any;
  queryKey?: any[];
  isOwnProfile?: boolean;
}) {
  const { labelByUid } = usePrivateLabels();
  const privLabel = labelByUid(profile?.uid);
  const nametag =
    privLabel ||
    profile?.public_nametag_user_preferance ||
    profile?.public_nametag;

  return !isOwnProfile || nametag ? (
    <div className="flex mt-[6px]">
      <Dropdown
        button={
          nametag ? (
            <Button size="xs" px="px-3" kind="outline-black">
              {privLabel ? <IconUserTag size={15} /> : <HiTag size={15} />}
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
            uid={profile?.uid}
            queryKey={queryKey}
            ownNametag={profile?.public_nametag_user_preferance}
            privLabel={privLabel}
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
  privLabel,
  close,
}: {
  uid: number;
  queryKey?: any[];
  isOwnProfile?: boolean;
  ownNametag?: string;
  privLabel?: string;
  close: () => void;
}) => {
  const [mode, setMode] = useState<"" | "report" | "private">("");

  const initValue = ownNametag ?? "";
  const [value, setValue] = useState(ownNametag ?? "");

  const initPrivValue = privLabel ?? "";
  const [privValue, setPrivValue] = useState(privLabel ?? "");

  const { report, addPrivate } = useUpdateLabel();

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
        {!_.isEmpty(initValue) && (
          <Button
            size="sm"
            kind="outline-negative"
            onClick={async () => {
              try {
                report && (await report({ uid: uid, nametag: "", queryKey }));
                close();
              } catch (error) {
                toast("Failed to update label. Please try again later.", {
                  id: "fail-to-update-label",
                });
              }
            }}
          >
            Delete
          </Button>
        )}
        <Button
          size="sm"
          disabled={_.isEmpty(value)}
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
  ) : mode === "private" ? (
    <div className="px-4">
      <div className="pt-3">
        <IconButton
          icon={<HiOutlineX size={20} />}
          activeColor="black"
          onClick={() => {
            setMode("");
            setPrivValue(initPrivValue);
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
            setPrivValue(e.target.value);
          }}
          value={privValue}
        />
      </div>
      <div className="flex justify-end gap-3 pb-3">
        {!_.isEmpty(initPrivValue) && (
          <Button
            size="sm"
            kind="outline-negative"
            onClick={async () => {
              try {
                addPrivate && (await addPrivate({ uid: uid, nametag: "" }));
                close();
              } catch (error) {
                toast("Failed to update label. Please try again later.", {
                  id: "fail-to-update-private-label",
                });
              }
            }}
          >
            Delete
          </Button>
        )}
        <Button
          size="sm"
          disabled={_.isEmpty(privValue)}
          onClick={async () => {
            try {
              addPrivate &&
                (await addPrivate({ uid: uid, nametag: privValue }));
              close();
            } catch (error) {
              toast("Failed to update label. Please try again later.", {
                id: "fail-to-update-private-label",
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
      <DropdownMenu preventClick={false} onClick={() => setMode("report")}>
        <HiOutlineSpeakerphone size={20} />
        <span>Report</span>
      </DropdownMenu>
      {!isOwnProfile && (
        <DropdownMenu preventClick={false} onClick={() => setMode("private")}>
          <HiOutlinePlus size={20} />
          <span>Add private</span>
        </DropdownMenu>
      )}
    </div>
  );
};
