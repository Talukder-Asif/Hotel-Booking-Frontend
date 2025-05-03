import { useLocation } from "react-router-dom";
import UseUser from "../../Hooks/UseUser";
import Loading from "../../Components/Loading/Loading";

const PaymentPage = () => {
  const { userData, isLoading } = UseUser();
  const { state } = useLocation();
  const { newUnAvailable, reservationData } = state || {};
  console.log(newUnAvailable, reservationData, userData);
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (!reservationData)
    return <p className="text-center mt-10">No reservation data provided.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
        Payment Summary
      </h2>

      <div className="space-y-4 text-gray-700">
        <div className="flex justify-between border-b pb-2">
          <span>Room ID:</span>
          <span>{reservationData.roomId}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span>Check-In:</span>
          <span>{reservationData.checkIn}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span>Check-Out:</span>
          <span>{reservationData.checkOut}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span>Adults:</span>
          <span>{reservationData.adultPeople}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span>Children:</span>
          <span>{reservationData.children}</span>
        </div>
        <div className="flex justify-between border-b pb-2 font-semibold">
          <span>Total Nights:</span>
          <span>{reservationData.totalNights}</span>
        </div>
        <div className="flex justify-between border-b pb-2 font-semibold text-green-600">
          <span>Total Price:</span>
          <span>{reservationData.totalPrice} BDT</span>
        </div>
        <div className="flex justify-between pb-2">
          <span>Status:</span>
          <span className="capitalize text-yellow-600">
            {reservationData.status}
          </span>
        </div>
      </div>

      <button
        className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-200"
        onClick={() => console.log("Initiate payment")}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
