"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Team", link: "/team" },
    { name: "Join", link: "/join" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <nav className="bg-party-light shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO + PARTY NAME */}

        <div className="flex items-center gap-3">

          <Image
            src="/logo.png"
            alt="ABD Logo"
            width={50}
            height={50}
          />

          <div className="leading-tight">
            <h1 className="font-bold text-lg text-black">
              Avikal Bharat Dal
            </h1>
            <p className="text-xs text-gray-500">
              !!अखंड भारत!!समृद्ध भारत!!
            </p>
          </div>

        </div>

        {/* DESKTOP MENU */}

        <div className="hidden md:flex items-center gap-8 font-medium">

          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="relative text-gray-700 hover:text-orange-600 transition group"
            >
              {item.name}

              {/* GRADIENT UNDERLINE */}

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:w-full"></span>

            </Link>
          ))}

        </div>

        {/* RIGHT SIDE BUTTONS */}

        <div className="hidden md:flex items-center gap-4">

          <Link
            href="/login"
            className="text-gray-700 hover:text-orange-600"
          >
            Login
          </Link>

          {/* DONATE BUTTON */}

          <Link
            href="/donate"
            className="bg-party-gold from-orange-500 to-red-500 text-white px-5 py-2 rounded-full shadow hover:scale-105 transition"
          >
            Donate
          </Link>

        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

      </div>

      {/* MOBILE DRAWER */}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >

        <div className="p-6">

          {/* CLOSE BUTTON */}

          <div className="flex justify-between items-center mb-8">

            <h2 className="font-bold text-lg">
              Menu
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="text-2xl"
            >
              ✕
            </button>

          </div>

          {/* MOBILE LINKS */}

          <div className="flex flex-col gap-5 font-medium">

            {menu.map((item) => (

              <Link
                key={item.name}
                href={item.link}
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-orange-600"
              >
                {item.name}
              </Link>

            ))}

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-gray-700"
            >
              Login
            </Link>

            {/* DONATE BUTTON */}

            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 rounded-full"
            >
              Donate
            </Link>

          </div>

        </div>

      </div>

    </nav>
  );
}