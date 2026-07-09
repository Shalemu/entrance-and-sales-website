"use client";

import {
  CalendarDays,
  User,
  Mail,
  Phone,
  CreditCard,
  ReceiptText,
} from "lucide-react";


type Props = {
  booking:any;
};


export default function BookingResult({
  booking
}:Props){


const data = booking.data ?? booking;



const formatDate = (
  date?:string
)=>{

if(!date) return "-";


return new Date(date).toLocaleDateString(
  "en-GB",
  {
    day:"2-digit",
    month:"long",
    year:"numeric"
  }
);

};




const statusBadge = (
status:string
)=>{

switch(status){

case "confirmed":

return "bg-green-100 text-green-700";


case "cancelled":

return "bg-red-100 text-red-700";


default:

return "bg-yellow-100 text-yellow-700";

}

};



const paymentBadge = (
status:string
)=>{

switch(status){

case "paid":

return "bg-green-100 text-green-700";


case "partial":

return "bg-orange-100 text-orange-700";


default:

return "bg-red-100 text-red-700";

}

};



return (

<div
className="
max-w-8xl
w-full
mx-auto
mt-8
rounded-md
bg-white
shadow-xl
border
overflow-hidden
"
>


{/* HEADER */}

<div
className="
flex
justify-between
items-center
px-8
py-3
bg-gradient-to-r
from-blue-600
to-indigo-600
text-white
"
>
<div>
<p
className="
text-xs
opacity-80
uppercase
"
>
Reference
</p>
<h2
className="
text-2xl
font-bold
"
>
{data.booking_number}
</h2>
</div>
<div
className={`
px-4
py-2
rounded-full
text-sm
font-semibold
${statusBadge(data.status)}
`}
>
{data.status}
</div>

</div>

{/* CUSTOMER */}
<div
className="
grid
md:grid-cols-3
gap-6
p-6
border-b
"
>
<div>
<p className="text-sm text-gray-500 flex gap-2">
<User size={15}/>
Name
</p>
<p className="font-semibold mt-1">
{data.customer?.first_name}

{" "}

{data.customer?.last_name}

</p>
</div>
<div>
<p className="text-sm text-gray-500 flex gap-2">
<Mail size={15}/>
Email
</p>
<p className="font-medium mt-1">
{data.customer?.email ?? "-"}
</p>
</div>
<div>
<p className="text-sm text-gray-500 flex gap-2">
<Phone size={15}/>
Phone
</p>
<p className="font-medium mt-1">
{data.customer?.phone ?? "-"}
</p>
</div>
</div>
{/* PAYMENT SUMMARY */}

<div
className="
grid
md:grid-cols-3
gap-5
p-6
bg-gray-50
"
>

<div>

<p className="text-sm text-gray-500 flex gap-2">
<CreditCard size={15}/>
Payment Status
</p>
<span
className={`
inline-block
mt-2
px-4
py-1
rounded-md
text-xs
font-semibold
${paymentBadge(data.payment_status)}
`}
>

{data.payment_status}

</span>

</div>
<div>
<p className="text-sm text-gray-500 flex gap-2">
<ReceiptText size={15}/>
Total Amount
</p>
<p
className="
font-bold
text-lg
mt-1
"
>

TZS {Number(
data.total_amount
).toLocaleString()}
</p>
</div>
<div>
<p className="text-sm text-gray-500">
Booking Date
</p>
<p className="font-semibold mt-1">
{formatDate(data.created_at)}
</p>
</div>

</div>

{/* SERVICES TABLE */}
<div
className="
p-6
"
>
<h3
className="
font-bold
text-lg
mb-4
"
>

Booked Services
</h3>
<div
className="
overflow-x-auto
border
rounded-md
"
>
<table
className="
w-full
text-sm
"
>
<thead
className="
bg-gray-100
"
>
<tr>
<th className="px-5 py-3 text-left">
Service
</th>
<th className="px-5 py-3 text-left">
Date
</th>
<th className="px-5 py-3 text-center">
Quantity
</th>
</tr>
</thead>
<tbody>
{
data.items?.map(
(item:any)=>(
<tr
key={item.id}
className="
border-t
"
>
<td className="px-5 py-4 font-medium">

{
item.branch_service?.service?.name ??
item.package?.name ??
"Service"
}

</td>
<td className="px-5 py-4">
<div className="flex gap-2 items-center">
<CalendarDays size={15}/>
{formatDate(
item.service_date
)}
</div>
</td>
<td
className="
px-5
py-4
text-center
"
>
{item.quantity}
</td>
</tr>
)

)

}
</tbody>
</table>
</div>
</div>

</div>

);

}