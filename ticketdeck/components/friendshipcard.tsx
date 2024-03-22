'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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

export default function FriendshipCard({friendship, receiver}: {friendship: Friendship, receiver?: boolean}){

    const router = useRouter();

    const removeFriend = async () => {
        try {
            const res = await fetch(process.env.BASE_URL + `/api/friendship/${friendship.id}/remove`, {
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
                toast.success('Friend removed');
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addFriend = async () => {
        try {
            const res = await fetch(process.env.BASE_URL + "/api/friendship", {
                method: 'POST',
                cache: 'no-store',
                body: JSON.stringify({receiverId: friendship.initiatorId}),
            });
            if(res.status == 401){
                console.log("Unauthorized");
                return;
            }
            if(res.status == 200){
                router.refresh();
                toast.success('Friend added');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="border-primary border-2 px-3 py-3 font-bold rounded-lg mb-3 flex justify-between items-center">
            {receiver ? 
            <div>
                <p className="text-2xl text-primary truncate">{friendship.receiver.firstName} {friendship.receiver.lastName}</p>
                <p className="text-md text-slate-400 truncate">{friendship.receiver.username}</p>
            </div>
            :
            <div>
                <p className="text-2xl text-primary truncate">{friendship.initiator.firstName} {friendship.initiator.lastName}</p>
                <p className="text-md text-slate-400 truncate">{friendship.initiator.username}</p>
            </div>}
            <button className="border-2 border-error rounded-md text-left text-error px-2" onClick={removeFriend}>
                REMOVE
            </button>
        </div>
    );
}