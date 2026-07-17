"use client";

import PaymentSummaryCard from "./PaymentSummaryCard";


type Props = {
  data:any;
};


export default function PaymentSuccess({
  data,
}:Props){

  return (

    <main
      className="
        min-h-screen
        bg-slate-100
        pt-44
        pb-20
        px-4
        md:px-8
      "
    >

      <div
        className="
          w-full
          max-w-[1700px]
          mx-auto
        "
      >

        <PaymentSummaryCard data={data}/>

      </div>


    </main>

  );

}