import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import type { PaymentRule } from "../Booking/ServicePackage/types/types";

type Props = {
  paymentRule?: PaymentRule | null;
  totalAmount: number;
  value: "full" | "advance";
  onChange: (value: "full" | "advance") => void;
  loading?: boolean;
  serviceName?: string;
};

const PaymentMethod = ({
  paymentRule,
  totalAmount,
  value,
  onChange,
  loading,
  serviceName,
}: Props) => {
  const isPartialAllowed = paymentRule?.payment_type === "partial";

  const advanceAmount = paymentRule?.minimum_percentage
    ? (totalAmount * Number(paymentRule.minimum_percentage)) / 100
    : Number(paymentRule?.minimum_amount ?? 0);

  const advanceLabel = paymentRule?.minimum_percentage
    ? `Reserve now with just ${paymentRule.minimum_percentage}% down.`
    : "Pay the required advance amount to confirm your booking.";

  const Option = ({
    id,
    icon,
    title,
    description,
    amount,
  }: {
    id: "full" | "advance";
    icon: string;
    title: string;
    description: string;
    amount: number;
  }) => {
    const active = value === id;

    return (
      <label
        htmlFor={id}
        className={`group relative flex cursor-pointer select-none items-center gap-4 rounded-xl border p-5 transition-all duration-200 ${
          active
            ? "border-blue bg-gradient-to-br from-blue/5 to-transparent shadow-md ring-1 ring-blue/30"
            : "border-gray-3 hover:border-blue/40 hover:bg-gray-1/40"
        }`}
      >
        <input
          type="radio"
          name="payment"
          id={id}
          className="sr-only"
          checked={active}
          onChange={() => onChange(id)}
        />

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
            active ? "bg-blue/10" : "bg-gray-1"
          }`}
        >
          <Image src={icon} alt={title} width={22} height={22} />
        </div>

        <div className="flex-1">
          <h4
            className={`font-medium transition-colors duration-200 ${
              active ? "text-blue" : "text-dark"
            }`}
          >
            {title}
          </h4>
          <p className="text-sm text-dark-5 mt-0.5">{description}</p>
          <p className="text-sm font-semibold text-dark mt-1.5">
            TZS {amount.toLocaleString()}
          </p>
        </div>

        <div
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
            active
              ? "border-blue bg-blue scale-100"
              : "border-gray-4 bg-transparent scale-90"
          }`}
        >
          {active && <Check size={12} strokeWidth={3} className="text-white" />}
        </div>
      </label>
    );
  };

  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Payment Option</h3>
        <p className="text-sm text-dark-5 mt-1">
          Choose how you would like to complete your payment.
        </p>
      </div>

      <div className="p-4 sm:p-8.5">
        {isPartialAllowed && (
          <div className="mb-5 flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-blue/10 via-blue/5 to-transparent px-4 py-3 text-sm text-blue">
            <Sparkles size={16} className="shrink-0" />
            <p>
              <span className="font-medium">
                {serviceName ?? "This service"}
              </span>{" "}
              allows advance payment — {advanceLabel.toLowerCase()}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {isPartialAllowed && (
            <Option
              id="advance"
              icon="/images/checkout/cash.svg"
              title="Pay Advance"
              description={advanceLabel}
              amount={advanceAmount}
            />
          )}

          <Option
            id="full"
            icon="/images/checkout/bank.svg"
            title="Pay Full Amount"
            description="Complete the full payment now and confirm instantly."
            amount={totalAmount}
          />
        </div>

        {loading && (
          <p className="mt-6 text-center text-sm text-dark-5">
            Updating your checkout for this payment option...
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
