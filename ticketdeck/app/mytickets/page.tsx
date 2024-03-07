import Link from "next/link";
import Header from "@/components/header";
import NextEvent from "@/components/nextevent";
import TicketModal from "@/components/ticketmodal";
import { auth } from "@clerk/nextjs";

async function getEvents(){
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.URL + '/api/ticket', {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(res.status == 401){
			console.log("Unauthorized");
			return [];
      }
        const result = await res.json();
		if(!result.tickets){
			return [];
		}
        return result.tickets;
    } catch (error) {
        console.log(error);
    }
    return [];
}

export default async function Home() {
  const events = await getEvents();

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-primary to-white to-[50%] h-screen p-8">
        <div className="container mx-auto">
        {events.length > 0 ? 
        <NextEvent ticketId={events[0].id} eventName={events[0].name} eventDate={events[0].date}/>
        : 
        <div className="text-2xl font-bold">No upcoming events</div>}

        <div className="text-neutral mt-8 mb-8">
          <div className="text-2xl font-bold">Upcoming events</div>
          {events.slice(1,4).map((ticket: any) => {
            return(
              <div key={ticket.id} className="flex flex-col pl-2 pt-2">
                <div className="pt-2 pb-1 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-neutral dark:bg-neutral translate-x-[15%]"></div>
                  <p className="text-neutral font-bold pl-2">
                    {ticket.name}
                  </p>
                </div>
                <div>
                  <div className="flex items-center">
                    <p className="justify-center border-l-2 border-neutral font-semibold text-neutral pl-2 ml-1">
                      {ticket.date.toLocaleDateString('en-UK', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
        <div className="grid grid-cols-2 gap-2 mt-8">
          <Link
                  href={"/mytickets/all"}
                  prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
                  className="btn btn-sm btn-accent btn-outline text-md"
              >
              View all tickets
          </Link>
          <Link
                href={"/mytickets/add"}
                prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
                className="btn btn-sm btn-accent btn-outline text-md"
              >
              Add ticket
          </Link>
        </div>
        {events.length > 0 ?
        <TicketModal ticketId={events[0].id} eventName={events[0].name} ticketInfo={events[0].code}/>:<></>}
      </div>
      </div>
    </>
  );
}
