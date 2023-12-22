"use client"

export default function NextEvent({formId}: {formId: string}) {
    return(
        <label htmlFor={formId}  className="card glass bg-secondary text-white font-bold text-center py-4">
            <p className="text-xl py-1">Next event</p>
            <p className="text-2xl py-1">Event name placeholder<br/>Sat 16 Dec 2023</p>
            <p className="text-lg py-1 text-zinc-100">View ticket</p>
        </label>
    );
}