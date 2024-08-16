import { useCurrentUserSession } from "@/hooks/curent-user";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { LogoutButton } from "./logout-button";
import { BiExit } from "react-icons/bi";

export const UserButton = () => {
  const user = useCurrentUserSession();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          src={user?.image || ""}
          color="primary"
          className="cursor-pointer"
        >
          <FaUser />
        </Avatar>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>
          <LogoutButton>
            <BiExit color="red" size={22} className="mr-1"/>
            Logout
          </LogoutButton>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
