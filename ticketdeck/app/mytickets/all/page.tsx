import Header from "@/components/header";
import EventCard from "@/components/eventcard";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Ticket } from "@prisma/client";

async function getTickets() {
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/ticket', {
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
        <Header back={true}/>
        <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
            <div className="flex justify-between items-center mb-3">
                <p className="text-3xl font-bold">Your tickets</p>
                <Link href="/mytickets/add">
                    <FontAwesomeIcon icon={faPlus} className="h-fill pr-3" color="neutral" size="2x"/>
                </Link>
            </div>
            {tickets.length > 0 ?
                tickets.map((ticket: Ticket) => {
                    return(
                        <EventCard key={ticket.id} ticketId={ticket.id} eventName={ticket.name} eventDate={ticket.date.toISOString()}/>
                    );
                })
            :
            <div className="text-2xl font-bold">No tickets</div>}
        </div>
        </>
    );

}