import Link from "next/link";
import { getServerSession } from "next-auth/next";
import SignOut from "@/components/sign-out";

export default async function Header() {
  const session = await getServerSession();

    return (
      <div className="navbar bg-primary text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            {session ? 
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link
              href={"/protected/mytickets"}
              prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
              className="text-black"
              >My tickets</Link></li>
              <li><Link
              href={"/"}
              prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
              className="text-black"
              >Add ticket</Link></li>
              <li><Link
              href={"/"}
              prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
              className="text-black"
              >Profile and Settings</Link></li>
              <li><SignOut/></li>
            </ul>
             :
             <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link
              href={"/login"}
              prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
              className="text-black"
              >Login</Link></li>
            </ul>
            }
          </div>
        </div>
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
        
        </div>
      </div>
    );
  }
  