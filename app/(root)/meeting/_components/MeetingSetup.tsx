"use client";

import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import React, { useEffect, useState } from "react";

interface MeetingSetupProps {
  setIsSetupComplete: (isSetupComplete: boolean) => void;
}

const MeetingSetup = ({ setIsSetupComplete }: MeetingSetupProps) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const call = useCall();

  if (!call) throw new Error("useCall must be used in StreamCall component");

  useEffect(() => {
    if (isMicOn) call?.microphone.enable();
    else call?.microphone.disable();

    if (isCamOn) call?.camera.enable();
    else call?.camera.disable();
  }, [isMicOn, isCamOn, call?.camera, call?.microphone]);

  return (
    <div className="flex-center h-screen flex-col text-white gap-3">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex-center h-16 gap-3">
        <Hint label="Toggle Mic">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsMicOn(!isMicOn)}
          >
            {isMicOn ? <Mic /> : <MicOff />}
          </Button>
        </Hint>
        <Hint label="toggle Camera">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsCamOn(!isCamOn)}
          >
            {isCamOn ? <Video /> : <VideoOff />}
          </Button>
        </Hint>
        <DeviceSettings />
      </div>
      <Button
        className=""
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
