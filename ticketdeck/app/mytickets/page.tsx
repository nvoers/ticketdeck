import Link from "next/link";
import Header from "@/components/header";
import NextEvent from "@/components/nextevent";
import TicketModal from "@/components/ticketmodal";
import { auth } from "@clerk/nextjs";
import { Ticket } from "@prisma/client";

async function getEvents(){
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/ticket', {
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

export async function getFirstname(){
    try {
        const token = await auth().getToken();
        const res = await fetch(process.env.BASE_URL + '/api/user', {
            method: 'GET',
            cache: 'no-store',
            headers: {Authorization: `Bearer ${token}`}
        });
        if(res.status == 401){
            console.log("Unauthorized");
            return "";
        }
        const result = await res.json();
		if(result.user.firstName == ""){
            console.log("No first name");
			return "";
		}
        return result.user.firstName[0].toUpperCase() + result.user.firstName.slice(1).toLowerCase();
    } catch (error) {
        console.log(error);
    }
    return "";
}

const formatDate = (dateString: any) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const isToday = today.getFullYear() === eventDate.getFullYear() &&
                today.getMonth() === eventDate.getMonth() &&
                today.getDate() === eventDate.getDate();
    if(isToday){
        return "Today";
    }
    const formattedDate = eventDate.toLocaleDateString('en-UK', {day: 'numeric', month: 'long', year: 'numeric' });
    return formattedDate;
};

export default async function Home() {
    let events = await getEvents();
    let firstName = await getFirstname();

    return (
    <>
        <Header />
        <div className="container mx-auto px-4 py-4 min-h-screen bg-secondary text-neutral">
            <p className="text-3xl font-bold mb-4">Welcome, {firstName}</p>
            {/* <p className="text-3xl font-bold mb-4">Welcome, Nick</p> */}
            <div className="grid grid-cols-2 gap-2">
                {events.length > 0 ?
                <Link href={`/mytickets/${events[0].id}`} className="col-span-2 text-xl bg-primary text-secondary font-bold rounded-lg py-2 px-3">
                    <p className="mb-4">Next event</p>
                    <p>{events[0].name}</p>
                    <p>{formatDate(events[0].date)}</p>
                </Link>
                :
                <div className="col-span-2 text-xl bg-primary text-secondary font-bold rounded-lg py-2 px-3">
                    <p className="mb-4">Next event</p>
                    <p>No upcoming event</p>
                </div>
                }
                <Link href={"/mytickets/all"} prefetch={false} className="row-span-3 bg-primary text-secondary font-bold rounded-lg py-2 px-3 flex flex-col justify-between">
                    <p className="text-lg">Upcoming events</p>
                    {events.length > 1 ?
                    <div>
                        {events.slice(1,4).map((event: Ticket) => {
                            return(<p key={event.id} className="truncate">{event.name}</p>);
                        })}
                    </div>
                    :
                    <p>No upcoming events</p>}
                </Link>
                <Link href="/mytickets/add" className="text-xl text-primary border-2 border-primary font-bold rounded-lg py-2 px-3">New ticket</Link>
                <Link href="/mytickets/all" className="text-xl text-primary border-2 border-primary font-bold rounded-lg py-2 px-3">All tickets</Link>
                <Link href="/friends" className="text-xl text-secondary bg-accent font-bold rounded-lg py-2 px-3">Friends</Link>
            </div>
        </div>
      {/* <div className="bg-gradient-to-b from-primary to-white to-[50%] h-screen p-8">
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
      </div> */}
    </>
    );
}
