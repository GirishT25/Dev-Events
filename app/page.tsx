import EventCard from '@/components/EventCard'
import ExplorerBtn from '@/components/ExplorerBtn'
import events from '@/lib/constants'
import { Exo } from 'next/font/google'
import React from 'react'


const page = () => {
  return (
    <>
  <section>
    <h1 className='text-center'>The Hub for every Dev Event <br /> You can't miss</h1>
    <p className='text-center mt-5'>Hackthons, conferences, meetups and more.</p>
  </section>
  <ExplorerBtn/>

  <div className='mt-20 space-y-7'>
    <p>Feature Event</p>

    <ul className='events'>
      {
      events.map((event) => (
        <li key={event.title} >
          <EventCard {...event}/>
        </li>
      ))
      }
    </ul>
  </div>
    </>
  )
}

export default page