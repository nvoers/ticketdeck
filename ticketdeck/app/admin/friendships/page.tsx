import Header from "@/components/header";
import { Friendship, User } from "@prisma/client";
import Link from "next/link";
import { auth } from "@clerk/nextjs";

type FriendshipData = {
    friendship: Friendship,
    user: User,
    friend: User
}

async function getFriendships(){
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/friendship?all', {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(res.status != 200){
            console.log("Error" + res.status);
            return [];
        } else {
            const result = await res.json();
            return result.friendships;
        }
    } catch (error) {
        console.log(error);
    }
    return [];

}

export default async function Page() {
    const friendships = await getFriendships() as FriendshipData[];

    return(
        <>
            <Header back/>
            <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
                <p className="text-3xl font-bold mb-4">Friendships</p>
                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                        <tr>
                            <th>User</th> 
                            <th>User</th> 
                            <th>Status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {friendships.map((friendship: FriendshipData) => {
                            return(
                                <tr key={friendship.friendship.id}>
                                    <td>{friendship.user.username}</td>
                                    <td>{friendship.friend.username}</td>
                                    <td>{friendship.friendship.status}</td>
                                    <td>
                                        <Link href={`/admin/friendships`}>Delete</Link>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}