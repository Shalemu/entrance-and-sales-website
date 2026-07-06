"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center transition-opacity duration-300 hover:opacity-90"
    >
      <Image
        src="/images/logo/faramas_logo.png"
        alt="Faramas"
        width={150}
        height={40}
        priority
        className="h-auto w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </Link>
  );
}