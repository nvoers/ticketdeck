import Header from "@/components/header";
// import { sql } from '@vercel/postgres';

export default async function AddTickets() {

    return (
        <>
            {/* @ts-expect-error Server Component */}
            <Header/>
            <div className="flex justify-center pt-8">
                {/* <form className="form-control w-full max-w-xs" onSubmit={onSubmit}>
                    <label htmlFor="event_name">Event name</label>
                    <input id="event_name" name="event_name" type="text" placeholder="Event name" className="input input-bordered w-full max-w-xs" />
                    <label htmlFor="event_date">Date</label>
                    <input id="event_date" name="event_date" type="date" placeholder="Date" className="input input-bordered w-full max-w-xs"/>
                    <label htmlFor="ticket_info">Ticket info</label>
                    <input id="ticket_info" name="ticket_info" type="text" placeholder="Ticket info" className="input input-bordered w-full max-w-xs"/>
                    <button className="btn btn-accent btn-outline mt-4">Submit</button>
                </form> */}
                {/* <AddForm /> */}
                {/* <ul>
                    {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.text}
                        <DeleteForm id={todo.id} todo={todo.text} />
                    </li>
                    ))}
                </ul> */}
            </div>
        </>
    );
}