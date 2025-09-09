import User from "@/Models/User";
import ConnectDB from "@/utils/ConnectDB";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex: RegExp = /^09\d{9}$/;
const passwordRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
interface RegisterBody {
  Fname: string;
  Lname: string;
  email: string;
  password: string;
  phone: string;
}
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body: RegisterBody = await req.json();
  const { Fname, Lname, email, password, phone } = body;

  try {
    if (!Fname || !Lname || !email || !password || !phone) {
      return NextResponse.json(
        { message: "please Fill all Inputs" },
        { status: 400 }
      );
    }
    //   ---------------------------------
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "invalid email" }, { status: 422 });
    }
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 422 }
      );
    }
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ message: "Invalid phone" }, { status: 422 });
    }

    //   ----------------------------------------
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 422 }
      );
    }
    await ConnectDB();
    const isExist = await User.findOne({ email });
    if (isExist) {
      return NextResponse.json(
        { message: "Email is already in use" },
        { status: 409 }
      );
    }
    const isPhone = await User.findOne({ phone });
    if (isPhone) {
      return NextResponse.json(
        { message: "Phone is already in use" },
        { status: 409 }
      );
    }
    //   ---------------------------------------------
    const hashPassword: string = await bcrypt.hash(password, 10);
    const userCount: number = await User.countDocuments();
    await User.create({
      Fname,
      Lname,
      email,
      phone,
      password: hashPassword,
      role: userCount === 0 ? "admin" : "user",
    });
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server Error: " + error.message },
      { status: 500 }
    );
  }
}
