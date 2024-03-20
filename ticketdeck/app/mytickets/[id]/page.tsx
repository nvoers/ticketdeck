import Header from '@/components/header';
import { auth } from '@clerk/nextjs';
import QRCode from '@/components/qrcode';
import { notFound } from 'next/navigation';
import TicketOptions from '@/components/ticketoptions';
import { Ticket } from '@prisma/client';

async function getTicket(id: string){
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/ticket/' + id, {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(res.status != 200){
            throw new Error(res.statusText);
        } else {
            const result = await res.json();
            if(!result.ticket){
                notFound();
            }
            let ticket = result.ticket;
            ticket.date = new Date(ticket.date);
            return ticket;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const formatDate = (dateString: string) => {
    const eventDate = new Date(dateString);
    const formattedDate = eventDate.toLocaleDateString('en-UK', {day: 'numeric', month: 'long', year: 'numeric' });
    return formattedDate;
};

export default async function Page({params} : {params: {id: string}}) {
    const ticket : Ticket = await getTicket(params.id);

    if(!ticket){
        notFound();
    }

    return(
        <>
        <Header back/>
            <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
                <div className='md:grid md:grid-cols-2 md:gap-2'>
                    <div>
                        <p className="text-2xl font-bold">{ticket.name}</p>
                        <p className="text-2xl font-bold mb-4">{formatDate(String(ticket.date))}</p>
                    </div>
                    <div className='bg-white w-full aspect-square rounded-lg flex justify-center items-center'>
                        <QRCode info={ticket.code}/>
                    </div>
                </div>
                <TicketOptions ticketId={ticket.id}/>
            </div>
        </>
    );
}