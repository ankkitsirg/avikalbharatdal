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

  const [screenshot, setScreenshot] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
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
        district: "",
        volunteer: false,
      });

      setScreenshot("");
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <main className="py-16 px-6 md:px-20 bg-gray-100">
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
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* District */}
        <input
          type="text"
          name="district"
          placeholder="District"
          required
          value={form.district}
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
          <h2 className="text-lg font-semibold">
            Pay Membership Fee (₹100)
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