"use client"
import { useQRCode } from 'next-qrcode';

export default function TicketModal({ ticketId, eventName, ticketInfo }: { ticketId: string, eventName: string, ticketInfo: string }) {

    const { SVG } = useQRCode();
    return(
        <>
        <input type="checkbox" id={ticketId} className="modal-toggle" />
            <div className="modal modal-bottom" role="dialog">
                <div className="modal-box bg-neutral">
                    <p className="text-lg font-bold mb-4 text-center text-white">{eventName}</p>
                    <div className="flex justify-center">
                    <SVG 
                        text={ticketInfo}
                        options={{
                            margin: 2,
                            width: 200,
                        }}
                    />
                    </div>
                    
                </div>
                <label className="modal-backdrop" htmlFor={ticketId}>Close</label>
            </div>
        </>
    );}