import Link from "next/link";
import Header from "@/components/header";
import { auth } from "@clerk/nextjs";
import { Ticket } from "@prisma/client";

async function getEvents(){
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/ticket', {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(res.status == 401){
			console.log("Unauthorized");
			return [];
        }
        const result = await res.json();
		if(!result.tickets){
			return [];
		}
        return result.tickets;
    } catch (error) {
        console.log(error);
    }
    return [];
}

export async function getFirstname(){
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/user', {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(res.status == 401){
            console.log("Unauthorized");
            return "";
        }
        const result = await res.json();
		if(result.user.firstName == ""){
            console.log("No first name");
			return "";
		}
        return result.user.firstName[0].toUpperCase() + result.user.firstName.slice(1).toLowerCase();
    } catch (error) {
        console.log(error);
    }
    return "";
}

const formatDate = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const isToday = today.getFullYear() === eventDate.getFullYear() &&
                today.getMonth() === eventDate.getMonth() &&
                today.getDate() === eventDate.getDate();
    if(isToday){
        return "Today";
    }
    const formattedDate = eventDate.toLocaleDateString('en-UK', {day: 'numeric', month: 'long', year: 'numeric' });
    return formattedDate;
};

export default async function Home() {
    let events = await getEvents();
    let firstName = await getFirstname();

    return (
    <>
        <Header />
        <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
            <p className="text-3xl font-bold mb-4">Welcome, {firstName}</p>
            <div className="grid grid-cols-2 gap-2">
                {events.length > 0 ?
                <Link href={`/mytickets/${events[0].id}`} className="col-span-2 text-xl bg-primary text-secondary font-bold rounded-lg py-2 px-3">
                    <p className="mb-4">Next event</p>
                    <p>{events[0].name}</p>
                    <p>{formatDate(events[0].date)}</p>
                </Link>
                :
                <div className="col-span-2 text-xl bg-primary text-secondary font-bold rounded-lg py-2 px-3">
                    <p className="mb-4">Next event</p>
                    <p>No upcoming event</p>
                </div>
                }
                <Link href={"/mytickets/all"} prefetch={false} className="row-span-3 bg-primary text-secondary font-bold rounded-lg py-2 px-3 flex flex-col justify-between">
                    <p className="text-lg">Upcoming events</p>
                    {events.length > 1 ?
                    <div>
                        {events.slice(1,4).map((event: Ticket) => {
                            return(<p key={event.id} className="truncate">{event.name}</p>);
                        })}
                    </div>
                    :
                    <p>No upcoming events</p>}
                </Link>
                <Link href="/mytickets/add" className="text-xl text-primary border-2 border-primary font-bold rounded-lg py-2 px-3">New ticket</Link>
                <Link href="/mytickets/all" className="text-xl text-primary border-2 border-primary font-bold rounded-lg py-2 px-3">All tickets</Link>
                <Link href="/friends" className="text-xl text-secondary bg-accent font-bold rounded-lg py-2 px-3">Friends</Link>
            </div>
        </div>
    </>
    );
}
