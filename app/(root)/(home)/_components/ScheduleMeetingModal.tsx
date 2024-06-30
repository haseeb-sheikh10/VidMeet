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
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
interface MeetingModalProps {
  isOpen: boolean;
  title: string;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
  state: MeetingState;
}

const ScheduleMeetingModal = ({
  isOpen,
  title,
  buttonText,
  image,
  buttonIcon,
  state,
}: MeetingModalProps) => {
  const {
    onClose,
    callDetails,
    description,
    datetime,
    setDescription,
    setDatetime,
  } = useMeetingModal();
  const { createMeeting, copyMeetingLink } = useMeeting();

  const getClickHandler = useCallback(() => {
    if (!callDetails) createMeeting();
    else copyMeetingLink();
  }, [callDetails, createMeeting, copyMeetingLink]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background text-white max-w-[512px] w-full space-y-2 border-none">
        {callDetails && image && (
          <div className="flex-center">
            <Image
              className=""
              src={image}
              width={70}
              height={70}
              alt={title}
            />
          </div>
        )}
        <DialogHeader>
          <DialogTitle
            className={cn("text-start", {
              "text-center": callDetails,
            })}
          >
            {title}
          </DialogTitle>
        </DialogHeader>
        {!callDetails && (
          <div className="flex flex-col gap-2.5">
            <div className="space-y-1">
              <Label htmlFor="description" className="text-slate-200">
                Description
              </Label>
              <Textarea
                required={true}
                id="description"
                placeholder="Add a description"
                className="focus-visible:ring-primary h-20"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="datetime" className="text-slate-200">
                Select Date & Time
              </Label>
              <Input
                required={true}
                type="datetime-local"
                id="datetime"
                placeholder="Select date & time"
                className="focus-visible:ring-primary"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
              />
            </div>
          </div>
        )}
        <Button
          className="focus-visible:ring-0 focus-visible:ring-offset-0 hover:opacity-75 transition w-full gap-2"
          onClick={getClickHandler}
        >
          {callDetails && buttonIcon && (
            <Image src={buttonIcon} height={20} width={20} alt={buttonText!} />
          )}
          {callDetails && buttonText ? buttonText : "Create Meeting"}
        </Button>
        {callDetails && (
          <Button
            variant="secondary"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 hover:opacity-75 transition w-full gap-2"
            onClick={onClose}
          >
            Close
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeetingModal;
