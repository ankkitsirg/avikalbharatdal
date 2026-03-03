"use client";

import { useState } from "react";

export default function Join() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    district: "",
    volunteer: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Form submitted (Database not connected yet)");
    console.log(form);
  };

  return (
    <main className="py-16 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center mb-10">
        Join Avikal Bharat Dal
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-md p-8 rounded-lg space-y-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="district"
          placeholder="District"
          required
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="volunteer"
            onChange={handleChange}
          />
          <span>I want to volunteer</span>
        </label>

        <label className="flex items-start space-x-2 text-sm">
          <input type="checkbox" required />
          <span>
            I agree to share my data with the party as per the Privacy Policy.
          </span>
        </label>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition"
        >
          Submit
        </button>
      </form>
    </main>
  );
}