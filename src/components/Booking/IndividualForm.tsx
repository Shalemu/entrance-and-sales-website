"use client";

import FormInput from "../Common/FormInput";

export default function IndividualForm() {
  return (
    <div className="grid gap-5 md:grid-cols-2">

      <FormInput
        label="First Name"
        name="first_name"
        placeholder="John"
      />

      <FormInput
        label="Last Name"
        name="last_name"
        placeholder="Doe"
      />

      <FormInput
        label="Email Address"
        type="email"
        name="email"
        placeholder="john@example.com"
      />

      <FormInput
        label="Phone Number"
        name="phone"
        placeholder="+255 712 345 678"
      />

    </div>
  );
}