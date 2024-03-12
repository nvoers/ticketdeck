"use client"

export default function NextEvent({ticketId, eventName, eventDate}: {ticketId: string, eventName: string, eventDate: Date}) {
    const formatDate = (dateString: string) => {
        const formattedDate = new Date(dateString).toLocaleDateString('en-UK', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
        return formattedDate;
    };
      
    return(
        <label htmlFor={ticketId}  className="card glass bg-secondary text-white font-bold text-center py-4">
            <p className="text-xl py-1">Next event</p>
            <p className="text-2xl py-1">{eventName}<br/>{formatDate(eventDate.toISOString())}</p>
            <p className="text-lg py-1 text-zinc-100">View ticket</p>
        </label>
    );
}