"use client";

import MeetingModal from "@/app/(root)/(home)/_components/MeetingModal";
import { useMeetingModal } from "@/store/useMeetingModal";
import React, { useEffect, useState } from "react";

import { MeetingState } from "@/types";

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
        isOpen={meetingState === MeetingState.STARTING}
        title="Start an Instant Meeting"
        buttonText={"Start Meeting"}
        state={MeetingState.STARTING}
      />
    </>
  );
};

export default ModalProvider;
