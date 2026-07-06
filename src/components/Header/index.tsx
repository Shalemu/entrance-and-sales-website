"use client";

import { useEffect, useState } from "react";

import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/redux/features/cart-slice";

import { useCartModalContext } from "@/app/context/CartSidebarModalContext";

import BookingDate from "./BookingDate";
import SupportCard from "./SupportCard";
import BookingTracker from "./BookingTracker";
import CartButton from "./CartButton";
import Navigation from "./Navigation";
import SocialLinks from "./SocialLinks";
import MobileMenu from "./MobileMenu";

import { Menu } from "lucide-react";
import Logo from "./Logo";

export default function Header() {
  const [stickyMenu, setStickyMenu] = useState(false);

  const [navigationOpen, setNavigationOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const { openCartModal } = useCartModalContext();

  const products = useAppSelector(
    (state) => state.cartReducer.items
  );

  const totalPrice = useSelector(selectTotalPrice);

  useEffect(() => {
    const handleScroll = () => {
      setStickyMenu(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white transition-all duration-300 ${
          stickyMenu ? "shadow-lg" : ""
        }`}
      >
        {/* Top */}
        <div className="mx-auto max-w-7xl px-5">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              stickyMenu ? "py-3" : "py-5"
            }`}
          >
            {/* Left */}
            <div className="flex items-center gap-8">

              <Logo />

              <BookingDate
                value={selectedDate}
                onChange={setSelectedDate}
              />

            </div>

            {/* Right */}
            <div className="hidden xl:flex items-center gap-5">

              <SupportCard />

              <BookingTracker />

              <CartButton
                itemCount={products.length}
                totalPrice={totalPrice}
                onClick={openCartModal}
              />

            </div>

            {/* Mobile */}
            <button
              className="xl:hidden rounded-xl border p-2"
              onClick={() =>
                setNavigationOpen(true)
              }
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}

        <div className="border-t border-gray-100 bg-white">

          <div className="mx-auto flex max-w-7xl items-center justify-between px-5">

            <Navigation
              stickyMenu={stickyMenu}
              navigationOpen={false}
            />

            <SocialLinks />

          </div>

        </div>
      </header>

      <MobileMenu
        open={navigationOpen}
        onClose={() =>
          setNavigationOpen(false)
        }
        stickyMenu={stickyMenu}
      />
    </>
  );
}