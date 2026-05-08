import Signin from "@/components/Booking/trackBooking";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Booking Page | Entrance & Sale Website",
  description: "",
  // other metadata
};

const SigninPage = () => {
  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
