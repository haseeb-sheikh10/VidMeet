"use client";

import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import MeetingSetup from "../_components/MeetingSetup";
import MeetingRoom from "../_components/MeetingRoom";
import { useGetCallById } from "@/hooks/useGetCallById";
import Loader from "@/components/Loader";

interface MeetingProps {
  params: {
    id: string;
  };
}

const Meeting = ({ params: { id } }: MeetingProps) => {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme className="light">
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
