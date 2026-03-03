"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  return (
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
  );
}