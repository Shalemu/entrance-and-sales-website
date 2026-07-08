"use client";

import { useState, useEffect  } from "react";
import { useBookingCart } from "@/context/BookingCartContext";
import CustomerForm from "./CustomerForm";
import ServicePackage from "./ServicePackage/ServicePackage";
import Participants from "./Participants";
import BookingSummary from "./BookingSummary";
import type { BranchService, Package } from "./ServicePackage/types/types";
import type { GroupType } from "./GroupType/Grouptype";
import { BookingData } from "./ServicePackage/BookingModal/BookingDateModal";


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


export default function Booking(){


const [step,setStep]=useState(1);
const [selectedGroup,setSelectedGroup]=
useState<GroupType|null>(null);
const [selectedPackage,setSelectedPackage]=
useState<Package|null>(null);
const [participants,setParticipants]=
useState(1);
const [items,setItems]=
useState<BookingItem[]>([]);

const {
  setItems:setCartItems
}=useBookingCart();

useEffect(()=>{

 setCartItems(items);

},[
 items,
 setCartItems
]);


const [customer,setCustomer]=
useState<any>(null);
const addService = (
service:BranchService,
booking:BookingData
)=>{


setItems(prev=>{


const existing =
prev.find(
item=>item.service?.id === service.id
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

children:booking.children ?? 0,

}

];


});

};

const addPackage = (
  pkg: Package,
  booking: BookingData
) => {

  setItems((prev)=>{

    const exists = prev.find(
      item=>item.package?.id === pkg.id
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
        package: pkg,
        quantity:1,
        participants:booking.participants,

        bookingDate:booking.bookingDate,
        startTime:booking.startTime,
        endTime:booking.endTime,

        adults:booking.adults ?? 0,
        children:booking.children ?? 0,
      }
    ];

  });

};
const removeService = (
  serviceId: number
) => {

  setItems(prev =>
    prev.filter(
      item => item.service?.id !== serviceId
    )
  );

};

const removePackage = (
 packageId:number
)=>{

 setItems(prev=>
   prev.filter(
    item=>item.package?.id !== packageId
   )
 );

 setSelectedPackage(null);

};

const increaseQuantity=(id:number)=>{
setItems(prev=>
prev.map(item=>{
if(
item.service?.id === id
||
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
item.service?.id === id
||
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
item=>item.quantity>0
)
);

};

const updateServiceParticipants = (
  serviceId:number,
  value:number
) => {
  setItems(prev =>
    prev.map(item => {

      if(item.service?.id !== serviceId)
        return item;
      return {
        ...item,
        participants:value
      };

    })
  );

};

return (

<section className="py-16">

<div className="mx-auto max-w-7xl px-4">

<h1 className="mb-8 text-3xl font-bold">
Create Booking
</h1>
<div className="grid gap-8 lg:grid-cols-3">
{/* LEFT */}
<div className="space-y-6 lg:col-span-2">

{
step===1 &&
<CustomerForm
onCustomerSaved={setCustomer}

onSuccess={()=>
setStep(2)
}
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
/>
</div>
</div>
</div>
</section>
);
}