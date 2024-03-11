import Header from '@/components/header';
import FriendshipCard from '@/components/friendshipcard';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FriendRequestCard from '@/components/friendrequestcard';
import { User } from '@prisma/client';

async function getFriends(){
    try {
        const token = await auth().getToken();
        const users = await fetch(process.env.URL + "/api/friendship", {
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
        const users = await fetch(process.env.URL + "/api/friendship/request", {
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

async function friendshipRequestId(friendId: string){
    try {
        const token = await auth().getToken();
        const users = await fetch(process.env.URL + "/api/friendship/request?friendId=" + friendId, {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(users.status == 401){
            console.log("Unauthorized");
            return "";
        }
        const result = await users.json();
        return result.friendRequests[0].id;
    } catch (error) {
        console.log(error);
    }
    return "";
}

const getUser = async (user: string) => {
    const { userId } = auth();
    try {
        const token = await auth().getToken();
        const request = await fetch(process.env.URL + "/api/user?id=" + user, {
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

export async function declineRequest(requestId: string){
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.URL + "/api/friendship/request/decline?id=" + requestId, {
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
}

export async function acceptRequest(requestId: string){
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.URL + "/api/friendship/request/accept?id=" + requestId, {
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
}

export default async function Page(){

    const friends = await getFriends();
    const requests = await getRequests();

    return(
        <>
            <Header />
            <div className='container mx-auto bg-secondary text-neutral px-4 min-h-screen'>
                <div className="flex justify-between items-center mb-3">
                    <p className="text-3xl font-bold">Friends</p>
                    <Link href="/mytickets/add">
                        <FontAwesomeIcon icon={faPlus} className="h-fill pr-3" color="neutral" size="2x"/>
                    </Link>
                </div>
                {requests.length > 0 ? 
                    requests.map(async (request: any) => {
                        return(<FriendRequestCard key={request.id} request={request}/>);
                    })
                :<></>}
                {friends.length > 0 ? 
                    friends.map(async (friend: any) => {
                        let friendId = friend.userId == auth().userId ? friend.friendId : friend.userId;
                        return(<FriendshipCard key={friend.id} friendshipId={friend.id} friend={await getUser(friendId)}/>);
                    })
                :<></>}
            </div>
            {/* <div className="bg-gradient-to-b from-primary to-white to-[50%] h-screen p-8">
                <div className="container mx-auto">
                    {requests.length > 0 ? <p className="text-lg font-semibold mt-4 ml-4">Requests</p> : null}
                    {requests.map(async (request: any) => {
                        const friend = await getFriend(request);
                        return (<FriendResult key={request.id} friendshipRequest={request} friend={friend} status="REQUESTED"/>);
                    })}
                    {friends.length > 0 ? <p className="text-lg font-semibold mt-4 ml-4">Friends</p> : null}
                    {friends.map(async (friendship: any) => {
                        const friend = await getFriend(friendship);
                        return (<FriendResult key={friendship.id} friendshipRequest={friendship} friend={friend} status="FRIENDS"/>);
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
            </div> */}
        </>
    );
}