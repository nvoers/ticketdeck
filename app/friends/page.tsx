import Search from "@/components/search";
import Header from "@/components/header";
import { prisma } from "@/lib/prisma";


async function searchResults(query: string){
    if (!query) {
        return [];
    }
    const users = await prisma.user.findMany({
        where: {
            username: {
                contains: query.toLowerCase()
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
    const users = await searchResults(query);
    
    return(
        <>
            <Header />
            <div className="bg-gradient-to-b from-primary to-white to-[50%] h-screen p-8">
                <div className="container mx-auto">
                    <Search placeholder="Search for friends" />
                    {users.map((user) => {
                        return(
                            <div className="flex flex-row justify-between items-center bg-white rounded-md shadow-md p-4 mt-4" key={user.id}>
                                <div className="flex flex-row items-center">
                                    <div className="flex flex-col">
                                        <p className="text-md font-semibold">Nick van Oers</p>
                                        <p className="text-sm text-gray-500">{user.username}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <div className="flex flex-col">
                                        <button className="btn btn-sm btn-success">Add friend</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}