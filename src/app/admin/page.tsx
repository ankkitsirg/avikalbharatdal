"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Admin() {

  const [members, setMembers] = useState<any[]>([]);
  const [stateFilter, setStateFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const states = [...new Set(members.map((m) => m.state))];

  const districts = [
    ...new Set(
      members
        .filter((m) => stateFilter === "all" || m.state === stateFilter)
        .map((m) => m.district)
    ),
  ];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [page, setPage] = useState(1);
  const perPage = 10;

  const fetchMembers = async () => {
    const res = await fetch("/api/members");
    const data = await res.json();
    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

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

  const filteredMembers = members.filter((m) => {

    const phoneMatch = m.phone.includes(search);

    const statusMatch =
      filter === "all" || m.payment_status === filter;

    const stateMatch =
      stateFilter === "all" || m.state === stateFilter;

    const districtMatch =
      districtFilter === "all" || m.district === districtFilter;

    const typeMatch =
      typeFilter === "all" || m.membership_type === typeFilter;

    return (
      phoneMatch &&
      statusMatch &&
      stateMatch &&
      districtMatch &&
      typeMatch
    );
  });

  const totalPages = Math.ceil(filteredMembers.length / perPage);

  const paginatedMembers = filteredMembers.slice(
    (page - 1) * perPage,
    page * perPage
  );

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

  const suspendedMembers = members.filter(
    (m) => m.payment_status === "suspended"
  ).length;

  const exportExcel = () => {

    const data = members.map((m) => ({
      MemberID: m.member_code,
      Name: m.name,
      Phone: m.phone,
      State: m.state,
      District: m.district,
      MembershipType: m.membership_type,
      Plan: m.membership_plan,
      Status: m.payment_status
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

  const badge = (status: string) => {

    if (status === "approved")
      return "bg-green-100 text-green-700";

    if (status === "pending")
      return "bg-yellow-100 text-yellow-700";
    if (status === "suspended")
      return "bg-gray-200 text-gray-700";

    return "bg-red-100 text-red-700";
  };

  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen text-black">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

        <h1 className="text-2xl sm:text-3xl font-bold">
          Members Dashboard
        </h1>

        <button
          onClick={exportExcel}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow w-full sm:w-auto"
        >
          Export Excel
        </button>

      </div>

      {/* DASHBOARD CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Total Members</p>
          <h2 className="text-2xl sm:text-3xl font-bold">{totalMembers}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-yellow-600">Pending</p>
          <h2 className="text-2xl sm:text-3xl font-bold">{pendingMembers}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-green-600">Approved</p>
          <h2 className="text-2xl sm:text-3xl font-bold">{approvedMembers}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-red-600">Rejected</p>
          <h2 className="text-2xl sm:text-3xl font-bold">{rejectedMembers}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-600">Suspended</p>
          <h2 className="text-2xl sm:text-3xl font-bold">
            {suspendedMembers}
          </h2>
        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="flex flex-wrap gap-3 mb-6">

        {/* Search */}
        <input
          placeholder="Search phone number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        {/* Payment Status */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="suspended">Suspended</option>
        </select>

        {/* State Filter */}
        <select
          value={stateFilter}
          onChange={(e) => {
            setStateFilter(e.target.value);
            setDistrictFilter("all");
          }}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">All States</option>
          {states.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* District Filter */}
        <select
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">All Districts</option>
          {districts.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        {/* Membership Type */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">All Membership</option>
          <option value="general">General</option>
          <option value="worker">Active</option>

        </select>

      </div>

      {/* TABLE */}

      <div className="bg-white shadow rounded-xl overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 sm:p-4">Member ID</th>
              <th className="p-3 sm:p-4">Name</th>
              <th className="p-3 sm:p-4">Phone</th>
              <th className="p-3 sm:p-4">State</th>
              <th className="p-3 sm:p-4">District</th>
              <th className="p-3 sm:p-4">Type</th>
              <th className="p-3 sm:p-4">Plan</th>
              <th className="p-3 sm:p-4">Voter ID</th>
              <th className="p-3 sm:p-4">Screenshot</th>
              <th className="p-3 sm:p-4">Status</th>
              <th className="p-3 sm:p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {paginatedMembers.map((m) => (

              <tr key={m.id} className="border-t hover:bg-gray-50">


                <td className="font-semibold text-orange-600">{m.member_code}</td>
                <td>{m.name}</td>
                <td>{m.phone}</td>
                <td>{m.state}</td>
                <td>{m.district}</td>
                <td>{m.membership_type}</td>
                <td>{m.membership_plan}</td>
                <td>{m.voter_id || "-"}</td>

                <td className="p-3 sm:p-4">
                  <button
                    onClick={() => setSelectedImage(m.payment_screenshot)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>

                <td className="p-3 sm:p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${badge(
                      m.payment_status
                    )}`}
                  >
                    {m.payment_status}
                  </span>
                </td>

                <td className="p-3 sm:p-4 flex flex-wrap gap-2">

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
                  <button
                    disabled={m.payment_status === "suspended"}
                    onClick={() => updateStatus(m.id, "suspended")}
                    className="bg-gray-700 text-white px-3 py-1 rounded"
                  >
                    Suspend
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}

      <div className="flex flex-wrap justify-center gap-2 mt-6">

        {Array.from({ length: totalPages }, (_, i) => (

          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${page === i + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
              }`}
          >
            {i + 1}
          </button>

        ))}

      </div>

      {/* MODAL */}

      {selectedImage && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

          <div className="bg-white p-4 rounded-xl relative max-w-lg w-full">

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>

            <img
              src={selectedImage}
              className="max-h-[80vh] w-full object-contain rounded"
            />

          </div>

        </div>

      )}

    </main>
  );
}