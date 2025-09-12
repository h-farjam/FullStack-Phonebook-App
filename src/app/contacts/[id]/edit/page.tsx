import EditContact from "@/components/EditContact";
import Contact from "@/Models/Contact";
import ConnectDB from "@/utils/ConnectDB";

interface ParamsProp {
  params: Promise<{ id: string }>;
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

export default async function page({ params }: ParamsProp) {
  const { id } = await params;

  await ConnectDB();

  const contact = await Contact.findById(id, { __v: 0 }).lean<ContactType>();
  if (!contact) {
    return <div>Contact not found</div>;
  }

  const ClientContact = {
    ...contact,
    _id: contact._id.toString(),
    userID: contact.userID.toString(),
  };

  return <EditContact id={id} contact={ClientContact} />;
}
