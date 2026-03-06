"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
     <Image
  src="/logo.png"
  alt="ABD Logo"
  width={60}
  height={60}
/>

      <div className="space-x-6 font-medium">
        <Link href="/" className="hover:text-orange-600">Home</Link>
        <Link href="/about" className="hover:text-orange-600">About</Link>
        <Link href="/join" className="hover:text-orange-600">Join</Link>
        <Link href="/contact" className="hover:text-orange-600">Contact</Link>
        <Link href="/login" className="hover:text-orange-600">Login</Link>
      </div>
    </nav>
  );
}