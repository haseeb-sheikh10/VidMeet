"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarItems = () => {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col gap-y-6">
      {navItems.map((item: NavItem) => {
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.label}
            href={item.path}
            className={cn("rounded-md p-3 transition", {
              "bg-primary": isActive,
            })}
          >
            <li className="flex items-center gap-x-4">
              <Image
                width={18}
                height={18}
                src={item.icon}
                alt={item.label}
                className="w-5 h-5"
              />
              <span className="text-white text-sm">{item.label}</span>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};
