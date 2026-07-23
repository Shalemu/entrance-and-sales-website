"use client";

import { Check } from "lucide-react";

type Props = {
  currentStep: number;
  onNavigate?: (step: number) => void;
};

const steps = [
  { id: 1, title: "Booking Date" },
  { id: 2, title: "Contact Details" },
  { id: 3, title: "Services & Package" },
  { id: 4, title: "Payment" },
];

// the booking flow's own step state uses 1, 2 for Contact Details /
// Services, then 3 (choosing full vs. advance payment, only reached
// for services with a partial payment rule) and 4 (checkout) both
// belong to the "Payment" display stage — the booking date itself is
// always chosen before this flow starts, so it's shown as already
// passed the moment the flow is active
const displayStepFor = (currentStep: number) => {
  if (currentStep === 2) return 3;
  if (currentStep >= 3) return 4;
  return 2;
};

// only "Contact Details" and "Services & Package" map back to a raw
// flow step a user can actually revisit — "Booking Date" is chosen
// before this flow starts, and "Payment" is only reached once the
// booking is already submitted, so neither is a valid back-target
const rawStepFor: Record<number, number | null> = {
  1: null,
  2: 1,
  3: 2,
  4: null,
};

const CHEVRON = 18;

export default function Stepper({
  currentStep,
  onNavigate,
}: Props) {

  const displayStep = displayStepFor(currentStep);

  return (

    <div className="mb-8 flex overflow-hidden rounded-xl shadow-sm">

      {
        steps.map((step, index) => {

          const active = step.id === displayStep;
          const completed = step.id < displayStep;
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;

          const rawTarget = rawStepFor[step.id];
          // a step is only a valid back-target once the user has moved
          // past it, and never once the booking has already been submitted
          const clickable =
            !!onNavigate &&
            rawTarget !== null &&
            rawTarget < currentStep &&
            currentStep < 4;

          const clipPath = isFirst
            ? `polygon(0 0, calc(100% - ${CHEVRON}px) 0, 100% 50%, calc(100% - ${CHEVRON}px) 100%, 0 100%)`
            : isLast
            ? `polygon(0 0, 100% 0, 100% 100%, 0 100%, ${CHEVRON}px 50%)`
            : `polygon(0 0, calc(100% - ${CHEVRON}px) 0, 100% 50%, calc(100% - ${CHEVRON}px) 100%, 0 100%, ${CHEVRON}px 50%)`;

          return (
            <button
              key={step.id}
              type="button"
              disabled={!clickable}
              onClick={() => {
                if (clickable && rawTarget !== null) {
                  onNavigate!(rawTarget);
                }
              }}
              style={{
                clipPath,
                marginLeft: isFirst ? 0 : -CHEVRON,
                zIndex: steps.length - index,
              }}
              className={`
                flex flex-1 items-center justify-center
                py-3 text-center text-sm font-semibold
                transition-colors duration-300
                ${isFirst ? "pl-4 pr-6" : "pl-7 pr-6"}
                ${clickable ? "cursor-pointer hover:brightness-95" : "cursor-default"}
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : completed
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-500"
                }
              `}
            >
              {completed && <Check size={16} className="mr-1.5 shrink-0" />}
              {step.title}
            </button>
          );

        })
      }

    </div>

  );

}
