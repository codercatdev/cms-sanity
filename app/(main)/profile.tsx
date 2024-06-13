/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import {} from "firebase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import GoPro from "@/components/user-go-pro";
import { useRouter } from "next/navigation";
import { ccdSignOut, openStripePortal } from "@/lib/firebase";

export default function Profile() {
  const [isClient, setIsClient] = useState(false);
  const [cookies, setCookie] = useCookies(["app.idt"]);
  const [jwt, setJwt] = useState<any | null>(null);
  const [showGoPro, setShowGoPro] = useState(false);
  const [showStripePortal, setShowStripePortal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const session = cookies?.["app.idt"];
    if (session) {
      const jwtPalyoad = jwtDecode(session);
      setJwt(jwtPalyoad);
    } else {
      setJwt(null);
    }
  }, [cookies]);

  if (!isClient) return null;

  const logout = async () => {
    await ccdSignOut();
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/");
  };

  return (
    <>
      {jwt ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <img
                  src={jwt.picture}
                  alt={jwt.email || jwt.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <AvatarFallback>CC</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <Link href="/dashboard">
                <DropdownMenuItem className="hover:cursor-pointer">
                  Dashboard
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <ModeToggle />
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={logout}
                >
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                {jwt?.stripeRole ? (
                  <DropdownMenuItem
                    className="hover:cursor-pointer"
                    onClick={() => openStripePortal()}
                  >
                    {showStripePortal ? "Redirecting..." : "Billing"}
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="bg-primary hover:cursor-pointer"
                    onClick={() => setShowGoPro(true)}
                  >
                    Go Pro
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {showGoPro && <GoPro setShowGoPro={setShowGoPro} />}
        </>
      ) : (
        <Button variant="outline" asChild>
          <Link href="/login">Log In</Link>
        </Button>
      )}
    </>
  );
}
