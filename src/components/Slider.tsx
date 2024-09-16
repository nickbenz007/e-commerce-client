import { useState, useEffect } from "react";
import slider from "../slider/slider.json";
import { motion } from "framer-motion";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slider.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slider.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const slideVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };
  return (
    <div className="flex flex-row w-full items-center justify-center pt-4 bg-myBg bg-cover bg-no-repeat">
      <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 py-8 px-8 justify-items-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col xl:max-w-xl lg:max-w-sm md:max-w-md max-w-80 items-center justify-center text-center py-8 opacity-50 bg-gray-900  rounded-xl">
            <h1 className="xl:text-4xl lg:text-3xl md:text-3xl text-2xl text-gray-50 font-sans font-bold">
              Welcome to E-Commerce Store
            </h1>
            <p className="text-lg text-gray-100 font-sans font-semibold py-4">
              Enjoy your stay and keep Shopping.!
            </p>
          </div>
        </div>
        <div className="relative flex w-full h-128 rounded-xl items-center justify-center">
          <motion.div
            key={currentIndex}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", duration: 0.5, damping: 5 }}
            className="absolute inset-0"
          >
            <img
              src={slider[currentIndex].src}
              alt={slider[currentIndex].alt}
              className="w-full h-128 object-cover rounded-xl"
            />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
              onClick={prevSlide}
              className="bg-gray-900 bg-opacity-50 text-white w-10 h-10 rounded-full hover:bg-opacity-75 z-10"
            >
              &#10094;
            </button>
            <button
              onClick={nextSlide}
              className="bg-gray-900 bg-opacity-50 text-white w-10 h-10 rounded-full hover:bg-opacity-75 z-10"
            >
              &#10095;
            </button>
          </div>
          <div className="absolute bottom-4 flex justify-center space-x-2">
            {slider.map((_, index) => (
              <div
                key={index}
                className={`h-3 w-3 rounded-full ${
                  currentIndex === index ? "bg-sky-500" : "bg-gray-100"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
