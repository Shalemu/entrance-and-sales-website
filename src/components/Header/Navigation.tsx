"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Dropdown from "./Dropdown";
import { menuData } from "./menuData";

type Props = {
  stickyMenu: boolean;
  navigationOpen: boolean;
};

export default function Navigation({
  stickyMenu,
  navigationOpen,
}: Props) {
  const rawPathname = usePathname();

  // next.config has trailingSlash: true, so usePathname() returns
  // "/about/" while menuData paths are written as "/about" — normalize
  // before comparing so active-state matching actually works.
  const pathname =
    rawPathname && rawPathname !== "/"
      ? rawPathname.replace(/\/+$/, "")
      : rawPathname;

  return (
    <div
      className={`
        xl:static
        absolute
        top-full
        right-4
        xl:w-auto
        w-[320px]
        xl:bg-transparent
        bg-white
        xl:shadow-none
        shadow-2xl
        xl:border-0
        border
        border-gray-200
        rounded-2xl
        xl:rounded-none
        transition-all
        duration-300
        ${
          navigationOpen
            ? "visible opacity-100"
            : "invisible opacity-0 xl:visible xl:opacity-100"
        }
      `}
    >
      <nav>
        <ul className="flex flex-col xl:flex-row xl:items-center gap-2 xl:gap-1 p-5 xl:p-0">

          {menuData.map((menuItem, index) =>

            menuItem.submenu ? (

              <Dropdown
                key={index}
                menuItem={menuItem}
                stickyMenu={stickyMenu}
              />

            ) : (

              <li key={index}>
                <Link
                    href={menuItem.path}
                    className={`
                        group
                        relative
                        flex
                        items-center
                        px-4
                        ${
                        stickyMenu ? "py-4" : "py-6"
                        }
                        text-sm
                        font-medium
                        transition-colors
                        duration-200
                        ${
                        pathname === menuItem.path
                            ? "text-blue-600"
                            : "text-gray-700 hover:text-blue-600"
                        }
                    `}
                    >
                    {menuItem.title}

                    <span
                        className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-blue-600 transition-all duration-300 ${
                        pathname === menuItem.path
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                    />
                    </Link>
              </li>

            )
          )}

        </ul>
      </nav>
    </div>
  );
}