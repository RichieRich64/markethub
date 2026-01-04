import Link from "next/link";
import { getUser } from "@/lib/auth/get-user";

export default async function Navbar() {
  const user = await getUser();

  return (
    <nav className="flex gap-4 p-4 border-b">
      <Link href="/">Home</Link>

      {user ? (
        <Link href="/dashboard">Dashboard</Link>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
