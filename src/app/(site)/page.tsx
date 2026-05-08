import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrance & sale Website",
  description: "",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
