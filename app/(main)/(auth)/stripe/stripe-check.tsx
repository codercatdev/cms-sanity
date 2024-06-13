"use client";

import { useToast } from "@/components/ui/use-toast";
import { ccdSignOut } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StripeCheck() {
  const router = useRouter();
  const { toast } = useToast();

  toast({
    description: "Stripe change(s) need a new login...",
  });

  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    await ccdSignOut();
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="container p-6 sm:p-8 mx-auto">
      <div className="flex justify-center items-center text-center text-xl">
        Redirecting...
      </div>
    </div>
  );
}
