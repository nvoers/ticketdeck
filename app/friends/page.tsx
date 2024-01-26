import Header from '@/components/header';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import FriendResult from '@/components/friendresult';
import Link from 'next/link';

async function getFriends({userId} : {userId: string}){
    const friends = await prisma.user.findMany({
        include: {
            userFriendships: {
                where: {
                    friendId: userId
                }
            },
            friendFriendships: {
                where: {
                    userId: userId
                }
            },
        },
        where: {
            id: {
                not: userId
            },
            OR:[
                {
                    userFriendships: {
                        some: {
                            // friendId: userId,
                            status: "ACCEPTED"
                        }
                    }
                },
                {
                    friendFriendships: {
                        some: {
                            // userId: userId,
                            status: "ACCEPTED"
                        }
                    }
                }
            ],
        }
    });

    return friends;
}

async function getRequests({userId} : {userId: string}){
    const requests = await prisma.friendship.findMany({
        where: {
            friendId: userId,
            status: "REQUESTED"
        },
    });
    return requests;
}

async function getUser({id} : {id: string}){
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    return user;
}

async function getFriendship(userId: string, friendId: string){
    var friendship = await prisma.friendship.findUnique({
        where: {
            unique_friendship:{
                userId: userId,
                friendId: friendId
            }
        }
    });
    if(friendship == null){
        friendship = await prisma.friendship.findUnique({
            where: {
                unique_friendship_inverse:{
                    userId: friendId,
                    friendId: userId
                }
            }
        });
    }
    if(friendship == null){
        return null;
    }
    return friendship.id;
}

export default async function Page(){

    const { userId } = auth();
    const friends = await getFriends({userId});
    const requests = await getRequests({userId});

    return(
        <>
            <Header />
            <div className="bg-gradient-to-b from-primary to-white to-[50%] h-screen p-8">
                <div className="container mx-auto">
                    {requests.length > 0 ? <p className="text-lg font-semibold mt-4 ml-4">Requests</p> : null}
                    {requests.map(async (request) => {
                        return (<FriendResult userResult={await getUser({id:request.userId})} userId={userId} friendshipId={request.id} status="REQUESTED"/>);
                    })}
                    {friends.length > 0 ? <p className="text-lg font-semibold mt-4 ml-4">Friends</p> : null}
                    {friends.map(async (friend) => {
                        const friendshipId = await getFriendship(userId, friend.id);
                        if(friendshipId == null){
                            return null;
                        }
                        return (<FriendResult userResult={friend} userId={userId} friendshipId={friendshipId} status="FRIENDS"/>);
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