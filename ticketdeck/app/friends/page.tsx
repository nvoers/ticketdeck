import Header from '@/components/header';
import FriendshipCard from '@/components/friendshipcard';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FriendRequestCard from '@/components/friendrequestcard';
import { FriendshipRequest, User } from '@prisma/client';

type FriendshipObject = {
    friendshipId: string;
    user: User;
}

async function getFriends(){
    try {
        const token = await auth().getToken();
        const users = await fetch(process.env.BASE_URL + "/api/user/friends", {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(users.status == 401){
            console.log("Unauthorized");
            return [];
        }
        const result = await users.json();
        return result.friends;
    } catch (error) {
        console.log(error);
    }
    return [];
}

async function getRequests(){
    try {
        const token = await auth().getToken();
        const requests = await fetch(process.env.BASE_URL + "/api/friendshiprequest", {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(requests.status == 401){
            console.log("Unauthorized");
            return [];
        }
        const result = await requests.json();
        return result.friendRequests;
    } catch (error) {
        console.log(error);
    }
    return [];
}

const getUser = async (user: string) => {
    const { userId } = auth();
    try {
        const token = await auth().getToken();
        const request = await fetch(process.env.BASE_URL + "/api/user?id=" + user, {
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

export default async function Page(){

    const friends = await getFriends();
    const requests = await getRequests();

    return(
        <>
            <Header back={true}/>
            <div className='container mx-auto bg-secondary text-neutral px-4 min-h-screen'>
                <div className="flex justify-between items-center mb-3">
                    <p className="text-3xl font-bold">Friends</p>
                    <Link href="/friends/add">
                        <FontAwesomeIcon icon={faPlus} className="h-fill pr-3" color="neutral" size="2x"/>
                    </Link>
                </div>
                {requests.map(async (request: FriendshipRequest) => {
                    return(<FriendRequestCard key={request.id} request={request} user={await getUser(request.userId)}/>);
                })}
                {friends.map(async (friend: FriendshipObject) => {
                        return(<FriendshipCard key={friend.friendshipId} friendshipId={friend.friendshipId} friend={friend.user} option={"remove"}/>);
                    })
                }
            </div>
        </>
    );
}