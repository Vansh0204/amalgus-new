"use client";
import { RoleProvider } from "@/components/RoleProvider";
import { ToastProvider } from "@/components/ToastProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function ClientLayout({ children }) {
  return (
    <ToastProvider>
      <RoleProvider>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingCTA />
      </RoleProvider>
    </ToastProvider>
  );
}
