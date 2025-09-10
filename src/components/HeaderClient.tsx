"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderClientProps {
  UserLogin: boolean;
}

export default function HeaderClient({ UserLogin }: HeaderClientProps) {
  const router = useRouter();

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
    <header className="p-8 bg-[#4f5d6e] flex justify-center items-center text-white">
      <ul className="flex gap-10">
        {UserLogin ? (
          <li>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link href="/auth/login">Login</Link>
          </li>
        )}
        <li>
          <Link href="/contacts">Contacts</Link>
        </li>
        <li>
          <Link href="/addcontact">AddContact</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </header>
  );
}
