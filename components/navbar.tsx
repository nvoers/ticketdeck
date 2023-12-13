import Link from "next/link";
import { getServerSession } from "next-auth/next";
import SignOut from "./sign-out";

export default async function Navbar() {
  const session = await getServerSession();

    return (
      <>
        <div className="navbar container mx-auto">
          <div className="navbar-start"></div>
          <div className="navbar-center">
            <Link
            href="/"
            prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
            className="btn btn-ghost text-xl"
          >
            Ticketdeck
          </Link>
          </div>
          <div className="navbar-end">
            {session ? 
            <SignOut /> :
          <Link
          href="/login"
          prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
          className="btn-accent btn btn-outline"
        >
          Login
        </Link>}

          </div>
        </div>
      </>
    );
  }
  