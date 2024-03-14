import Header from "@/components/header";
import { Ticket, User } from "@prisma/client";
import Link from "next/link";

type TicketData = {
    ticket: Ticket,
    user: User
}

async function getTickets(){
    try {
        const res = await fetch(process.env.BASE_URL + '/api/ticket?all&user', {
            method: 'GET',
            cache: 'no-store'
        });
        if(res.status == 401){
            console.log("Unauthorized");
            return [];
        }
        else if(res.status != 200){
            console.log("Error" + res.status);
            return [];
        } else {
            console.log("Success");
            const result = await res.json();
            return result.tickets;
        }
    } catch (error) {
        console.log(error);
    }
    return [];
}

export default async function Page() {
    const tickets = await getTickets() as TicketData[];

    return(
        <>
            <Header back/>
            <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
                <p className="text-3xl font-bold mb-4">Tickets</p>
                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                        <tr>
                            <th>Username</th> 
                            <th>Event name</th> 
                            <th></th> 
                        </tr>
                        </thead>
                        <tbody>
                        {tickets.map((ticket: TicketData) => {
                            return(
                                <tr key={ticket.ticket.id}>
                                    <td>{ticket.user.username}</td>
                                    <td>{ticket.ticket.name}</td>
                                    <td>
                                        <Link href={`/admin/users/${ticket.ticket.id}`}>View</Link>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}