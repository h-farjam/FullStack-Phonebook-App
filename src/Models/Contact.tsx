import { Schema, model, models } from "mongoose";

interface IContact {
  Fname: string;
  Lname: string;
  age: string;
  gender: string;
  phone: string;
  userID: string;
}

const ContactSchema = new Schema<IContact>({
  Fname: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 15,
  },
  Lname: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 15,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  phone: {
    type: String,
    required: true,
    match: /^09\d{9}$/,
  },
  userID: {
    type: String,
    required: true,
  },
});

const Contact = models.Contact || model<IContact>("Contact", ContactSchema);
export default Contact;
