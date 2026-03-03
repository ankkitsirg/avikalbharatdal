"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-orange-600">
        Avikal Bharat Dal
      </h1>

      <div className="space-x-6 font-medium">
        <Link href="/" className="hover:text-orange-600">Home</Link>
        <Link href="/about" className="hover:text-orange-600">About</Link>
        <Link href="/join" className="hover:text-orange-600">Join</Link>
        <Link href="/login" className="hover:text-orange-600">Login</Link>
      </div>
    </nav>
  );
}