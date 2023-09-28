import clsx from "clsx";
import Dropdown, { DropdownMenu } from "components/Dropdown";
import IconButton from "components/IconButton";
import { useState } from "react";
import {
  HiOutlineCheck,
  HiOutlineDotsHorizontal,
  HiOutlineTrash,
} from "react-icons/hi";
import FollowButton from "components/FollowButton";

export default function PlotDropdownMenu({
  queryKey,
  isOwnerPlot,
  profile,
  onClickMenu,
}: {
  queryKey?: any[];
  isOwnerPlot: boolean;
  profile: any;
  onClickMenu: (key: string) => void;
}) {
  return (
    <Dropdown
      button={
        <IconButton
          icon={<HiOutlineDotsHorizontal size={20} />}
          activeColor="black"
          preventClick={false}
        />
      }
    >
      {({ close }) => (
        <>
          {isOwnerPlot && (
            <DeleteButton onClickMenu={onClickMenu} close={close} />
          )}
          {!isOwnerPlot && (
            <FollowButton
              queryKey={queryKey}
              profile={profile}
              kind="dropdown-menu"
            />
          )}
        </>
      )}
    </Dropdown>
  );
}

const DeleteButton = ({
  onClickMenu,
  close,
}: {
  onClickMenu: (key: string) => void;
  close: () => void;
}) => {
  const [confirm, setConfirm] = useState(false);
  return (
    <DropdownMenu
      className={clsx(confirm ? "text-primary" : "text-red-500")}
      onClick={() => {
        if (confirm) {
          onClickMenu("DELETE");
          close();
        } else {
          setConfirm(true);
        }
      }}
    >
      {confirm ? <HiOutlineCheck size={20} /> : <HiOutlineTrash size={20} />}
      <div>{confirm ? "Confirm" : "Delete"}</div>
    </DropdownMenu>
  );
};
