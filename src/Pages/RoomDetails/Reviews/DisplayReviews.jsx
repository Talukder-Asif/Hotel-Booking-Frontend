/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import axios from "axios";
import Loading from "../../../Components/Loading/Loading";

const DisplayReviews = ({ roomID }) => {
  const uri = `https://hotel-managment-server.vercel.app/api/v1/getReviews/${roomID}`;

  const getReviews = () => {
    const res = axios.get(uri);
    return res;
  };

  const {
    data: Reviews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`reviewsData${roomID}`],
    queryFn: getReviews,
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return <p>error</p>;
  }

  return (
    <div className="mt-4 p-4 border-t border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

      {Reviews.data.map((review, index) => (
        <div key={index} className="border p-4 rounded-md mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xl">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`text-${
                  star <= review.rating ? "yellow" : "gray"
                }-500`}
              />
            ))}
          </div>
          <p className="text-lg font-semibold mb-2">{review.name}</p>
          <p className=" text-gray-700  mb-4">
            {moment(review.date).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
          <p>{review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayReviews;
