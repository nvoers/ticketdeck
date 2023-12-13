import SignOut from "@/components/sign-out";
import Navbar from "@/components/navbar";
import NextEvent from "@/components/next-event";

export default function Home() {

  return (
    <>
    {/* @ts-expect-error Server Component */}
      <Navbar />
      <div className="container mx-auto">
        <NextEvent />
        <div className="grid grid-cols-3  mt-8 gap-8">
          <div className="card w-96 bg-gradient-to-b from-zinc-100 to-primary text-white">
            <div className="card-body">
              <h2 className="card-title">ADD TICKET</h2>
            </div>
          </div>
          <div className="card w-96 bg-gradient-to-b from-zinc-100 to-primary text-white">
            <div className="card-body">
              <h2 className="card-title">VIEW TICKETS</h2>
            </div>
          </div>
          <div className="card w-96 bg-gradient-to-b from-zinc-100 to-primary text-white">
            <div className="card-body">
              <h2 className="card-title">DERDE OPTIE</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
