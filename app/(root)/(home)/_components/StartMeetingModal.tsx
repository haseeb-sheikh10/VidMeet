"use client";

import { useCallback } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMeetingModal } from "@/store/useMeetingModal";
import { MeetingState } from "@/types";
import Image from "next/image";
import { Button } from "../../../../components/ui/button";
import { useMeeting } from "@/app/(root)/(home)/_hooks/useMeeting";

interface MeetingModalProps {
  isOpen: boolean;
  title: string;
  buttonText: string;
  image?: string;
  buttonIcon?: string;
  state: MeetingState;
}

const StartMeetingModal = ({
  isOpen,
  title,
  buttonText,
  image,
  buttonIcon,
  state,
}: MeetingModalProps) => {
  const { onClose } = useMeetingModal();
  const { createMeeting } = useMeeting();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background text-center text-white max-w-[512px] w-full space-y-2 border-none">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <Button
          className="focus-visible:ring-0 focus-visible:ring-offset-0 hover:opacity-75 transition w-full"
          onClick={createMeeting}
        >
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default StartMeetingModal;
