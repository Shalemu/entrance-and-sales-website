type Props = {
  data: any;
};


export default function PaymentPending({
  data
}: Props) {


  return (

    <div
      className="
        max-w-xl
        mx-auto
        mt-10
        bg-white
        rounded-xl
        shadow
        p-8
        text-center
      "
    >

      <h1
        className="
          text-2xl
          font-semibold
          text-yellow-600
        "
      >
        Payment Pending
      </h1>


      <p
        className="
          mt-4
          text-gray-600
        "
      >
        Your payment is being processed.
        Please wait while we confirm your transaction.
      </p>


      <div
        className="
          mt-6
          space-y-3
          text-sm
          text-gray-700
        "
      >

        <p>
          Booking Reference:
          {" "}
          <span className="font-medium">
            {data?.merchant_reference}
          </span>
        </p>


        <p>
          Transaction ID:
          {" "}
          <span className="font-medium">
            {data?.order_tracking_id}
          </span>
        </p>


        <p>
          Status:
          {" "}
          <span className="font-medium">
            {data?.payment_status_description ?? "Pending"}
          </span>
        </p>


      </div>


      <p
        className="
          mt-6
          text-sm
          text-gray-500
        "
      >
        You can refresh this page after a few seconds to check again.
      </p>


    </div>

  );

}