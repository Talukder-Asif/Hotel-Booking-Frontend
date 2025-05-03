import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ReviewsPOst from "./Reviews/ReviewsPOst";
import DisplayReviews from "./Reviews/DisplayReviews";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import Loading from "../../Components/Loading/Loading";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import LightGallery from "lightgallery/react";

// Plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Reservation from "./Reservation/Reservation";

import { FaTv } from "react-icons/fa";

const RoomDetails = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    roomCode,
    img,
    description,
    roomSize,
    roomImages,
    // availability,
    pricePerNight,
    _id,
  } = useLoaderData();

  useEffect(() => {
    // Update the document title for this page
    document.title = `Smart Hotel || Room ${roomCode}`;
  }, [roomCode]);
  const images = [img, ...roomImages].filter(Boolean);

  if (!roomCode) {
    return <Loading></Loading>;
  }

  return (
    <div className="my-10 max-w-6xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Image Section */}
        <div className="flex flex-col items-center gap-4 w-full lg:w-1/2">
          {/* Main Image */}
          <div className="w-full rounded-xl overflow-hidden shadow-lg">
            {img ? (
              <img
                src={img}
                alt="Main Room"
                className="w-full h-auto object-cover"
              />
            ) : (
              <Skeleton className="w-full h-[250px]" />
            )}
          </div>

          {/* Gallery Thumbnails */}
          <LightGallery
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
            elementClassNames="flex gap-3 justify-center flex-wrap w-full"
          >
            {images.map((src, idx) => (
              <a href={src} key={idx}>
                <img
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  className=" w-14 h-10 md:w-28 md:h-20 object-cover rounded-md cursor-pointer hover:scale-105 transition"
                />
              </a>
            ))}
          </LightGallery>
        </div>

        {/* Details Section */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4 text-center lg:text-left">
            We are <span className="text-[#002A3F]">here</span> to Offer
          </h2>
          <p className="text-lg text-gray-700 mb-4 text-center lg:text-left">
            {description}
          </p>
          <ul className="space-y-2 text-center lg:text-left text-base text-gray-800 font-medium">
            <li>
              Price <span className="text-[#002A3F]">Per Night:</span>{" "}
              {pricePerNight} BDT
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
        <div>
          <p className="flex gap-2 text-xl items-center">
            <span>
              <FaTv />
            </span>{" "}
            - Available
          </p>
        </div>
        <Reservation></Reservation>
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
