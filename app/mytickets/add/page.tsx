'use client'

import Header from "@/components/header";
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'

function SubmitButton() {
    const { pending } = useFormStatus()
  
    return (
      <button type="submit" aria-disabled={pending} className='btn btn-accent btn-outline mt-4'>
        Add ticket
      </button>
    )
  }

export default function AddTickets() {
    const [event_name, setEventName] = useState('');
    const [event_date, setEventDate] = useState('');
    const [ticket_info, setTicketInfo] = useState('');
    const router = useRouter();

    const handleEventNameChange = (event) => {
        setEventName(event.target.value);
    }

    const handleDateChange = (event) => {
        setEventDate(event.target.value);
    }

    const handleTicketInfoChange = (event) => {
        setTicketInfo(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await fetch('/api/ticket', {
                method: 'POST', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({event_name, event_date, ticket_info}) 
            });
            router.refresh();
        } catch (error){
            console.error(error);
        }
    
        setEventName('');
        setEventDate('');
        setTicketInfo('');
      };

    return (
        <>
            <Header/>
            <div className="flex justify-center pt-8">
            <form onSubmit={handleSubmit} className="form-control w-full max-w-xs">
                <label htmlFor="event_name">Event name</label>
                <input 
                    id="event_name" 
                    name="event_name" 
                    type="text" 
                    placeholder="Event name" 
                    className="input input-bordered w-full max-w-xs" 
                    value={event_name}
                    onChange={handleEventNameChange}
                    required/>
                <label htmlFor="event_date">Date</label>
                <input 
                    id="event_date" 
                    name="event_date" 
                    type="date" 
                    placeholder="Date" 
                    className="input input-bordered w-full max-w-xs"
                    value={event_date}
                    onChange={handleDateChange}
                    required/>
                <label htmlFor="ticket_info">Ticket info</label>
                <input 
                    id="ticket_info" 
                    name="ticket_info" 
                    type="text" 
                    placeholder="Ticket info" 
                    className="input input-bordered w-full max-w-xs"
                    value={ticket_info}
                    onChange={handleTicketInfoChange}
                    required/>
                <SubmitButton />
            </form>
            
            </div>
        </>
    );
}