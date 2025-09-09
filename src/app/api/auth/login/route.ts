import User from "@/Models/User";
import ConnectDB from "@/utils/ConnectDB";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const secret: string = process.env.JWT_SECRET!;

interface Ibody {
  email: string;
  password: string;
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body as Ibody;

  try {
    if (!email || !password) {
      return NextResponse.json(
        { message: "Please fill all inputs" },
        { status: 400 }
      );
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "invalid email" }, { status: 422 });
    }
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 422 }
      );
    }
    //   -------------------------------------------------
    await ConnectDB();
    const isExist = await User.findOne({ email });
    if (!isExist) {
      return NextResponse.json(
        { message: "email or password invalid" },
        { status: 422 }
      );
    }
    // ---------------------------------------------------------
    const isValidPass = await bcrypt.compare(password, isExist.password);
    if (!isValidPass) {
      return NextResponse.json(
        { message: "email or password invalid" },
        { status: 422 }
      );
    }
    // -----------------------------------------------------------
    const token = jwt.sign(
      {
        email: isExist.email,
        Fname: isExist.Fname,
        userID: isExist._id,
        role: isExist.role,
      },
      secret,
      { expiresIn: "7h" }
    );
    // ---------------------------------------------------------------
    const serialized = serialize("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 60 * 60,
      sameSite: "strict",
    });
    // -----------------------------------------------------
    const response = NextResponse.json(
      { message: "user Login SuccssesFully " },
      { status: 200 }
    );
    response.headers.set("Set-Cookie", serialized);
    return response;
    // ----------------------------------------------------------
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server Error" + error.message },
      { status: 500 }
    );
  }
}
