"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="block shrink-0">
      <Image
        src="/images/logo/faramas_logo.png"
        alt="Faramas"
        width={150}
        height={40}
        priority
        style={{
          width: "150px",
          height: "40px",
          objectFit: "contain",
        }}
      />
    </Link>
  );
}