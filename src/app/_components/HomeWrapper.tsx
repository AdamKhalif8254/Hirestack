// HomeWrapper.tsx
import { getServerAuthSession } from "~/server/auth";
import HomeClient from "./HomeClient";  // We'll rename the original component to HomeClient

export default async function HomeWrapper() {
  const session = await getServerAuthSession();

  return <HomeClient session={session} />;
}