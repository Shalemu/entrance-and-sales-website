"use client";

import React from "react";
import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden bg-white border-t">

      {/* ================= Footer Top ================= */}
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-col md:flex-row gap-10 justify-between py-14">

          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
                ES
              </div>
              <h2 className="text-lg font-semibold text-dark">
                Entrance & Sale System
              </h2>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              A modern system for managing entrances, services, and sales with
              efficiency and simplicity.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <h3 className="font-semibold text-dark mb-3">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/about" className="hover:text-primary">About</a></li>
                <li><a href="/contact" className="hover:text-primary">Contact</a></li>
              
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-dark mb-3">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/help" className="hover:text-primary">Help Center</a></li>
                <li><a href="/privacy" className="hover:text-primary">Privacy</a></li>
                <li><a href="/terms" className="hover:text-primary">Terms</a></li>
              </ul>
            </div>
          </div>

          {/* Contact / Status */}
          <div className="text-sm text-gray-600">
            <h3 className="font-semibold text-dark mb-3">Contact</h3>

            <p className="mb-2">Ubungo, Dar es Salaam</p>
            <p className="mb-2">
              <a href="tel:+255767983236" className="hover:text-primary">
                (+255) 767-983-236
              </a>
            </p>
            <p className="mb-4">
              <a href="mailto:shadrackmussa97@gmail.com" className="hover:text-primary">
                support@entrance-system.com
              </a>
            </p>

          </div>

        </div>
      </div>

      {/* ================= Footer Bottom ================= */}
      <div className="bg-gray-50 border-t">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">

          <div className="flex flex-col md:flex-row gap-5 items-center justify-between py-5">

            {/* Left */}
            <p className="text-xs text-gray-600 text-center md:text-left">
              © {year} Entrance & Sale System. Built with care and performance in mind.
            </p>

            {/* Center Links */}
            <div className="flex gap-5 text-xs text-gray-600">
              <a className="hover:text-primary" href="/privacy">Privacy</a>
              <a className="hover:text-primary" href="/terms">Terms</a>
              <a className="hover:text-primary" href="/support">Support</a>
            </div>

            {/* Right status */}
            <div className="flex items-center gap-2 text-xs text-gray-600">
         
              <span>v1.0.0 stable</span>
            </div>

          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;