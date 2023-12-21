async function getTicket({ticketId}: {ticketId: string}) {
    const ticket = await prisma.ticket.findUnique({
        where: {
            id: ticketId
        }
    });
    return ticket;
}

export default async function EventCard({ticketId}: {ticketId: string}) {
    const ticket = await getTicket({ticketId});
    return(
        <label htmlFor={ticketId} className="card bg-secondary glass text-white py-2 px-4 my-4 rounded-none relative">
            <div className="flex items-center">
                <p className="text-xl font-bold ">{ticket.name}</p>
                <span className="badge badge-accent font-bold ml-2">Tomorrow</span>
            </div>
            <p className="text-md">{ticket.date.toString()}</p>
        </label>
    );
}