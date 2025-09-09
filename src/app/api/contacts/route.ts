import Contact from "@/Models/Contact";
import ConnectDB from "@/utils/ConnectDB";
import { ValidateToken } from "@/utils/ValidationToken";
import { NextRequest, NextResponse } from "next/server";
const phoneRegex: RegExp = /^09\d{9}$/;

interface UserPayload {
  email: string;
  Fname: string;
  userID: string;
  role: string;
}

interface ContactBody {
  Fname: string;
  Lname: string;
  age: string;
  gender: string;
  phone: string;
}

interface ContactType {
  _id: string;
  Fname: string;
  Lname: string;
  age: string;
  gender: "male" | "female";
  phone: string;
  userID: string;
}

export async function GET() {
  const payload: UserPayload | null = await ValidateToken();
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ConnectDB();
    const contacts: ContactType[] = await Contact.find(
      {
        userID: payload.userID,
      },
      { __v: 0 }
    );
    console.log(contacts);

    return NextResponse.json({ contacts });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user: UserPayload | null = await ValidateToken();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ConnectDB();

    const body: ContactBody = await req.json();
    const { Fname, Lname, age, gender, phone } = body;

    if (!Fname || !Lname || !age || !gender || !phone) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: "Phone invalid" }, { status: 422 });
    }

    const newContact = await Contact.create({
      Fname,
      Lname,
      age,
      gender,
      phone,
      userID: user.userID,
    });

    return NextResponse.json(
      { message: "Contact created successfully", contact: newContact },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
