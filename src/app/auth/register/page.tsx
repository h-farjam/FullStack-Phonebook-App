"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex: RegExp = /^09\d{9}$/;
const passwordRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export default function RegisterPage() {
  const router = useRouter();

  const [Fname, setFname] = useState<string>("");
  const [Lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    // Client-side validation
    if (!Fname || !Lname || !email || !password || !phone) {
      toast.error("Please fill all inputs");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol"
      );
      return;
    }
    if (!phoneRegex.test(phone)) {
      toast.error("Invalid phone number");
      return;
    }

    // API Call
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", {
        Fname,
        Lname,
        email,
        password,
        phone,
      });

      if (res.status === 201) {
        toast.success("User registered successfully");
        router.replace("/auth/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col w-full justify-center h-[100vh] items-center gap-4">
      <h1 className="my-3 text-2xl font-semibold">Register</h1>
      <form
        className="flex justify-center px-8 w-full md:w-1/2 lg:w-1/3 items-center flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full rounded-lg px-2 py-2 outline-none border-gray-300 focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full rounded-lg px-2 py-2 outline-none border-gray-300 focus:border-blue-500"
        />
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
          {loading ? "Registering..." : "Register"}
        </button>
        <span className="flex gap-2">
          Already have an account?{" "}
          <Link className="text-blue-600" href={"/auth/login"}>
            Login
          </Link>
        </span>
      </form>
    </section>
  );
}
