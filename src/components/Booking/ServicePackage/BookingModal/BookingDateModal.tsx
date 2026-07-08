"use client";

import { useEffect, useState } from "react";
import {
  X,
  CalendarDays,
  Clock3,
  Users,
  CheckCircle2,
} from "lucide-react";

import BookingParticipants from "./BookingParticipants";
import BookingTimeFields from "./BookingTimeFields";

export type BookingData = {
  bookingDate: string;
  startTime: string;
  endTime: string;
  participants: number;
  adults?: number;
  children?: number;
};

type Props = {
  open: boolean;
  serviceName: string;
  minParticipants: number;
  maxParticipants: number;
  defaultParticipants: number;
    priceMode:
    | "fixed"
    | "per_person"
    | "per_adult_child";
    
  onClose: () => void;
  onConfirm: (data: BookingData) => void;
};

export default function BookingDateModal({
  open,
  serviceName,
  minParticipants,
  maxParticipants,
  defaultParticipants,
  priceMode,
  onClose,
  onConfirm,
}: Props) {

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
    const [participants, setParticipants] =
        useState(defaultParticipants);

    const [adults, setAdults] =
        useState(1);

    const [children, setChildren] =
        useState(0);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {

    if(open){

        setBookingDate("");

        setStartTime("");

        setEndTime("");

        setParticipants(defaultParticipants);

        setAdults(1);

        setChildren(0);

        setError(null);

    }

    },[
    open,
    defaultParticipants
    ]);

  if(!open) return null;
  const submit = () => {
    if(!bookingDate){

      setError(
        "Please select booking date"
      );

      return;
    }
    if(!startTime || !endTime){

      setError(
        "Please select booking time"
      );

      return;
    }
    if(endTime <= startTime){

      setError(
        "End time must be after start time"
      );

      return;
    }
    if(
      participants < minParticipants ||
      participants > maxParticipants
    ){

      setError(
        `Participants ${minParticipants}-${maxParticipants}`
      );

      return;
    }
        onConfirm({

        bookingDate,

        startTime,

        endTime,

        participants,

        adults,

        children

        });

  };
  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      p-4
      "
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className="
        absolute
        inset-0
        bg-black/40
        backdrop-blur-none
        "
      />
      {/* Modal */}

      <div
        className="
        relative
        w-full
        max-w-4xl
        overflow-hidden
        // rounded-xl
        rounded-lg
        bg-white
        shadow-2xl
        "
      >
        {/* Header */}

        <div
          className="
          flex
          items-center
          justify-between
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          px-6
          py-4
          text-white
          "
        >

          <div>

            <h2
              className="
              text-xl
              font-bold
              "
            >
              Booking Details
            </h2>
            <p
              className="
              mt-1
              text-sm
              text-blue-100
              "
            >
              {serviceName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="
            rounded-full
            bg-white/20
            p-2
            transition
            hover:bg-white/30
            "
          >
            <X size={18}/>

          </button>
        </div>

        {/* Content */}
        <div
          className="
          px-6
          py-5
          "
        >
           <div
            className="
            grid
            gap-4
            md:grid-cols-3
            "
          >
            {/* Date */}

            <div
              className="
              rounded-2xl
              border
              border-gray-100
              bg-gray-50
              p-3
              "
            >
            <label
                className="
                mb-2
                flex
                items-center
                gap-2
                text-xs
                font-semibold
                text-gray-700
                "
              >
                <CalendarDays
                  size={15}
                  className="text-blue-600"
                />

                Booking Date

              </label>
              <input

                type="date"

                min={
                  new Date()
                  .toISOString()
                  .split("T")[0]
                }

                value={bookingDate}

                onChange={(e)=>
                  setBookingDate(e.target.value)
                }

                className="
                h-10
                w-full
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                text-sm
                outline-none
                transition
                focus:border-blue-500
                "
              />
            </div>

            {/* Guests */}

            <div
              className="
              rounded-2xl
              border
              border-gray-100
              bg-gray-50
              p-3
              "
            >
              <label
                className="
                mb-2
                flex
                items-center
                gap-2
                text-xs
                font-semibold
                text-gray-700
                "
              >
                <Users
                  size={15}
                  className="text-blue-600"
                />
                Guests
              </label>
              <BookingParticipants
                value={participants}
                min={minParticipants}
                max={maxParticipants}
                priceMode={priceMode}
                adults={adults}
                children={children}
                onChange={setParticipants}
                onAdultChange={setAdults}
                onChildrenChange={setChildren}
                />
            </div>
            {/* Time */}

            <div
              className="
              rounded-2xl
              border
              border-gray-100
              bg-gray-50
              p-3
              "
            >
              <label
                className="
                mb-2
                flex
                items-center
                gap-2
                text-xs
                font-semibold
                text-gray-700
                "
              >
                <Clock3
                  size={15}
                  className="text-blue-600"
                />

                Time

              </label>
              <BookingTimeFields

                startTime={startTime}

                endTime={endTime}

                onStartChange={setStartTime}

                onEndChange={setEndTime}
              />
            </div>
          </div>
          {error && (

            <div
              className="
              mt-4
              flex
              items-center
              gap-2
              rounded-xl
              bg-red-50
              px-4
              py-2.5
              text-sm
              text-red-600
              "
            >
              <X size={15}/>

              {error}

            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="
          flex
          items-center
          justify-between
          border-t
          bg-gray-50
          px-6
          py-3
          "
        >
          <div
            className="
            hidden
            items-center
            gap-2
            text-xs
            text-gray-500
            sm:flex
            "
          >
          <CheckCircle2
              size={15}
              className="text-green-500"
            />
            Secure Booking
          </div>
          <div
            className="
            flex
            w-full
            gap-3
            sm:w-auto
            "
        >
            <button
              onClick={onClose}
              className="
              flex-1
              rounded-xl
              border
              bg-white
              px-6
              py-2.5
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-100
              sm:flex-none
              "
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="
              flex-1
              rounded-xl
              bg-blue-600
              px-7
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-blue-700
              sm:flex-none
              "
            >
              Add Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}