"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactNode } from "react";

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

export function QueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
