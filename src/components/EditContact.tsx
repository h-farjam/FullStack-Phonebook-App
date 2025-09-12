"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface ContactType {
  _id: string;
  Fname: string;
  Lname: string;
  age: string;
  gender: "male" | "female";
  phone: string;
  userID: string;
}

interface EditContactProps {
  id: string;
  contact: ContactType;
}

export default function EditContact({ id, contact }: EditContactProps) {
  const router = useRouter();
  const [Fname, setFname] = useState(contact.Fname);
  const [Lname, setLname] = useState(contact.Lname);
  const [age, setAge] = useState(contact.age);
  const [gender, setGender] = useState<"male" | "female">(contact.gender);
  const [phone, setPhone] = useState(contact.phone);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!Fname || !Lname || !age || !gender || !phone) {
      toast.error("All fields are required");
      return;
    }

    if (Fname.length < 2 || Fname.length > 15) {
      toast.error("First Name must be between 2 and 15 characters");
      return;
    }

    if (Lname.length < 2 || Lname.length > 15) {
      toast.error("Last Name must be between 2 and 15 characters");
      return;
    }

    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Invalid phone number");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`/api/contacts/${id}`, { Fname, Lname, age, gender, phone });
      toast.success("Contact updated successfully");
      router.replace("/contacts");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col w-full justify-center h-[100vh] items-center gap-4">
      <h1 className="my-3 text-2xl font-semibold">Edit Contact</h1>
      <form
        className="flex justify-center px-8 w-full md:w-1/2 lg:w-1/3 items-center flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <input
          type="text"
          placeholder="First Name"
          value={Fname}
          onChange={(e) => setFname(e.target.value)}
          className="border w-full rounded-lg px-2 py-2 outline-none border-gray-300 focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={Lname}
          onChange={(e) => setLname(e.target.value)}
          className="border w-full rounded-lg px-2 py-2 outline-none border-gray-300 focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border w-full rounded-lg px-2 py-2 outline-none border-gray-300 focus:border-blue-500"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as "male" | "female")}
          className="border w-full rounded-lg px-2 py-2 outline-none border-gray-300 focus:border-blue-500"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border w-full rounded-lg px-2 py-2 outline-none border-gray-300 focus:border-blue-500"
        />
        <button
          type="submit"
          className="border cursor-pointer px-6 py-2 rounded-lg w-full hover:bg-gray-200 transition"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </section>
  );
}
