import { Analytics } from "@vercel/analytics/react";

import { Home } from "../components/home";

import { getServerSideConfig } from "../config/server";
import { SessionProvider } from "next-auth/react";

const serverConfig = getServerSideConfig();

export default async function App() {
  return (
    <>
      <Home />
      {serverConfig?.isVercel && <Analytics />}
    </>
  );
}
