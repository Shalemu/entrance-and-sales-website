type Props = {
  data:any;
};


export default function PaymentFailed({
  data
}:Props){


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
        text-red-600
        "
      >
        Payment Failed
      </h1>


      <p className="mt-4 text-gray-600">
        Your payment was not completed.
      </p>


      {data?.message && (

        <p className="mt-3">
          {data.message}
        </p>

      )}


      <p className="mt-5 text-sm text-gray-500">

        Reference:
        {" "}
        {data.merchant_reference}

      </p>


    </div>

  );

}