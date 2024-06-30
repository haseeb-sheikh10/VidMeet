// @ts-nocheck

"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { CallType } from "@/types";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { formatDateString } from "@/lib/utils";

const CallList = ({ type }: { type: CallType }) => {
  const { previousCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();

  const [recordings, setrecordings] = useState<CallRecording[]>();

  const getCalls = useCallback(() => {
    switch (type) {
      case CallType.UPCOMING:
        return upcomingCalls;
      case CallType.PREVIOUS:
        return previousCalls;
      case CallType.RECORDING:
        return recordings;
      default:
        break;
    }
  }, [type, recordings, upcomingCalls, previousCalls]);

  const getNoCallMessage = useCallback(() => {
    switch (type) {
      case CallType.UPCOMING:
        return "No Upcoming Meetings";
      case CallType.PREVIOUS:
        return "No Previous Meetings";
      case CallType.RECORDING:
        return "No Recordings";
      default:
        return [];
    }
  }, [type]);

  const getCallIcon = useCallback(() => {
    switch (type) {
      case CallType.UPCOMING:
        return "/icons/upcoming.svg";
      case CallType.PREVIOUS:
        return "/icons/previous.svg";
      case CallType.RECORDING:
        return "/icons/Video.svg";
      default:
        return "";
    }
  }, [type]);

  const handleClick = useCallback(
    (meeting) => {
      if (type === CallType.RECORDING) router.push(`${meeting?.url}`);
      else if (type === CallType.UPCOMING)
        router.push(`/meeting/${meeting?.id}`);
    },
    [type, router]
  );

  const calls = getCalls();
  const noCallMessage = getNoCallMessage();
  const callIcon = getCallIcon();

  useEffect(() => {
    const fethcRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meetings) => meetings?.queryRecordings())
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setrecordings(recordings);
    };

    if (type === CallType.RECORDING) fethcRecordings();
  }, [type, callRecordings]);

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls?.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            {...meeting}
            icon={callIcon}
            type={type}
            title={
              (meeting as Call).state?.custom.description.substring(0, 26) ||
              meeting.filename.substring(0, 20) ||
              "No Description"
            }
            date={formatDateString(
              (meeting as Call).state?.startsAt?.toLocaleString() ||
                (meeting as CallRecording).start_time.toLocaleString()
            )}
            link={
              type === CallType.RECORDING
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting?.id}`
            }
            isPreviousMeeting={CallType.PREVIOUS === type}
            buttonIcon1={
              type === CallType.RECORDING ? "/icons/play.svg" : undefined
            }
            buttonText={type === CallType.RECORDING ? "Play" : "Start"}
            handleClick={() => handleClick(meeting)}
          />
        ))
      ) : (
        <h1>{noCallMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
