import { SignUp } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <main className="flex-center h-screen w-full py-10">
      <SignUp />
    </main>
  );
};

export default page;
