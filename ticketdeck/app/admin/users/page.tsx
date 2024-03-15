import Header from "@/components/header";
import { auth } from "@clerk/nextjs";
import { User } from "@prisma/client";

async function getUsers(){
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/user?all', {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(res.status == 401){
            console.log("Unauthorized");
            return [];
        }
        const result = await res.json();
        if(!result.users){
            return [];
        }
        return result.users;
    } catch (error) {
        console.log(error);
    }
    return [];
}

export default async function Page() {
    const users = await getUsers();

    return(
        <>
            <Header back/>
            <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
                <p className="text-3xl font-bold mb-4">Users</p>
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead>
                        <tr>
                            <th>Username</th> 
                            <th>First name</th> 
                            <th>Last name</th> 
                            <th>Role</th> 
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user: User) => {
                            return(
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.role}</td>
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