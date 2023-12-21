import Header from "@/components/header";
import EventCard from "@/components/eventcard";
import TicketModal from "@/components/ticketmodal";
import Button from "@/components/button";
import prisma from "@/lib/prisma";

async function getTickets() {
    const tickets = await prisma.ticket.findMany({
        where: {
            userId: "clqezvvme0000nx71tk0oloyh"
        }
    });
    return tickets;
}

export default async function MyTickets() {
    const tickets = await getTickets();
    return (
        <>
        <Header/>
        <div className="pt-4">
            {tickets.map((ticket) => {
                return(
                    <EventCard ticketId={ticket.id}/>
                );
            })}
        </div>
        <Button 
            link={"/protected/mytickets/add"} 
            text={"Add tickets"}/>
        {tickets.map((ticket) => {
            return(
                <TicketModal ticketId={ticket.id}/>
            );
        })}
        </>
    );

}