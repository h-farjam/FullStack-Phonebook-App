import HeaderClient from "@/components/HeaderClient";
import { ValidateToken } from "@/utils/ValidationToken";
import React from "react";

export default  async function Header() {
  const user = await ValidateToken();
  const UserLogin: boolean = !!user;

  return (
    <>
      <HeaderClient UserLogin={UserLogin} />
    </>
  );
}


