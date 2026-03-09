"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ShippingAddress, AddressFormErrors } from "@/types";
import { validateShippingAddress } from "@/lib/utils";
import { useCheckoutStore } from "@/context/CheckoutContext";
import { INDIAN_STATES } from "@/lib/constants";


export default function AddressForm() {
  const router = useRouter();
  const setShippingAddress = useCheckoutStore((s) => s.setShippingAddress);
  const existingAddress = useCheckoutStore((s) => s.shippingAddress);

  const [form, setForm] = useState<ShippingAddress>(
    existingAddress ?? {
      fullName: "",
      email: "",
      phone: "",
      pinCode: "",
      city: "",
      state: "",
    }
  );

  const [errors, setErrors] = useState<AddressFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ShippingAddress]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateShippingAddress(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setShippingAddress(form);
    router.push("/payment");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Full Name */}
      <Field
        label="Full Name"
        name="fullName"
        type="text"
        placeholder="Priya Sharma"
        value={form.fullName}
        onChange={handleChange}
        error={errors.fullName}
        autoComplete="name"
      />

      {/* Email */}
      <Field
        label="Email Address"
        name="email"
        type="email"
        placeholder="priya@example.com"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />

      {/* Phone */}
      <Field
        label="Phone Number"
        name="phone"
        type="tel"
        placeholder="10-digit mobile number"
        value={form.phone}
        onChange={handleChange}
        error={errors.phone}
        autoComplete="tel"
        maxLength={10}
      />

      {/* PIN Code & City — side by side on md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="PIN Code"
          name="pinCode"
          type="text"
          placeholder="6-digit PIN code"
          value={form.pinCode}
          onChange={handleChange}
          error={errors.pinCode}
          autoComplete="postal-code"
          maxLength={6}
        />
        <Field
          label="City"
          name="city"
          type="text"
          placeholder="Mumbai"
          value={form.city}
          onChange={handleChange}
          error={errors.city}
          autoComplete="address-level2"
        />
      </div>

      {/* State */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="state"
          className="text-sm font-semibold text-gray-700"
        >
          State <span className="text-red-500">*</span>
        </label>
        <select
          id="state"
          name="state"
          value={form.state}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white text-gray-800 outline-none transition-all
            focus:ring-2 focus:ring-eco-light focus:border-eco-green
            ${errors.state ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}
        >
          <option value="">Select your state</option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.state && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <span>⚠</span> {errors.state}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 bg-eco-green hover:bg-eco-dark text-white font-bold text-sm rounded-xl
          transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]
          disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Spinner />
            <span>Saving address…</span>
          </>
        ) : (
          <>
            <span>Continue to Payment</span>
            <span>→</span>
          </>
        )}
      </button>
    </form>
  );
}

//Reusable Field Component 

interface FieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
  maxLength?: number;
}

function Field({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  maxLength,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        maxLength={maxLength}
        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-800 outline-none transition-all
          placeholder:text-gray-400
          focus:ring-2 focus:ring-eco-light focus:border-eco-green
          ${error ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300 bg-white"}`}
      />
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
