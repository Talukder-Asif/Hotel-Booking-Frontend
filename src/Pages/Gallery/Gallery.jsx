import { useEffect, useState } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Smart Hotel || Gallery";

    // Initialize GLightbox
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

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/img.json")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with animated gradient text */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-x">
              Luxurious Rooms
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our beautifully designed accommodations that blend comfort
            with elegance
          </p>
        </div>

        {/* Masonry-style gallery grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <a
                href={image.url}
                className="glightbox"
                data-gallery="gallery1"
                data-title={image.title || "Hotel Room"}
                data-description={
                  image.description || "Beautiful accommodation at Smart Hotel"
                }
              >
                <img
                  src={image.url}
                  alt={`Hotel room ${index + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold">
                      {image.title || "Premium Room"}
                    </h3>
                    <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {image.description || "Click to view larger"}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Gallery description */}
        <div className="mt-20 text-center max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Our Accommodations
          </h2>
          <p className="text-gray-600 mb-6">
            Each of our rooms has been meticulously designed to provide the
            perfect blend of comfort and style. From cozy standard rooms to
            expansive suites, we offer accommodations to suit every need.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
              Luxury
            </span>
            <span className="px-4 py-2 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
              Comfort
            </span>
            <span className="px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-sm font-medium">
              Elegance
            </span>
            <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium">
              Modern
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
