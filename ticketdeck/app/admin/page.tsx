import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export async function getUserCount(){
    const token = await auth().getToken();
    const res = await fetch(process.env.URL + '/api/user?count', {
        method: 'GET',
        cache: 'no-store',
        headers: {Authorization: `Bearer ${token}`}
    });
    const result = await res.json();
    return result.count;
}

export async function getTicketCount(){
    const token = await auth().getToken();
    const res = await fetch(process.env.URL + '/api/ticket?count', {
        method: 'GET',
        cache: 'no-store',
        headers: {Authorization: `Bearer ${token}`}
    });
    const result = await res.json();
    return result.count;
}

export async function getFriendshipCount(){
    const token = await auth().getToken();
    const res = await fetch(process.env.URL + '/api/friendship?count', {
        method: 'GET',
        cache: 'no-store',
        headers: {Authorization: `Bearer ${token}`}
    });
    const result = await res.json();
    return result.count;
}

export default async function Page() {

    try {
        const token = await auth().getToken();
        const { userId } = auth();
        const res = await fetch(process.env.URL + '/api/user?id=' + userId, {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        const result = await res.json();
        if(result.user.role == 'USER'){
            redirect('/user');
		}
    } catch (error) {
        console.error(error);
        return redirect('/');
    }

    return(
            <div className='container mx-auto pt-8'>
                <div className='grid md:grid-cols-6 grid-cols-2 gap-3 mx-4'>
                    <div className='col-span-1'>
                        <Link href="/admin/user">
                            <div className='p-4 bg-gray-300 rounded-lg'>
                                <h1 className='text-2xl font-bold'>Users</h1>
                                <p>{getUserCount()} users</p>
                            </div>
                        </Link>
                    </div>

                    <div className='col-span-1'>
                        <Link href="/admin/ticket">
                            <div className='p-4 bg-gray-300 rounded-lg'>
                                <h1 className='text-2xl font-bold'>Tickets</h1>
                                <p>{getTicketCount()} tickets</p>
                            </div>
                        </Link>
                    </div>

                    <div className='col-span-1'>
                        <Link href="/admin/friendship">
                            <div className='p-4 bg-gray-300 rounded-lg'>
                                <h1 className='text-2xl font-bold'>Friendships</h1>
                                <p>{getFriendshipCount()} friendships</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
    );
}