"use client";

import { useState, useEffect } from "react";

type Member = { name: string; phone: string; district: string };

export default function MembersTable({ initialMembers }: { initialMembers: Member[] }) {
  const [members, setMembers] = useState<Member[]>(initialMembers);

  // Optional: refresh members dynamically
  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  return (
    <div className="p-10">
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
          {members.map((m, i) => (
            <tr key={i}>
              <td className="p-2 border">{m.name}</td>
              <td className="p-2 border">{m.phone}</td>
              <td className="p-2 border">{m.district}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}