"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [members, setMembers] = useState([]);
const updateStatus = async (id: number, status: string) => {
  await fetch("/api/members/update-status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, status }),
  });

  location.reload();
};
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
      <th className="p-2 border">Payment</th>
      <th className="p-2 border">Status</th>
      <th className="p-2 border">Action</th>
    </tr>
  </thead>

  <tbody>
    {members.map((m: any) => (
      <tr key={m.id}>
        <td className="p-2 border">{m.name}</td>
        <td className="p-2 border">{m.phone}</td>
        <td className="p-2 border">{m.district}</td>

        {/* Screenshot */}
        <td className="p-2 border text-center">
          <a
            href={m.payment_screenshot}
            target="_blank"
            className="text-blue-600 underline"
          >
            View
          </a>
        </td>

        {/* Status */}
        <td className="p-2 border">{m.status}</td>

        {/* Action buttons */}
        <td className="p-2 border space-x-2">

          <button
            onClick={() => updateStatus(m.id, "approved")}
            className="bg-green-600 text-white px-2 py-1 rounded"
          >
            Approve
          </button>

          <button
            onClick={() => updateStatus(m.id, "rejected")}
            className="bg-red-600 text-white px-2 py-1 rounded"
          >
            Reject
          </button>

        </td>
      </tr>
    ))}
  </tbody>
</table>
    </main>
  );
}