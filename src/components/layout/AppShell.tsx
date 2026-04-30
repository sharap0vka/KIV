import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StatusBar } from "@/components/layout/StatusBar";
import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <Header />
      <StatusBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
