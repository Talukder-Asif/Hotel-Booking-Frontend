import { useState, useEffect } from "react";
import UseAxiousSecure from "../../../Hooks/UseAxiousSecure";
import Loading from "../../../Components/Loading/Loading";
import { FaUserAlt } from "react-icons/fa";
import { FaChildReaching } from "react-icons/fa6";

const Status = () => {
  // State for all data
  const [todaysCheckins, setTodaysCheckins] = useState([]);
  const [todaysCheckouts, setTodaysCheckouts] = useState([]);
  const [todaysCancels, setTodaysCancels] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = UseAxiousSecure();

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [axiosSecure]);

  const fetchData = async () => {
    try {
      // Replace these with your actual API endpoints
      const Res = await axiosSecure.get("/status");

      setTodaysCheckins(Res?.data?.todaysCheckins);
      setTodaysCheckouts(Res?.data?.todayCheckOuts);
      setTodaysCancels(Res?.data?.cancelledBookings);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle check-in status change
  const handleCheckInChange = async (id) => {
    try {
      await axiosSecure.patch(`/isCheck/reservations/${id}`, {
        isCheckIn: true,
      });
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating check-in status:", error);
    }
  };

  // Handle check-out status change
  const handleCheckOutChange = async (id) => {
    try {
      await axiosSecure.patch(`/checkout/reservations/${id}`, {
        isCheckOut: true,
      });
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating check-out status:", error);
    }
  };

  // Handle refund status change
  const handleRefundChange = async (id, currentStatus) => {
    try {
      await axiosSecure.patch(`/api/cancellations/${id}`, {
        refund: !currentStatus,
      });
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating refund status:", error);
    }
  };
  if (loading) return <Loading></Loading>;

  return (
    <div className="p-6 space-y-8">
      {/* Today's Check-ins Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-600">
          Today&apos;s Check-ins
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Guest
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Checked In
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {todaysCheckins?.map((reservation, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {reservation.guestName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {reservation.userEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {reservation.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      Room {reservation.roomCode}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {reservation.totalNights} nights
                    </div>
                    <div className="text-sm text-gray-500">
                      {reservation.checkIn} to {reservation.checkOut}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {reservation.adultPeople + reservation.children} Person
                    </div>
                    <div className="text-sm gap-1 items-center flex text-gray-500">
                      <FaUserAlt className="text-xs" />
                      {reservation.adultPeople} ,{" "}
                      <FaChildReaching className="text-sm" />
                      {reservation.children}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={reservation.isCheckIn}
                      onChange={() => handleCheckInChange(reservation._id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Today's Check-outs Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-orange-600">
          Today&apos;s Check-outs
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stay Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Checked Out
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {todaysCheckouts.map((reservation, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {reservation.guestName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {reservation.userEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {reservation.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      Room {reservation.roomCode}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {reservation.totalNights} nights
                    </div>
                    <div className="text-sm text-gray-500">
                      {reservation.checkIn} to {reservation.checkOut}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={reservation.isCheckOut}
                      onChange={() => handleCheckOutChange(reservation._id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Today's Cancels Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-red-600">Cancels</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cancel Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Refund
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {todaysCancels.map((cancel, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {cancel.guestName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {cancel.userEmail}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{cancel.title}</div>
                    <div className="text-sm text-gray-500">
                      Room {cancel.roomCode}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(cancel.cancelledAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={cancel.refund}
                      onChange={() =>
                        handleRefundChange(cancel._id, cancel.refund)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Status;
