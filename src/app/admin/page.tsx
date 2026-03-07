"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [members, setMembers] = useState([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const updateStatus = async (id: number, status: string) => {
    await fetch("/api/members/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    //location.reload();
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
                <button
                  onClick={() => setSelectedImage(m.payment_screenshot)}
                  className="text-blue-600 underline"
                >
                  View
                </button>
              </td>

              {/* Status */}
              <td className="p-2 border">{m.payment_status}</td>

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
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">

          <div className="bg-white p-4 rounded-lg relative max-w-lg">

            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-xl font-bold"
            >
              ✕
            </button>

            {/* Screenshot */}
            <img
              src={selectedImage}
              alt="Payment Screenshot"
              className="max-h-[80vh] rounded"
            />

          </div>

        </div>
      )}
    </main>
  );
}