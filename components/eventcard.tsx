import TicketModal from "./ticketmodal";

export default function EventCard({formId}: {formId: string}) {
    return(
        <label htmlFor={formId} className="card bg-secondary glass text-white py-2 px-4 my-4 rounded-none relative">
            <div className="flex items-center">
                <p className="text-xl font-bold ">Event name placeholder</p>
                <span className="badge badge-accent font-bold ml-2">Tomorrow</span>
            </div>
            <p className="text-md">Sat 16 Dec 2023</p>
        </label>
    );
}