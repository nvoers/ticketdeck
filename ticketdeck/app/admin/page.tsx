import { auth } from '@clerk/nextjs';
import { error } from 'console';
import { notFound, redirect } from 'next/navigation';

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
        <div>
            <h1>Admin</h1>
            <p>Admin page</p>
        </div>
    )
}