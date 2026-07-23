"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useBookingCart } from "@/context/BookingCartContext";
import CustomerForm from "./CustomerForm";
import ServicePackage from "./ServicePackage/ServicePackage";
import Participants from "./Participants";
import BookingSummary from "./BookingSummary";
import Checkout from "../Checkout";
import Stepper from "./Stepper";
import type { BranchService, Package } from "./ServicePackage/types/types";
import type { GroupType } from "./GroupType/Grouptype";
import type { BookingData } from "./ServicePackage/BookingModal/BookingDateModal";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateBooking } from "./hook/useCreateBooking";
import PaymentMethod from "../Checkout/PaymentMethod";
import { calculateItemTotal } from "./utils/calculateItemTotal";


export type BookingItem = {
  service?: BranchService;
  package?: Package;
  quantity: number;
  participants: number;
  bookingDate?: string;
  startTime?: string;
  endTime?: string;
  adults?: number;
  children?: number;

};

export default function Booking() {

  const [step, setStep] =
    useState<number>(1);
  const router = useRouter();
  const [completedSteps, setCompletedSteps] =
    useState<number[]>([]);
  const {
    createBooking,
    loading: checkoutLoading
  } = useCreateBooking();

  const [selectedGroup, setSelectedGroup] =
    useState<GroupType | null>(null);

  const [pesapalUrl, setPesapalUrl] =
    useState<string | null>(null);

  const [selectedPackage, setSelectedPackage] =
    useState<Package | null>(null);
  const [participants, setParticipants] =
    useState<number>(1);
  const [customer, setCustomer] =
    useState<any>(null);
  const {
    items: cartItems,
    setItems: setCartItems,
    bookingDate,
  }
    =
    useBookingCart();

  // the cart context stores a loosely-typed CartItem[] shared across
  // the app; this page owns the actual booking-item shape
  const items = cartItems as unknown as BookingItem[];
  const setItems =
    setCartItems as unknown as Dispatch<SetStateAction<BookingItem[]>>;

  const completeStep = (
    current: number,
    next: number
  ) => {

    setCompletedSteps(prev =>
      prev.includes(current)
        ?
        prev
        :
        [
          ...prev,
          current
        ]
    );
    setStep(next);
  };
  const addService = async (
    service: BranchService,
    booking: BookingData
  ) => {

    setItems(prev => {

      const existing =
        prev.find(
          item =>
            item.service?.id === service.id
        );


      if (existing) {

        return prev.map(item => {

          if (item.service?.id === service.id) {

            return {
              ...item,
              quantity: item.quantity + 1
            };

          }

          return item;

        });

      }


      return [
        ...prev,

        {
          service,
          quantity: 1,
          participants: booking.participants,
          bookingDate: booking.bookingDate,
          startTime: booking.startTime,
          endTime: booking.endTime,
          adults: booking.adults ?? 0,
          children: booking.children ?? 0
        }

      ];

    });


    // later replace this with API call
    await new Promise(
      resolve => setTimeout(resolve, 800)
    );

  };

  const addPackage = (
    pkg: Package,
    booking: BookingData
  ) => {

    setItems(prev => {
      const exists =
        prev.find(
          item =>
            item.package?.id === pkg.id
        );

      if (exists) {
        return prev.map(item => {
          if (item.package?.id === pkg.id) {
            return {

              ...item,

              quantity: item.quantity + 1

            };

          }

          return item;

        });

      }

      return [

        ...prev,

        {
          package: pkg,
          quantity: 1,
          participants: booking.participants,
          bookingDate: booking.bookingDate,
          startTime: booking.startTime,
          endTime: booking.endTime,
          adults: booking.adults ?? 0,
          children: booking.children ?? 0

        }

      ];
    });
  };

  const removeService = (id: number) => {

    setItems(prev =>
      prev.filter(
        item =>
          item.service?.id !== id
      )

    );

  };

  const removePackage = (id: number) => {
    setItems(prev =>

      prev.filter(
        item =>
          item.package?.id !== id
      )

    );

    setSelectedPackage(null);

  };

  const increaseQuantity = (id: number) => {
    setItems(prev =>
      prev.map(item => {
        if (
          item.service?.id === id ||
          item.package?.id === id
        ) {
          return {

            ...item,

            quantity: item.quantity + 1

          };

        }
        return item;
      })

    );
  };

  const decreaseQuantity = (id: number) => {
    setItems(prev =>
      prev.map(item => {

        if (
          item.service?.id === id ||
          item.package?.id === id
        ) {

          return {

            ...item,

            quantity: item.quantity - 1

          };

        }

        return item;
      })
        .filter(
          item =>
            item.quantity > 0
        )
    );

  };

  const updateServiceParticipants = (
    serviceId: number,
    value: number
  ) => {
    setItems(prev =>
      prev.map(item => {
        if (item.service?.id !== serviceId)
          return item;
        return {
          ...item,

          participants: value

        };
      })
    );
  };

  const [bookingNumber, setBookingNumber] =
    useState<string | null>(null);
  const [bookingData, setBookingData] =
    useState<any>(null);

  const [paymentType, setPaymentType] =
    useState<"full" | "advance">("full");

  // once the cart holds at least one item, dropping back to zero (last
  // item removed, or "Clear Cart") means nothing is left to book — reset
  // the whole flow so the user starts again from step 1 instead of
  // resuming stale customer/package/reference-number state
  const prevItemCountRef = useRef(items.length);

  useEffect(() => {

    const hadItems = prevItemCountRef.current > 0;
    const nowEmpty = items.length === 0;

    if (hadItems && nowEmpty) {
      setStep(1);
      setCompletedSteps([]);
      setSelectedPackage(null);
      setParticipants(1);
      setCustomer(null);
      setBookingNumber(null);
      setBookingData(null);
      setPaymentType("full");
      setPesapalUrl(null);
    }

    prevItemCountRef.current = items.length;

  }, [items.length]);

  // only a service with a "partial" payment rule forces the user to
  // choose between full and advance payment before the booking is
  // created — every other service keeps the existing full-payment flow
  const partialPaymentItem = items.find(
    item =>
      item.service?.service?.has_payment_rule &&
      item.service.service.payment_rule?.payment_type === "partial"
  );

  const requiresPaymentChoice = !!partialPaymentItem;

  const total = items.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  );

  const combineDateTime = (
    date?: string,
    time?: string
  ) => {

    if (!date || !time) {
      return null;
    }

    return `${date} ${time}:00`;

  };

