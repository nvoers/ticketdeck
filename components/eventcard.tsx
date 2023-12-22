"use client"

function isTomorrow(date: Date) {
    if(date.getDate() === (new Date().getDate() + 1)) {
        if(date.getMonth() === (new Date().getMonth())) {
            if(date.getFullYear() === (new Date().getFullYear())) {
                return true;
            }
        }
    }
    return false;
}

function isToday(date: Date) {
    if(date.getDate() === (new Date().getDate())) {
        if(date.getMonth() === (new Date().getMonth())) {
            if(date.getFullYear() === (new Date().getFullYear())) {
                return true;
            }
        }
    }
    return false;
}

export default function EventCard({ticketId, eventName, eventDate}: {ticketId: string, eventName: string, eventDate: Date}) {
    const formatDate = (dateString) => {
        const formattedDate = new Date(dateString).toLocaleDateString('en-UK', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
        return formattedDate;
      };
    return(
        <label htmlFor={ticketId} className="card bg-secondary glass text-white py-2 px-4 my-4 rounded-none relative">
            <div className="flex items-center">
                <p className="text-xl font-bold ">{eventName}</p>
                {isToday(eventDate) ? <span className="badge badge-accent font-bold ml-2">Today</span> : <></>}
                {isTomorrow(eventDate) ? <span className="badge badge-accent font-bold ml-2">Tomorrow</span> : <></>}
            </div>
            <p className="text-md">{formatDate(eventDate)}</p>
        </label>
    );
}