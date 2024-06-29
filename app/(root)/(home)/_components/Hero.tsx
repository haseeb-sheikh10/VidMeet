import React from "react";

const Hero = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="h-[250px] w-full rounded-20 bg-hero bg-cover drop-shadow-md">
      <div className="flex justify-between flex-col h-full p-8">
        <h2 className="bg-white/25 backdrop-filter w-fit p-2 rounded-sm text-center text-base font-normal">
          Upcoming Meeting at 12:30 PM
        </h2>
        <div className="flex flex-col gap-y-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
            {time}
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-white/70">
            {date}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;
