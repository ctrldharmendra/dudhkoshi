

import { redirect } from "next/navigation";
import RegisterClient from "./RegisterClient";

export default async function RegisterPage({ searchParams }) {
  const params = await searchParams;

  const rawToken = params.token || "";

  const [token] = rawToken.split("/c=");

//   console.log(email);
//   console.log(token);

  if (
    token.length <= 10
  ) {
    redirect("/login");
  }

  return (
    <RegisterClient
      token={token}
      // email={email}
    />
  );
}

