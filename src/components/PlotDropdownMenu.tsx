import clsx from "clsx";
import Dropdown from "components/Dropdown";
import IconButton from "components/IconButton";
import { useState } from "react";
import {
  HiOutlineCheck,
  HiOutlineDotsHorizontal,
  HiOutlineTrash,
} from "react-icons/hi";

export default function PlotDropdownMenu({
  onClickMenu,
}: {
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
      maxWidth="max-w-[160px]"
    >
      {({ close }) => <DeleteButton onClickMenu={onClickMenu} close={close} />}
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
    <div
      className={clsx(
        "flex items-center gap-3 px-4 py-3",
        "hover:bg-secondary-text hover:bg-opacity-10 cursor-pointer",
        confirm ? "text-primary" : "text-red-500"
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
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
    </div>
  );
};
