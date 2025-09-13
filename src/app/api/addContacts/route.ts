import { NextRequest, NextResponse } from "next/server";
import Contact from "@/Models/Contact";
import ConnectDB from "@/utils/ConnectDB";
import { ValidateToken } from "@/utils/ValidationToken";

interface ContactBody {
  Fname: string;
  Lname: string;
  age: string;
  gender: "male" | "female";
  phone: string;
}

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();

    const user = await ValidateToken();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: ContactBody = await req.json();
    const { Fname, Lname, age, gender, phone } = body;

    if (!Fname || !Lname || !age || !gender || !phone) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 422 }
      );
    }

    const newContact = await Contact.create({
      ...body,
      userID: user.userID,
    });

    return NextResponse.json(
      { message: "Contact created successfully", contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
