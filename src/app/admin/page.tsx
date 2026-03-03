import { getServerSession } from "next-auth";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Admin() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {session.user?.name}
      </h1>

      <p className="mb-4">
        Role: {session.user?.role}
      </p>

      <p>Admin dashboard content here.</p>
    </main>
  );
}