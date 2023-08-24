import clsx from "clsx";
import Dropdown from "components/Dropdown";
import IconButton from "components/IconButton";
import { HiOutlineDotsHorizontal, HiOutlineTrash } from "react-icons/hi";

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
      {({ close }) => (
        <div
          className={clsx(
            "flex items-center gap-3 px-4 py-3 text-red-500",
            "hover:bg-secondary-text hover:bg-opacity-10 cursor-pointer"
          )}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClickMenu("DELETE");
            close();
          }}
        >
          <HiOutlineTrash size={20} />
          <div>Delete</div>
        </div>
      )}
    </Dropdown>
  );
}
