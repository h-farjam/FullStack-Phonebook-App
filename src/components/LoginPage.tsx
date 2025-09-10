"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import toast from "react-hot-toast";

const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PassRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let [loding, setLoding] = useState<boolean>(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const loginHandler = async () => {
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!PassRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters, include uppercase, lowercase and a number"
      );
      return;
    }
    setLoding(true);
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      if (res.status == 200) {
        console.log(res.data);
        toast.success("Login successful");
        router.replace("/dashboard");
        router.refresh();
        setLoding(false);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <section className="flex flex-col w-full justify-center h-[100vh] items-center gap-4">
        <h1 className="my-3 text-2xl font-semibold">Login</h1>
        <form
          className="flex justify-center px-8 w-full md:w-1/2 md:px-1 lg:w-1/3 items-center flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            loginHandler();
          }}
        >
          <input
            type="email"
            placeholder="Please Enter your Email"
            value={email}
            onChange={handleEmail}
            className={`border w-full rounded-lg px-2 py-2 outline-none ${
              email.length === 0
                ? "border-red-500"
                : emailRegex.test(email)
                ? "border-green-500"
                : "border-red-500"
            }`}
          />
          <input
            type="password"
            placeholder="Please Enter your Password"
            value={password}
            onChange={handlePass}
            className={`border w-full rounded-lg px-2 py-2 outline-none ${
              password.length === 0
                ? "border-red-500"
                : PassRegex.test(password)
                ? "border-green-500"
                : "border-red-500"
            }`}
          />
          <button
            type="submit"
            className="border cursor-pointer px-6 py-2 rounded-lg w-full hover:bg-gray-200 transition"
          >
            {loding ? "Loding...." : "Login"}
          </button>
          <span className="flex gap-2">
            Don't you have an account? 
            <Link className="text-blue-600" href={"/auth/register"}>
              Register
            </Link>
          </span>
        </form>
      </section>
    </>
  );
}
