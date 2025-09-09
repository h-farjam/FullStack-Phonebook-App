import { NextResponse } from "next/server";
import { ValidateToken } from "@/utils/ValidationToken";

export async function GET() {
  const user = await ValidateToken();

  if (!user) {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }

  return NextResponse.json(
    {
      loggedIn: true,
      user: {
        email: user.email,
        userId: user.userID,
        role: user.role,
      },
    },
    { status: 200 }
  );
}
