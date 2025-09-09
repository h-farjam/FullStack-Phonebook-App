import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="p-8 bg-[#2d2d2d] flex justify-center items-center text-white">
      <ul className="flex gap-3">
        <li>
          <Link href={"/auth/login"}>login</Link>
        </li>
        <li>
          <Link href={"/contacts"}>Contacts</Link>
        </li>
        <li>
          <Link href={"/dashboard"}>dashboard</Link>
        </li>
        <li>
          <Link href={"/addcontact"}>AddContact</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
