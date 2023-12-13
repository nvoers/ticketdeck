"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="btn btn-accent btn-outline"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
