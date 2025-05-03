import PropTypes from "prop-types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Reservation = ({ unAvailable = [], pricePerNight, _id, bedFor }) => {
  const unAvailableCheckout = unAvailable?.map((date) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  });

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [error, setError] = useState(null);
  const [totalNights, setTotalNights] = useState(0);
  const handleCheckout = (date) => {
    if (!checkIn) return;

    const isInvalid = unAvailable.some(
      (unDate) => unDate > checkIn && unDate <= date
    );

    if (isInvalid) {
      setCheckOut(null);

      const unDatesBeforeCheckout = unAvailableCheckout?.find(
        (unDate) => unDate < date
      );
      const formattedDates = unDatesBeforeCheckout.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      setError(`Please select checkout before: ${formattedDates}`);
      return;
    }
    setError(null);
    setCheckOut(date);
    setTotalNights(Math.ceil((date - checkIn) / 86400000));
  };

  return (
    <div className="flex flex-col gap-6 p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Check-In */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Check-In Date
          </label>
          <div className="relative">
            <DatePicker
              selected={checkIn}
              onChange={(date) => {
                setCheckIn(date);
                setCheckOut(null);
              }}
              minDate={new Date()}
              excludeDates={unAvailable}
              placeholderText="Choose arrival"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              calendarClassName="border border-gray-200 shadow-lg rounded-lg"
              popperPlacement="bottom-start"
              dateFormat="MMMM d, yyyy"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Check-Out */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Check-Out Date
          </label>
          <div className="relative">
            <DatePicker
              selected={checkOut}
              onChange={(date) => handleCheckout(date)}
              minDate={
                checkIn ? new Date(checkIn.getTime() + 86400000) : new Date()
              } // +1 day
              excludeDates={unAvailableCheckout}
              placeholderText="Choose departure"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
              calendarClassName="border border-gray-200 shadow-lg rounded-lg"
              popperPlacement="bottom-start"
              dateFormat="MMMM d, yyyy"
              disabled={!checkIn}
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Date Summary */}
      {checkIn && checkOut && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Your stay</p>
              <p className="font-medium">
                {checkIn.toLocaleDateString()} → {checkOut.toLocaleDateString()}
              </p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {totalNights} nights
            </span>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-500 text-center">**{error}**</p>}
    </div>
  );
};

Reservation.propTypes = {
  unAvailable: PropTypes.oneOfType([PropTypes.bool, PropTypes.array])
    .isRequired,
  pricePerNight: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  bedFor: PropTypes.number.isRequired,
};

export default Reservation;
