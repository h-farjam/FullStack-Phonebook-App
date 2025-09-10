import ContactsClient from "@/components/ContactsClient";
import Contact from "@/Models/Contact";
import ConnectDB from "@/utils/ConnectDB";
import { ValidateToken } from "@/utils/ValidationToken";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

interface ContactType {
  _id: string;
  Fname: string;
  Lname: string;
  age: string;
  gender: "male" | "female";
  phone: string;
  userID: string;
}

export default async function AllContacts() {
  const user = await ValidateToken();
  if (!user) redirect("/auth/login");

  await ConnectDB();

  const contacts = (
    await Contact.find({ userID: user.userID }, { __v: 0 }).lean<
      ContactType[]
    >()
  ).map((contact) => ({
    ...contact,
    _id: contact._id.toString(),
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">All Contacts</h1>
      <ContactsClient contacts={contacts} />
    </div>
  );
}
