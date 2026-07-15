"use client";

import {
  Package,
  CheckCircle2,
  Users
} from "lucide-react";

import { Resource } from "../types/types";


type Props = {
  resources: Resource[];
  selectedResource: number | null;
  onSelect:(resourceId:number)=>void;
};


export default function BookingResource({
  resources,
  selectedResource,
  onSelect

}:Props){


return (

<div>


<label
className="
mb-3
flex
items-center
gap-2
text-sm
font-semibold
text-gray-700
"
>

<Package
size={16}
className="text-blue-600"
/>

Available Resources

</label>



<div
className="
flex
flex-wrap
gap-3
"
>


{
resources.map((resource)=>(

<button
key={resource.id}

type="button"

onClick={() =>
onSelect(resource.id)
}

className={`
relative
flex
min-w-[190px]
items-center
gap-3
rounded-xl
border
px-3
py-3
text-left
transition

${
selectedResource === resource.id

?

"border-blue-500 bg-blue-50"

:

"border-gray-200 bg-white hover:border-blue-300"

}

`}
>


<div
className={`
flex
h-9
w-9
shrink-0
items-center
justify-center
rounded-lg

${
selectedResource === resource.id

?

"bg-blue-600 text-white"

:

"bg-blue-50 text-blue-600"

}

`}
>

<Package size={17}/>

</div>



<div
className="flex-1"
>

<p
className="
text-sm
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
gap-2
text-xs
text-gray-400
"
>

<span>
{resource.resource_type?.name}
</span>


<span>
•
</span>


<span className="flex items-center gap-1">

<Users size={12}/>

{resource.capacity}

</span>


</div>


</div>




{
selectedResource === resource.id && (

<CheckCircle2
size={17}
className="text-blue-600"
/>

)

}


</button>


))

}


</div>


</div>

)

}