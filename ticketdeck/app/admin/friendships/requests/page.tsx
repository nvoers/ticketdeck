import Header from "@/components/header";

export default async function Page() {
    return(
        <>
            <Header back/>
            <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
                <p className="text-3xl font-bold mb-4">Friendship requests</p>
            </div>
        </>
    );
}