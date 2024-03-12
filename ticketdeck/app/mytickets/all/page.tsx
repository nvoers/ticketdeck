import Header from "@/components/header";
import EventCard from "@/components/eventcard";
import TicketModal from "@/components/ticketmodal";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
        <Header/>
        <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
            <div className="flex justify-between items-center mb-3">
                <p className="text-3xl font-bold">Your tickets</p>
                <Link href="/mytickets/add">
                    <FontAwesomeIcon icon={faPlus} className="h-fill pr-3" color="neutral" size="2x"/>
                </Link>
            </div>
            {tickets.length > 0 ?
                tickets.map((ticket: any) => {
                    return(
                        <EventCard key={ticket.id} ticketId={ticket.id} eventName={ticket.name} eventDate={ticket.date}/>
                    );
                })
            :
            <div className="text-2xl font-bold">No tickets</div>}
        </div>
            
        {/* <div className="pt-4">
            {tickets.length > 0 ? 
                tickets.map((ticket: any) => {
                    return(
                        <EventCard key={ticket.id} ticketId={ticket.id} eventName={ticket.name} eventDate={ticket.date}/>
                    );
                })
            :
            <div className="container mx-auto p-8 pb-0">
                <div className="text-2xl font-bold">No tickets</div>
            </div>
            }
            <div className="container mx-auto p-8 pb-4">
                <div className="grid grid-cols-2 gap-2">
                    <Link
                            href={"/mytickets/add"}
                            prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
                            className="btn btn-sm btn-accent btn-outline text-md"
                        >
                        Add tickets
                    </Link>
                </div>
            </div>
            
        </div> */}
        </>
    );

}