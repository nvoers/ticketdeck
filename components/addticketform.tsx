'use client'

import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'

const initialState = {
  message: "",
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending} className='btn btn-accent btn-outline mt-4'>
      Add ticket
    </button>
  )
}

export default function AddTicketForm() {

    return(
        <form className="form-control w-full max-w-xs" action="/api/ticket">
            <label htmlFor="event_name">Event name</label>
            <input id="event_name" name="event_name" type="text" placeholder="Event name" className="input input-bordered w-full max-w-xs" />
            <label htmlFor="event_date">Date</label>
            <input id="event_date" name="event_date" type="date" placeholder="Date" className="input input-bordered w-full max-w-xs"/>
            <label htmlFor="ticket_info">Ticket info</label>
            <input id="ticket_info" name="ticket_info" type="text" placeholder="Ticket info" className="input input-bordered w-full max-w-xs"/>
            <SubmitButton />
        </form>
    );
}