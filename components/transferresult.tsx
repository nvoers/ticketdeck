'use client'
export default function TransferResult({ user }: { user: any }) {

    const handleClick = () => {
        transferTicket(user.id, window.location.pathname.split('/')[2]);
    }

    const transferTicket = async (userId: string, ticketId: string) => {
        try {
            console.log("transfer ticket")
            const result = await fetch('/api/ticket/transfer', {
                method: 'POST',
                body: JSON.stringify({userId: userId, ticketId: ticketId}),
            });
            if(result.status === 200)
                window.location.href = '/mytickets?transferSuccess=1';
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-row justify-between items-center bg-white rounded-md shadow-md p-4 mt-4" key={user.id}>
            <div className="flex flex-row items-center">
                <div className="flex flex-col">
                    <p className="text-md font-semibold">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-500">{user.username}</p>
                </div>
            </div>
            <div className="flex flex-row items-center">
                <div className="flex flex-col">
                    <button className="btn btn-sm btn-accent" onClick={handleClick}>Transfer ticket</button>
                </div>
            </div>
        </div>
    );
}