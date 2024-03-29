import Header from "@/components/header";
import EventCard from "@/components/eventcard";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Ticket } from "@prisma/client";
import { notFound } from "next/navigation";

async function getTickets() {
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/user/me/tickets', {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(res.status != 200){
            throw new Error(res.statusText);
        }
        const result = await res.json();
        if(!result.tickets){
			return [];
		}
        return result.tickets;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default async function MyTickets() {
    const tickets = await getTickets();

    if(!tickets){
        notFound();
    }

    return (
        <>
        <Header back/>
        <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
            <div className="flex justify-between items-center mb-3">
                <p className="text-3xl font-bold">Your tickets</p>
                <Link href="/mytickets/add">
                    <FontAwesomeIcon icon={faPlus} className="h-fill pr-3" color="neutral" size="2x"/>
                </Link>
            </div>
            {tickets.length > 0 ?
                <div className="md:grid md:grid-cols-3 md:gap-2">
                {tickets.map((ticket: Ticket) => {
                    return(
                        <EventCard key={ticket.id} ticketId={ticket.id} eventName={ticket.name} eventDate={ticket.date}/>
                    );
                })}
                </div>
            :
            <div className="text-2xl font-bold">No tickets</div>}
        </div>
        </>
    );

}