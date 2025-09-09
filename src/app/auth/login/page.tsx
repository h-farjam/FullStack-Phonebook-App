import LoginPage from "@/components/LoginPage";
import { ValidateToken } from "@/utils/ValidationToken";
import { redirect } from "next/navigation";

export default async function Login() {
  const user = await ValidateToken();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <>
      <LoginPage />
    </>
  );
}
