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

export default function Profile() {
  const [isClient, setIsClient] = useState(false);
  const [cookies, setCookie] = useCookies(["app.idt"]);
  const [jwt, setJwt] = useState<any | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const jwtPalyoad = jwtDecode(cookies?.["app.idt"]);
    setJwt(jwtPalyoad);
  }, [cookies]);

  if (!isClient) return null;

  return (
    <>
      {jwt ? (
        // <Button variant="secondary" asChild>
        //   <Link href="/api/auth/signout">Sign Out</Link>
        // </Button>

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
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="outline" asChild>
          <Link href="/login">Log In</Link>
        </Button>
      )}
    </>
  );
}
