import { Suspense } from "react";
import PaymentCallbackContent from "./PaymentCallbackContent";


export default function PaymentCallback() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <PaymentCallbackContent />
    </Suspense>
  );
}