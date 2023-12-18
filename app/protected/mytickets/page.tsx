import Header from "@/components/header";
import EventCard from "@/components/eventcard";
import TicketModal from "@/components/ticketmodal";
import Button from "@/components/button";

export default function MyTickets() {
    return (
        <>
        {/* @ts-expect-error Server Component */}
        <Header/>
        <div className="pt-4">
            <EventCard formId={"event1"}/>
            <EventCard formId={"event2"}/>
            <EventCard formId={"event3"}/>
            <EventCard formId={"event4"}/>
            <EventCard formId={"event5"}/>
            <EventCard formId={"event6"}/>
        </div>
        <Button 
            link={"/"} 
            text={"Add tickets"}/>
        <TicketModal formId={"event1"}/>
        <TicketModal formId={"event2"}/>
        <TicketModal formId={"event3"}/>
        <TicketModal formId={"event4"}/>
        <TicketModal formId={"event5"}/>
        <TicketModal formId={"event6"}/>
        </>
    );

}