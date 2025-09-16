"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HeaderClientProps {
  UserLogin: boolean;
}

export default function HeaderClient({ UserLogin }: HeaderClientProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/auth/login");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-[#6b8173] text-white p-4 md:p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Phonebook App</h1>

        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden block"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Menu Items */}
        <ul
          className={`flex flex-col md:flex-row gap-4 md:gap-10 absolute md:static bg-[#6b8173] w-full md:w-auto left-0 md:left-auto top-16 md:top-auto p-4 md:p-0 transition-all ${
            isOpen ? "block" : "hidden md:flex"
          }`}
        >
          {UserLogin ? (
            <li>
              <button
                onClick={handleLogout}
                className="hover:underline cursor-pointer w-full text-left md:text-center"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                className="hover:underline cursor-pointer w-full text-left md:text-center"
                href="/auth/login"
              >
                Login
              </Link>
            </li>
          )}
          <li>
            <Link
              className="hover:underline cursor-pointer w-full text-left md:text-center"
              href="/contacts"
            >
              Contacts
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline cursor-pointer w-full text-left md:text-center"
              href="/addcontacts"
            >
              AddContact
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline cursor-pointer w-full text-left md:text-center"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
