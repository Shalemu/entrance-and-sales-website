"use client";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function Participants({
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">
        Participants
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Select number of participants for this booking
      </p>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          className="h-10 w-10 rounded-lg border text-lg font-bold"
        >
          -
        </button>

        <div className="w-16 text-center text-lg font-semibold">
          {value}
        </div>

        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="h-10 w-10 rounded-lg border text-lg font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
}