import { Suspense } from "react";
import Payment from "@/components/Payment";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center">
          Loading payment...
        </div>
      }
    >
      <Payment />
    </Suspense>
  );
}