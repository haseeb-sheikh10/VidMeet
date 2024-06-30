import React from "react";
import CallList from "../_components/CallList";
import { CallType } from "@/types";

const page = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="max-sm:text-2xl text-3xl font-bold">Upcoming Meetings</h1>

      <CallList type={CallType.UPCOMING} />
    </section>
  );
};

export default page;
