import { SidebarItems } from "./SidebarItems";

export const Sidebar = () => {
  return (
    <aside className="sticky top-0 left-0 h-screen flex flex-col w-fit bg-foreground px-4 py-6 text-white max-sm:hidden lg:w-[224px]">
      <SidebarItems />
    </aside>
  );
};
