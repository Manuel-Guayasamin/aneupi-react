import developmentAnimation from "/public/Development.json";
import Lottie from "lottie-react";

export const DevelopmentAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl text-center  font-medium text-[#004785] md:text-4xl lg:text-7xl">
        En desarrollo
      </h2>

      <div className="w-1/3">
        <Lottie animationData={developmentAnimation} loop={true} />
      </div>
    </div>
  );
};
