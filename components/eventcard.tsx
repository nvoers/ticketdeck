import prisma from '@/lib/prisma';

async function getTicket({ticketId}: {ticketId: string}) {
    const ticket = await prisma.ticket.findUnique({
        where: {
            id: ticketId
        }
    });
    return ticket;
}

function isTomorrow(date: Date) {
    if(date.getDate() === (new Date().getDate() + 1)) {
        if(date.getMonth() === (new Date().getMonth())) {
            if(date.getFullYear() === (new Date().getFullYear())) {
                return true;
            }
        }
    }
    return false;
}

function isToday(date: Date) {
    if(date.getDate() === (new Date().getDate())) {
        if(date.getMonth() === (new Date().getMonth())) {
            if(date.getFullYear() === (new Date().getFullYear())) {
                return true;
            }
        }
    }
    return false;
}

export default async function EventCard({ticketId}: {ticketId: string}) {
    const ticket = await getTicket({ticketId});
    const formatDate = (dateString) => {
        const formattedDate = new Date(dateString).toLocaleDateString('en-UK', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
        return formattedDate;
      };
    return(
        <label htmlFor={ticketId} className="card bg-secondary glass text-white py-2 px-4 my-4 rounded-none relative">
            <div className="flex items-center">
                <p className="text-xl font-bold ">{ticket.name}</p>
                {isToday(ticket.date) ? <span className="badge badge-accent font-bold ml-2">Today</span> : <></>}
                {isTomorrow(ticket.date) ? <span className="badge badge-accent font-bold ml-2">Tomorrow</span> : <></>}
            </div>
            <p className="text-md">{formatDate(ticket.date)}</p>
        </label>
    );
}