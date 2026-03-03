"use client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { useState,useEffect } from "react";

export default async function Admin() {
  const session = await getServerSession(authOptions);
 const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);
  if (!session) {
    redirect("/login");
  }

  return (
    <>
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {session.user?.name}
      </h1>
      <p>Role: {session.user?.role}</p>
      <p>Admin dashboard content here.</p>
    </main>
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Registered Members</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">District</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m: any, i) => (
            <tr key={i}>
              <td className="p-2 border">{m.name}</td>
              <td className="p-2 border">{m.phone}</td>
              <td className="p-2 border">{m.district}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
    </>
  );
}

//"use client";

