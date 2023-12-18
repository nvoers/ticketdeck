import Header from "@/components/header";
import EventCard from "@/components/eventcard";
import Link from "next/link";
import TicketModal from "@/components/ticketmodal";

export default function MyTickets() {
    return (
        <>
        {/* @ts-expect-error Server Component */}
        <Header/>
        <div className="pt-4">
            <EventCard formId={"event1"}/>
            <EventCard formId={"event2"}/>
            <EventCard formId={"event3"}/>
            <EventCard formId={"event4"}/>
            <EventCard formId={"event5"}/>
            <EventCard formId={"event6"}/>
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
        <TicketModal formId={"event1"}/>
        <TicketModal formId={"event2"}/>
        <TicketModal formId={"event3"}/>
        <TicketModal formId={"event4"}/>
        <TicketModal formId={"event5"}/>
        <TicketModal formId={"event6"}/>
        </>
    );

}