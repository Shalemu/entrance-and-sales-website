"use client";

import { useState } from "react";

type Props = {
  value: number;
  min: number;
  max: number;

  priceMode:
    | "fixed"
    | "per_person"
    | "per_adult_child";

  adults?: number;
  children?: number;

  onChange: (value: number) => void;

  onAdultChange?: (value: number) => void;
  onChildrenChange?: (value: number) => void;

  error?: string | null;
};


export default function BookingParticipants({
  value,
  min,
  max,
  priceMode,
  adults = 1,
  children = 0,
  onChange,
  onAdultChange,
  onChildrenChange,
}: Props) {


  const [validationError,setValidationError] =
    useState<string | null>(null);



  const checkParticipants = (
    total:number
  ) => {


    if(total > max){

      setValidationError(
        `Maximum allowed participants is ${max}`
      );

      return;

    }


    if(total < min){

      setValidationError(
        `Minimum required participants is ${min}`
      );

      return;

    }


    setValidationError(null);

  };





  const handlePersonChange = (
    number:number
  ) => {

    onChange(number);

    checkParticipants(number);

  };





  const handleAdultChange = (
    number:number
  ) => {

    onAdultChange?.(number);


    const total =
      number + children;


    onChange(total);


    checkParticipants(total);

  };





  const handleChildrenChange = (
    number:number
  ) => {

    onChildrenChange?.(number);


    const total =
      adults + number;


    onChange(total);


    checkParticipants(total);

  };



  return (

    <div>


      <label className="
      mb-2
      block
      text-sm
      font-semibold
      text-gray-700
      ">
        Participants
      </label>




      {priceMode === "fixed" && (

        <div
        className="
        rounded-xl
        border
        bg-gray-50
        p-4
        "
        >

          <div className="
          flex
          justify-between
          items-center
          ">

            <span className="text-sm text-gray-600">
              Maximum Guests
            </span>


            <span className="
            rounded-lg
            bg-white
            px-4
            py-2
            font-bold
            text-blue-600
            ">
              {max}
            </span>

          </div>

        </div>

      )}






      {priceMode === "per_person" && (

        <div
        className="
        rounded-xl
        border
        bg-gray-50
        p-4
        flex
        justify-between
        items-center
        "
        >

          <div>

            <p className="text-sm text-gray-600">
              Guests
            </p>

            <p className="text-xs text-gray-400">
              Allowed {min} - {max}
            </p>

          </div>



          <input
          type="number"
          min={0}
          value={value}
          onChange={(e)=>
            handlePersonChange(
              Number(e.target.value)
            )
          }

          className="
          w-24
          rounded-xl
          border
          bg-white
          px-3
          py-2
          text-center
          font-semibold
          "
          />

        </div>

      )}






      {priceMode === "per_adult_child" && (

        <div
        className="
        rounded-xl
        border
        bg-gray-50
        p-4
        "
        >


          <div
          className="
          grid
          grid-cols-2
          gap-3
          "
          >


            <div>

              <label className="text-xs font-semibold text-gray-600">
                Adults
              </label>


              <input
              type="number"
              min={0}
              value={adults}

              onChange={(e)=>
                handleAdultChange(
                  Number(e.target.value)
                )
              }

              className="
              mt-1
              h-10
              w-full
              rounded-xl
              border
              bg-white
              px-3
              text-center
              "
              />

            </div>




            <div>

              <label className="text-xs font-semibold text-gray-600">
                Children
              </label>


              <input
              type="number"
              min={0}
              value={children}

              onChange={(e)=>
                handleChildrenChange(
                  Number(e.target.value)
                )
              }

              className="
              mt-1
              h-10
              w-full
              rounded-xl
              border
              bg-white
              px-3
              text-center
              "
              />

            </div>


          </div>



          <p className="mt-2 text-xs text-gray-400">
            Total: {adults + children} / {max}
          </p>


        </div>

      )}






      {validationError && (

        <div
        className="
        mt-2
        rounded-lg
        bg-red-50
        px-3
        py-2
        text-xs
        text-red-600
        "
        >
          {validationError}
        </div>

      )}


    </div>

  );
}