"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Admin() {

  const [members, setMembers] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [page, setPage] = useState(1);
  const perPage = 10;

  // ---------------- FETCH MEMBERS ----------------

  const fetchMembers = async () => {
    const res = await fetch("/api/members");
    const data = await res.json();
    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ---------------- UPDATE STATUS ----------------

  const updateStatus = async (id: number, status: string) => {

    const res = await fetch("/api/members/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    if (!res.ok) {
      alert("Failed to update status");
      return;
    }

    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, payment_status: status } : m
      )
    );
  };

  // ---------------- FILTER + SEARCH ----------------

  const filteredMembers = members.filter((m) => {

    const phoneMatch = m.phone.includes(search);

    const statusMatch =
      filter === "all" || m.payment_status === filter;

    return phoneMatch && statusMatch;
  });

  // ---------------- PAGINATION ----------------

  const totalPages = Math.ceil(filteredMembers.length / perPage);

  const paginatedMembers = filteredMembers.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // ---------------- DASHBOARD COUNTS ----------------

  const totalMembers = members.length;

  const pendingMembers = members.filter(
    (m) => m.payment_status === "pending"
  ).length;

  const approvedMembers = members.filter(
    (m) => m.payment_status === "approved"
  ).length;

  const rejectedMembers = members.filter(
    (m) => m.payment_status === "rejected"
  ).length;

  // ---------------- EXPORT EXCEL ----------------

  const exportExcel = () => {

    const data = members.map((m) => ({
      Name: m.name,
      Phone: m.phone,
      District: m.district,
      Status: m.payment_status,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Members");

    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "members.xlsx");
  };

  // ---------------- STATUS BADGE ----------------

  const badge = (status: string) => {

    if (status === "approved")
      return "bg-green-100 text-green-700";

    if (status === "pending")
      return "bg-yellow-100 text-yellow-700";

    return "bg-red-100 text-red-700";
  };

  return (
    <main className="p-8 bg-gray-50 min-h-screen bg-gray-100 text-black">

      {/* PAGE HEADER */}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Members Dashboard</h1>

        <button
          onClick={exportExcel}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Export Excel
        </button>
      </div>

      {/* DASHBOARD CARDS */}

      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">Total Members</p>
          <h2 className="text-3xl font-bold">{totalMembers}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-yellow-600">Pending</p>
          <h2 className="text-3xl font-bold">{pendingMembers}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-green-600">Approved</p>
          <h2 className="text-3xl font-bold">{approvedMembers}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-red-600">Rejected</p>
          <h2 className="text-3xl font-bold">{rejectedMembers}</h2>
        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="flex gap-4 mb-6">

        <input
          placeholder="Search phone number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-64"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

      </div>

      {/* TABLE */}

      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">District</th>
              <th className="p-4">Screenshot</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {paginatedMembers.map((m) => (

              <tr key={m.id} className="border-t hover:bg-gray-50">

                <td className="p-4">{m.name}</td>
                <td className="p-4">{m.phone}</td>
                <td className="p-4">{m.district}</td>

                <td className="p-4">
                  <button
                    onClick={() => setSelectedImage(m.payment_screenshot)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${badge(
                      m.payment_status
                    )}`}
                  >
                    {m.payment_status}
                  </span>

                </td>

                <td className="p-4 space-x-2">

                  <button
                    disabled={m.payment_status === "approved"}
                    onClick={() => updateStatus(m.id, "approved")}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    disabled={m.payment_status === "rejected"}
                    onClick={() => updateStatus(m.id, "rejected")}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}

      <div className="flex justify-center gap-2 mt-6">

        {Array.from({ length: totalPages }, (_, i) => (

          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>

        ))}

      </div>

      {/* SCREENSHOT MODAL */}

      {selectedImage && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-white p-4 rounded-xl relative max-w-xl">

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>

            <img
              src={selectedImage}
              className="max-h-[80vh] rounded"
            />

          </div>

        </div>

      )}

    </main>
  );
}