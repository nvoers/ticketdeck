import Header from '@/components/header';
import FriendshipCard from '@/components/friendshipcard';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FriendRequestCard from '@/components/friendrequestcard';
import { User } from '@prisma/client';

type Friendship = {
    id: number,
    initiatorId: string,
    receiverId: string,
    status: string,
    initiator: User,
    receiver: User
    created_at: Date,
    updated_at: Date
}

async function getFriends(){
    try {
        const token = await auth().getToken();
        const users = await fetch(process.env.BASE_URL + "/api/user/me/friendships", {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(users.status != 200){
            throw new Error(users.statusText);
        } else {
            const result = await users.json();
            return result.friendships;
        }
    } catch (error) {
        throw new Error(error as string);
    }
}

async function getRequests(){
    try {
        const token = await auth().getToken();
        const request = await fetch(process.env.BASE_URL + "/api/user/me/friends/requests", {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(request.status != 200){
            throw new Error(request.statusText);
        }
        else {
            const result = await request.json();
            return result.requests;
        }
    } catch (error) {
        throw new Error(error as string);
    }
    return [];
}

const getFriend = async (friendship: Friendship) => {
    const { userId } = auth();
    return userId === friendship.initiatorId ? friendship.receiver : friendship.initiator;
}

export default async function Page(){

    const { userId } = auth();
    const friendships = await getFriends();
    const requests = await getRequests();

    return(
        <>
            <Header back/>
            <div className='container mx-auto bg-secondary text-neutral px-4 min-h-screen'>
                <div className="flex justify-between items-center mb-3">
                    <p className="text-3xl font-bold">Friends</p>
                    <Link href="/friends/add">
                        <FontAwesomeIcon icon={faPlus} className="h-fill pr-3" color="neutral" size="2x"/>
                    </Link>
                </div>
                <div className='md:grid md:grid-cols-3 md:gap-2'>
                {requests.map(async (request: Friendship) => {
                    return(<FriendRequestCard key={request.id} request={request}/>);
                })}
                </div>
                <div className='md:grid md:grid-cols-3 md:gap-2'>
                {friendships.map(async (friendship: Friendship) => {
                    if(friendship.initiatorId === userId)
                        return(<FriendshipCard key={friendship.id} friendship={friendship} receiver={true}/>);
                    else
                        return(<FriendshipCard key={friendship.id} friendship={friendship} receiver={false}/>);
                    })
                }
                </div>
            </div>
        </>
    );
}