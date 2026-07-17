"use client";

import PaymentFailed from "./PaymentFailed";
import PaymentPending from "./PaymentPending";
import PaymentSuccess from "./PaymentSuccess";


type Props = {
  data: any;
};


export default function PaymentStatus({
  data
}: Props) {


  if (!data) {
    return null;
  }


  switch (data.status_code) {


    // Successful payment
    case 1:

      return (
        <PaymentSuccess
          data={data}
        />
      );


    // Failed / cancelled payment
    case 2:
    case 3:
    case 0:

      return (
        <PaymentFailed
          data={data}
        />
      );


    // Processing / unknown status
    default:

      return (
        <PaymentPending
          data={data}
        />
      );

  }

}