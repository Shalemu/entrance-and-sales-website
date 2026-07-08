"use client";

import { useEffect, useState } from "react";
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

export type BookingItem = {
  service?: BranchService;
  package?: Package;
  quantity:number;
  participants:number;
  bookingDate?:string;
  startTime?:string;
  endTime?:string;
  adults?:number;
  children?:number;

};

export default function Booking(){

const [step,setStep] = useState(1);
const [completedSteps,setCompletedSteps] =
useState<number[]>([]);

const [selectedGroup,setSelectedGroup] =
useState<GroupType|null>(null);

const [selectedPackage,setSelectedPackage] =
useState<Package|null>(null);
const [participants,setParticipants] =
useState(1);
const [items,setItems] =
useState<BookingItem[]>([]);
const [customer,setCustomer] =
useState<any>(null);
const {
 setItems:setCartItems
}
=
useBookingCart();
useEffect(()=>{

 setCartItems(items);

},[
 items,
 setCartItems
]);

const completeStep = (
 current:number,
 next:number
)=>{

setCompletedSteps(prev=>
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

const addService = (
service:BranchService,
booking:BookingData
)=>{

setItems(prev=>{
const existing =
prev.find(
item =>
item.service?.id === service.id
);
if(existing){
return prev.map(item=>{
if(item.service?.id === service.id){
return {
...item,
quantity:item.quantity + 1

};
}
return item;
});
}

return [
...prev,

{

service,

quantity:1,
participants:booking.participants,
bookingDate:booking.bookingDate,
startTime:booking.startTime,
endTime:booking.endTime,
adults:booking.adults ?? 0,
children:booking.children ?? 0

}
];
});
};

const addPackage = (
pkg:Package,
booking:BookingData
)=>{

setItems(prev=>{
const exists =
prev.find(
item =>
item.package?.id === pkg.id
);

if(exists){
return prev.map(item=>{
if(item.package?.id === pkg.id){
return {

...item,

quantity:item.quantity + 1

};

}

return item;

});

}

return [

...prev,

{
package:pkg,
quantity:1,
participants:booking.participants,
bookingDate:booking.bookingDate,
startTime:booking.startTime,
endTime:booking.endTime,
adults:booking.adults ?? 0,
children:booking.children ?? 0

}

];
});
};

const removeService=(id:number)=>{

setItems(prev=>
prev.filter(
item =>
item.service?.id !== id
)

);

};

const removePackage=(id:number)=>{
setItems(prev=>

prev.filter(
item =>
item.package?.id !== id
)

);

setSelectedPackage(null);

};

const increaseQuantity=(id:number)=>{
setItems(prev=>
prev.map(item=>{
if(
item.service?.id === id ||
item.package?.id === id
){
return {

...item,

quantity:item.quantity + 1

};

}
return item;
})

);
};

const decreaseQuantity=(id:number)=>{
setItems(prev=>
prev.map(item=>{

if(
item.service?.id === id ||
item.package?.id === id
){

return {

...item,

quantity:item.quantity - 1

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
serviceId:number,
value:number
)=>{
setItems(prev=>
prev.map(item=>{
if(item.service?.id !== serviceId)
return item;
return {
...item,

participants:value

};
})
);
};


const goToPayment = () => {

  if (!customer) {

    toast.error(
      "Customer details required",
      {
        description:
          "Please complete your contact information before continuing.",
      }
    );

    return;
  }


  if (!selectedGroup) {

    toast.warning(
      "Select a group type",
      {
        description:
          "Please choose a group type before proceeding with your booking.",
      }
    );

    return;
  }


  if(items.length === 0){

    toast.info(
      "No services selected",
      {
        description:
          "Please select at least one service or package to continue.",
      }
    );

    return;
  }


 completeStep(3, 4);

};

return (
<section className="py-16">
<div className="mx-auto max-w-7xl px-4">
<h1 className="mb-8 text-3xl font-bold">
Create Booking
</h1>
<Stepper
  currentStep={step}
/>

<div className="grid gap-8 lg:grid-cols-3">

{/* LEFT */}

<div className="space-y-6 lg:col-span-2">
{
step===1 &&
<CustomerForm
onCustomerSaved={setCustomer}
onSuccess={()=>{
completeStep(1,2);

}}

/>

}
{
step===2 &&
<ServicePackage
selectedGroup={selectedGroup}
setSelectedGroup={setSelectedGroup}
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
step===3 &&
<Participants
value={participants}
onChange={setParticipants}
/>
}

{
step===4 &&
<Checkout
customer={customer}
/>

}

</div>

{/* SUMMARY */}

<div>
<BookingSummary
customer={customer}
group={selectedGroup}
pkg={selectedPackage}
participants={participants}
items={items}
onIncrease={increaseQuantity}
onDecrease={decreaseQuantity}
onCheckout={goToPayment}
/>
</div>
</div>
</div>
</section>
);

}