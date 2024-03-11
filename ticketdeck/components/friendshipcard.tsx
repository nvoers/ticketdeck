'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { User } from '@prisma/client';
import { auth } from '@clerk/nextjs';

export default function FriendshipCard({friendshipId, friend}: {friendshipId: string, friend: User}){

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
            const result = await res.json();
            console.log(result);
            window.location.reload();
            window.location.href = '/friends';
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
            <button className="border-2 border-error rounded-md text-left text-error px-2" onClick={removeFriend}>
                <FontAwesomeIcon icon={faX} className="h-fill" color="error"/>
            </button>
        </div>
    );
}