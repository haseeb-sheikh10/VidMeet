"use client";

import { useToast } from "@/components/ui/use-toast";
import { useMeetingModal } from "@/store/useMeetingModal";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useMeeting = () => {
  const router = useRouter();
  const {
    onClose,
    callDetails,
    setCallDetails,
    description,
    datetime,
    setDescription,
    setDatetime,
  } = useMeetingModal();
  const { toast } = useToast();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = useCallback(async () => {
    if (!user || !client) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create a meeting");

      const starts_at = datetime
        ? new Date(datetime).toISOString()
        : new Date(Date.now()).toISOString();

      const desc = description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at,
          custom: {
            description: desc,
          },
        },
      });

      setCallDetails(call);

      if (!description) router.push(`/meeting/${call.id}`);

      toast({ title: "Meeting Created" });
      setDescription("");
      setDatetime("");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Failed to create meeting",
        variant: "destructive",
        description: error?.message,
      });
    }
  }, [
    client,
    user,
    router,
    toast,
    description,
    datetime,
    setCallDetails,
    setDescription,
    setDatetime,
  ]);

  const copyMeetingLink = useCallback(() => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    );

    toast({ title: "Link copied to clipboard" });
  }, [callDetails, toast]);

  return { createMeeting, copyMeetingLink };
};
