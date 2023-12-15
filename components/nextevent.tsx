"use client"
import Image from "next/image";

export default function NextEvent() {
    return(
        <div className="card glass bg-secondary text-white font-bold text-center py-4">
            <p className="text-xl py-1">Next event</p>
            <p className="text-2xl py-1">Event name placeholder<br/>Sat 16 Dec 2023</p>
            <label htmlFor="my_modal_7" className="text-lg py-1 text-zinc-100">View ticket</label>
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal modal-bottom" role="dialog">
                <div className="modal-box bg-neutral">
                    <p className="text-lg font-bold mb-4">Event name placeholder</p>
                    <div className="flex justify-center">
                    <Image 
                        src={"/ticket-icon.png"}
                        alt="Ticket"
                        width={200}
                        height={200}
                    />
                    </div>
                    
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </div>
    );
}