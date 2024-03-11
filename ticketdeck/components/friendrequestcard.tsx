'use client'
import { auth } from "@clerk/nextjs";
import { Friendship, User } from "@prisma/client";
import { useFormStatus } from "react-dom";

export default function FriendRequestCard({request, user}: {request: Friendship, user: User }) {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const token = await auth().getToken();
        console.log(e.target);
    };

    const acceptRequest = async () => {
        // const token = await auth().getToken();
        const response = await fetch("/api/friendshiprequest/accept?id=" + request.id, {
            method: 'POST',
        });
        if(response.status == 401) {
            console.log("Unauthorized");
        }
        const result = await response.json();
        console.log(result);
        window.location.reload();
        window.location.href = '/friends';
    }

    const declineRequest = async () => {
        // const token = await auth().getToken();
        const response = await fetch("/api/friendshiprequest/decline?id=" + request.id, {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            //     Authorization: `Bearer ${token}`
            // },
        });
        if(response.status == 401) {
            console.log("Unauthorized");
        }
        const result = await response.json();
        console.log(result);
        window.location.reload();
        window.location.href = '/friends';
    }

    return(
        <div className="bg-primary text-secondary px-3 py-3 font-bold rounded-lg mb-3">
            <p className="text-2xl truncate">{user.firstName} {user.lastName}</p>
            <p className="text-md truncate">{user.username}</p>
            {/* <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 mt-2">
                <input type="submit" name="accept" className="border-2 border-success rounded-md text-left text-success pl-2 w-full" value="Accept"/>
                <input type="submit" name="decline" className="border-2 border-error rounded-md text-left text-error pl-2 w-full" value="Decline"/>
            </form> */}
            <div className="grid grid-cols-2 gap-2 mt-2">
                <button className="border-2 border-success rounded-md text-left text-success pl-2 w-full" onClick={acceptRequest}>Accept</button>
                <button className="border-2 border-error rounded-md text-left text-error pl-2 w-full" onClick={declineRequest}>Decline</button>
            </div>
        </div>
    );
}