import Button from "@/components/button";
import Header from "@/components/header";
import NextEvent from "@/components/nextevent";
import TicketModal from "@/components/ticketmodal";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

async function getEvents(userId){
  const date = new Date();
  date.setHours(0,0,0,0);
  const ticket = await prisma.ticket.findMany({
    where: {
      date: {
        gte: date
      },
      userId: userId
    },
    orderBy: {
      date: 'asc'
    }
  });
  return ticket;
}

export default async function Home() {
  
  const { userId } = auth();
  const events = await getEvents(userId);

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
          {events.slice(1,4).map((ticket) => {
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
        <Button link={"/protected/mytickets"} text={"View all tickets"}/>
        {events.length > 0 ?
        <TicketModal ticketId={events[0].id} eventName={events[0].name} ticketInfo={events[0].code}/>:<></>}
      </div>
      </div>
    </>
  );
}
