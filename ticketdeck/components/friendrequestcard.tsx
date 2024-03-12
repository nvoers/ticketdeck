'use client'
import { Friendship, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function FriendRequestCard({request, user}: {request: Friendship, user: User }) {

    const router = useRouter();

    const acceptRequest = async () => {
        const response = await fetch("/api/friendshiprequest/accept?id=" + request.id, {
            method: 'POST',
        });
        if(response.status == 401) {
            console.log("Unauthorized");
        }
        if(response.status == 200) {
            toast.success('Friend request accepted!');
            router.refresh();
        }
    }

    const declineRequest = async () => {
        const response = await fetch("/api/friendshiprequest/decline?id=" + request.id, {
            method: 'POST',
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
            <p className="text-2xl truncate">{user.firstName} {user.lastName}</p>
            <p className="text-md truncate">{user.username}</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
                <button className="border-2 border-success rounded-md text-left text-success pl-2 w-full" onClick={acceptRequest}>Accept</button>
                <button className="border-2 border-error rounded-md text-left text-error pl-2 w-full" onClick={declineRequest}>Decline</button>
            </div>
        </div>
    );
}