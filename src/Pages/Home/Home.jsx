import { useEffect } from "react";
import Contact from "./Contact/Contact";
import NewsLetter from "./NewsLetter/NewsLetter";
import Offer from "./Offer/Offer";
import banner from "/src/assets/new-camp-della-exterior-v4.webp";

import Room from "/src/assets/room.jpg";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    // Update the document title for this page
    document.title = "Smart Hotel || Home";
  }, []);
  return (
    <>
      <div className="">
        <div
          style={{ backgroundImage: `url(${banner})` }}
          className={`w-full bg-cover bg-center bg-fixed min-h-screen `}
        >
          <div className="min-h-screen  justify-between flex lg:flex-row flex-col  bg-cover bg-center z-10 backdrop-brightness-50 bg-fixed  items-center">
            <div className=" mx-auto p-4 flex lg:flex-row flex-col justify-center items-center">
              <div className="mt-16 ">
                <h2 className="text-white lg:text-5xl max-w-lg leading-10 lg:text-start text-center text-3xl drop-shadow-xl font-bold  shadow-blue-500">
                  Your Ultimate Hotel Management Solution
                </h2>
                <p className=" text-white max-w-xl mt-4 lg:text-start text-center">
                  Optimize your hotel operations with our all-in-one hotel
                  management platform. Efficiency, guest satisfaction, and
                  success, all in one place
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ backgroundImage: `url(${Room})` }}
          className={`w-full bg-cover bg-center bg-fixed min-h-screen `}
        >
          <div className="min-h-screen w-full gap-10 p-4 backdrop-brightness-[0.3] flex lg:flex-row-reverse flex-col justify-center bg-cover bg-center bg-fixed  items-center">
            <div className="mt-16 ">
              <h2 className="text-white lg:text-5xl max-w-lg leading-10 lg:text-start text-center text-3xl drop-shadow-xl font-bold  shadow-blue-500">
                Your Ultimate Hotel Management Solution
              </h2>
              <p className=" text-white max-w-xl mt-4 lg:text-start text-center">
                Optimize your hotel operations with our all-in-one hotel
                management platform. Efficiency, guest satisfaction, and
                success, all in one place
              </p>
            </div>

            <div data-aos-duration="1000" data-aos="zoom-in-down">
              <h1>Video Player</h1>
              <video
                controls
                width="600"
                height="400"
                poster="/bg-newLetter.jpg"
                loading="lazy"
              >
                <source src="/vidd.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        <Offer></Offer>
        <NewsLetter></NewsLetter>
        <Contact></Contact>
      </div>
    </>
  );
};

export default Home;
