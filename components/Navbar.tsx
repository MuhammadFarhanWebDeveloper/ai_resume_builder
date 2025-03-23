import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <header
      id="no-print"
      className="flex justify-between bg-foreground text-white items-center p-4 gap-4 h-16"
    >
      <div>
        <Link href="/">
          <h1 className="text-2xl font-bold ">HMF Project</h1>
        </Link>
      </div>
      <div className="flex justify-center items-center p-2 gap-3">
        <SignedOut>
          <SignInButton>
            <Button className="cursor-pointer">Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button className="cursor-pointer">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <div className="flex justify-center items-center p-2 gap-3">
            <Button className="cursor-pointer">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </header>
  );
}
