"use client";

import React from "react";
import {
  User,
  CalendarDays,
  CreditCard,
  Check,
} from "lucide-react";


type Props = {
  currentStep: number;
};


const steps = [
  {
    id: 1,
    title: "Contact Details",
    description: "Customer Info",
    icon: User,
  },
  {
    id: 2,
    title: "Services",
    description: "Select Package",
    icon: CalendarDays,
  },
  {
    id: 3,
    title: "Payment",
    description: "Complete Booking",
    icon: CreditCard,
  },
];


export default function Stepper({
  currentStep,
}: Props) {


return (

<div
className="
mb-8
rounded-2xl
border
border-gray-200
bg-white
px-6
py-5
shadow-sm
"
>


<div className="flex items-center justify-between">


{
steps.map((step,index)=>{


const Icon = step.icon;


// only previous steps are completed
const completed =
currentStep > step.id;


// current active step
const active =
currentStep === step.id;



return (

<React.Fragment
key={step.id}
>


<div className="flex items-center gap-3">


<div
className={`
flex
h-11
w-11
items-center
justify-center
rounded-xl
transition-all

${
completed
?
"bg-emerald-500 text-white"

:
active
?
"bg-blue-600 text-white shadow-lg"

:
"bg-gray-100 text-gray-400"

}

`}
>


{
completed
?
<Check size={18}/>
:
<Icon size={18}/>
}


</div>



<div className="hidden md:block">


<p
className={`
text-sm
font-semibold

${
active || completed
?
"text-gray-900"
:
"text-gray-400"

}
`}
>

{step.title}

</p>


<p className="text-xs text-gray-500">
{step.description}
</p>


</div>


</div>



{
index !== steps.length -1 && (

<div
className={`
mx-4
h-[2px]
flex-1
rounded-full

${
completed
?
"bg-emerald-500"
:
"bg-gray-200"

}

`}
/>

)

}



</React.Fragment>

)


})

}


</div>


</div>

);

}