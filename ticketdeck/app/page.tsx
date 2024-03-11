import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
    return (
    <>
        <div className="container mx-auto px-4 py-6 min-h-screen bg-secondary text-neutral">
            <p className="text-4xl font-bold">Ticketdeck</p>
            <p className="text-2xl font-bold">All of your tickets in one place</p>
            <div className="grid grid-cols-2 gap-2 mt-4">
                <SignUpButton redirectUrl="/mytickets">
                    <div className="text-2xl bg-primary text-secondary font-bold rounded-lg p-2 h-28 flex flex-col justify-end">
                        <p>Register</p>
                    </div>
                </SignUpButton>
                <SignInButton redirectUrl="/mytickets" mode="modal">
                    <div className="text-2xl bg-primary text-secondary font-bold rounded-lg p-2 h-28 flex flex-col justify-end">
                        <p>Sign in</p>
                    </div>
                </SignInButton>
                <div className="col-span-2">
                    <p className="text-2xl text-primary border-2 border-primary font-bold rounded-lg p-2">Share tickets with <span className="text-accent">friends</span> and <span className="text-accent">family</span></p>
                </div>
            </div>
            
        </div>
      
    </>
    );
}
