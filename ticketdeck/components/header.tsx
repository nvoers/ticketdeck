"use client"
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Header({ back }: { back?: boolean}) {
    const router = useRouter();

    return (
      <div className="navbar bg-secondary">
        <div className="navbar-start">
          {back ? 
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => router.back()} size="1x" className="ml-4 text-neutral"/>
          : <></>}
        </div>
        <div className="navbar-center">
          <Link
            href="/mytickets"
            prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
            className="text-xl text-neutral font-bold text-center"
          >
            Ticketdeck
          </Link>
        </div>
        <div className="navbar-end pr-4">
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
  