import Header from '@/components/header';
import { auth } from '@clerk/nextjs';
import QRCode from '@/components/qrcode';
import { notFound } from 'next/navigation';
import TicketOptions from '@/components/ticketoptions';

export default async function Page({params} : {params: {id: string}}) {
    var ticket: any = null;
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.URL + '/api/ticket?id=' + params.id, {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        const result = await res.json();
        if(!result.ticket){
			notFound();
		}
        ticket = result.ticket
        ticket.date = new Date(ticket.date);
    } catch (error) {
        console.log(error);
    }

    return(
        <>
            <Header />
            <div className='container mx-auto mt-4 flex flex-col items-center'>
                <p className='text-4xl text-black font-bold text-center'>{ticket.name}</p>
                <p className='text-xl text-black text-center'>{ticket.date.toLocaleDateString('en-UK', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
                <div className='w-fit'>
                    <QRCode info={ticket.code}/>
                </div>
                <TicketOptions ticketId={ticket.id}/>
            </div>
        </>
    );
}