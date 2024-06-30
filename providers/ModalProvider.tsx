"use client";

import StartMeetingModal from "@/app/(root)/(home)/_components/StartMeetingModal";
import { useMeetingModal } from "@/store/useMeetingModal";
import { useEffect, useState } from "react";

import ScheduleMeetingModal from "@/app/(root)/(home)/_components/ScheduleMeetingModal";
import { MeetingState } from "@/types";

const ModalProvider = () => {
  const { meetingState, callDetails } = useMeetingModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <>
      <StartMeetingModal
        isOpen={meetingState === MeetingState.STARTING}
        title="Start an Instant Meeting"
        buttonText={"Start Meeting"}
        state={MeetingState.STARTING}
      />
      <ScheduleMeetingModal
        isOpen={meetingState === MeetingState.SCHEDULING}
        title={!callDetails ? "Create Meeting" : "Meeting Created"}
        state={MeetingState.STARTING}
        buttonText="Copy Meeting Link"
        image="/icons/checked.svg"
        buttonIcon="/icons/copy.svg"
      />
    </>
  );
};

export default ModalProvider;
