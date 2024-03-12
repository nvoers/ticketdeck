import Search from "@/components/search";
import Header from "@/components/header";
import SearchResult from "@/components/searchresult";
import { auth } from "@clerk/nextjs";
import FriendshipCard from "@/components/friendshipcard";


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
    const users = await searchResults(query as any);
    
    return(
        <>
            <Header />
            <div className="container mx-auto bg-secondary text-neutral px-4 min-h-screen">
                <p className="text-3xl font-bold mb-2 ml-2">Add friends</p>
                <Search placeholder="Search for friends"/>
                {users.length == 0 && query ? 
                    <div className="text-md mt-4 ml-2">No results</div> 
                    : 
                    users.map(async (user: any) => {
                        return(
                            <FriendshipCard friendshipId={""} key={user.id} friend={user} option={"add"}/>
                        );
                    })
                }
            </div>
            {/* <div className="bg-gradient-to-b from-primary to-white to-[50%] h-screen p-8">
                <div className="container mx-auto">
                    <Search placeholder="Search for friends" />
                    {users.length == 0 && query ? 
                        <div className="text-md text-center mt-4 text-gray-800">No results</div> 
                        : 
                        users.map(async (user: any) => {
                            return(
                                <SearchResult userResult={user} key={user.id} userId={user.id}/>
                            );
                        })
                    }
                </div>
            </div> */}
        </>
    );
}