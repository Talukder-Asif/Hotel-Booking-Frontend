import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import RoomsPic from "./RoomsPic";
import { FaFilter } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";
import UseRoom from "../../Hooks/UseRoom";

const Rooms = () => {
  useEffect(() => {
    // Update the document title for this page
    document.title = "Smart Hotel || Rooms";
  }, []);
  const [value, setValue] = useState("");
  const { rooms, isLoading, refetch } = UseRoom({ value });

  const handleChange = (e) => {
    setValue(e.target.value);
    refetch();
  };

  useEffect(() => {
    if (value) {
      refetch();
    }
  }, [value, refetch]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div
        className="relative w-full min-h-[30vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/roomsbg.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center min-h-[30vh] text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Explore Our Rooms
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
            Discover comfort, convenience, and elegance with our curated
            selection of rooms for every kind of traveler.
          </p>
        </div>
      </div>

      <div className="relative w-72 mx-auto mt-5 flex items-center gap-3">
        <span className="flex items-center gap-3">
          <FaFilter></FaFilter> Filter
        </span>

        <select
          onChange={handleChange}
          className="block w-full py-2 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 appearance-none hover:border-gray-500 focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="">Select</option>
          <option value="desc">Highest to Lowest Price</option>
          <option value="asec">Lowest to Highest Price</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M11.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 10H5a1 1 0 010-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="grid  max-w-[1320px] my-10 gap-10 2xl:grid-cols-2 grid-cols-1 mx-auto">
        {rooms?.map((value) => (
          <RoomsPic key={value._id} data={value}></RoomsPic>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
