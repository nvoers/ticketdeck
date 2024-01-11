import Header from '@/components/header';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import QRCode from '@/components/qrcode';

export default async function Page({params} : {params: {id: string}}) {
    const { userId } = auth();
    const ticket = await prisma.ticket.findUnique({
        where: {
            userId: userId,
            id: params.id
        }
    });

    return(
        <>
            <Header />
            <div className='container mx-auto mt-4'>
                <p className='text-4xl text-black font-bold'>{ticket.name}</p>
                <p className='text-xl text-black'>{ticket.date.toLocaleDateString('en-UK', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
                <QRCode info={ticket.code} />
            </div>
        </>
    );
}