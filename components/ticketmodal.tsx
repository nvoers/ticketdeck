import Image from 'next/image'

export default function TicketModal({ ticketId }: { ticketId: string }) {
    return(
        <>
        <input type="checkbox" id={ticketId} className="modal-toggle" />
            <div className="modal modal-bottom" role="dialog">
                <div className="modal-box bg-neutral">
                    <p className="text-lg font-bold mb-4 text-center text-white">Event name placeholder</p>
                    <div className="flex justify-center">
                    <Image 
                        src={"/ticket-icon.png"}
                        alt="Ticket"
                        width={200}
                        height={200}
                    />
                    </div>
                    
                </div>
                <label className="modal-backdrop" htmlFor={ticketId}>Close</label>
            </div>
        </>
    );}