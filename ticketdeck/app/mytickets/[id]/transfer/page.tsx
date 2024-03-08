import Search from "@/components/search";
import Header from "@/components/header";
import { auth } from "@clerk/nextjs";
import TransferResult from "@/components/transferresult";

async function searchResults(query: string){
    if (!query) {
        return [];
    }
    try {
        const token = await auth().getToken();
        const users = await fetch(process.env.URL + "/api/user/friends", {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        const result = await users.json();
        return result.friends;
    } catch (error) {
        console.log(error);
    }
    return [];
}

async function getUser(userId: string) {
    try {
        const token = await auth().getToken();
        const user = await fetch(process.env.URL + '/api/user?id=' + userId, {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        const result = await user.json();
        return result.user;
    } catch (error) {
        console.log(error);
    }
    return null;

}

export default async function Page({
        searchParams,
    }: {
        searchParams?: {
            query?: string;
            page?: string;
        };
    }) {
    
    const query = searchParams?.query || null;
    const friends = await searchResults(query);

    return(
        <>
            <div className="bg-gradient-to-b from-primary to-white to-[50%] h-screen p-8">
                <div className="container mx-auto">
                    <Search placeholder="Search for friends"/>
                    {friends.length == 0 && query ? 
                        <div className="text-md text-center mt-4 text-gray-800">No results</div> 
                        : 
                        friends.map(async (userId: string) => {
                            const user = await getUser(userId);
                            return(
                                <TransferResult user={user} key={user.id}/>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}