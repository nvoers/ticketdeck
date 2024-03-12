'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function FriendshipCard({friendshipId, friend, option}: {friendshipId: string, friend: User, option: string}){

    const router = useRouter();

    const removeFriend = async () => {
        try {
            const res = await fetch("/api/user/friends/remove?id=" + friendshipId, {
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
            const res = await fetch("/api/friendshiprequest?id=" + friend.id, {
                method: 'POST',
                cache: 'no-store',
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
            <div>
                <p className="text-2xl text-primary truncate">{friend.firstName} {friend.lastName}</p>
                <p className="text-md text-slate-400 truncate">{friend.username}</p>
            </div>
            {option == "remove" ?
                <button className="border-2 border-error rounded-md text-left text-error px-2" onClick={removeFriend}>
                    <FontAwesomeIcon icon={faX} className="h-fill" color="error"/>
                </button>
            : option == "add" ?
                <button className="border-2 border-success rounded-md text-left text-success px-2" onClick={addFriend}>
                    <FontAwesomeIcon icon={faPlus} className="h-fill" color="error"/>
                </button>
            : null}
        </div>
    );
}