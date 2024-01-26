import toast from 'react-hot-toast';
import Search from './search';
import { prisma } from '@/lib/prisma';
import SearchResult from './searchresult';
import { auth } from '@clerk/nextjs';

export default function TransferSearch({ ticketId, searchParams } : {ticketId: any, searchParams?: {
    query?: string;
    page?: string;
  };}){

    const transferTicket = async (user: any) => {
        try {
            toast.success('Ticket transfered!');
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
    }

    const query = searchParams?.query || null;

    return (
        <>
            <Search placeholder="Search for friends"/>
            {/* {users.length == 0 && query ? 
                <div className="text-md text-center mt-4 text-gray-800">No results</div> 
                : 
                users.map(async (user) => {
                    return(
                        <SearchResult userResult={user} key={user.id} userId={userId}/>
                    );
                })
            } */}
        </>
    );
}