"use client";

import React from "react";

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
  if (!contacts.length) {
    return <p className="text-center text-gray-500 mt-4">No contacts found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-white shadow-md flex flex-col justify-start gap-3 rounded-xl p-5 border-r-2 border-[#4f5d6e] hover:shadow-xl transition-shadow duration-300"
        >
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
