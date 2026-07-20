"use client";

import { Check } from "lucide-react";

type Props = {
  currentStep: number;
};

const steps = [
  { id: 1, title: "Booking Date" },
  { id: 2, title: "Contact Details" },
  { id: 3, title: "Services & Package" },
  { id: 4, title: "Payment" },
];

// the booking flow's own step state uses 1, 2, 4 for
// Contact Details / Services / Payment (3 is unused) — the booking
// date itself is always chosen before this flow starts, so it's
// shown as already passed the moment the flow is active
const displayStepFor = (currentStep: number) => {
  if (currentStep >= 4) return 4;
  if (currentStep === 2) return 3;
  return 2;
};

const CHEVRON = 18;

export default function Stepper({
  currentStep,
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

          const clipPath = isFirst
            ? `polygon(0 0, calc(100% - ${CHEVRON}px) 0, 100% 50%, calc(100% - ${CHEVRON}px) 100%, 0 100%)`
            : isLast
            ? `polygon(0 0, 100% 0, 100% 100%, 0 100%, ${CHEVRON}px 50%)`
            : `polygon(0 0, calc(100% - ${CHEVRON}px) 0, 100% 50%, calc(100% - ${CHEVRON}px) 100%, 0 100%, ${CHEVRON}px 50%)`;

          return (
            <div
              key={step.id}
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
            </div>
          );

        })
      }

    </div>

  );

}
