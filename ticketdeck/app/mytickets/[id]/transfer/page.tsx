import Search from "@/components/search";
import Header from "@/components/header";
import { auth } from "@clerk/nextjs";
import TransferCard from "@/components/transfercard";
import TransferTicketModal from "@/components/transferticketmodal";
import { User } from '@prisma/client';

type FriendObject = {
    friendshipId: string;
    user: User;
}

async function searchResults(query: string){
    if (!query) {
        return [];
    }
    try {
        const token = await auth().getToken();
        const users = await fetch(process.env.BASE_URL + "/api/user/friends", {
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
        searchParams,
    }: {
        searchParams?: {
            query?: string;
            page?: string;
        };
    }) {
    
    const query = searchParams?.query || "";
    const friends = await searchResults(query);

    return(
        <>
            <Header />
            <div className="container mx-auto bg-secondary text-neutral px-4 min-h-screen">
                <p className="text-3xl font-bold mb-2 ml-2">Transfer ticket</p>
                <Search placeholder="Search for friends"/>
                {friends.length == 0 && query ? 
                    <div className="text-md mt-4 ml-2">No results</div> 
                    : 
                    friends.map(async (friend: FriendObject) => {
                        return(
                            <TransferCard key={friend.user.id} friend={friend.user}/>
                        );
                    })
                }
            </div>
            {friends.length == 0 && query ?<></>:
            friends.map((friend: FriendObject) => {
                return(
                    <TransferTicketModal key={friend.user.id} friend={friend.user}/>
                );
            })
            }
        </>
    );
}