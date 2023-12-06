import Link from "next/link";

export default function Navbar() {
    return (
      <>
        <div className="navbar container mx-auto">
          <div className="navbar-start"></div>
          <div className="navbar-center">
            <a className="btn btn-ghost text-xl">Ticketdeck</a>
          </div>
          <div className="navbar-end">
          <Link
            href="/login"
            prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
            className="btn btn-accent btn-outline"
          >
            Login
          </Link>
          </div>
        </div>
      </>
    );
  }
  