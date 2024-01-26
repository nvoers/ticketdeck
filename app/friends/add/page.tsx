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
        include: {
            userFriendships: {
                where: {
                    friendId: userId
                }
            },
            friendFriendships: {
                where: {
                    userId: userId
                }
            },
        },
        where: {
            username: {
                contains: query.toLowerCase()
            },
            id: {
                not: userId
            },
            userFriendships: {
                none: {
                    friendId: userId
                }
            },
            friendFriendships: {
                none: {
                    userId: userId
                }
            },
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
    const { userId } = auth();
    const users = await searchResults({query, userId:userId});
    
    return(
        <>
            <Header />
            <div className="bg-gradient-to-b from-primary to-white to-[50%] h-screen p-8">
                <div className="container mx-auto">
                    <Search placeholder="Search for friends" />
                    {users.length == 0 && query ? 
                        <div className="text-md text-center mt-4 text-gray-800">No results</div> 
                        : 
                        users.map(async (user) => {
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