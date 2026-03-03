import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Admin() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="p-10">
      <h1>Welcome, {session.user?.name}</h1>
      <p>Role: {session.user?.role}</p>
    </main>
  );
}