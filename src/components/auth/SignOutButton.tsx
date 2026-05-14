"use client";

import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export function SignOutButton({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/" })}
      className={cn(className)}
    >
      {children}
    </button>
  );
}
