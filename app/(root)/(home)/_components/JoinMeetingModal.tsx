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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MeetingModalProps {
  isOpen: boolean;
  title: string;
  buttonText: string;
  image?: string;
  buttonIcon?: string;
  state: MeetingState;
}

const JoinMeetingModal = ({
  isOpen,
  title,
  buttonText,
  image,
  buttonIcon,
  state,
}: MeetingModalProps) => {
  const { onClose, join_link, setJoinLink } = useMeetingModal();
  const { joinMeeting } = useMeeting();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background text-center text-white max-w-[512px] w-full space-y-2 border-none">
        <DialogHeader>
          <DialogTitle className="">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-1">
          <Input
            required={true}
            type="url"
            id="meeting_link"
            placeholder="Enter meeting link here"
            className="focus-visible:ring-primary"
            value={join_link}
            onChange={(e) => setJoinLink(e.target.value)}
          />
        </div>
        <Button
          className="focus-visible:ring-0 focus-visible:ring-offset-0 hover:opacity-75 transition w-full"
          onClick={joinMeeting}
        >
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default JoinMeetingModal;
