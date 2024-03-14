import Header from "@/components/header";
import { auth } from "@clerk/nextjs";

async function getUser(id: string){
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/user?id=' + id, {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        const result = await res.json();
        return result.user;
    } catch (error) {
        console.log(error);
    }

}

async function getTicket(id: string){
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/ticket?id=' + id, {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        const result = await res.json();
        return result.ticket;
    } catch (error) {
        console.log(error);
    }

}

export default async function Page({params} : {params: {id: string}}){
    const ticket = await getTicket(params.id);
    const user = await getUser(ticket.userId);

    return(
        <>
            <Header back/>
            <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
                <p className="text-3xl font-bold mb-4">{ticket.name}</p>
                <div className="grid grid-cols-2 gap-2">
                    <p className="font-bold">Owner</p>
                    <p>{user.username}</p>
                </div>
            </div>
        </>
    );
}