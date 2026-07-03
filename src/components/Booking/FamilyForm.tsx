"use client";

import { useState } from "react";
import FormInput from "../Common/FormInput";
import SuccessCard from "../Common/SuccessCard";
import { createCustomer, CustomerType } from "@/lib/customer-api";

type Props = {
  type: CustomerType;
  onSuccess: () => void;
};

export default function FamilyForm({
  type,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    family_name: "",
    email: "",
    phone: "",
    id_number: "",
    address: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const names = form.family_name.trim().split(" ");

      await createCustomer(type, {
        first_name: names[0] || "",
        last_name: names.slice(1).join(" ") || names[0] || "",
        email: form.email,
        phone: form.phone,
        id_number: form.id_number,
        address: form.address,
      });

      // Show success card
      setShowSuccess(true);

      // Automatically continue after 2 seconds
      setTimeout(() => {
        onSuccess();
      }, 2000);

    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  // Show success card instead of the form
  if (showSuccess) {
    return (
      <SuccessCard
        title="Family Created Successfully"
        message="Redirecting to Service & Package..."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
      <FormInput
        label="Family Name"
        name="family_name"
        placeholder="Enter family name"
        value={form.family_name}
        onChange={handleChange}
      />

      <FormInput
        label="Email Address"
        type="email"
        name="email"
        placeholder="family@example.com"
        value={form.email}
        onChange={handleChange}
      />

      <FormInput
        label="Phone Number"
        name="phone"
        placeholder="+255 7XX XXX XXX"
        value={form.phone}
        onChange={handleChange}
      />

      <FormInput
        label="ID Number"
        name="id_number"
        placeholder="National ID number"
        value={form.id_number}
        onChange={handleChange}
      />

      <FormInput
        label="Address"
        name="address"
        placeholder="Enter full address"
        value={form.address}
        onChange={handleChange}
      />

      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit Family
        </button>
      </div>
    </form>
  );
}