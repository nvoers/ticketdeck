'use client'
import toast from 'react-hot-toast';

export default function TicketOptions({ ticketId }: { ticketId: string }) {

    const comingSoon = () => {toast("Coming soon!", {style:{border: "2px solid #ffbe00"}, icon: '🚧'})}

    async function deleteTicket() {
        try {
            await fetch(`/api/ticket`, {
                method: 'DELETE',
                body: JSON.stringify({ticketId})
            });
            window.location.href = '/mytickets?deleteSuccess=1';
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className='grid grid-cols-2 gap-2 mt-8'>
            <button className='btn btn-sm btn-accent btn-outline' onClick={comingSoon}>Transfer ticket</button>
            {/* <button className='btn btn-sm btn-error btn-outline'>Delete ticket</button> */}
            <label htmlFor="delete" className="btn btn-sm btn-error btn-outline">Delete ticket</label>

        
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