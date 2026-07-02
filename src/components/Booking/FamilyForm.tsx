"use client";

import FormInput from "../Common/FormInput";

export default function FamilyForm() {
  return (
    <div className="grid gap-5 md:grid-cols-2">

      <FormInput
        label="Family Name"
        name="family_name"
        placeholder="Enter family name"
      />

      <FormInput
        label="Email Address"
        type="email"
        name="email"
        placeholder="family@example.com"
      />

      <FormInput
        label="Phone Number"
        name="phone"
        placeholder="+255 712 345 678"
      />

      <FormInput
        label="ID Number"
        name="id_number"
        placeholder="National ID"
      />

      <div className="md:col-span-2">
        <FormInput
          label="Address"
          name="address"
          placeholder="Enter address"
        />
      </div>

    </div>
  );
}