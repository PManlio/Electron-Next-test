'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeComponent from "./components/HomeComponent";

const queryClient = new QueryClient()

export default function Home() {

  return (
    <QueryClientProvider client={queryClient}>
      <HomeComponent prop="hello" />
    </QueryClientProvider>
    
  );
}
