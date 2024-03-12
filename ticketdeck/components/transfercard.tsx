'use client'

export default function TransferCard({ friend }: { friend: any}) {

    return (
        <div className="border-primary border-2 px-3 py-3 font-bold rounded-lg mb-3 w-full text-left">
            <label htmlFor={friend.id}>
                <p className="text-2xl text-primary truncate">{friend.firstName} {friend.lastName}</p>
                <p className="text-md text-slate-400 truncate">{friend.username}</p>
            </label>
        </div>
    );
}