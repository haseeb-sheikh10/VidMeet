import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMeetingModal } from "@/store/useMeetingModal";
import { Button } from "../ui/button";
import Image from "next/image";

interface MeetingModalProps {
  isOpen: boolean;
  title: string;
  buttonText: string;
  onClick: () => void;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  title,
  buttonText,
  onClick,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  const { onClose } = useMeetingModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background text-center text-white max-w-[512px] w-full space-y-2 border-none">
        {image && (
          <div className="flex-center">
            <Image src={image} alt={title} width={70} height={70} />
          </div>
        )}
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <Button
          className="focus-visible:ring-0 focus-visible:ring-offset-0 hover:opacity-75 transition w-full"
          onClick={onClick}
        >
          {buttonIcon && (
            <Image src={buttonIcon} alt={buttonText} width={13} height={13} />
          )}
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
