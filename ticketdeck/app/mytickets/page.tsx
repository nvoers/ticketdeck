import Link from "next/link";
import Header from "@/components/header";
import { auth } from "@clerk/nextjs";
import { Ticket } from "@prisma/client";
import { notFound } from "next/navigation";

async function getTickets(){
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/user/me/tickets', {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(res.status != 200){
			throw new Error("Failed to fetch tickets");
        }
        const result = await res.json();
		if(!result.tickets){
			return [];
		}
        return result.tickets;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function getFirstname(){

    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/user/me', {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(res.status == 404){
            throw new Error("User not found in database");
        }
        if(res.status != 200){
            throw new Error(res.statusText);
        }
        else{
            const result = await res.json();
            if(result.user.firstName == ""){
                throw new Error("No first name");
            }
            return result.user.firstName[0].toUpperCase() + result.user.firstName.slice(1).toLowerCase();
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const formatDate = (datestring: string) => {
    const date : Date = new Date(datestring);
    const today = new Date();
    const isToday = today.getFullYear() === date.getFullYear() &&
                today.getMonth() === date.getMonth() &&
                today.getDate() === date.getDate();
    if(isToday){
        return "Today";
    }
    const formattedDate = date.toLocaleDateString('en-UK', {day: 'numeric', month: 'long', year: 'numeric' });
    return formattedDate;
};

export default async function Home() {
    let tickets : Ticket[] = await getTickets();
    let firstName : string = await getFirstname();

    if(!firstName || !tickets){
        notFound();
    }

    return (
    <>
        <Header />
        <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
            <p className="text-3xl font-bold mb-4">Welcome, {firstName}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {tickets.length > 0 ?
                <Link href={`/mytickets/${tickets[0].id}`} className="col-span-2 md:col-span-1 md:row-span-3 text-xl bg-primary text-secondary font-bold rounded-lg py-2 px-3 flex justify-between flex-col">
                    <p className="mb-4">Next event</p>
                    <div>
                        <p>{tickets[0].name}</p>
                        <p>{formatDate(String(tickets[0].date))}</p>
                    </div>
                </Link>
                :
                <div className="col-span-2 md:col-span-1 md:row-span-3 text-xl bg-primary text-secondary font-bold rounded-lg py-2 px-3">
                    <p className="mb-4">Next event</p>
                    <p>No upcoming event</p>
                </div>
                }
                <Link href={"/mytickets/all"} prefetch={false} className="row-span-3 bg-primary text-secondary font-bold rounded-lg py-2 px-3 flex flex-col justify-between">
                    <p className="text-lg">Upcoming events</p>
                    {tickets.length > 1 ?
                    <div>
                        {tickets.slice(1,4).map((ticket: Ticket) => {
                            return(<p key={ticket.id} className="truncate">{ticket.name}</p>);
                        })}
                    </div>
                    :
                    <p>No upcoming events</p>}
                </Link>
                <Link href="/mytickets/add" className="text-xl text-primary border-2 border-primary font-bold rounded-lg py-2 px-3">New ticket</Link>
                <Link href="/mytickets/all" className="text-xl text-primary border-2 border-primary font-bold rounded-lg py-2 px-3">All tickets</Link>
                <Link href="/friends" className="text-xl text-secondary dark:text-primary bg-accent font-bold rounded-lg py-2 px-3">Friends</Link>
            </div>
        </div>
    </>
    );
}
