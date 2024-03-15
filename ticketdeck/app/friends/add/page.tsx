import Search from "@/components/search";
import Header from "@/components/header";
import { User } from '@prisma/client';
import { auth } from "@clerk/nextjs";
import AddFriendCard from "@/components/addfriendcard";


async function searchResults(query: string){
    if (!query) {
        return [];
    }
    try {
        const token = await auth().getToken();
        const users = await fetch(process.env.BASE_URL + "/api/user/friends/find?query=" + query, {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(users.status == 401){
            console.log("Unauthorized");
            return [];
        }
        const result = await users.json();
        return result.users;
    } catch (error) {
        console.log(error);
    }
    return [];
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
    const users = await searchResults(query as string);
    
    return(
        <>
            <Header back={true}/>
            <div className="container mx-auto bg-secondary text-neutral px-4 min-h-screen">
                <p className="text-3xl font-bold mb-2 ml-2">Add friends</p>
                <Search placeholder="Search for friends"/>
                {users.length == 0 && query ? 
                    <div className="text-md mt-4 ml-2">No results</div> 
                    : 
                    users.map(async (user: User) => {
                        return(
                            <AddFriendCard key={user.id} user={user}/>
                        );
                    })
                }
            </div>
        </>
    );
}