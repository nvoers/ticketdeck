import Header from "@/components/header";
import EventCard from "@/components/eventcard";
import Link from "next/link";

export default function MyTickets() {
    return (
        <>
        {/* @ts-expect-error Server Component */}
        <Header/>
        <div className="pt-4">
            <EventCard/>
            <EventCard/>
        </div>
        <div className="h-full flex justify-center">
            <Link
                href="/"
                prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
                className="btn btn-sm btn-accent btn-outline text-md"
            >
            Add new ticket
            </Link>
        </div>
        </>
    );

}