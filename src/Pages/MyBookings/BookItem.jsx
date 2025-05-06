/* eslint-disable react/prop-types */
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import UseAxiousSecure from "../../Hooks/UseAxiousSecure";
import Swal from "sweetalert2";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import moment from "moment";

const BookItem = ({ data, style, type, num }) => {
  const {
    reservationTime,
    checkIn,
    checkOut,
    title,
    _id,
    totalPrice,
    roomCode,
    adultPeople,
    children,
  } = data;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const [startDate, setStartDate] = useState(new Date(reservationTime));
  const AxiousSecure = UseAxiousSecure();

  const handleUpdate = async () => {
    const res = await AxiousSecure.put(`/UpdateBooking/${_id}`, { startDate });
    const data = res.data;
    console.log(data);
    handleOpen();
    Swal.fire("Saved!", "", "success");
    location.reload();
    return;
  };

  const handleCancel = async () => {
    if (!startDate) return;

    const booked = new Date(checkIn);
    const today = new Date();

    // Remove time part to ensure accurate day comparison
    booked.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const differenceInDays = Math.floor(
      (booked - today) / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays > 1) {
      const result = await Swal.fire({
        title: "Do you really want to cancel?",
        text: "We will refund your money within 3-5 working days, with a 10% deduction as tax.",
        icon: "warning",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes, cancel it!",
        denyButtonText: "No",
      });

      if (result.isConfirmed) {
        try {
          await AxiousSecure.delete(`/deleteBookings/${_id}`);
          await AxiousSecure.put(`/UpdateAvailability/${roomCode}`);

          await Swal.fire(
            "Cancelled!",
            "Your booking has been cancelled.",
            "success"
          );
          location.reload();
        } catch (error) {
          console.error("Cancellation error:", error);
          Swal.fire(
            "Error!",
            "Something went wrong while cancelling the booking.",
            "error"
          );
        }
      } else if (result.isDenied) {
        Swal.fire("Cancelled", "Your booking is still active.", "info");
      }
    } else {
      Swal.fire({
        title: "Too late to cancel!",
        text: "You can't cancel the booking less than 2 days before check-in.",
        icon: "info",
      });
    }
  };

  return (
    <>
      <tr className={num % 2 ? "bg-gray-100 " : style}>
        <td className="px-6 py-4 text-left">
          {roomCode}
          <p>{title}</p>
        </td>
        <td className="px-6 py-4 text-center">{totalPrice} BDT</td>
        <td className="px-6 py-4 text-center">
          <p>{new Date(checkIn).toLocaleDateString("en-GB")}</p>
        </td>
        <td className="px-6 py-4 text-center">
          <p>{new Date(checkOut).toLocaleDateString("en-GB")}</p>
        </td>
        {type === "active" ? (
          <>
            {" "}
            <td className="px-6 py-4 text-center">
              <button
                onClick={handleOpen}
                className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-900 focus:outline-none"
              >
                Update
              </button>
            </td>
            <td className="px-6 py-4 text-center">
              <button
                onClick={() => {
                  handleCancel();
                }}
                className="bg-red-400 text-white px-4 py-2 rounded-full hover:bg-red-500 focus:outline-none"
              >
                Cancel
              </button>
            </td>
          </>
        ) : (
          <td className="px-6 py-4 text-center"> {adultPeople + children}</td>
        )}
      </tr>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Change the date as your wish</DialogHeader>
        <DialogBody>
          <p className="flex flex-col text-lg">
            <span>Your Current Booking Date is</span>
            <span>{moment(reservationTime).format("MMM Do YYYY")}</span>
          </p>

          <div className=" flex justify-center mx-auto">
            <ReactDatePicker
              minDate={new Date()}
              showIcon
              className="rounded-lg border-[1px] flex items-center border-blue-500"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleUpdate}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default BookItem;
