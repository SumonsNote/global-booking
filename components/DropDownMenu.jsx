"use client";
import {
  Button,
  Dropdown,
  DropdownAction,
  DropdownArrow,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownSub,
  DropdownSubAction,
  DropdownSubContent,
} from "keep-react";
import Link from "next/link";
import { Gear, Globe, SignOut, Users } from "phosphor-react";
import Logout from "./auth/Logout";
import { MenuBar } from "./MenuBar";

const DropDownMenu = ({ image }) => {
  return (
    <Dropdown>
      <DropdownAction asChild>
        <Button>
          <MenuBar image={image} />
        </Button>
      </DropdownAction>
      <DropdownContent>
        <DropdownArrow />
        <DropdownGroup>
          <DropdownItem>
            <Users size={20} />
            <Link href="/bookings">Profile</Link>
          </DropdownItem>
          <DropdownSub>
            <DropdownSubAction>
              <p className="flex items-center gap-2 text-body-4 font-medium ">
                <Globe size={20} />
                Language
              </p>
            </DropdownSubAction>
            <DropdownSubContent>
              <DropdownItem>Bangla</DropdownItem>
              <DropdownItem>English</DropdownItem>
              <DropdownItem>Spanish</DropdownItem>
              <DropdownItem>French</DropdownItem>
            </DropdownSubContent>
          </DropdownSub>
          <DropdownItem>
            <Gear size={20} />
            Settings
          </DropdownItem>
          <DropdownItem>
            <SignOut size={20} />
            <Logout />
          </DropdownItem>
        </DropdownGroup>
      </DropdownContent>
    </Dropdown>
  );
};

export default DropDownMenu;
