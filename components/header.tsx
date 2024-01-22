import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";

export default function Header() {

    return (
      <div className="navbar bg-primary text-white">
        <div className="navbar-start">
          <SignedIn>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <FontAwesomeIcon icon={faBars} />
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link
                href={"/mytickets"}
                prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
                className="text-black"
                >My tickets</Link></li>
                <li><Link
                href={"/mytickets/add"}
                prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
                className="text-black"
                >Add ticket</Link></li>
              </ul>
            </div>
          </SignedIn>
        </div>
        <div className="navbar-center">
          <Link
            href="/mytickets"
            prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
            className="btn btn-ghost text-xl"
          >

            Ticketdeck
          </Link>
        </div>
        <div className="navbar-end">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "bg-white",
                },
              }}
            />
        </div>
      </div>
    );
  }
  