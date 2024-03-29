"use client"
import toast from 'react-hot-toast'
import { useRouter, usePathname } from 'next/navigation'
import { User } from '@prisma/client';

export default function TransferTicketModal({ friend, id }: { friend: User, id: string}) {

    const router = useRouter();
    const pathname = usePathname();

    async function transferTicket() {
        console.log(friend);
        const ticketId = pathname.split('/')[2];
        try {
            const result = await fetch(process.env.BASE_URL + `/api/ticket/${id}/transfer`, {
                method: 'POST',
                body: JSON.stringify({receiverId: friend.id}),
            });
            if(result.status === 200) {
                toast.success('Ticket transferred');
                router.push('/mytickets/all');
            } else {
                toast.error('Failed to transfer ticket');
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
        <input type="checkbox" id={friend.id} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box text-center">
                    Are you sure you want to transfer this ticket to {friend.firstName}? This action cannot be undone.
                    <div className='grid grid-cols-2 gap-2 mt-4'>
                        <label htmlFor={friend.id} className="btn btn-sm btn-outline">No, take me back</label>
                        <button className='btn btn-sm btn-success' onClick={transferTicket}>Yes, transfer</button>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="delete">Close</label>
            </div>
        </>
    );
}