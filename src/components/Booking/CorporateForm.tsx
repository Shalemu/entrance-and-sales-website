"use client";

import { useState } from "react";
import FormInput from "../Common/FormInput";
import { createCustomer, CustomerType } from "@/lib/customer-api";
import SuccessCard from "../Common/SuccessCard";

type Props = {
  type: CustomerType;
  onSuccess: () => void;
};

export default function CorporateForm({
  type,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    company_name: "",
    email: "",
    phone: "",
    tin_number: "",
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
      await createCustomer(type, form);

      // Show success card
      setShowSuccess(true);

      // Automatically continue after 2 seconds
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };
  if (showSuccess) {
  return <SuccessCard />;
}
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <FormInput
          label="Company Name"
          name="company_name"
          placeholder="e.g. Faramas Ltd"
          value={form.company_name}
          onChange={handleChange}
        />

        <FormInput
          label="Email Address"
          type="email"
          name="email"
          placeholder="info@company.com"
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
          label="TIN Number"
          name="tin_number"
          placeholder="123456789"
          value={form.tin_number}
          onChange={handleChange}
        />

        <FormInput
          label="Company Address"
          name="address"
          placeholder="Enter company address"
          value={form.address}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Save Company
        </button>
      </div>
    </form>
  );
}