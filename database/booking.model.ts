import { Schema, model, models, Document, Types } from 'mongoose';
import Event from './event.model';

/**
 * TypeScript interface for Booking document
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking Schema
 */
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          return emailRegex.test(email);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save middleware
 * - Validates Event existence
 * - ASYNC (no next())
 */
BookingSchema.pre('save', async function () {
  const booking = this as IBooking;

  if (booking.isNew || booking.isModified('eventId')) {
    const eventExists = await Event.findById(booking.eventId).select('_id');

    if (!eventExists) {
      throw new Error(`Event with ID ${booking.eventId} does not exist`);
    }
  }
});

/**
 * Indexes
 */

// Fast lookup by event
BookingSchema.index({ eventId: 1 });

// Event bookings sorted by latest
BookingSchema.index({ eventId: 1, createdAt: -1 });

// Lookup bookings by email
BookingSchema.index({ email: 1 });

// Enforce ONE booking per event per email
BookingSchema.index(
  { eventId: 1, email: 1 },
  { unique: true, name: 'uniq_event_email' }
);

/**
 * Model export (Next.js safe)
 */
const Booking =
  models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
