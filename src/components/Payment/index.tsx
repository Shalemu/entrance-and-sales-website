"use client";

import { useSearchParams } from "next/navigation";
import PaymentStatus from "./PaymentStatus";
import { usePaymentStatus } from "./hook/usePaymentStatus";

export default function Payment() {

    const params = useSearchParams();


    const trackingId =
        params.get(
            "OrderTrackingId"
        );


    const {
        data,
        loading,
        error
    } = usePaymentStatus(
        trackingId
    );



    if (loading) {

        return (
            <div className="p-10 text-center">
                Checking payment status...
            </div>
        );

    }



    if(error){

        return (
            <div className="
                p-1
                text-center
                text-red-600
            ">
                {error}
            </div>
        );

    }



    return (

        <PaymentStatus
            data={data}
        />

    );

}