import mongoose from "mongoose";

const MONGO_URL: string = process.env.DATABASE_URL!;

if (!MONGO_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}
export default async function ConnectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(MONGO_URL);
    console.log("DataBase Has connected");
  }
}
