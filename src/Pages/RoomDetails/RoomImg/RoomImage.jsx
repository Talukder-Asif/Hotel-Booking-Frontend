/* eslint-disable react/prop-types */
import { useEffect } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import Skeleton from "react-loading-skeleton";

const RoomImage = ({ images = [], img }) => {
  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      autoplayVideos: false,
    });

    return () => {
      lightbox.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 w-full lg:w-1/2">
      {/* Main Image */}
      <div className="w-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
        {img ? (
          <a href={img} className="glightbox">
            <img
              src={img}
              alt="Main Room"
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105 cursor-zoom-in"
              loading="lazy"
            />
          </a>
        ) : (
          <Skeleton className="w-full h-[250px] md:h-[350px]" />
        )}
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-3 justify-center flex-wrap w-full px-2">
        {images.length > 0 ? (
          images.map((src, idx) => (
            <a href={src} key={idx} className="glightbox">
              <div className="relative group">
                <img
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  className="w-16 h-12 md:w-28 md:h-20 object-cover rounded-md cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-md" />
              </div>
            </a>
          ))
        ) : (
          <div className="flex gap-3">
            {[...Array(4)].map((_, idx) => (
              <Skeleton
                key={idx}
                className="w-16 h-12 md:w-28 md:h-20 rounded-md"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomImage;
