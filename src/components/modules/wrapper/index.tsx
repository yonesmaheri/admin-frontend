"use client";
import React, { useState } from "react";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <HeroUIProvider>
        {children} <Toaster />
      </HeroUIProvider>
    </QueryClientProvider>
  );
}

export default Wrapper;
