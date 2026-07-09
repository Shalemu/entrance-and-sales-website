"use client";

import { CreditCard } from "lucide-react";

type Props = {
  disabled?: boolean;
  loading?: boolean;
  onClick:()=>void;
};


export default function CheckoutButton({
  disabled,
  loading,
  onClick
}:Props){

return (

<button

type="button"

disabled={disabled || loading}

onClick={onClick}

className="
flex
w-full
items-center
justify-center
gap-2
rounded-xl
bg-blue-600
px-6
py-3
font-semibold
text-white
transition
hover:bg-blue-700
disabled:opacity-50
"

>

{
loading
?
<>
<span
className="
h-5
w-5
animate-spin
rounded-full
border-2
border-white
border-t-transparent
"
/>

Creating Booking...

</>

:

<>
Proceed to Checkout
<CreditCard size={18}/>
</>

}


</button>


)

}