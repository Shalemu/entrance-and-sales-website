"use client";

import {
  CheckCircle2,
  CreditCard,
  CalendarDays,
  ReceiptText,
  Hash,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import PaymentInfo from "./PaymentInfo";


export default function PaymentSummaryCard({ data }: any) {

  return (

    <div
      className="
        w-full
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-lg
        overflow-hidden
      "
    >


      {/* HEADER */}

      <div
        className="
          px-2
          py-2
          flex
          flex-col
          lg:flex-row
          lg:justify-between
          lg:items-center
          gap-6
          border-b
          border-slate-100
        "
      >


        <div
          className="
            flex
            items-center
            gap-5
          "
        >

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-emerald-50
              flex
              items-center
              justify-center
              shrink-0
            "
          >

            <CheckCircle2
              size={34}
              className="text-emerald-500"
            />

          </div>



          <div>

            <p
              className="
                text-xs
                uppercase
                tracking-wider
                text-emerald-600
                font-semibold
              "
            >
              Payment Completed
            </p>


            <h1
              className="
                text-2xl
                font-bold
                text-slate-900
                mt-1
              "
            >
              Payment Successful
            </h1>


            <p
              className="
                text-sm
                text-slate-500
                mt-1
              "
            >
              Your booking has been confirmed successfully.
            </p>


          </div>


        </div>




        <div
  className="
    bg-slate-50
    border
    border-slate-200
    rounded-xl
    px-4
    py-3
    min-w-[180px]
  "
>

  <p
    className="
      text-[10px]
      uppercase
      tracking-wide
      text-slate-400
    "
  >
    Booking Reference
  </p>


  <p
    className="
      text-sm
      font-semibold
      text-slate-900
      mt-1
    "
  >
    {data.merchant_reference}
  </p>


</div>


      </div>





      {/* INFORMATION */}


      <div
        className="
          px-8
          py-8
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
        "
      >

        <PaymentInfo
        icon={<ReceiptText size={16}/>}
        label="Payment Status"
        value={data.payment_status_description}
        />


        <PaymentInfo
        icon={<CreditCard size={16}/>}
        label="Payment Method"
        value={data.payment_method}
        />


       <PaymentInfo
        icon={<Hash size={16}/>}
        label="Confirmation Code"
        value={data.confirmation_code}
        />


    <PaymentInfo
    icon={<CalendarDays size={16}/>}
    label="Payment Date"
    value={
        new Date(data.created_date)
        .toLocaleDateString()
    }
    />



      </div>





      {/* TOTAL */}


      <div
        className="
          mx-8
          mb-8
          rounded-2xl
          bg-slate-900
          px-6
          py-6
          flex
          flex-col
          md:flex-row
          md:justify-between
          md:items-center
          gap-5
        "
      >


        <div>

  <div
    className="
      flex
      items-center
      gap-1.5
      text-slate-300
      text-xs
    "
  >

    <ShieldCheck size={15}/>

    Secure Payment

  </div>


          <div
            className="
              mt-2
              text-xl
              font-bold
              text-white
            "
          >

            {data.amount}

            <span
              className="
                text-sm
                ml-2
                text-slate-400
              "
            >
              {data.currency}
            </span>

          </div>


        </div>





        <button
          className="
            bg-white
            text-slate-900
            px-6
            py-3
            rounded-xl
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            hover:bg-slate-100
            transition
          "
        >

          View Booking

         

        </button>


      </div>


    </div>

  );
}