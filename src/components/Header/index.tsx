"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { useBookingCart } from "@/context/BookingCartContext";

import DatePickerButton from "../Common/DatePickerButton";
import SupportCard from "./SupportCard";
import BookingTracker from "./BookingTracker";
import CartButton from "./CartButton";
import Navigation from "./Navigation";
import SocialLinks from "./SocialLinks";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";


export default function Header() {

  const router = useRouter();
  const [stickyMenu, setStickyMenu] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);

  const { openCartModal } =
    useCartModalContext();

  const {
    items,
    totalPrice,
    bookingDate,
    setBookingDate,
  } = useBookingCart();

  const itemCount =
    items.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  useEffect(() => {

    const handleScroll = () => {
      setStickyMenu(window.scrollY > 80);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );
    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  return (

    <>
      <header
        className={`
          fixed
          left-0
          top-0
          z-50
          w-full
          border-b
          border-gray-200
          bg-white
          transition-all
          duration-300
          ${
            stickyMenu
              ? "shadow-lg"
              : ""
          }
        `}
      >
        {/* Top Header */}

        <div
          className="
            mx-auto
            max-w-7xl
            px-5
          "
        >
          <div
            className={`
              flex
              items-center
              justify-between
              transition-all
              duration-300
              ${
                stickyMenu
                  ? "py-3"
                  : "py-5"
              }
            `}
          >
           {/* LEFT */}

<div
  className="
    flex
    items-center
    gap-2
    lg:gap-3
  "
>
  <Logo />

  <div className="flex items-center gap-0">
    <DatePickerButton
      value={bookingDate}
      onChange={setBookingDate}
    />

    {/* BUY TICKET */}
    <button
      type="button"
      onClick={() =>
        router.push("/booking")
      }
      className="
        hidden
        sm:flex
        h-10
        items-center

        bg-blue-600
        px-4
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-blue-700
        whitespace-nowrap
      "
    >
      Buy Ticket
    </button>
  </div>

</div>

            {/* RIGHT */}

            <div
              className="
                hidden
                lg:flex
                items-center
                gap-5
              "
            >
              <SupportCard />
              <BookingTracker />
              <CartButton
                itemCount={itemCount}
                totalPrice={totalPrice}
                onClick={openCartModal}
              />
            </div>
            {/* MOBILE MENU BUTTON */}
            <button
              className="
                lg:hidden
                rounded-xl
                border
                p-2
              "
              onClick={() =>
                setNavigationOpen(true)
              }
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
        {/* Navigation */}

        <div
          className="
            border-t
            border-gray-100
            bg-white
          "
        >
          <div
            className="
              mx-auto
              flex
              max-w-7xl
              items-center
              justify-between
              px-5
            "
          >
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