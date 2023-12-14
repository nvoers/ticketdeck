import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Image from "next/image";

export default async function Navbar() {
  const session = await getServerSession();

    return (
      <>
        <div className="navbar container mx-auto bg-primary text-white">
          <div className="navbar-start pl-4">
          <Image
            src="/ticket-icon.svg"
            alt="Vercel Logo"
            width={20}
            height={20}
            priority
          />
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
          <button type="button" className="btn btn-ghost" data-hs-overlay="#hs-overlay-example">
          <FontAwesomeIcon icon={faBars} style={{color: "#FFFFFF",}}/>
          </button>

          <div id="hs-overlay-example" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-gradient-to-b from-primary to-primary-content text-white hidden" tabIndex="-1">
            {/* <div className="flex justify-between items-center py-3 px-4 border-b ">
              <h3 className="font-bold text-gray-800 dark:text-white">
                Ticketdeck
              </h3>
              <button type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-overlay-example">
                <span className="sr-only">Close modal</span>
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div> */}
            <div className="p-2">
              <p className="font-bold text-2xl text-center">Ticketdeck</p>
            </div>
            <div className="p-4">
              <ul>
                <li>
                  <Link 
                    href="/login"
                    prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
                    className="font-bold text-xl pl-2"
                    >
                  Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          </div>
        </div>
      </>
    );
  }
  