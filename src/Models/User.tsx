import { Schema, model, models } from "mongoose";

interface IUserSchema {
  Fname: string;
  Lname: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

const UserSchema = new Schema<IUserSchema>({
  Fname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    trim: true,
  },
  Lname: {
    type: String,
    minlength: 2,
    maxlength: 15,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User = models.User || model<IUserSchema>("User", UserSchema);
export default User;
