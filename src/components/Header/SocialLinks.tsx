"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com/yourusername",
    icon: FaInstagram,
    hover: "hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/yourusername",
    icon: FaFacebookF,
    hover: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: FaLinkedinIn,
    hover: "hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@yourusername",
    icon: FaTiktok,
    hover: "hover:bg-gray-100 hover:text-black hover:border-gray-300",
  },
];

export default function SocialLinks() {
  return (
    <div className="hidden xl:flex items-center gap-4">
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        Follow Us
      </span>

      <div className="flex items-center gap-2">
        {socials.map((social) => {
          const Icon = social.icon;

          return (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              aria-label={social.name}
              className={`group flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${social.hover}`}
            >
              <Icon
                size={16}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}