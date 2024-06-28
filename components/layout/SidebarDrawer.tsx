import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import { SidebarItems } from "./SidebarItems";

export const SidebarDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild className="sm:hidden">
        <Button variant="outline" size="icon">
          <Menu size={24} className="text-white" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-2">
        <DrawerHeader>
          <SidebarItems />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
