"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="text-black"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
