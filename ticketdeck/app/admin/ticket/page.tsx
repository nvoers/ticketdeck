import { auth } from "@clerk/nextjs";
import Link from "next/link";

export async function getUserName(userId: string){
    const token = await auth().getToken();
    const res = await fetch(process.env.URL + '/api/user?id=' + userId, {
        method: 'GET',
        cache: 'no-store',
        headers: {Authorization: `Bearer ${token}`}
    });
    const result = await res.json();
    return result.user.username;
}

export async function getTickets(){
    const token = await auth().getToken();
    const res = await fetch(process.env.URL + '/api/ticket?all', {
        method: 'GET',
        cache: 'no-store',
        headers: {Authorization: `Bearer ${token}`}
    });
    const tickets = await res.json();
    const result = tickets.tickets.map((ticket: any) => {
        return {
            id: ticket.id,
            name: ticket.name,
            date: new Date(ticket.date),
            username: getUserName(ticket.userId)
        }
    })
    return result;
}

export default async function Page() {
    const tickets = await getTickets();

    return(
        <div className="container mx-auto px-4 pt-4">
            <div className="pb-4">
                <div className="btn btn-primary btn-sm">Add ticket</div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                    <tr>
                        <th>Event</th> 
                        <th>Date</th> 
                        <th>Username</th> 
                        <th></th>
                    </tr>
                    </thead> 
                    <tbody>
                        {tickets.map((ticket: any) => (
                            <tr key={ticket.id}>
                                <td><Link href="/">{ticket.name}</Link></td>
                                <td>{ticket.date.toLocaleDateString('en-UK', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                <td>{ticket.username}</td>
                                <td>edit</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}