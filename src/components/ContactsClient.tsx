"use client";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
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

interface Props {
  contacts: ContactType[];
}

export default function ContactsClient({ contacts }: Props) {
  // 🔹 state برای لیست مخاطب‌ها
  const [contactList, setContactList] = useState<ContactType[]>(contacts);

  if (!contactList.length) {
    return <p className="text-center text-gray-500 mt-4">No contacts found.</p>;
  }

  const DeleteHandler = async (contactId: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this contact?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/contacts/${contactId}`);
      toast.success("Contact deleted successfully.");
      setContactList((prev) => prev.filter((c) => c._id !== contactId));
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact.");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {contactList.map((contact) => (
        <div
          key={contact._id}
          className="bg-white relative shadow-md flex flex-col justify-start gap-3 rounded-xl p-5 border-r-2 border-[#4f5d6e] hover:shadow-xl transition-shadow duration-300"
        >
          <div className="absolute h-full pr-4 flex flex-col justify-center items-center gap-5 pt-4 right-0">
            <Link href={`/contacts/${contact._id}/edit`}>
              <CiEdit size={20} className="cursor-pointer text-green-500" />
            </Link>
            <MdDeleteOutline
              onClick={() => DeleteHandler(contact._id)}
              size={20}
              className="cursor-pointer text-red-500"
            />
            <FaRegHeart size={18} className="cursor-pointer" />
          </div>

          <h2 className="text-xl font-semibold mb-2">
            {contact.Fname} {contact.Lname}
          </h2>
          <hr />
          <p>
            <span className="font-medium">Age:</span> {contact.age}
          </p>
          <p>
            <span className="font-medium">Gender:</span> {contact.gender}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {contact.phone}
          </p>
        </div>
      ))}
    </div>
  );
}
