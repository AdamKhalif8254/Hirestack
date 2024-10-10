// DashboardWrapper.tsx
import { getServerAuthSession } from "~/server/auth";
import DashboardClient from "./DashboardClient";

export default async function DashboardWrapper() {
  const session = await getServerAuthSession();

  return <DashboardClient session={session} />;
}
