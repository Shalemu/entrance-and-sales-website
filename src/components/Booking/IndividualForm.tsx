"use client";

import { useState } from "react";
import FormInput from "../Common/FormInput";
import { createCustomer, CustomerType } from "@/lib/customer-api";
import SuccessCard from "../Common/SuccessCard";

type Props = {
  type: CustomerType;
  onSuccess: () => void;
};

export default function IndividualForm({
  type,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  // Success state
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

      // Move to next step after 2 seconds
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  // Show success screen instead of the form
  if (showSuccess) {
  return <SuccessCard />;
}

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
      <FormInput
        label="First Name"
        name="first_name"
        placeholder="Enter first name"
        value={form.first_name}
        onChange={handleChange}
      />

      <FormInput
        label="Last Name"
        name="last_name"
        placeholder="Enter last name"
        value={form.last_name}
        onChange={handleChange}
      />

      <FormInput
        label="Email Address"
        type="email"
        name="email"
        placeholder="example@domain.com"
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

      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Submit Individual
        </button>
      </div>
    </form>
  );
}