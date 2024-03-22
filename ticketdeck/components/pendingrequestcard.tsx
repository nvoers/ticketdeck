'use client'
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';

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


export default function PendingRequestCard({ request } : {request: Friendship}){

    const router = useRouter();

    const removeFriend = async () => {
        try {
            const res = await fetch(process.env.BASE_URL + `/api/friendship/${request.id}/remove`, {
                method: 'POST',
                cache: 'no-store',
            });
            if(res.status == 401){
                console.log("Unauthorized");
                return;
            }
            if(res.status == 404){
                console.log("Friend not found");
                return;
            }
            if(res.status == 200){
                toast.success('Friendrequest removed');
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="border-primary border-2 px-3 py-3 font-bold rounded-lg mb-3 flex justify-between items-center">
            <div>
                <p className="text-2xl text-primary truncate">{request.receiver.firstName} {request.receiver.lastName}</p>
                <p className="text-md text-slate-400 truncate">{request.receiver.username}</p>
            </div>
            <button className="border-2 border-error rounded-md text-left text-error px-2" onClick={removeFriend}>
                CANCEL
            </button>
        </div>
    );
}