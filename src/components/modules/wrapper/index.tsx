import React from "react";
import { HeroUIProvider } from "@heroui/react";

function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}

export default Wrapper;
