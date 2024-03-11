'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Friendship, User } from '@prisma/client';
import { auth } from '@clerk/nextjs';

export default function FriendshipCard({friendshipId, friend}: {friendshipId: string, friend: User}){

    const getUser = async (friendship: Friendship) => {
        const { userId } = auth();
        const friendId = userId == friendship.userId ? friendship.friendId : friendship.userId;
        try {
            const token = await auth().getToken();
            const request = await fetch(process.env.URL + "/api/user?id=" + friendId, {
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
    }

    const removeFriend = async () => {
        console.log(friendshipId);
        try {
            const token = await auth().getToken();
            const res = await fetch(process.env.URL + "/api/friendship/request/decline?id=" + friendshipId, {
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

    return (
        <div className="border-primary border-2 px-3 py-3 font-bold rounded-lg mb-3 flex justify-between items-center">
            <div>
                <p className="text-2xl text-primary truncate">{friend.firstName} {friend.lastName}</p>
                <p className="text-md text-slate-400 truncate">{friend.username}</p>
            </div>
            <button className="border-2 border-error rounded-md px-2 h-fit text-error hover:cursor-pointer" onClick={() => removeFriend()}>
                <FontAwesomeIcon icon={faX} className="h-fill" color="error"/>
            </button>
        </div>
    );
}