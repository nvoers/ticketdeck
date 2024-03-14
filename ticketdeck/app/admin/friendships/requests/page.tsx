import Header from "@/components/header";
import { FriendshipRequest, User } from "@prisma/client";
import Link from "next/link";
import { auth } from "@clerk/nextjs";

type RequestData = {
    request: FriendshipRequest,
    user: User,
    friend: User

}

async function getFriendshipRequests(id : string) {
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/friendshiprequest?all', {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(res.status != 200){
            console.log("Error" + res.status);
            return [];
        } else {
            const result = await res.json();
            return result.friendRequests;
        }
    } catch (error) {
        console.log(error);
    }
    return [];
}

export default async function Page({ params } : { params: { id: string } }) {
    const requests = await getFriendshipRequests(params.id) as RequestData[];

    return(
        <>
            <Header back/>
            <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
                <p className="text-3xl font-bold mb-4">Friendship requests</p>
                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                        <tr>
                            <th>Sender</th> 
                            <th>Receiver</th> 
                            <th>Status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {requests.map((request: RequestData) => {
                            return(
                                <tr key={request.request.id}>
                                    <td>{request.user.username}</td>
                                    <td>{request.friend.username}</td>
                                    <td>{request.request.status}</td>
                                    <td>
                                        <Link href={`/admin/friendships/requests`}>Delete</Link>
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