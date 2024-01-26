import Header from '@/components/header';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import FriendResult from '@/components/friendresult';

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
            userFriendships: {
                every: {
                    // friendId: userId,
                    status: "ACCEPTED"
                }
            },
            friendFriendships: {
                every: {
                    // userId: userId,
                    status: "ACCEPTED"
                }
            },
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
    const friendship = await prisma.friendship.findUnique({
        where: {
            OR:[
                {userId: userId, friendId: friendId},
                {userId: friendId, friendId: userId}
            ]
        }
    });
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
                        return (<FriendResult userResult={friend} userId={userId} friendshipId={await getFriendship(userId, friend.id)} status="FRIENDS"/>);
                    })}
                </div>
            </div>
        </>
    );
}