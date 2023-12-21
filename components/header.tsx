import Link from "next/link";
import { getServerSession } from "next-auth/next";
import SignOut from "@/components/sign-out";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  // const session = await getServerSession();

    return (
      <div className="navbar bg-primary text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <FontAwesomeIcon icon={faBars} />
            </div>
            {/* {session ? 
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
            } */}
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
  