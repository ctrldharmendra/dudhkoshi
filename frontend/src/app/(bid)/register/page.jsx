

import { redirect } from "next/navigation";
import RegisterClient from "./RegisterClient";

export default async function RegisterPage({ searchParams }) {
  const params = await searchParams;

  const rawToken = params.token || "";

  const [token, email] = rawToken.split("/c=");

//   console.log(email);
//   console.log(token);

  if (
    token.length <= 10 ||
    !email ||
    email.length <= 5 ||
    !email.includes("@")
  ) {
    redirect("/login");
  }

  return (
    <RegisterClient
      token={token}
      email={email}
    />
  );
}