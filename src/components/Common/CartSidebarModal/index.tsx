"use client";

import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { useBookingCart } from "@/context/BookingCartContext";
import SingleItem from "./SingleItem";
import EmptyCart from "./EmptyCart";


const CartSidebarModal = () => {
  const {
    isCartModalOpen,
    closeCartModal
  } = useCartModalContext();
  const {
    items: cartItems,
    totalPrice,
    removeItem,
    clearCart,
  } = useBookingCart();

  const validItems =
    cartItems?.filter(Boolean) ?? [];

  useEffect(() => {

    const handleClickOutside = (
      event: MouseEvent
    ) => {

      const target =
        event.target as HTMLElement;


      if(
        !target.closest(".modal-content")
      ){

        closeCartModal();

      }

    };


    if(isCartModalOpen){

      document.addEventListener(
        "mousedown",
        handleClickOutside
      );

    }


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };


  },[
    isCartModalOpen,
    closeCartModal
  ]);



  return (

    <div

      className={`
        fixed
        top-0
        left-0
        z-[99999]
        h-screen
        w-full
        overflow-y-auto
        bg-dark/70
        transition-all
        duration-300

        ${
          isCartModalOpen
          ? "translate-x-0"
          : "translate-x-full"
        }
      `}

    >


      <div
        className="
          flex
          justify-end
        "
      >


        <div

          className="
            modal-content
            relative
            h-screen
            w-full
            max-w-[500px]
            bg-white
            px-5
            shadow-lg
          "

        >


          {/* HEADER */}

          <div
            className="
              sticky
              top-0
              z-10
              flex
              items-center
              justify-between
              border-b
              bg-white
              py-6
            "
          >

            <h2
              className="
                text-xl
                font-semibold
              "
            >
              Booking Summary
            </h2>


            <button

              onClick={
                closeCartModal
              }

              className="
                rounded
                p-2
                hover:bg-gray-100
              "

            >

              ✕


            </button>


          </div>




          {/* CONTENT */}

          <div
            className="
              h-[65vh]
              overflow-y-auto
              py-6
            "
          >


            {
              validItems.length > 0 ?

              (

                <div
                  className="
                    flex
                    flex-col
                    gap-6
                  "
                >


                  {
                    validItems.map(
                      (
                        item,
                        index
                      ) => (

                      <SingleItem
                      key={
                        item.service?.id
                          ? `service-${item.service.id}`
                          : item.package?.id
                          ? `package-${item.package.id}`
                          : `item-${index}`
                      }
                      item={item}
                      removeItemFromCart={removeItem}
                    />

                    ))
                  }


                </div>


              )

              :

              (

                <EmptyCart />

              )

            }


          </div>






          {/* FOOTER */}

          {
            validItems.length > 0 &&

            <div

              className="
                sticky
                bottom-0
                border-t
                bg-white
                py-5
              "

            >


              <div
                className="
                  mb-5
                  flex
                  justify-between
                "
              >

                <span
                  className="
                    text-lg
                    font-semibold
                  "
                >
                  Subtotal:
                </span>


                <span
                  className="
                    text-lg
                    font-semibold
                  "
                >

                  TZS{" "}
                  {
                    totalPrice
                    .toLocaleString()
                  }

                </span>


              </div>




              <button

                type="button"

                onClick={
                  clearCart
                }

                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-red-600
                  to-red-500
                  py-3
                  text-center
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:shadow-md
                "

              >

                <Trash2 size={17} />

                Clear Cart

              </button>


            </div>

          }



        </div>


      </div>


    </div>

  );

};

export default CartSidebarModal;