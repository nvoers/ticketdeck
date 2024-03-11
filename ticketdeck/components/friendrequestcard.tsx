'use client'
import { auth } from "@clerk/nextjs";
import { Friendship } from "@prisma/client";

export async function getUser(userId: string){
    try {
        const token = await auth().getToken();
        const request = await fetch(process.env.URL + "/api/user?id=" + userId, {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(request.status == 401){
            console.log("Unauthorized");
            return [];
        }
        const result = await request.json();
        return result.user;
    } catch (error) {
        console.log(error);
    } 
    return [];

}

export default async function FriendRequestCard({request}: {request: Friendship }) {
    const requester = await getUser(request.userId);

    const acceptRequest = async () => {
        try {
            const token = await auth().getToken();
            const res = await fetch(process.env.URL + "/api/friendship/request/accept?id=" + request.id, {
                method: 'POST',
                cache: 'no-store',
                headers: {Authorization: `Bearer ${token}`}
            });
            if(res.status == 401){
                console.log("Unauthorized");
                return;
            }
            const result = await res.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };
    const declineRequest = async () => {
        try {
            const token = await auth().getToken();
            const res = await fetch(process.env.URL + "/api/friendship/request/decline?id=" + request.id, {
                method: 'POST',
                cache: 'no-store',
                headers: {Authorization: `Bearer ${token}`}
            });
            if(res.status == 401){
                console.log("Unauthorized");
                return;
            }
            const result = await res.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <div className="bg-primary text-secondary px-3 py-3 font-bold rounded-lg mb-3">
            <p className="text-2xl truncate">{requester.firstName} {requester.lastName}</p>
            <p className="text-md truncate">{requester.username}</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
                <button className="border-2 border-success rounded-md text-left text-success pl-2" onClick={() => acceptRequest()}>Accept</button>
                <button className="border-2 border-error rounded-md text-left text-error pl-2" onClick={() => declineRequest()}>Decline</button>
            </div>
        </div>
    );
}