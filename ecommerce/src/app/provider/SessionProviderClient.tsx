"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
type Props = {
  children: ReactNode;
};
const SessionProviderClient = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderClient;
