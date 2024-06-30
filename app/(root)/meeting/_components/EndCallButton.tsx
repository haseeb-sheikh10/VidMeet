import { Button } from "@/components/ui/button";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner = useMemo(
    () =>
      localParticipant &&
      call?.state.createdBy &&
      localParticipant.userId === call.state.createdBy.id,
    [call, localParticipant]
  );

  const handleEndCall = useCallback(async () => {
    await call?.endCall();
    router.push("/");
  }, [call]);

  if (!isMeetingOwner) return null;

  return (
    <Button size="sm" className="bg-red-500" onClick={handleEndCall}>
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
