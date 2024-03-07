'use client'
import toast from 'react-hot-toast';

export default function FriendResult({friendshipRequest, friend, status, key} : {friendshipRequest: any, friend: any, status: string, key: string}){

    const addFriend = async () => {
        try {
            await fetch(`/api/friendship`, {
                method: 'PATCH',
                body: JSON.stringify({friendshipId: friendshipRequest.id, status: "ACCEPTED"})
            });
            toast.success('Friend request accepted!');
            window.location.reload();
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
    }

    const removeFriend = async () => {
        try {
            await fetch(`/api/friendship`, {
                method: 'DELETE',
                body: JSON.stringify({friendshipId: friendshipRequest.id})
            });
            toast.success('Removed friend');
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
    }

    return (
        <div className="flex flex-row justify-between items-center bg-white rounded-md shadow-md p-4 mt-4" key={key}>
            <div className="flex flex-row items-center">
                <div className="flex flex-col">
                    <p className="text-md font-semibold">{friend.firstName} {friend.lastName}</p>
                    <p className="text-sm text-gray-500">{friend.username}</p>
                </div>
            </div>
            <div className="flex flex-row items-center">
                <div className="flex flex-col">
                    {status == "REQUESTED" ? <button className="btn btn-sm btn-success" onClick={() => addFriend()}>Accept request</button>
                    : status == "FRIENDS" ? <button className="btn btn-sm btn-error" onClick={() => removeFriend()}>Remove</button>
                    : null}
                </div>
            </div>
        </div>
    );
}