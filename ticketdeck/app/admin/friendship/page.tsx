import { auth } from "@clerk/nextjs";
import Link from "next/link";

export async function getUserName(userId: string){
    const token = await auth().getToken();
    const res = await fetch(process.env.URL + '/api/user?id=' + userId, {
        method: 'GET',
        cache: 'no-store',
        headers: {Authorization: `Bearer ${token}`}
    });
    const result = await res.json();
    return result.user.username;
}

export async function getFriendships(){
    const token = await auth().getToken();
    const res = await fetch(process.env.URL + '/api/friendship?all', {
        method: 'GET',
        cache: 'no-store',
        headers: {Authorization: `Bearer ${token}`}
    });
    const result = await res.json();
    return result.friendships;
}

export default async function Page() {
    const friendships = await getFriendships();

    return(
        <div className="container mx-auto px-4 pt-4">
            <div className="pb-4">
                <div className="btn btn-primary btn-sm">Add friendship</div>
            </div>
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
                        {friendships.map((friendship: any) => (
                            <tr key={friendship.id}>
                                <td><Link href="/">{getUserName(friendship.userId)}</Link></td>
                                <td>{getUserName(friendship.friendId)}</td>
                                <td>{friendship.status}</td>
                                <td>edit</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}