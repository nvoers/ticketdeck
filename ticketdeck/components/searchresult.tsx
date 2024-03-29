'use client'
import { User } from '@prisma/client';
import toast from 'react-hot-toast';

export default function SearchResult({userResult, key, userId} : {userResult: User, key: string, userId: string}){

    const sendFriendrequest = async (user: User) => {
        try {
            await fetch(process.env.BASE_URL + `/api/friendship`, {
                method: 'POST',
                body: JSON.stringify({userId: userId, friendId: user.id})
            });
            toast.success('Friend request sent!');
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
    }

    return (
        <div className="flex flex-row justify-between items-center bg-white rounded-md shadow-md p-4 mt-4" key={key}>
            <div className="flex flex-row items-center">
                <div className="flex flex-col">
                    <p className="text-md font-semibold">{userResult.firstName} {userResult.lastName}</p>
                    <p className="text-sm text-gray-500">{userResult.username}</p>
                </div>
            </div>
            <div className="flex flex-row items-center">
                <div className="flex flex-col">
                    <button className="btn btn-sm btn-accent" onClick={() => sendFriendrequest(userResult)}>Add friend</button>
                </div>
            </div>
        </div>
    );
}