const submitBooking = async (
  selectedPaymentType: "full" | "advance",
  silent = false
): Promise<boolean> => {

  setPesapalUrl(null);

  try {

      const payload = {
    branch_id: 1,
    customer_id: customer.id,
    booking_channel_id: 1,
    currency_id: 1,
    group_type_id: customer?.group?.id ?? null,

    contact_name: `${customer.first_name} ${customer.last_name}`.trim(),
    contact_phone: customer.phone,
    contact_email: customer.email,

    payment_option: selectedPaymentType,

    items: items.map((item) => ({
      branch_service_id: item.service?.id ?? null,
      package_id: item.package?.id ?? null,

      service_date: item.bookingDate,

      start_datetime: combineDateTime(
        item.bookingDate,
        item.startTime
      ),

      end_datetime: combineDateTime(
        item.bookingDate,
        item.endTime
      ),

      quantity: item.quantity,
      adult_quantity: item.adults ?? 0,
      child_quantity: item.children ?? 0,
    })),
  };

    const response = await createBooking(payload);

    console.log("Booking response:", response);

    setBookingData(response.booking);

    setBookingNumber(
      response.booking.booking_number
    );

    setPesapalUrl(
      response.payment.redirect_url
    );

    if (!silent) {
      toast.success(
        "Booking created successfully",
        {
          description:
            "You will now be redirected to complete your payment.",
        }
      );
    }

    return true;

  } catch (error: any) {

    console.error("Booking Error:", error);

    toast.error(
      "Unable to complete your booking",
      {
        description:
          error?.message ??
          "Something went wrong while creating your booking. Please try again.",
      }
    );

    return false;
  }
};

const proceedToCheckout = async () => {

  if (!customer) {
    toast.error("Customer details required");
    return;
  }


  if (items.length === 0) {
    toast.info("No services selected");
    return;
  }


  // Partial payment services
  if (requiresPaymentChoice) {

    setStep(3);

    return;
  }


  // Normal flow
  const success = await submitBooking("full");

  if(success){
     setStep(4);
  }

};

// services with a partial payment rule land on step 3 to choose
// between full and advance payment; the booking (and its PesaPal
// order) is only created once the user confirms that choice
const confirmPaymentChoice = async () => {

  const success = await submitBooking(paymentType);

  if (success) {
    setStep(4);
  }

};

// lets the user revisit an earlier step without losing anything —
// customer, cart items, and selections all stay in state (and in
// sessionStorage) regardless of which step is currently shown
const goToStep = (target: number) => {

  if (step >= 4 || target >= step) {
    return;
  }

  setStep(target);

};


  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-3xl font-bold">
          Create Booking
        </h1>
        <Stepper
          currentStep={step}
          onNavigate={goToStep}
        />

        <div className="grid gap-8 lg:grid-cols-3">

          {/* LEFT */}

          <div className="space-y-6 lg:col-span-2">
            {
              step === 1 &&
              <CustomerForm
                customer={customer}
                onCustomerSaved={setCustomer}
                onSuccess={() => {
                  completeStep(1, 2);

                }}

              />

            }
            {
              step === 2 &&
              <ServicePackage
                selectedPackage={selectedPackage}
                setSelectedPackage={setSelectedPackage}
                items={items}
                addService={addService}
                addPackage={addPackage}
                removeService={removeService}
                removePackage={removePackage}
                updateServiceParticipants={
                  updateServiceParticipants
                }
              />
            }

            {
              step === 3 &&
              partialPaymentItem?.service?.service.payment_rule &&
              <PaymentMethod
                paymentRule={
                  partialPaymentItem?.service?.service?.payment_rule
                }
                serviceName={partialPaymentItem?.service?.service?.name}
                totalAmount={total}
                value={paymentType}
                onChange={setPaymentType}
                loading={checkoutLoading}
              />
            }

            {
              step === 4 && (
                <Checkout
                  bookingNumber={bookingNumber}
                  pesapalUrl={pesapalUrl}
                />
              )
            }

          </div>

          {/* SUMMARY */}

          <div>
            <BookingSummary
              customer={customer}
              pkg={selectedPackage}
              participants={participants}
              items={items}
              bookingDate={bookingDate}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onCheckout={
                step === 3
                  ? confirmPaymentChoice
                  : proceedToCheckout
              }
              checkoutLabel={
                step === 3 ? "Continue" : undefined
              }
              checkoutLoading={checkoutLoading}
              showCheckoutButton={step < 4}

            />
          </div>
        </div>
      </div>
    </section>
  );

}



