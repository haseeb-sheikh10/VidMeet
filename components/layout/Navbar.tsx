import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Logo from "./Logo";
import { SidebarDrawer } from "./SidebarDrawer";

const Navbar = () => {
  return (
    <nav className="bg-foreground h-[72px] w-full px-4 flex justify-between items-center">
      <SidebarDrawer />
      <Logo />
      <Avatar>
        <AvatarImage />
        <AvatarFallback className="bg-primary text-white">HS</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default Navbar;
