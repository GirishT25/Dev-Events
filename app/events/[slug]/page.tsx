import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/event.action";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const BASE_URL = process.env.NEXT_BASE_PUBLIC_URL;

// -------------------- Small Components --------------------

const EventDetailItems = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  if (!agendaItems.length) return null;

  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const Tags = ({ tags = [] }: { tags?: string[] }) => {
  if (!tags.length) return null;

  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {tags.map((tag) => (
        <div className="pill" key={tag}>
          {tag}
        </div>
      ))}
    </div>
  );
};

const bookings = 10;


// -------------------- Page Component --------------------

const EventDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  
  const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
    cache: "no-store",
  });
  
  const {
    event: {
      description,
      image,
      overview,
      date,
      time,
      location,
      agenda,
      audience,
      mode,
      organizer,
      tags,
    },
  } = await request.json();
  
  if (!description) return notFound();
  
  const SimilarEvents : IEvent[] = await getSimilarEventsBySlug(slug)
  return (
    <section id="event">
      {/* ---------- Header ---------- */}
      <div className="header">
        <h1>
          Event Details <br />
          {slug}
        </h1>
        <p>{description}</p>
      </div>

      {/* ---------- Main Layout ---------- */}
      <div className="details">
        {/* ===== LEFT SIDE ===== */}
        <div className="content">
          <Image
            src={image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>

            <EventDetailItems
              icon="/icons/calendar.svg"
              alt="date"
              label={date}
            />
            <EventDetailItems
              icon="/icons/clock.svg"
              alt="time"
              label={time}
            />
            <EventDetailItems
              icon="/icons/pin.svg"
              alt="location"
              label={location}
            />
            <EventDetailItems
              icon="/icons/mode.svg"
              alt="mode"
              label={mode}
            />
            <EventDetailItems
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          <EventAgenda agendaItems={agenda} />

          <section className="flex-col-gap-2">
            <h2>Organizer</h2>
            <p>{organizer}</p>
          </section>

          <Tags tags={tags} />
        </div>

        {/* ===== RIGHT SIDE ===== */}
        <aside className="booking">
          <div className="signup-card">
            <p className="text-lg font-semibold">Book Event</p>
            {/* booking form / button goes here */}
            {
              bookings > 0 ? (
                <p className="text-sm">
                  Join {bookings} people who have already book their spots. 
                </p>
              ): (
                <p className="text-sm">
                  Be first to book your spot for this event!
                </p>
              )

            }
            <BookEvent/>

          </div>
        </aside>
      </div>

      <div>
        <h2>Similar Events</h2>
        <div className="events">
              {
                SimilarEvents.length >  0 && SimilarEvents.map((similarEvent : IEvent) =>(
                  <EventCard key={similarEvent.title} {...similarEvent}/>
                ))
              }
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
