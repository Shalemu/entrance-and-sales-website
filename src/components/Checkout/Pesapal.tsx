"use client";

type Props = {
  redirectUrl: string | null;
};

const Pesapal = ({ redirectUrl }: Props) => {
  if (!redirectUrl) {
    return (
      <div className="bg-white rounded-lg shadow mt-8 p-8 text-center">
        <h2 className="text-xl font-semibold">
          Waiting for payment...
        </h2>

        <p className="text-gray-500 mt-2">
          Preparing the secure Pesapal checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow mt-8 overflow-hidden">
      <div className="border-b p-5">
        <h2 className="text-xl font-semibold">
          Complete Your Payment
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Secure checkout powered by Pesapal.
        </p>
      </div>

      <iframe
        key={redirectUrl}
        src={redirectUrl}
        title="Pesapal Checkout"
        className="w-full h-[900px] border-0"
        allow="payment"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default Pesapal;