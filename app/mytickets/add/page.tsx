'use client'

import Header from "@/components/header";
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import toast from "react-hot-toast";

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

    const handleEventNameChange = (event) => {
        setEventName(event.target.value);
    }

    const handleDateChange = (event) => {
        setEventDate(event.target.value);
    }

    const handleTicketInfoChange = (event) => {
        setTicketInfo(event.target.files[0]);
    }

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try{
    //         await fetch('/api/ticket', {
    //             method: 'POST', 
    //             headers: {
    //             'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({event_name, event_date, ticket_info}) 
    //         });
    //         // window.location.href = '/mytickets';
    //         window.location.href = '/mytickets?addSuccess=1';
    //         toast.success('Ticket added!');
    //     } catch (error){
    //         toast.error('Something went wrong');
    //         console.error(error);
    //     }
    
    //     setEventName('');
    //     setEventDate('');
    //     setTicketInfo('');
    // };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!ticket_info) return
    
        try {
            const data = new FormData()
            data.append('ticket_info', ticket_info)
            data.append('event_name', event_name)
            data.append('event_date', event_date)
    
            const res = await fetch('/api/ticket', {
                method: 'POST',
                body: data,
            })
            // handle the error
            // console.log(res.json())
            if (!res.ok) throw new Error(await res.text())
            // window.location.href = '/mytickets?addSuccess=1';
        } catch (e: any) {
            // Handle errors here
            console.error(e)
        }
      }

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
                <label htmlFor="ticket_info">
                    <div className="has-tooltip flex w-fit">
                        <span className='tooltip rounded shadow-lg p-1 bg-gray-100 -mt-8'>Upload an image of the qr-code on your ticket</span>
                        QR-code
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-slate-400 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                    </div>
                </label>
                <input
                    id="ticket_info"
                    name="ticket_info"
                    type="file"
                    className="input input-bordered w-full max-w-xs py-2"
                    onChange={handleTicketInfoChange}
                    required
                />
                <SubmitButton />
            </form>
            
            </div>
        </>
    );
}