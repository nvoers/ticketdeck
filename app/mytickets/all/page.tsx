import Header from "@/components/header";
import EventCard from "@/components/eventcard";
import TicketModal from "@/components/ticketmodal";
import Button from "@/components/button";

async function getTickets() {
    try {
        const res = await fetch(process.env.URL + '/api/ticket', {
            method: 'GET',
            cache: 'no-store'
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
        <Button 
            link={"/mytickets/add"} 
            text={"Add tickets"}/>
        {tickets.map((ticket) => {
            return(
                <TicketModal key={ticket.id} ticketId={ticket.id} eventName={ticket.name} ticketInfo={ticket.code}/>
            );
        })}
        </>
    );

}