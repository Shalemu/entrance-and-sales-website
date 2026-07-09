"use client";

type Props = {
  value: string | null;
};

export default function ReferenceNumber({
  value,
}: Props) {

  return (
    <div className="rounded-xl border bg-white p-6">

      <h2 className="text-lg font-semibold text-gray-900">
        Reference Number
      </h2>


      <p className="mt-1 text-sm text-gray-500">
        Use this reference number to complete your payment
      </p>


      <div className="mt-6 rounded-lg bg-gray-100 p-4 text-center">

        <span className="text-2xl font-bold tracking-wider text-blue-600">
          {value ?? "Generating..."}
        </span>

      </div>


    </div>
  );
}