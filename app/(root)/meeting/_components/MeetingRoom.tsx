import { cn } from "@/lib/utils";
import { CallLayout } from "@/types";
import {
  CallControls,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import { useState } from "react";

const RenderLayout = ({ layout }: { layout: CallLayout }) => {
  switch (layout) {
    case CallLayout.GRID:
      return <PaginatedGridLayout />;
    case CallLayout.SPEAKER_LEFT:
      return <SpeakerLayout participantsBarPosition="left" />;
    default:
      return <SpeakerLayout participantsBarPosition="right" />;
  }
};

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayout>(CallLayout.SPEAKER_LEFT);
  const [showOther, setShowOthers] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="flex-center size-full">
        <div className="flex size-full max-w-[1000px] items-center">
          <RenderLayout layout={layout} />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showOther,
          })}
        >
          <CallParticipantsList onClose={() => setShowOthers(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex-center w-full gap-5">
        <CallControls />
      </div>
    </section>
  );
};

export default MeetingRoom;
