"use client";
import {
  useState
} from "react";

import {
  Search,
  Loader2
} from "lucide-react";


type Props = {
  onSubmit:(value:string)=>Promise<void>;
};

export default function TrackForm({
  onSubmit
}:Props){

const [referenceNumber,setReferenceNumber] =
useState("");
const [loading,setLoading] =
useState(false);
const [error,setError] =
useState("");
const submit = async(
e:React.FormEvent
)=>{

e.preventDefault();
if(!referenceNumber.trim()){
setError(
"Please enter your booking reference number"
);

return;
}
try{
setError("");
setLoading(true);

await onSubmit(
referenceNumber.trim()
);
}
catch(error:any){
setError(
error.message ??
"Unable to find booking"
);
}
finally{
setLoading(false);
}
};
return (
<div
className="
max-w-[620px]
w-full
mx-auto
rounded-xl
bg-white
shadow-lg
border
border-gray-100
p-6
"
>
{/* HEADER */}
<div
className="
text-center
mb-5
"
>
<div
className="
mx-auto
mb-3
flex
h-11
w-11
items-center
justify-center
rounded-lg
bg-blue-50
"
>
<Search
size={22}
className="text-blue-600"
/>
</div>
<h2
className="
text-xl
font-bold
text-gray-900
"
>
Track Your Booking
</h2>
<p
className="
mt-1
text-sm
text-gray-500
"
>
Enter your reference number to view booking details
</p>
</div>
<form
onSubmit={submit}
>
<label
className="
block
mb-2
text-sm
font-semibold
text-gray-700
"
>
Booking Reference Number
</label>
<input
type="text"
value={referenceNumber}
onChange={(e)=>
setReferenceNumber(
e.target.value.toUpperCase()
)
}

placeholder="Example: BOOK20260001"

className="
w-full
rounded-lg
border
border-gray-200
bg-gray-50
py-3
px-4
text-gray-900
outline-none
transition
focus:border-blue-500
focus:bg-white
focus:ring-2
focus:ring-blue-100
"
/>

{
error &&
<p
className="
mt-2
text-sm
text-red-500
"
>
{error}

</p>
}
<button

disabled={loading}

type="submit"

className="
mt-4
flex
w-full
items-center
justify-center
gap-2
rounded-lg
bg-blue-600
py-3
font-semibold
text-white
transition
hover:bg-blue-700
disabled:opacity-60
"

>


{
loading ?

<>

<Loader2
size={18}
className="animate-spin"
/>
Searching...

</>
:
<>
<Search
size={18}
/>
Track Booking
</>
}
</button>
</form>
<div
className="
mt-4
rounded-lg
bg-gray-50
px-4
py-3
text-center
text-xs
text-gray-500
"
>
Example:
<span
className="
font-semibold
text-gray-700
"
>
BOOK20260001
</span>
</div>
</div>

);

}