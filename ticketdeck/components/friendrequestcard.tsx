'use client'
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Friendship = {
    id: number,
    initiatorId: string,
    receiverId: string,
    status: string,
    initiator: User,
    receiver: User
    created_at: Date,
    updated_at: Date
}

export default function FriendRequestCard({request}: {request: Friendship}) {

    const router = useRouter();

    const acceptRequest = async () => {
        const response = await fetch(process.env.BASE_URL + `/api/friendship/${request.id}/accept`, {
            method: 'POST'
        });
        if(response.status == 401) {
            console.log("Unauthorized");
        }
        if(response.status == 200) {
            toast.success('Friend request accepted!');
            router.refresh();
        } else {
            console.log(response.status);
        }
    }

    const declineRequest = async () => {
        const response = await fetch(process.env.BASE_URL + `/api/friendship/${request.id}/decline`, {
            method: 'POST'
        });
        if(response.status == 401) {
            console.log("Unauthorized");
        }
        if(response.status == 200) {
            toast.error('Friend request declined!');
            router.refresh();
        }
    }

    return(
        <div className="bg-primary text-secondary px-3 py-3 font-bold rounded-lg mb-3">
            <p className="text-2xl truncate">{request.initiator.firstName} {request.initiator.lastName}</p>
            <p className="text-md truncate">{request.initiator.username}</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
                <button className="border-2 border-success rounded-md text-left text-success pl-2 w-full" onClick={acceptRequest}>Accept</button>
                <button className="border-2 border-error rounded-md text-left text-error pl-2 w-full" onClick={declineRequest}>Decline</button>
            </div>
        </div>
    );
}