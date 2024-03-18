import Search from "@/components/search";
import Header from "@/components/header";
import { auth } from "@clerk/nextjs";
import TransferCard from "@/components/transfercard";
import TransferTicketModal from "@/components/transferticketmodal";
import { User } from '@prisma/client';

async function searchResults(query: string){
    if (!query) {
        return [];
    }
    try {
        const token = await auth().getToken();
        const users = await fetch(process.env.BASE_URL + "/api/user/me/friends?query=" + query, {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(users.status == 401){
            console.log("Unauthorized");
            return [];
        }
        const result = await users.json();
        return result.friends;
    } catch (error) {
        console.log(error);
    }
    return [];
}

export default async function Page({
        searchParams, params
    }: {
        searchParams?: {
            query?: string;
            page?: string;
    }, params: { id: string }
    }) {
    
    const query = searchParams?.query || "";
    const friends = await searchResults(query);

    return(
        <>
            <Header back/>
            <div className="container mx-auto bg-secondary text-neutral px-4 min-h-screen">
                <p className="text-3xl font-bold mb-2 ml-2">Transfer ticket</p>
                <Search placeholder="Search for friends"/>
                {friends.length == 0 && query ? 
                    <div className="text-md mt-4 ml-2">No results</div> 
                    : 
                    <div className="md:grid md:grid-cols-3 md:gap-2">
                        {friends.map(async (friend: User) => {
                        return(
                            <TransferCard key={friend.id} friend={friend}/>
                        );
                    })}
                    </div>
                }
            </div>
            {friends.length == 0 && query ?<></>:
            friends.map((friend: User) => {
                return(
                    <TransferTicketModal key={friend.id} friend={friend} id={params.id}/>
                );
            })
            }
        </>
    );
}