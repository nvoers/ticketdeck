import Header from '@/components/header';
import FriendResult from '@/components/friendresult';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';

async function getFriends(){
    try {
        const token = await auth().getToken();
        const users = await fetch(process.env.URL + "/api/friendship?status=accepted", {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(users.status == 401){
            console.log("Unauthorized");
            return [];
        }
        const result = await users.json();
        return result.friendRequests;
    } catch (error) {
        console.log(error);
    }
    return [];
}

async function getRequests(){
    try {
        const token = await auth().getToken();
        const users = await fetch(process.env.URL + "/api/friendship?status=requested", {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(users.status == 401){
            console.log("Unauthorized");
            return [];
        }
        const result = await users.json();
        return result.friendRequests;
    } catch (error) {
        console.log(error);
    }
    return [];
}

async function getFriend(friendship: { id: string; }){
    try {
        const token = await auth().getToken();
        const user = await fetch(process.env.URL + "/api/friendship/friend?friendshipId=" + friendship.id, {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(user.status == 401){
            console.log("Unauthorized");
            return [];
        }
        const result = await user.json();
        return result.friend;
    } catch (error) {
        console.log(error);
    } 
    return [];
}

export default async function Page(){

    const friends = await getFriends();
    const requests = await getRequests();

    return(
        <>
            <Header />
            <div className="bg-gradient-to-b from-primary to-white to-[50%] h-screen p-8">
                <div className="container mx-auto">
                    {requests.length > 0 ? <p className="text-lg font-semibold mt-4 ml-4">Requests</p> : null}
                    {requests.map(async (request) => {
                        const friend = await getFriend(request);
                        return (<FriendResult friendshipRequest={request} friend={friend} status="REQUESTED"/>);
                    })}
                    {friends.length > 0 ? <p className="text-lg font-semibold mt-4 ml-4">Friends</p> : null}
                    {friends.map(async (friendship) => {
                        const friend = await getFriend(friendship);
                        return (<FriendResult friendshipRequest={friendship} friend={friend} status="FRIENDS"/>);
                    })}
                    {friends.length == 0 && requests.length == 0 ? 
                        <div className="text-md text-center text-white">
                            <p>No friends yet</p>
                        </div> 
                    : null}
                    <div className='w-full flex justify-center'>
                        <Link
                            href='/friends/add'
                            prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
                            className="btn btn-sm btn-accent text-md mt-4"
                        >
                        Add friends
                        </Link>
                    </div>
                    
                </div>
            </div>
        </>
    );
}