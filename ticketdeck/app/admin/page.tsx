import Header from "@/components/header";
import Link from "next/link";

export default async function Page() {
    return(
        <>
            <Header />
            <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
                <p className="text-3xl font-bold mb-4">Admin</p>
                <div className="grid grid-cols-2 gap-2 text-secondary">
                    <Link href="/admin/users" className="bg-primary py-2 px-3 rounded-lg h-28 flex flex-col justify-end">
                        <p className="text-xl font-bold mb-2">Users</p>
                    </Link>
                    <Link href="/admin/tickets"  className="bg-primary py-2 px-3 rounded-lg h-28 flex flex-col justify-end">
                        <p className="text-xl font-bold mb-2">Tickets</p>
                    </Link>
                    <Link href="/admin/friendships"  className="bg-primary py-2 px-3 rounded-lg h-28 flex flex-col justify-end">
                        <p className="text-xl font-bold mb-2">Friendships</p>
                    </Link>
                    <Link href="/admin/friendships/requests"  className="bg-primary py-2 px-3 rounded-lg h-28 flex flex-col justify-end">
                        <p className="text-xl font-bold mb-2">Friendship requests</p>
                    </Link>
                </div>
            </div>
        </>
    );
}