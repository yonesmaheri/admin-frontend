"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { CiSettings } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { menuItems } from "./menu";

type SidebarLayoutProps = {
  children: ReactNode;
};

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [time, setTime] = useState<string>("");
  const path = usePathname();
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between border-b-2 border-dashed border-[lightgray] bg-white px-6 py-3">
        <span className="text-lg font-semibold">
          Yones Maheri - Admin Panel
        </span>
        <span className="text-gray-500">{time}</span>
      </header>

      <div className="flex flex-1">
        <aside className="w-[200px] flex flex-col justify-between border-r-2 border-dashed border-[lightgray] bg-gray-50 p-4">
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Button
                as={Link}
                key={item.href}
                href={item.href}
                color={`${item.href === path ? "primary" : "default"}`}
                variant={`${item.href === path ? "solid" : "bordered"}`}
                className="justify-start font-light"
              >
                {item.name}
              </Button>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <Button
              variant="bordered"
              className="justify-start font-light gap-2"
            >
              <CiSettings className="h-4 w-4" /> Settings
            </Button>
            <Button
              variant="ghost"
              color="danger"
              className="justify-start gap-2 font-light text-red-600"
            >
              <BiLogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-4">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
