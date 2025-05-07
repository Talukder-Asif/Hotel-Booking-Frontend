import { useState, useEffect } from "react";
import UseAxiousSecure from "../../../Hooks/UseAxiousSecure";

const CanceledBooking = () => {
  const [canceledBookings, setCanceledBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [refundFilter, setRefundFilter] = useState("all"); // 'all', 'refunded', 'not-refunded'
  const axiosSecure = UseAxiousSecure();

  useEffect(() => {
    const fetchCanceledBookings = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/api/cancellations`, {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            search: searchTerm,
            refund:
              refundFilter === "all" ? undefined : refundFilter === "refunded",
          },
        });
        setCanceledBookings(response.data.cancellations);
        setTotalItems(response.data.totalCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching canceled bookings:", error);
        setLoading(false);
      }
    };

    fetchCanceledBookings();
  }, [currentPage, itemsPerPage, searchTerm, refundFilter, axiosSecure]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Canceled Bookings</h1>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by guest email or booking ID..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex gap-4">
          <select
            value={refundFilter}
            onChange={(e) => {
              setRefundFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded p-2"
          >
            <option value="all">All Cancellations</option>
            <option value="refunded">Refunded</option>
            <option value="not-refunded">Not Refunded</option>
          </select>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded p-2"
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Canceled Bookings Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 border text-left">Guest Email</th>
                  <th className="py-3 px-4 border text-left">Room</th>
                  <th className="py-3 px-4 border text-left">Original Dates</th>
                  <th className="py-3 px-4 border text-left">Canceled At</th>
                  <th className="py-3 px-4 border text-left">Refund Status</th>
                  <th className="py-3 px-4 border text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {canceledBookings.map((booking, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking?.guestName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking?.userEmail}
                      </div>
                    </td>{" "}
                    <td className="py-3 px-4 border">
                      <div className="font-medium">{booking.title}</div>
                      <div className="text-sm text-gray-500">
                        {booking.roomCode}
                      </div>
                    </td>
                    <td className="py-3 px-4 border">
                      <div>
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </div>
                      <div>
                        to {new Date(booking.checkOut).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-4 border">
                      {new Date(booking.cancelledAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 border">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          booking.refund
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.refund ? "Refunded" : "Not Refunded"}
                      </span>
                    </td>
                    <td className="py-3 px-4 border font-medium">
                      ${booking.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
              canceled bookings
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Previous
              </button>
              <div className="flex items-center px-4">
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CanceledBooking;
