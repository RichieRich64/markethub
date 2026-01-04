import { getUser } from "@/lib/auth/get-user";
import { logoutAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const user = await getUser();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Logged in as {user?.email}</p>

      <form action={logoutAction}>
        <Button className="mt-4 cursor-pointer">Logout</Button>
      </form>
    </div>
  );
}
