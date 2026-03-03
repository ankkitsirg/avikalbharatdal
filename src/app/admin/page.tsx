import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import MembersTable from "./MembersTable"; // client component

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Fetch members from DB on server
  const res = await fetch("/api/members");
  const members = await res.json();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {session.user?.name}
      </h1>
      <p>Role: {session.user?.role}</p>

      <MembersTable initialMembers={members} />
    </main>
  );
}