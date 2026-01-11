import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    title : string;
    image : string;
    slug : string;
    location : string;
    date : string;
    time : string;            
}

const EventCard = ({title , image ,slug ,location, date ,time } : Props) => {
  return (
    <Link href={`/events/${slug}`} id='event-card'>
        <Image src={image} alt='title' width={410} height={300} className='poster'/>
         <p className='title'> {title} </p>

         <div className='flex flex-row gap-2'>
            <Image src='icons/pin.svg' alt='location' height={14} width={14}/>
            <p>{location}</p>
         </div>

         

         <div className='datetime'>
            <Image src="/icons/calendar.svg" alt='date' width={14}  height={14}/>
            <p className=''>{date}</p>

            <Image src="/icons/clock.svg" alt='clock' width={14}  height={14}/>
            <p className=''>{time}</p>
         </div>
    </Link>
  )
}

export default EventCard