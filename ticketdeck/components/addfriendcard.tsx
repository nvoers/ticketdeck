'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddFriendCard({user}: {user: User}){

    const router = useRouter();

    const addFriend = async () => {
        try {
            const res = await fetch(process.env.BASE_URL + "/api/friendship", {
                method: 'POST',
                cache: 'no-store',
                body: JSON.stringify({receiverId: user.id}),
            });
            if(res.status == 401){
                console.log("Unauthorized");
                return;
            }
            if(res.status == 200){
                router.refresh();
                toast.success('Friend added');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="border-primary border-2 px-3 py-3 font-bold rounded-lg mb-3 flex justify-between items-center">
            <div>
                <p className="text-2xl text-primary truncate">{user.firstName} {user.lastName}</p>
                <p className="text-md text-slate-400 truncate">{user.username}</p>
            </div>
            <button className="border-2 border-success rounded-md text-left text-success px-2" onClick={addFriend}>
                <FontAwesomeIcon icon={faPlus} className="h-fill" color="error"/>
            </button>
        </div>
    );
}