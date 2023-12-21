import prisma from '@/lib/prisma';

async function getTicket({ticketId}: {ticketId: string}) {
    const ticket = await prisma.ticket.findUnique({
        where: {
            id: ticketId
        }
    });
    return ticket;
}

export default async function NextEvent({ticketId}: {ticketId: string}) {
    const ticket = await getTicket({ticketId});
    const formatDate = (dateString) => {
        const formattedDate = new Date(dateString).toLocaleDateString('en-UK', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
        return formattedDate;
      };
      
    return(
        <label htmlFor={ticketId}  className="card glass bg-secondary text-white font-bold text-center py-4">
            <p className="text-xl py-1">Next event</p>
            <p className="text-2xl py-1">{ticket.name}<br/>{formatDate(ticket.date)}</p>
            <p className="text-lg py-1 text-zinc-100">View ticket</p>
        </label>
    );
}