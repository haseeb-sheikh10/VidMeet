"use client";

import { useToast } from "@/components/ui/use-toast";
import { useMeetingModal } from "@/store/useMeetingModal";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useMeeting = () => {
  const router = useRouter();
  const { onClose, setCallDetails } = useMeetingModal();
  const { toast } = useToast();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = useCallback(async () => {
    if (!user || !client) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create a meeting");

      const starts_at = new Date(Date.now()).toISOString();
      const description = "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      router.push(`/meeting/${call.id}`);
      onClose();
      toast({ title: "Meeting Created" });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Failed to create meeting",
        variant: "destructive",
        description: error?.message,
      });
    }
  }, [client, setCallDetails, user, router, onClose, toast]);

  return { createMeeting };
};
