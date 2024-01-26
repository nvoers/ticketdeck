'use client'
import toast from 'react-hot-toast';
import { prisma } from '@/lib/prisma'

export default function FriendResult({userResult, friendshipId, userId, status} : {userResult: any, friendshipId: string, userId: string, status: string}){

    const addFriend = async (friendshipId: string) => {
        try {
            await fetch(`/api/friendrequest`, {
                method: 'PUT',
                body: JSON.stringify({friendshipId: friendshipId, status: "ACCEPTED"})
            });
            toast.success('Friend request accepted!');
            window.location.reload();
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
    }

    const removeFriend = async (user: any) => {
        console.log(friendshipId);
        try {
            await fetch(`/api/friendrequest`, {
                method: 'DELETE',
                body: JSON.stringify({friendshipId: friendshipId})
            });
            toast.success('Removed friend');
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
    }

    return (
        <div className="flex flex-row justify-between items-center bg-white rounded-md shadow-md p-4 mt-4" key={friendshipId}>
            <div className="flex flex-row items-center">
                <div className="flex flex-col">
                    <p className="text-md font-semibold">{userResult.firstName} {userResult.lastName}</p>
                    <p className="text-sm text-gray-500">{userResult.username}</p>
                </div>
            </div>
            <div className="flex flex-row items-center">
                <div className="flex flex-col">
                    {status == "REQUESTED" ? <button className="btn btn-sm btn-success" onClick={() => addFriend(friendshipId)}>Accept request</button>
                    : status == "FRIENDS" ? <button className="btn btn-sm btn-error" onClick={() => removeFriend(friendshipId)}>Remove</button>
                    : null}
                </div>
            </div>
        </div>
    );
}