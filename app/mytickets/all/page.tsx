import Header from "@/components/header";
import EventCard from "@/components/eventcard";
import TicketModal from "@/components/ticketmodal";
import Link from "next/link";
import { auth } from "@clerk/nextjs";

async function getTickets() {
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.URL + '/api/ticket', {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        const result = await res.json();
        if(!result.tickets){
			return [];
		}
        return result.tickets;
    } catch (error) {
        console.log(error);
    }
}

export default async function MyTickets() {
    const tickets = await getTickets();
    return (
        <>
        <Header/>
        <div className="pt-4">
            {tickets.map((ticket) => {
                return(
                    <EventCard key={ticket.id} ticketId={ticket.id} eventName={ticket.name} eventDate={ticket.date}/>
                );
            })}
        </div>
        <Link
                href={"/mytickets/add"}
                prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
                className="btn btn-sm btn-accent btn-outline text-md"
            >
            Add tickets
            </Link>
        {tickets.map((ticket) => {
            return(
                <TicketModal key={ticket.id} ticketId={ticket.id} eventName={ticket.name} ticketInfo={ticket.code}/>
            );
        })}
        </>
    );

}