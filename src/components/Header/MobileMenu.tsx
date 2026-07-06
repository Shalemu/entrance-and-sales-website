"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronRight } from "lucide-react";
import Dropdown from "./Dropdown";
import { menuData } from "./menuData";

type Props = {
  open: boolean;
  onClose: () => void;
  stickyMenu: boolean;
};

export default function MobileMenu({
  open,
  onClose,
  stickyMenu,
}: Props) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm xl:hidden"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 z-50 h-full w-[320px] bg-white shadow-2xl xl:hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Menu
            </h3>

            <p className="text-sm text-gray-500">
              Explore Faramas
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border p-2 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-5">
          <ul className="space-y-2">
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
                    onClick={onClose}
                    className={`group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300 ${
                      pathname === menuItem.path
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <span className="font-medium">
                      {menuItem.title}
                    </span>

                    <ChevronRight
                      size={18}
                      className={`transition-transform duration-300 ${
                        pathname === menuItem.path
                          ? "text-white"
                          : "text-gray-400 group-hover:translate-x-1 group-hover:text-blue-600"
                      }`}
                    />
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full border-t bg-gray-50 px-6 py-5">
          <div className="rounded-xl bg-blue-600 p-4 text-white">
            <p className="text-sm font-semibold">
              Need assistance?
            </p>

            <p className="mt-1 text-xs text-blue-100">
              Our support team is available 24/7.
            </p>

            <a
              href="tel:+255767983236"
              className="mt-3 inline-block font-semibold"
            >
              +255 767 983 236
            </a>
          </div>
        </div>
      </div>
    </>
  );
}