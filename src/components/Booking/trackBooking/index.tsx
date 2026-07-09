"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import TrackForm from "./TrackForm";
import BookingResult from "./BookingResult";
import { useTrackBooking } from "../hook/useTrackBooking";
import { toast } from "sonner";
import { useState } from "react";

export default function TrackBooking() {

const {
  booking,
  searchBooking,
  loading,
  error
}=useTrackBooking();
const [searched,setSearched] = useState(false);

const handleSearch = async(
  reference:string
)=>{

try{

const result = await searchBooking(reference);

console.log(
  "RESULT:",
  result
);

setSearched(true);

toast.success(
 "Booking found"
);

}
catch(error:any){
toast.error(
  error.message ||
  "Booking not found"
);

}

};

return (
<>
<Breadcrumb
  title="Track Booking"
  pages={[
    "Track Booking"
  ]}
/>

<section
className="

bg-gray-2
"
>
<div
className="
max-w-[1170px]
mx-auto
px-4
sm:px-8
mb-12
"
>

{
!searched &&

<TrackForm
  onSubmit={handleSearch}
/>

}
{
loading &&

<div
className="
text-center
mt-6
text-gray-500
"
>
Searching booking...

</div>

}

{
error &&

<div
className="
max-w-[520px]
mx-auto
mt-6
rounded-lg
bg-red-50
text-red-600
p-4
text-center
"
>

{error}

</div>

}

{
booking &&
<BookingResult
  booking={booking}
/>

}

</div>

</section>

</>

);

}