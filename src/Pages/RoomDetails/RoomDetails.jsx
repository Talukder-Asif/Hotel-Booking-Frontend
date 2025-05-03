import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ReviewsPOst from "./Reviews/ReviewsPOst";
import DisplayReviews from "./Reviews/DisplayReviews";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import Loading from "../../Components/Loading/Loading";

// Plugins
import Reservation from "./Reservation/Reservation";

import {
  FaBed,
  FaTv,
  FaUmbrellaBeach,
  FaWifi,
  FaTshirt,
  FaUtensils,
  FaSnowflake,
  FaSwimmingPool,
  FaSocks,
  FaDog,
  FaConciergeBell,
  FaShieldAlt,
} from "react-icons/fa";
import RoomImage from "./RoomImg/RoomImage";

const RoomDetails = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    roomCode,
    img,
    title,
    description,
    roomSize,
    roomImages,
    unAvailable,
    pricePerNight,
    _id,
    bedFor,
    TV,
    BeachView,
    Laundry,
    Breakfast,
    AC,
  } = useLoaderData();
  const amenities = [
    [
      {
        label: "Bed For",
        value: `${bedFor || "-"} People`,
        icon: <FaBed className="inline mr-2" />,
      },
      {
        label: "Smart TV",
        value: TV || "No",
        icon: <FaTv className="inline mr-2" />,
      },
      {
        label: "Side Sea View",
        value: BeachView || "No",
        icon: <FaUmbrellaBeach className="inline mr-2" />,
      },
    ],
    [
      {
        label: "Unlimited Wifi",
        value: "Yes",
        icon: <FaWifi className="inline mr-2" />,
      },
      {
        label: "Laundry",
        value: Laundry || "No",
        icon: <FaTshirt className="inline mr-2" />,
      },
      {
        label: "Breakfast",
        value: Breakfast || "No",
        icon: <FaUtensils className="inline mr-2" />,
      },
    ],
    [
      {
        label: "AC",
        value: AC || "No",
        icon: <FaSnowflake className="inline mr-2" />,
      },
      {
        label: "Swimming Pool",
        value: "Available",
        icon: <FaSwimmingPool className="inline mr-2" />,
      },
      {
        label: "Free Slippers",
        value: "Yes",
        icon: <FaSocks className="inline mr-2" />,
      },
    ],
    [
      {
        label: "Pets Allowed",
        value: "No",
        icon: <FaDog className="inline mr-2" />,
      },
      {
        label: "Room Service",
        value: "Yes",
        icon: <FaConciergeBell className="inline mr-2" />,
      },
      {
        label: "24 Hour Security",
        value: "Yes",
        icon: <FaShieldAlt className="inline mr-2" />,
      },
    ],
  ];

  if (!roomCode) {
    return <Loading></Loading>;
  }

  return (
    <div className="my-10 max-w-6xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Image Section */}

        <RoomImage images={roomImages} img={img}></RoomImage>

        {/* Details Section */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4 text-center lg:text-left">
            {title}
          </h2>
          <p className="text-lg text-gray-700 mb-4 text-center lg:text-left">
            {description}
          </p>
          <ul className="space-y-2 text-center lg:text-left text-base text-gray-800 font-medium">
            <li>
              Price Per Night:{" "}
              <span className="text-[#2196F3]">{pricePerNight} </span>
              BDT
            </li>
            <li>
              Room Size: <span className="text-[#2196F3]">{roomSize}</span> ft
              <sup>2</sup>
            </li>
          </ul>
        </div>
      </div>
      {/* Resurvation section */}
      <div className="mt-10 border-t-2 pt-10 grid grid-cols-2">
        <div className="mx-5 my-5">
          <table className="w-full max-w-4xl border-collapse font-sans">
            <tbody>
              {amenities.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((item, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-gray-300 p-3 text-left align-middle"
                    >
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">{item.icon}</span>
                        <div>
                          <span className="font-medium">{item.label}</span>
                          <span className="block text-sm text-gray-600">
                            {item.value}
                          </span>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Reservation
          unAvailable={unAvailable}
          pricePerNight={pricePerNight}
          _id={_id}
          bedFor={bedFor}
          title={title}
          roomCode={roomCode}
        ></Reservation>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        {user && <ReviewsPOst roomID={_id} />}
        <DisplayReviews roomID={_id} />
      </div>
    </div>
  );
};

export default RoomDetails;
