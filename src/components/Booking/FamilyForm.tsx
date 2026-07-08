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
};

export default function FamilyForm({
  type,
  onSuccess,
  onCustomerSaved,
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
const { setCustomer } = useBookingCart();

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {

    const response = await createCustomer(
      type,
      {
        company_name: form.family_name,
        email: form.email,
        phone: form.phone,
        id_number: form.id_number,
        address: form.address,
      }
    );

    onCustomerSaved(
      response.data ?? response
    );
    
        // Store customer globally
    setCustomer(response.data);

    // Existing callback
    onCustomerSaved(response.data);

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