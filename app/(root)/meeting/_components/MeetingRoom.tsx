import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CallLayout } from "@/types";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import EndCallButton from "./EndCallButton";
import LayoutSelector from "./LayoutSelector";

const RenderLayout = ({ layout }: { layout: CallLayout | string }) => {
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
  const router = useRouter();
  const searchParam = useSearchParams();
  const isPersonal = !!searchParam.get("personal");
  const [layout, setLayout] = useState<CallLayout | string>(
    CallLayout.SPEAKER_LEFT
  );
  const [showOther, setShowOthers] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="flex-center size-full gap-3 px-5">
        <div className="flex size-full max-w-[1000px] items-center">
          <RenderLayout layout={layout} />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden bg-foreground", {
            "show-block": showOther,
          })}
        >
          <CallParticipantsList onClose={() => setShowOthers(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex-center w-full gap-5 flex-wrap">
        <CallControls onLeave={() => router.push("/")} />
        <LayoutSelector layout={layout} setLayout={setLayout} />
        <CallStatsButton />
        <Button
          size="icon"
          className={cn(
            "bg-[#19232d] hover:bg-[#4c535b] rounded-full p-2.5 h-fit w-fit cursor-pointer",
            {
              "bg-primary hover:opacity-70 hover:bg-primary": showOther,
            }
          )}
          onClick={() => setShowOthers(!showOther)}
        >
          <Users className="text-white" size={18} />
        </Button>
        {!isPersonal && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
