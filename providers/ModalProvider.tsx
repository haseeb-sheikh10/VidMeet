"use client";

import MeetingModal from "@/components/modals/MeetingModal";
import { useMeetingModal } from "@/store/useMeetingModal";
import React, { useEffect, useState } from "react";

import { MeetingState } from "@/types";
import { createMeeting } from "@/app/(root)/(home)/actions/meeting";

const ModalProvider = () => {
  const { meetingState } = useMeetingModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <>
      <MeetingModal
        isOpen={meetingState === MeetingState.JOINING}
        title="Start an Instant Meeting"
        buttonText={"Start Meeting"}
        onClick={createMeeting}
      />
    </>
  );
};

export default ModalProvider;
