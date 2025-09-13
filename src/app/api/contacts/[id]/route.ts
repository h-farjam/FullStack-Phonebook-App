import Contact from "@/Models/Contact";
import ConnectDB from "@/utils/ConnectDB";
import { ValidateToken } from "@/utils/ValidationToken";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolve = await params;
  const { id } = resolve;
  console.log("Updating contact with ID:", id);

  const user = await ValidateToken();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
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

  await ConnectDB();

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, userID: user.userID },
    { Fname, Lname, age, gender, phone },
    { new: true }
  );

  if (!updatedContact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Contact updated successfully",
    contact: updatedContact,
  });
}


export async function DELETE(
  req: Request,
  { params }: { params: { id: string } } 
) {
  const { id } = params;
  console.log("Deleting contact with ID:", id);

  const user = await ValidateToken();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ConnectDB();

  const deletedContact = await Contact.findOneAndDelete({
    _id: id,
    userID: user.userID,
  });

  if (!deletedContact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Contact deleted successfully",
    contact: deletedContact,
  });
}
