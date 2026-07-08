"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  id?: number;
  quantity: number;
  price?: number;
  service?: any;
  package?: any;
  [key:string]: any;
};

type BookingCartContextType = {

  items: CartItem[];
  setItems: (
    items: CartItem[]
  ) => void;

  itemCount:number;
  totalPrice:number;
  addItem:(
    item:CartItem
  )=>void;

  removeItem:(
    id:number
  )=>void;

  clearCart:()=>void;

  // ADD THIS
  customer:any;
  setCustomer:(
    customer:any
  )=>void;

};

const BookingCartContext =
createContext<BookingCartContextType | undefined>(
undefined
);

export function BookingCartProvider({
children,
}:{
children:ReactNode;
}){

const [items,setItems]
=
useState<CartItem[]>([]);

// ADD THIS
const [customer,setCustomer]
=
useState<any>(null);

const itemCount =
items.reduce(
(sum,item)=>
sum + item.quantity,
0
);

const totalPrice =
items.reduce(
(sum,item)=>{

const price =
Number(
item.price ??
item.service?.prices?.[0]?.price ??
item.package?.prices?.[0]?.price ??
0
);

return sum + price * item.quantity;

},
0
);

const addItem = (
item:CartItem
)=>{

setItems(prev=>{
const existing =
prev.find(
x=>x.id === item.id
);

if(existing){
return prev.map(x=>
x.id === item.id
?
{
...x,
quantity:
x.quantity + item.quantity
}
:
x
);
}

return [
...prev,
item
];

});

};

const removeItem = (
id:number
)=>{

setItems(prev=>
prev.filter(
item=>item.id !== id
)
);

};

const clearCart = ()=>{
setItems([]);
};

return (
<BookingCartContext.Provider
value={{
items,
setItems,
itemCount,
totalPrice,
addItem,
removeItem,
clearCart,
// ADD THESE
customer,
setCustomer,
}}
>
{children}
</BookingCartContext.Provider>
);
}

export function useBookingCart(){
const context =
useContext(
BookingCartContext
);
if(!context){
throw new Error(
"useBookingCart must be used inside BookingCartProvider"
);
}
return context;
}