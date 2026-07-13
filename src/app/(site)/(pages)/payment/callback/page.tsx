"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";


export default function PaymentCallback(){

const params = useSearchParams();


useEffect(()=>{

const trackingId =
params.get("OrderTrackingId");


if(trackingId){

    // call Laravel status API

    console.log(trackingId);

}

},[]);


return (

<div className="p-10 text-center">

<h1>
Checking payment status...
</h1>

</div>

);

}