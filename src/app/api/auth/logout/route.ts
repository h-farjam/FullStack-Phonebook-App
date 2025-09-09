import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  try {
    const serialized = serialize("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
      sameSite: "strict",
    });
    const response = NextResponse.json(
      { message: "Logout successfully" },
      { status: 200 }
    );
    response.headers.set("Set-Cookie", serialized);
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server Error: " + error.message },
      { status: 500 }
    );
  }
}
