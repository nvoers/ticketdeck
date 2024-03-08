import { auth } from "@clerk/nextjs";
import Link from "next/link";

export async function getUsers(){
    const token = await auth().getToken();
    const res = await fetch(process.env.URL + '/api/user?all', {
        method: 'GET',
        cache: 'no-store',
        headers: {Authorization: `Bearer ${token}`}
    });
    const result = await res.json();
    return result.users;
}

export default async function Page() {
    const users = await getUsers();

    return(
        <div className="container mx-auto px-4 pt-4">
            <div className="pb-4">
                <div className="btn btn-primary btn-sm">Add user</div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                    <tr>
                        <th>Username</th> 
                        <th>First name</th> 
                        <th>Last name</th> 
                        <th></th>
                    </tr>
                    </thead> 
                    <tbody>
                        {users.map((user: any) => (
                            <tr key={user.id}>
                                <td><Link href="/">{user.username}</Link></td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>edit (clerk)</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}