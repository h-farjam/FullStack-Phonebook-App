"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ContactFormData {
  Fname: string;
  Lname: string;
  age: string; // string type
  gender: "male" | "female";
  phone: string;
}

function AddContacts() {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactFormData>({
    Fname: "",
    Lname: "",
    age: "",
    gender: "male",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { Fname, Lname, age, phone } = formData;

    if (!Fname || !Lname || !age || !phone) {
      toast.error("All fields are required");
      return false;
    }

    if (Fname.length < 2 || Fname.length > 15) {
      toast.error("First name must be between 2 and 15 characters");
      return false;
    }

    if (Lname.length < 2 || Lname.length > 15) {
      toast.error("Last name must be between 2 and 15 characters");
      return false;
    }

    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be a valid 11-digit number starting with 09");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await axios.post("/api/contacts", formData);
      toast.success(res.data.message || "Contact added successfully ");

      setFormData({
        Fname: "",
        Lname: "",
        age: "",
        gender: "male",
        phone: "",
      });

      router.replace("/contacts");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach((msg: any) =>
          toast.error(msg as string)
        );
      } else {
        toast.error(error.response?.data?.error || "Something went wrong");
      }
    }
  };

  return (
    <div className="flex my-5 justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Add New Contact
        </h2>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="Fname"
            value={formData.Fname}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter first name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="Lname"
            value={formData.Lname}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter last name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Age</label>
          <input
            type="text" // string type
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter age"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="e.g. 09123456789"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200"
        >
          Save Contact
        </button>
      </form>
    </div>
  );
}

export default AddContacts;
