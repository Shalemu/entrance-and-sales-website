"use client";

import {
  CheckCircle2,
  Plus,
  Minus,
  CalendarDays,
  Users
} from "lucide-react";

import { useState } from "react";

import { BranchService } from "./types/types";
import {
  getActivePrices,
  getCurrentPricingRule
} from "./utils/pricing";

import BookingDateModal, { BookingData } from "./BookingModal/BookingDateModal";
import { toast } from "sonner";

type Props = {
  service: BranchService;

  quantity:number;
  onAdd:(booking:BookingData)=>void | Promise<void>;

  onRemove:()=>void;
  
 
};

export default function ServiceCard({
  service,
  quantity,
  onAdd,
  onRemove,
 

}:Props){

const [open,setOpen]=useState(false);
const rule=getCurrentPricingRule();
const prices=getActivePrices(
  service.prices || [],
  rule
);

const price =
prices?.[0] ??
service.prices?.[0];


const unitPrice=Number(
price?.price ?? 0
);

const minParticipants =
price?.minimum_quantity ?? 1;
const maxParticipants =
price?.maximum_quantity ?? 999;
const selected=quantity>0;

return (

<>
<div
className={`
rounded-xl
border
bg-white
overflow-hidden
transition
hover:shadow-md

${
selected
?
"border-blue-500"
:
"border-gray-200"
}

`}
>

{/* MAIN */}
<div className="
p-4
flex
gap-4
items-start
">
{/* ICON */}

<div
className="
h-12
w-12
rounded-xl
bg-blue-50
flex
items-center
justify-center
text-blue-600
shrink-0
"
>
<CalendarDays size={24}/>
</div>

{/* DETAILS */}
<div className="
flex-1
min-w-0
">
<div className="
flex
justify-between
gap-3
">
<div>
<h3
className="
font-semibold
text-gray-900
truncate
"
>
{service.service.name}
</h3>
<p
className="
text-xs
text-gray-500
mt-1
line-clamp-2
"
>

{
service.service.description ??
"No description available"
}
</p>
</div>
<div
className="
text-right
shrink-0
"
>
<p className="
text-xs
text-gray-500
">
From
</p>
<p
className="
font-bold
text-blue-600
"
>
TZS {unitPrice.toLocaleString()}
</p>
</div>
</div>

{/* SMALL INFO */}

<div
className="
mt-3
flex
items-center
gap-4
text-xs
text-gray-500
"
>

<span className="flex items-center gap-1">
  <Users size={15} className="text-gray-500" />
  {service.participants_per_resource}
</span>

<span className="text-gray-400">•</span>

<span>
  {service.service.access_control_type}
</span>

{
selected &&
<span className="
flex
items-center
gap-1
text-blue-600
">
<CheckCircle2 size={14}/>
Added
</span>
}

</div>

</div>

</div>

{/* FOOTER */}
<div
className="
border-t
bg-gray-50
px-4
py-3
flex
justify-between
items-center
"
>
{
selected ?

<div className="
flex
items-center
gap-3
">
<button
onClick={onRemove}
className="
h-8
w-8
rounded-full
border
bg-white
flex
items-center
justify-center
hover:bg-gray-100
"
>
<Minus size={15}/>
</button>
<span
className="
font-semibold
text-sm
"
>
{quantity}
</span>
<button
onClick={()=>setOpen(true)}
className="
h-8
w-8
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
hover:bg-blue-700
"
>
<Plus size={15}/>
</button>
</div>
:
<button
onClick={()=>setOpen(true)}
className="
ml-auto
rounded-lg
bg-gray-900
px-5
py-2
text-sm
font-semibold
text-white
hover:bg-blue-600
"
>
Add Service
</button>
}
</div>
</div>

<BookingDateModal

open={open}

serviceName={
  service.service.name
}

minParticipants={
  minParticipants
}

maxParticipants={
  maxParticipants
}

defaultParticipants={
  minParticipants
}

priceMode={
  service.prices?.[0]?.price_mode ?? "fixed"
}

onClose={() =>
  setOpen(false)
}

onConfirm={async (booking)=>{

  await onAdd(booking);

  toast.success(
    `${service.service.name} added to cart`
  );

}}

/>

</>

);


}