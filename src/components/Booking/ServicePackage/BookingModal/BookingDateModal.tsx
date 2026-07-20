"use client";

import { useEffect, useState } from "react";
import {
  X,
  CalendarDays,
  Clock3,
  Users,
  CheckCircle2,
} from "lucide-react";

import BookingParticipants from "./BookingParticipants";
import BookingTimeFields from "./BookingTimeFields";
import BookingResourcesModal from "./BookingResourcesModal";
import { Resource } from "../types/types";
import { useBookingCart } from "@/context/BookingCartContext";

export type BookingData = {
  bookingDate: string;
  startTime: string;
  endTime: string;
  participants: number;
  adults?: number;
  children?: number;
  resourceId?: number;
};

type Props = {
  open: boolean;
  serviceName: string;
  minParticipants: number;
  maxParticipants: number;
  defaultParticipants: number;
  resources?: Resource[];
    priceMode:
    | "fixed"
    | "per_person"
    | "per_adult_child";
    
  onClose: () => void;
 onConfirm: (
  data: BookingData
) => void | Promise<void>;
};

export default function BookingDateModal({
  open,
  serviceName,
   resources,
  minParticipants,
  maxParticipants,
  defaultParticipants,
  priceMode,
  onClose,
  onConfirm,
}: Props) {

  const { bookingDate } = useBookingCart();
  const [startTime, setStartTime] = useState("");
  const [selectedResource,setSelectedResource] =
  useState<number | null>(null);
  const [endTime, setEndTime] = useState("");
    const [participants, setParticipants] =
        useState(defaultParticipants);
    const [adults, setAdults] =
        useState(1);
    const [children, setChildren] =
        useState(0);
    const [error, setError] =
        useState<string | null>(null); 
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => {
    if(open){

        setStartTime("");
        setEndTime("");
        setParticipants(defaultParticipants);
        setAdults(1);
        setChildren(0);
        setError(null);

    }

    },[
    open,
    defaultParticipants
    ]);

  if(!open) return null;
  const submit = async () => {

  if(!startTime || !endTime){
    setError("Please select booking time");
    return;
  }

  if(endTime <= startTime){
    setError("End time must be after start time");
    return;
  }

  if(
    participants < minParticipants ||
    participants > maxParticipants
  ){
    setError(
      `Participants ${minParticipants}-${maxParticipants}`
    );
    return;
  }

  try {
    setSubmitting(true);
    await onConfirm({

      bookingDate,
      startTime,
      endTime,
      participants,
      adults,
      children
    });
    // small delay so user sees loading
    await new Promise(
      resolve => setTimeout(resolve, 600)
    );
    onClose();

  } finally {
    setSubmitting(false);
  }

};
  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      p-4
      "
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className="
        absolute
        inset-0
        bg-black/40
        backdrop-blur-none
        "
      />
      {/* Modal */}

      <div
        className="
        relative
        w-full
        max-w-7xl
        overflow-hidden
        // rounded-xl
        rounded-lg
        bg-white
        shadow-2xl
        "
      >
        {/* Header */}

        <div
          className="
          flex
          items-center
          justify-between
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          px-6
          py-4
          text-white
          "
        >

          <div>

            <h2
              className="
              text-xl
              font-bold
              "
            >
              Booking Details
            </h2>
            <p
              className="
              mt-1
              text-sm
              text-blue-100
              "
            >
              {serviceName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="
            rounded-full
            bg-white/20
            p-2
            transition
            hover:bg-white/30
            "
          >
            <X size={18}/>

          </button>
        </div>

{/* Content */}
<div
className="
px-6
py-5
space-y-5
"
>
{/* TOP ROW */}
<div
className="
grid
grid-cols-12
gap-4
"
>
{/* DATE */}
<div
className="
col-span-12
lg:col-span-4
overflow-hidden
rounded-2xl
border
border-blue-100
bg-gradient-to-br
from-blue-600
to-blue-500
p-3
shadow-sm
"
>

<label
className="
mb-2
flex
items-center
gap-2
text-xs
font-semibold
uppercase
tracking-wide
text-blue-100
"
>
<CalendarDays
size={14}
/>
Booking Date
</label>

<div
className="
flex
items-center
gap-3
"
>
<div
className="
flex
h-9
w-9
shrink-0
items-center
justify-center
rounded-xl
bg-white/15
text-white
"
>
<CalendarDays size={17}/>
</div>

<div className="min-w-0">
{
bookingDate
?
<>
<p className="truncate text-sm font-bold text-white">
{
new Date(bookingDate).toLocaleDateString("en-GB", {
weekday: "long",
})
}
</p>
<p className="truncate text-xs text-blue-100">
{
new Date(bookingDate).toLocaleDateString("en-GB", {
day: "2-digit",
month: "short",
year: "numeric",
})
}
</p>
</>
:
<p className="text-sm font-semibold text-white">
Not selected
</p>
}
</div>
</div>
</div>

{/* GUESTS */}
<div
className="
col-span-12
lg:col-span-4
rounded-2xl
border
border-gray-100
bg-gray-50
p-3
"
>
<label
className="
mb-2
flex
items-center
gap-2
text-xs
font-semibold
text-gray-700
"
>
<Users
size={15}
className="text-blue-600"
/>
Guests
</label>
<BookingParticipants
value={participants}
min={minParticipants}
max={maxParticipants}
priceMode={priceMode}
adults={adults}
children={children}
onChange={setParticipants}
onAdultChange={setAdults}
onChildrenChange={setChildren}
/>
</div>
{/* TIME */}
<div
className="
col-span-12
lg:col-span-4
rounded-2xl
border
border-gray-100
bg-gray-50
p-3
"
>
<label
className="
mb-2
flex
items-center
gap-2
text-xs
font-semibold
text-gray-700
"
>
<Clock3
size={15}
className="text-blue-600"
/>
Booking Time
</label>
<BookingTimeFields
startTime={startTime}
endTime={endTime}
onStartChange={setStartTime}
onEndChange={setEndTime}
/>
</div>

</div>

{
resources &&
resources.length > 0 &&

<>

{/* RESOURCE ROW */}

<div
className="
rounded-2xl
border
border-gray-100
bg-gray-50
p-4
"
>

<BookingResourcesModal
resources={resources}
selectedResource={selectedResource}
onSelect={setSelectedResource}

/>
</div>
</>
}
{
error &&

<div
className="
flex
items-center
gap-2
rounded-xl
bg-red-50
px-4
py-2.5
text-sm
text-red-600
"
>
<X size={15}/>
{error}
</div>
}
</div>

        {/* Footer */}
        <div
          className="
          flex
          items-center
          justify-between
          border-t
          bg-gray-50
          px-6
          py-3
          "
        >
          <div
            className="
            hidden
            items-center
            gap-2
            text-xs
            text-gray-500
            sm:flex
            "
          >
          <CheckCircle2
              size={15}
              className="text-green-500"
            />
            Secure Booking
          </div>
          <div
            className="
            flex
            w-full
            gap-3
            sm:w-auto
            "
        >
            <button
              onClick={onClose}
              className="
              flex-1
              rounded-xl
              border
              bg-white
              px-6
              py-2.5
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-100
              sm:flex-none
              "
            >
              Cancel
            </button>
            <button
  onClick={submit}
  disabled={submitting}
  className="
  flex-1
  rounded-xl
  bg-blue-600
  px-7
  py-2.5
  text-sm
  font-semibold
  text-white
  shadow-sm
  transition
  hover:bg-blue-700
  disabled:cursor-not-allowed
  disabled:opacity-70
  sm:flex-none
  "
>

        {
        submitting ?
        <div className="
        flex
        items-center
        gap-2
        ">

        <span
        className="
        h-4
        w-4
        animate-spin
        rounded-full
        border-2
        border-white
        border-t-transparent
        "
        />

        Adding...

        </div>

        :

        "Add Booking"

        }
        </button>
          </div>
        </div>
      </div>
    </div>
  );

}