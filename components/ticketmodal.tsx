"use client"
import { useQRCode } from 'next-qrcode';
import Link from 'next/link';

export default function TicketModal({ ticketId, eventName, ticketInfo }: { ticketId: string, eventName: string, ticketInfo: string }) {

    const { SVG } = useQRCode();
    return(
        <>
        <input type="checkbox" id={ticketId} className="modal-toggle" />
            <div className="modal modal-bottom" role="dialog">
                <div className="modal-box bg-neutral">
                    <div className='grid grid-cols-1 gap-y-4 justify-items-center items-center'>
                        <p className="text-lg font-bold text-center text-white">{eventName}</p>
                        <SVG 
                            text={ticketInfo}
                            options={{
                                margin: 2,
                                width: 200,
                            }}
                        />
                        <Link href={`/mytickets/${ticketId}`} className="text-md text-center text-white">View ticket info</Link>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor={ticketId}>Close</label>
            </div>
        </>
    );}