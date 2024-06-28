import { SignedIn, UserButton } from "@clerk/nextjs";
import Logo from "./Logo";
import { SidebarDrawer } from "./SidebarDrawer";

const Navbar = () => {
  return (
    <nav className="max-sm:fixed z-50 bg-foreground h-[72px] w-full px-4 flex-between">
      <SidebarDrawer />
      <Logo />
      <UserButton />
    </nav>
  );
};

export default Navbar;
