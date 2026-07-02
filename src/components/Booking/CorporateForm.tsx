"use client";

import FormInput from "../Common/FormInput";

export default function CorporateForm() {
  return (
    <div className="grid gap-5 md:grid-cols-2">

      <FormInput
        label="Company Name"
        name="company_name"
        placeholder="faramas Ltd"
      />

      <FormInput
        label="Email Address"
        type="email"
        name="email"
        placeholder="info@faramas.com"
      />

      <FormInput
        label="Phone Number"
        name="phone"
        placeholder="+255 767 983 3236"
      />

      <FormInput
        label="TIN Number"
        name="tin_number"
        placeholder="123456789"
      />

      <div className="md:col-span-2">
        <FormInput
          label="Company Address"
          name="address"
          placeholder="Company address"
        />
      </div>

    </div>
  );
}