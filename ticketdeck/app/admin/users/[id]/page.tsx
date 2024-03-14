import Header from "@/components/header";
import { auth } from "@clerk/nextjs";

async function getUser(id: string){
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/user?id=' + id, {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        const result = await res.json();
        return result.user;
    } catch (error) {
        console.log(error);
    }

}

export default async function Page({params} : {params: {id: string}}){
    const user = await getUser(params.id);

    return(
        <>
            <Header back/>
            <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
                <p className="text-3xl font-bold mb-4">{user.firstName} {user.lastName}</p>
                <div className="grid grid-cols-2 gap-2">
                    <p className="font-bold">Username</p>
                    <p>{user.username}</p>
                    <p className="font-bold">First name</p>
                    <p>{user.firstName}</p>
                    <p className="font-bold">Last name</p>
                    <p>{user.lastName}</p>
                    <p className="font-bold">Role</p>
                    <p>{user.role}</p>
                </div>
            </div>
        </>
    );
}