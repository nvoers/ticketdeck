import Search from "@/components/search";
import Header from "@/components/header";
import SearchResult from "@/components/searchresult";
import { auth } from "@clerk/nextjs";


async function searchResults(query: string){
    if (!query) {
        return [];
    }
    try {
        const token = await auth().getToken();
        const users = await fetch(process.env.URL + "/api/user/friends?not=true&query=" + query, {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
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
            <div className="bg-gradient-to-b from-primary to-white to-[50%] h-screen p-8">
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
            </div>
        </>
    );
}