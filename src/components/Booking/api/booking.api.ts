import { apiFetch } from "@/lib/api";


// CREATE BOOKING
export const postBooking = async (
  payload:any
)=>{

  const response = await apiFetch(
    "/bookings",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    }
  );


  return response.data;

};



// TRACK BOOKING
export const trackBooking = async (
  reference:string
)=>{

  const response = await apiFetch(
    `/bookings/track/${reference}`,
    {
      method:"GET"
    }
  );


  return response;

};