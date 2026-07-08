"use client";
import {
  CheckCircle2,
  Plus,
  Minus,
  CalendarDays,
  Users
} from "lucide-react";
import { useState } from "react";
import { Package } from "./types/types";
import {
  getActivePrices,
  getCurrentPricingRule
} from "./utils/pricing";

import BookingDateModal, {
  BookingData
} from "./BookingModal/BookingDateModal";

type Props = {
  package: Package;
  selected:boolean;
  quantity:number;

  onAdd:(booking:BookingData)=>void;

  onRemove:()=>void;
};

export default function PackageCard({
  package:pkg,
  quantity,
  selected,
 onAdd,
  onRemove,
}:Props){
const [open,setOpen] = useState(false);
const rule =
getCurrentPricingRule();
const activePrices =
getActivePrices(
  pkg.prices || [],
  rule
);

const price =
activePrices[0] ??
pkg.prices?.[0];
const unitPrice =
Number(price?.price ?? 0);
return (
<>
<div
className={`
rounded-2xl
border
p-6
transition
hover:shadow-lg

${
selected
?
"border-blue-600 ring-2 ring-blue-100"
:
"border-gray-200"
}
`}
>
<div className="flex justify-between">
<h3 className="text-xl font-bold">
{pkg.name}
</h3>
{
selected &&
<CheckCircle2
size={20}
className="text-blue-600"
/>
}
</div>
<p className="text-sm text-gray-500">
{pkg.package_type?.name}
</p>
<div className="mt-4 border-t pt-4">
<p className="text-lg font-semibold">
TZS {unitPrice.toLocaleString()}
</p>
<p className="text-sm text-gray-600">
{
pkg.pricing_mode === "per_person"
?
"Per person"
:
"Fixed package"
}
</p>
<p className="text-xs text-gray-400">
{price?.pricing_rule}
</p>
</div>
<div className="mt-6 flex justify-end">
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
h-9
w-9
rounded-full
border
flex
items-center
justify-center
"
>
<Minus size={16}/>
</button>
<span className="font-semibold">
{quantity}
</span>
<button
onClick={()=>setOpen(true)}
className="
h-9
w-9
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
"
>
<Plus size={16}/>
</button>
</div>
:
<button
onClick={()=>setOpen(true)}
className="
rounded-xl
bg-gray-900
px-5
py-2
text-white
"
>
Add Package
</button>
}
</div>
</div>
<BookingDateModal
open={open}
serviceName={
pkg.name
}
minParticipants={
pkg.minimum_guests ?? 1
}
maxParticipants={
pkg.maximum_guests ?? 999
}
defaultParticipants={
pkg.minimum_guests ?? 1
}
priceMode={
pkg.pricing_mode
}
onClose={()=>
setOpen(false)
}
onConfirm={(booking)=>{
onAdd(booking);
setOpen(false);
}}
/>
</>
);
}