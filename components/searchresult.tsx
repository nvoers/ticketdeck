'use client'
import toast from 'react-hot-toast';

export default function SearchResult({user, key} : {user: any, key: string}){

    const sendFriendrequest = async (user: any) => {
        try {
            await fetch(`/api/friendrequest`, {
                method: 'POST',
                body: JSON.stringify({userId: user.id})
            });
            toast.success('Friend request sent!');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-row justify-between items-center bg-white rounded-md shadow-md p-4 mt-4" key={user.id}>
            <div className="flex flex-row items-center">
                <div className="flex flex-col">
                    <p className="text-md font-semibold">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-500">{user.username}</p>
                </div>
            </div>
            <div className="flex flex-row items-center">
                <div className="flex flex-col">
                    <button className="btn btn-sm btn-success" onClick={() => sendFriendrequest(user)}>Add friend</button>
                </div>
            </div>
        </div>
    );
}