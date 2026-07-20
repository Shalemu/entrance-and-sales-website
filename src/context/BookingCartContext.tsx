"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";


export type CartItem = {
  id?: number;
  quantity: number;
  price?: number;
  service?: any;
  package?: any;
  [key: string]: any;
};


type BookingCartContextType = {

  items: CartItem[];
  setItems: Dispatch<
    SetStateAction<CartItem[]>
  >;
  itemCount: number;
  totalPrice: number;

  addItem: (
    item: CartItem
  ) => void;
  removeItem: (
    id:number
  ) => void;
  clearCart: () => void;
  customer: any;
  setCustomer: (
    customer:any
  ) => void;
  bookingDate: string;
  setBookingDate: (
    date: string
  ) => void;

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

  const [items,setItems] =
  useState<CartItem[]>([]);
  const [customer,setCustomer] =
  useState<any>(null);
  const [bookingDate,setBookingDate] =
  useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const itemCount =
  items.reduce(
    (sum,item)=>
      sum + item.quantity,
    0
  );
const calculateItemTotal = (
  item: CartItem
) => {

  const priceInfo =
    item.service?.prices?.[0] ??
    item.package?.prices?.[0];


  const price =
    Number(
      item.price ??
      priceInfo?.price ??
      0
    );


  const priceMode =
    priceInfo?.price_mode ??
    item.package?.pricing_mode ??
    "fixed";


  switch(priceMode){


    case "per_person":

      return (
        price *
        (item.participants ?? 0) *
        (item.quantity ?? 1)
      );



    case "per_adult_child":

      return (
        price *
        (
          (item.adults ?? 0) +
          (item.children ?? 0)
        ) *
        (item.quantity ?? 1)
      );



    case "fixed":

    default:

      return (
        price *
        (item.quantity ?? 1)
      );

  }

};



const totalPrice =
items.reduce(
  (sum,item)=>
    sum + calculateItemTotal(item),
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
        item=>
          item.service?.id !== id &&
          item.package?.id !== id &&
          item.id !== id
      )
    );
  };
  const clearCart = ()=>{
    setItems([]);
    setCustomer(null);
    setBookingDate(
      new Date().toISOString().split("T")[0]
    );

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
        customer,
        setCustomer,
        bookingDate,
        setBookingDate,
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