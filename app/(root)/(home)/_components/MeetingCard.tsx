import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { avatarImages } from "@/constants";
import { cn } from "@/lib/utils";
import { CallType } from "@/types";
import Image from "next/image";
import React from "react";

interface MeetingCardProps {
  type: CallType;
  icon: string;
  title: string;
  date: string;
  isPreviousMeeting: Boolean;
  buttonIcon1: string | undefined;
  buttonText: string;
  handleClick: () => {};
  link: string;
}

const MeetingCard = ({
  icon,
  type,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  buttonText,
  handleClick,
  link,
}: MeetingCardProps) => {
  const { toast } = useToast();
  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-foreground px-5 py-8">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt={type} width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-forground bg-background">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button
              onClick={handleClick}
              className="bg-primary hover:opacity-70 px-6 gap-2"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Meeting link copied to clipboard",
                });
              }}
              variant="ghost"
              className="px-6 gap-2"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
