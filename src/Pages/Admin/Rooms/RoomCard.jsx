import axios from "axios";
import Loading from "../../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Rating } from "@material-tailwind/react";
import { MdOutlineDeleteOutline } from "react-icons/md";

/* eslint-disable react/prop-types */
const RoomCard = ({ data }) => {
  const { _id, title, img, roomImages, pricePerNight } = data;
  const uri = `https://hotel-managment-server-ten.vercel.app/perReviews/${_id}`;

  const handleDelete = () => {
    console.log("Deleted");
  };

  const getReviews = () => {
    const res = axios.get(uri);
    return res;
  };

  const { data: Reviews, isLoading } = useQuery({
    queryKey: [`SingleReviewsData${_id}`],
    queryFn: getReviews,
  });

  if (isLoading) return <Loading></Loading>;

  let averageRating = 0;

  if (Reviews?.data?.length) {
    for (let review of Reviews.data) {
      averageRating += review?.rating || 0;
    }
    averageRating = Math.floor(averageRating / Reviews.data.length);
  } else {
    averageRating = 0;
  }

  return (
    <>
      <div className="max-w-[700px] w-full  h-full relative p-5 bg-white border-gray-400 border-[4px] rounded-3xl shadow-2xl ouline-gray-600 mx-auto">
        <button className=" z-50 p-2 bg-red-500 rounded-full absolute right-3 bottom-3">
          <MdOutlineDeleteOutline
            onClick={handleDelete}
            className="text-3xl font-bold text-white"
          />
        </button>
        <div className="relative w-full max-h-[300px] overflow-hidden rounded-2xl border-gray-200 border-2">
          <img className="w-full" src={img} alt="" />
        </div>
        <div className="relative md:bottom-10 w-full flex justify-around">
          <img
            className="w-[32%] md:max-w-[150px]  rounded-2xl border-gray-300 border-[4px] shadow-xl"
            src={roomImages[0]}
            alt=""
          />
          <img
            className="w-[32%] md:max-w-[150px]  rounded-2xl border-gray-300 border-[4px] shadow-xl"
            src={img}
            alt=""
          />
          <img
            className="w-[32%] md:max-w-[150px]  rounded-2xl border-gray-300 border-[4px] shadow-xl"
            src={roomImages[1]}
            alt=""
          />
        </div>
        <p className="text-blue-500 lg:text-3xl sm:text-2xl text-xl text-center font-bold">
          {title}
        </p>
        <p className="lg:text-xl text-center my-3">
          Price Per Night :
          <span className="text-blue-500">{pricePerNight} </span>
          BDT
        </p>
        <div className="mx-auto flex justify-center mt-4 mb-6 items-center">
          <Rating className=" " value={averageRating} readonly></Rating>{" "}
          <span className="text-lg"> ({Reviews?.data?.length})</span>
        </div>
        <Link
          //   to={`/roomDetails/${_id}`}
          className="btn flex justify-center mx-auto max-w-[140px] border-none  bg-[#002A3F] hover:bg-[#2c699e] text-white  "
        >
          Details
        </Link>
      </div>
    </>
  );
};

export default RoomCard;
