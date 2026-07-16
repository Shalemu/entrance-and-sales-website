"use client";

import React from "react";


type Props = {

 redirectUrl:string | null;

};


const Pesapal = ({
 redirectUrl
}:Props)=>{


 if(!redirectUrl){

   return null;

 }


 return (

 <div className="
 bg-white
 rounded-lg
 shadow
 mt-8
 ">


 <div className="
 border-b
 p-5
 ">

 <h2 className="
 text-xl
 font-semibold
 ">
 Complete Your Payment
 </h2>


 <p className="
 text-gray-500
 text-sm
 mt-1
 ">
 Secure checkout powered by Pesapal.
 </p>


 </div>


 <iframe

 src={redirectUrl}

 title="Pesapal Checkout"

 className="
 w-full
 h-[900px]
 border-0
 "

 allow="payment"

 />


 </div>

 );

};


export default Pesapal;