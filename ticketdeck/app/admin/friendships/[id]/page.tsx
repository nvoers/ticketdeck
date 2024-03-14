import Header from "@/components/header";
import { Friendship, User } from "@prisma/client";
import { auth } from "@clerk/nextjs";

type FriendshipData = {
    friendship: Friendship,
    user: User,
    friend: User
}

async function getFriendship(id: string){
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/friendship?id=' + id, {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(res.status != 200){
            console.log("Error" + res.status);
            return {};
        } else {
            const result = await res.json();
            return result.friendship;
        }
    } catch (error) {
        console.log(error);
    }
    return {};
}

export default async function Page({params} : {params: {id: string}}) {
    const friendship = await getFriendship(params.id) as FriendshipData;

    return(
        <>
        <Header back/>
        <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
            <p className="text-3xl font-bold mb-4">Friendship</p>
            <div className="grid grid-cols-2 gap-2">
                <p className="font-bold">User</p>
                <p>{friendship.user.username}</p>
                <p className="font-bold">User</p>
                <p>{friendship.friend.username}</p>
                <p className="font-bold">Status</p>
                <p>{friendship.friendship.status}</p>
            </div>
        </div>
        </>
    );
}