"use client"
import Link from "next/link";

const formatDate = (dateString: string) => {
    const eventDate = new Date(dateString);
    if(isToday(dateString)){
        return "Today";
    }
    const formattedDate = eventDate.toLocaleDateString('en-UK', {day: 'numeric', month: 'long', year: 'numeric' });
    return formattedDate;
};

const isToday = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    return today.getFullYear() === eventDate.getFullYear() &&
                today.getMonth() === eventDate.getMonth() &&
                today.getDate() === eventDate.getDate();
}

export default function EventCard({ticketId, eventName, eventDate}: {ticketId: string, eventName: string, eventDate: string}) {

    if(isToday(eventDate)){
        return(
            <Link href={`/mytickets/${ticketId}`} >
                <div className="bg-primary text-secondary px-3 py-3 text-3xl font-bold rounded-lg mb-3">
                    <p className="truncate">{eventName}</p>
                    <p>{formatDate(eventDate)}</p>
                </div>
            </Link>
        );
    } else {
        return(
            <Link href={`/mytickets/${ticketId}`} >
                <div className="text-primary border-2 border-primary px-3 py-3 text-3xl font-bold rounded-lg mb-3">
                    <p className="truncate">{eventName}</p>
                    <p>{formatDate(eventDate)}</p>
                </div>
            </Link>
        );
    }
}