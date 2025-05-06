import { useContext, useEffect, useState } from "react";
import UseAxiousSecure from "./../../Hooks/UseAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import { Link } from "react-router-dom";
import BookItem from "./BookItem";
import { FaCalendarCheck } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";

const MyBookings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    // Update the document title for this page
    document.title = "Smart Hotel || My Bookings";
  }, []);

  const { user } = useContext(AuthContext);

  const AxiousSecure = UseAxiousSecure();

  const uri = `/myBookings?email=${user?.email}`;
  const getBooking = async () => {
    const result = await AxiousSecure.get(uri);
    return result;
  };
  const { data: Booking, isLoading } = useQuery({
    queryKey: ["booking", user],
    queryFn: getBooking,
  });
  const [activeReservation, setActiveReservation] = useState([]);
  const [previousReservation, setPreviousReservation] = useState([]);

  useEffect(() => {
    if (!Booking?.data) return;

    const now = new Date();

    const active = Booking.data.filter(
      (item) => new Date(item.checkOut) >= now
    );

    const previous = Booking.data.filter(
      (item) => new Date(item.checkOut) < now
    );

    setActiveReservation(active);
    setPreviousReservation(previous);
  }, [Booking?.data]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container min-h-[15vh] mx-auto max-w-screen-lg p-4">
      <div className="overflow-x-auto pt-5 mt-10">
        <h3 className="text-center text-4xl">Active Bookings</h3>

        {activeReservation?.length ? (
          <>
            <table className="min-w-full table-auto bg-white rounded-lg shadow-lg">
              <thead>
                <tr className=" text-blue-600">
                  <th className="px-6 py-3">Room</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Check In</th>
                  <th className="px-6 py-3">Check Out</th>
                  <th className="px-6 py-3">Update</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {activeReservation?.map((value, i) => (
                  <BookItem
                    type="active"
                    num={i}
                    style={"bg-blue-100"}
                    key={value._id}
                    data={value}
                  ></BookItem>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="flex justify-center flex-col items-center my-10">
              <FaCalendarCheck className="w-[100px] h-[100px] "></FaCalendarCheck>

              <h2 className="md:text-3xl  text-xl my-5">
                You haven&apos;t made your first booking yet
              </h2>

              <p>
                All you need to do go for the{" "}
                <span className="text-blue-500">Rooms</span> Page{" "}
              </p>

              <Link to={"/rooms"}>
                <button className="flex btn items-center hover:gap-3 bg-blue-500 my-4 text-white hover:bg-blue-700">
                  Rooms <FaArrowRight></FaArrowRight>
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="overflow-x-auto">
        {previousReservation?.length ? (
          <div className=" p-5 mt-10 bg-gray-200">
            <h3 className="text-center mb-2 text-4xl">Previous Bookings</h3>

            <table className="min-w-full table-auto bg-white rounded-lg shadow-lg">
              <thead>
                <tr className=" text-blue-600">
                  <th className="px-6 py-3">Room</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Check In</th>
                  <th className="px-6 py-3">Check In</th>
                  <th className="px-6 py-3">Guest</th>
                </tr>
              </thead>
              <tbody>
                {previousReservation?.map((value, i) => (
                  <BookItem
                    num={i}
                    type="previous"
                    style={"bg-blue-100"}
                    key={value._id}
                    data={value}
                  ></BookItem>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyBookings;
