import Header from '@/components/header';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import QRCode from '@/components/qrcode';
import TicketOptions from '@/components/ticketoptions';

export default async function Page({params} : {params: {id: string}}) {
    const { userId } = auth();
    const ticket = await prisma.ticket.findUnique({
        where: {
            userId: userId,
            id: params.id
        }
    });
    if (!ticket) {
        notFound();
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
                <TicketOptions ticketId={params.id}/>
            </div>
        </>
    );
}