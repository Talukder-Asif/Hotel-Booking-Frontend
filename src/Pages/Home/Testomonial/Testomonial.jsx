import Testo from "./Testo";

import { Carousel } from "@material-tailwind/react";
import UseAxiousSecure from "./../../../Hooks/UseAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";

const Testomonial = () => {
  const AxiousSecure = UseAxiousSecure();

  const getTheReiviews = () => {
    const res = AxiousSecure.get("/reviews");
    return res;
  };

  const random = Math.floor(Math.random * 9);
  const { data: AllReviews, isLoading } = useQuery({
    queryKey: ["allReviews", random],
    queryFn: getTheReiviews,
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex justify-center  p-4">
      <div className="flex flex-col justify-center items-center ">
        <h2 className=" md:text-5xl text-3xl pt-20 font-semibold text-center">
          Testimonials By
          <span className="text-[#002A3F] "> Customer</span>
        </h2>
        <Carousel
          data-aos-duration="1000"
          data-aos="flip-up"
          className="rounded-xl min-h-[500px] mt-10 shadow-2xl lg:min-w-[500px] min-w-[30vw] lg:max-w-[700px] h-full max-w-[350px]"
        >
          {AllReviews.data.map((value) => (
            <Testo data={value} key={value.name}></Testo>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Testomonial;
