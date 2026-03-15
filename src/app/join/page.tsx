"use client";

import { useState } from "react";
import districtsData from "@/data/indiaStateDistrict.json";
export default function Join() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    district: "",
    address: "",
    voter_id: "",
    membership_type: "general",
    membership_plan: "annual",
    volunteer: false,
  });

  const [screenshot, setScreenshot] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (name === "state") {
      setForm({
        ...form,
        state: value,
        district: "",
      });
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    // limit image size to 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be smaller than 2MB");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setScreenshot(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!screenshot) {
      alert("Please upload payment screenshot");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        payment_screenshot: screenshot,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (res.ok) {
      alert("Registration submitted! Waiting for payment verification.");

      setForm({
        name: "",
        phone: "",
        email: "",
        state: "",
        district: "",
        address: "",
        voter_id: "",
        membership_plan: "annual",
        membership_type: "general",
        volunteer: false,
      });

      setScreenshot("");
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  const stateDistrictMap = districtsData.reduce((acc: any, item: any) => {
    const state = item.StateName;
    const district = item["DistrictName(InEnglish)"];

    if (!acc[state]) {
      acc[state] = [];
    }

    acc[state].push(district);

    return acc;
  }, {});
  const states = Object.keys(stateDistrictMap);

  let fee = 10;

  if (form.membership_type === "general" && form.membership_plan === "annual") fee = 10;
  if (form.membership_type === "general" && form.membership_plan === "lifetime") fee = 1200;
  if (form.membership_type === "active" && form.membership_plan === "annual") fee = 100;
  if (form.membership_type === "active" && form.membership_plan === "lifetime") fee = 2100;
  return (
    <main className="py-16 px-6 md:px-20 bg-gray-100 text-black">
      <h1 className="text-4xl font-bold text-center mb-10">
        Join Avikal Bharat Dal
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl text-black mx-auto bg-white shadow-md p-8 rounded-lg space-y-6"
      >

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        {/* State */}
        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select State</option>

          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {/* District */}
        <select
          name="district"
          value={form.district}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select District</option>

          {form.state &&
            stateDistrictMap[form.state].map((district: string) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
        </select>
        {/* Address */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        {/* Voter Id */}
        <input
          type="text"
          name="voter_id"
          placeholder="Voter ID"
          value={form.voter_id}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        {/* Volunteer */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="volunteer"
            checked={form.volunteer}
            onChange={handleChange}
          />
          <span>I want to volunteer</span>
        </label>

        {/* QR Payment Section */}
        <div className="text-center space-y-4">
          <label className="block font-medium">Membership Type</label>

          <select
            name="membership_type"
            value={form.membership_type}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="general">General Member</option>
            <option value="active">Active Member</option>
          </select>

          <label className="block font-medium">Membership Plan</label>

          <select
            name="membership_plan"
            value={form.membership_plan}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="annual">Annual</option>
            <option value="lifetime">Lifetime</option>
          </select>

          <h2 className="text-lg font-semibold">
            Pay Membership Fee (₹{fee})
          </h2>
          <p className="text-gray-600 text-sm">
            Scan the QR code below and upload payment screenshot
          </p>

          <img
            src="/upi_qr.jpeg"
            alt="UPI QR"
            className="mx-auto w-56 border rounded-lg"
          />

          <p className="text-sm text-gray-500">
            UPI ID: avikalbharatdal@upi
          </p>
        </div>

        {/* Upload Screenshot */}
        <div>
          <label className="block mb-2 font-medium">
            Upload Payment Screenshot
          </label>

          <input
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />

          {/* Preview */}
          {screenshot && (
            <img
              src={screenshot}
              alt="Payment preview"
              className="mt-4 w-40 mx-auto border rounded"
            />
          )}
        </div>

        {/* Privacy */}
        <label className="flex items-start space-x-2 text-sm">
          <input type="checkbox" required />
          <span>
            I agree to share my data with the party (as per the Privacy Policy).
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition"
        >
          {loading ? "Submiting..." : "Submit Registration"}
        </button>

      </form>
    </main>
  );
}