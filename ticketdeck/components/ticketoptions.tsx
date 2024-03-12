'use client'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function TicketOptions({ ticketId }: { ticketId: string }) {

    const router = useRouter();

    async function deleteTicket() {
        try {
            const res = await fetch(process.env.BASE_URL + `/api/ticket?id=` + ticketId, {
                method: 'DELETE',
                body: JSON.stringify({ticketId})
            });
            if(res.status == 401){
                console.log("Unauthorized");
                return;
            }
            if(res.status == 200){
                toast.success("Ticket deleted");
                router.push('/mytickets');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className='grid grid-cols-2 gap-2 mt-4'>
            <Link className="border-2 border-primary rounded-lg text-primary text-sm font-bold px-2 py-2 flex items-center" href={`/mytickets/${ticketId}/transfer`}>Transfer ticket</Link>
            <label htmlFor="delete" className="border-2 border-error rounded-lg text-error text-sm font-bold px-2 py-2 flex items-center">Delete ticket</label>

        
            <input type="checkbox" id="delete" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box text-center">
                    Are you sure you want to delete this ticket? This action cannot be undone.
                    <div className='grid grid-cols-2 gap-2 mt-4'>
                        <label htmlFor="delete" className="btn btn-sm btn-outline">No, take me back</label>
                        <button className='btn btn-sm btn-error' onClick={deleteTicket}>Yes, delete</button>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="delete">Close</label>
            </div>
        </div>
    );
}