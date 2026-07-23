"use client";

import { useState } from "react";
import FormInput from "../Common/FormInput";
import { createCustomer, CustomerType } from "@/lib/customer-api";
import SuccessCard from "../Common/SuccessCard";
import { useBookingCart } from "@/context/BookingCartContext";

type Props = {
  type: CustomerType;
  onSuccess: () => void;
  onCustomerSaved: (customer: any) => void;
  initialValues?: any;
};

export default function SocialGroupForm({
  type,
  onSuccess,
  onCustomerSaved,
  initialValues,
}: Props) {
  // seeded once from whatever was already saved, so coming back to fix
  // a mistake doesn't wipe out the fields that were already correct
  const [form, setForm] = useState(() => ({
    social_group_name:
      initialValues?.social_group_name ??
      initialValues?.company_name ??
      "",
    email: initialValues?.email ?? "",
    phone: initialValues?.phone ?? "",
    id_number: initialValues?.id_number ?? "",
    address: initialValues?.address ?? "",
  }));

  const [showSuccess, setShowSuccess] = useState(false);

  const { setCustomer } = useBookingCart();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await createCustomer(type, {
        company_name: form.social_group_name, // Change this if your API expects social_group_name
        email: form.email,
        phone: form.phone,
        id_number: form.id_number,
        address: form.address,
      });

      const customer = response.data ?? response;

      setCustomer(customer);
      onCustomerSaved(customer);

      setShowSuccess(true);

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
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 md:grid-cols-2"
    >
      <FormInput
        label="Social Group Name"
        name="social_group_name"
        placeholder="Enter group name"
        value={form.social_group_name}
        onChange={handleChange}
      />

      <FormInput
        label="Email Address"
        type="email"
        name="email"
        placeholder="group@example.com"
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
          className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
        >
          Submit Social Group
        </button>
      </div>
    </form>
  );
}