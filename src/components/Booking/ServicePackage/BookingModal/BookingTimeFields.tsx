"use client";

import { Clock } from "lucide-react";


type Props = {
  startTime:string;
  endTime:string;
  onStartChange:(value:string)=>void;
  onEndChange:(value:string)=>void;
};


export default function BookingTimeFields({
  startTime,
  endTime,
  onStartChange,
  onEndChange
}:Props){

return (

<div className="grid grid-cols-2 gap-4">


<div>

<label className="mb-2 block text-sm font-semibold text-gray-700">
Start Time
</label>


<div className="relative">

<Clock
size={18}
className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
/>


<input
type="time"
value={startTime}
onChange={(e)=>onStartChange(e.target.value)}
className="
w-full
rounded-xl
border
py-3
pl-10
outline-none
focus:border-blue-500
"
/>

</div>

</div>




<div>

<label className="mb-2 block text-sm font-semibold text-gray-700">
End Time
</label>


<div className="relative">

<Clock
size={18}
className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
/>


<input
type="time"
value={endTime}
onChange={(e)=>onEndChange(e.target.value)}
className="
w-full
rounded-xl
border
py-3
pl-10
outline-none
focus:border-blue-500
"
/>

</div>

</div>


</div>

)

}