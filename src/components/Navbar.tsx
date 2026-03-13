"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <Image
          src="/logo.png"
          alt="ABD Logo"
          width={60}
          height={60}
        />

        {/* Desktop Menu */}

        <div className="hidden md:flex space-x-6 font-medium">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <Link href="/about" className="hover:text-orange-600">About</Link>
          <Link href="/team" className="hover:text-orange-600">Team</Link>
          <Link href="/join" className="hover:text-orange-600">Join</Link>
          <Link href="/contact" className="hover:text-orange-600">Contact</Link>
          <Link href="/login" className="hover:text-orange-600">Login</Link>
        </div>

        {/* Mobile Hamburger */}

        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}

      {open && (

        <div className="md:hidden flex flex-col px-6 pb-4 space-y-3 font-medium">

          <Link href="/" onClick={()=>setOpen(false)}>Home</Link>
          <Link href="/about" onClick={()=>setOpen(false)}>About</Link>
          <Link href="/team" onClick={()=>setOpen(false)}>Team</Link>
          <Link href="/join" onClick={()=>setOpen(false)}>Join</Link>
          <Link href="/contact" onClick={()=>setOpen(false)}>Contact</Link>
          <Link href="/login" onClick={()=>setOpen(false)}>Login</Link>

        </div>

      )}

    </nav>
  );
}