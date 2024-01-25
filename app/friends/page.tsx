import Search from "@/components/search";
import Header from "@/components/header";
import { prisma } from "@/lib/prisma";
import SearchResult from "@/components/searchresult";
import { auth } from "@clerk/nextjs";


async function searchResults({query, userId} : {query: string, userId: string}){
    if (!query) {
        return [];
    }
    const users = await prisma.user.findMany({
        where: {
            username: {
                contains: query.toLowerCase()
            },
            id: {
                not: userId
            }
        },
    });
    return users;
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
    const users = await searchResults({query, userId:"id"});
    const { userId } = auth();
    
    return(
        <>
            <Header />
            <div className="bg-gradient-to-b from-primary to-white to-[50%] h-screen p-8">
                <div className="container mx-auto">
                    <Search placeholder="Search for friends" />
                    {users.length == 0 && query ? 
                        <div className="text-md text-center mt-4 text-gray-800">No results</div> 
                        : 
                        users.map((user) => {
                            return(
                                <SearchResult userResult={user} key={user.id} userId={userId}/>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}