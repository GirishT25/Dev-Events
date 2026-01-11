import EventCard from '@/components/EventCard'
import ExplorerBtn from '@/components/ExplorerBtn'
import events from '@/lib/constants'
import { Exo } from 'next/font/google'
import React from 'react'
import mongoose  from 'mongoose'
import { IEvent } from '@/database'
import { cacheLife } from 'next/dist/server/use-cache/cache-life'


const BASE_URL = process.env.NEXT_BASE_PUBLIC_URL

const page = async () => {
  'use cache'
  cacheLife('hours')
  
  const response = await fetch(`${BASE_URL}/api/events`);
  const {events } = await response.json();

  return (
    <>

  <section>
    <h1 className='text-center'>The Hub for every Dev Event <br /> You can't miss</h1>
    <p className='text-center mt-5'>Hackthons, conferences, meetups and more.</p>
  </section>
  <ExplorerBtn/>

  <div className='mt-20 space-y-7'>
    <h3>Featured Events</h3>

    <ul className='events list-none'>
      {
      events && events.length > 0 && events.map((event : IEvent) => (
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