import React from "react";
import Hero from "./_components/Hero";
import MeetingActionList from "./_components/MeetingActionList";

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-8 text-white">
      <Hero />
      <MeetingActionList />
    </section>
  );
};

export default Home;
