import { useLocation } from "react-router-dom";
import UseUser from "../../Hooks/UseUser";
import Loading from "../../Components/Loading/Loading";
import UseAxiousSecure from "../../Hooks/UseAxiousSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const { userData, isLoading } = UseUser();
  const { state } = useLocation();
  const { newUnAvailable, reservationData } = state || {};
  const [isRoomLoading, setIsRoomLoading] = useState(true);
  const [roomData, setRoomData] = useState(null);
  const axiosSecure = UseAxiousSecure();
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axiosSecure.get(
          `/rooms/${reservationData?.roomId}`
        );
        setRoomData(response.data);
        setIsRoomLoading(false);
      } catch (error) {
        console.error("Error fetching room data:", error);
        setIsRoomLoading(false);
      }
    };

    fetchRoomData();
  }, [reservationData.roomId, axiosSecure]);

  if (isLoading || isRoomLoading) {
    return <Loading></Loading>;
  }
  if (!reservationData)
    return (
      <p className="text-center text-5xl my-20">
        No reservation data provided.
      </p>
    );

  // Format the date and time to "YYYY-MM-DD HH:MM:SS"
  const formatDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split("T")[0]; // "2025-05-03"
    const time = now.toTimeString().split(" ")[0]; // "16:45:12"
    return `${date} ${time}`;
  };

  const handlePayment = () => {
    const newReservationData = {
      ...reservationData,
      userId: userData?._id,
      payment: "paid",
      status: "confirmed",
      reservationTime: formatDateTime(), // "2025-05-03 16:45:12"
    };
    const newRoomData = {
      ...roomData,
      unAvailable: [
        ...(roomData?.unAvailable || []),
        ...(newUnAvailable || []),
      ],
    };

    const totalData = {
      reservationData: newReservationData,
      roomData: newRoomData,
      userData,
    };

    axiosSecure.post("/reservation", totalData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Payment Successful",
          text: "Your payment has been successfully processed.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/myBookings";
        });
      } else {
        alert("Payment failed. Please try again.");
      }
    });
  };

  return (
    <div>
      <div className="bg-white my-20 p-6 rounded-xl shadow-2xl border w-full max-w-2xl mx-auto text-gray-800 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-[#002A3F]">
          Reservation Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Room Name:</span>
            <span>{reservationData?.title}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Room Number:</span>
            <span>{reservationData?.roomCode}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Check-In:</span>
            <span>{reservationData?.checkIn}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Check-Out:</span>
            <span>{reservationData?.checkOut}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Adults:</span>
            <span>{reservationData?.adultPeople}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Children:</span>
            <span>{reservationData?.children}</span>
          </div>
          <div className="flex justify-between border-b pb-2 text-base font-semibold">
            <span>Total Nights:</span>
            <span>{reservationData?.totalNights}</span>
          </div>
          <div className="flex justify-between border-b pb-2 text-base font-semibold text-green-600">
            <span>Total Price:</span>
            <span>{reservationData?.totalPrice} BDT</span>
          </div>
          <div className="flex justify-between pb-2">
            <span className="font-medium">Status:</span>
            <span className="capitalize text-yellow-600">
              {reservationData?.status}
            </span>
          </div>
          <div className="flex justify-between pt-3 border-t">
            <span className="font-medium">Booked By:</span>
            <span>{userData?.Name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{userData?.email}</span>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handlePayment}
            className="w-full bg-[#002A3F] hover:bg-[#004e6f] transition-colors text-white font-semibold py-3 rounded-lg"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
