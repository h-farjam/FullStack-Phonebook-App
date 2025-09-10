import { ValidateToken } from "@/utils/ValidationToken";
import { redirect } from "next/navigation";
import React from "react";

export default async function dashboard() {
  const user = await ValidateToken();
  if (!user) {
    redirect("/auth/login");
  }
  return(
  <>
  <h1 className="text-3xl my-10 text-center">Welcom -- {user.email}</h1>

  </>  
  
  
  );
}
