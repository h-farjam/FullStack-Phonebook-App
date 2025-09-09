import ConnectDB from "@/utils/ConnectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();
    return NextResponse.json({ message: "MongoDB connected" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
