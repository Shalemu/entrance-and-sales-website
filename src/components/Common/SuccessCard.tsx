"use client";

type SuccessCardProps = {
  message?: string;
};

export default function SuccessCard({
  message = "Please wait while we prepare the next step.",
}: SuccessCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-12 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="h-14 w-14 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />

        <h2 className="mt-6 text-xl font-semibold text-gray-900">
          Please wait...
        </h2>

        <p className="mt-2 text-gray-500">
          {message}
        </p>
      </div>
    </div>
  );
}