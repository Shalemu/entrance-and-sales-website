"use client";

import {
  CheckCircle2,
  Plus,
  Minus,
  CalendarDays,
  Users,
  Package,
  User
} from "lucide-react";

import { useState } from "react";

import BookingDateModal, { BookingData } from "./BookingModal/BookingDateModal";
import { toast } from "sonner";
import { BranchService, Resource } from "./types/types";

type Props = {
  service: BranchService;
    resources?: Resource[];

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

const price = service.prices?.[0];


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
{
price?.price_category && (
<p className="
mt-0.5
text-[11px]
capitalize
text-gray-400
">
{price.price_category} price
</p>
)
}
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

{
service.resources &&
service.resources.length > 0 && (

<div
className="
mt-5
mx-4
mb-4
rounded-xl
border
border-gray-100
bg-gray-50
p-4
"
>

<div
className="
flex
items-center
justify-between
mb-3
"
>

<div
className="
flex
items-center
gap-2
"
>

<div
className="
h-8
w-8
rounded-lg
bg-blue-50
flex
items-center
justify-center
text-blue-600
"
>
<Package size={15}/>
</div>


<div>

<p
className="
text-sm
font-semibold
text-gray-800
"
>
Available Resources
</p>

<p
className="
text-xs
text-gray-400
"
>
Select from available options
</p>

</div>


</div>



<span
className="
text-xs
font-medium
text-blue-600
bg-blue-50
px-2.5
py-1
rounded-full
"
>
{service.resources.length} Available
</span>


</div>



<div
className="
flex
flex-wrap
gap-2
"
>

{
service.resources.map((resource)=>(

<div
key={resource.id}
className="
group
flex
items-center
gap-2
rounded-xl
border
border-gray-100
bg-white
px-3
py-2
shadow-sm
transition
hover:border-blue-300
hover:shadow-md
"
>


{/* RESOURCE ICON */}

<div
className="
h-7
w-7
rounded-lg
bg-gray-50
flex
items-center
justify-center
text-blue-600
group-hover:bg-blue-50
transition
"
>

<Package size={14}/>

</div>



{/* RESOURCE INFO */}

<div
className="
leading-tight
"
>

<p
className="
text-xs
font-semibold
text-gray-800
"
>
{resource.name}
</p>


<div
className="
flex
items-center
gap-1
text-[11px]
text-gray-400
"
>

<span>
{resource.resource_type?.name}
</span>


<span>
•
</span>


<span
className="
flex
items-center
gap-1
"
>
<User size={11}/>
{resource.capacity}
</span>

</div>


</div>



</div>

))

}


</div>


</div>

)
}

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

  resources={
    service.resources
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