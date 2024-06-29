"use client";

import { useMeetingModal } from "@/store/useMeetingModal";
import { MeetingState } from "@/types";
import Image from "next/image";
import React from "react";

interface MeetingActionCardProps {
  title: string;
  desc: string;
  icon: string;
  color: string;
}

const MeetingActionCard = ({
  title,
  desc,
  icon,
  color,
}: MeetingActionCardProps) => {
  const { onOpen } = useMeetingModal();

  return (
    <div
      className="size-full flex flex-col justify-between py-6 px-4 rounded-[14px] aspect-auto min-h-[260px] cursor-pointer hover:opacity-75 transition drop-shadow-md"
      style={{
        backgroundColor: color,
      }}
      onClick={() => onOpen(MeetingState.JOINING)}
    >
      <div className="bg-white bg-opacity-50 p-3 w-fit rounded-[10px] aspect-square flex-center">
        <Image src={icon} alt={title} width={25} height={25} />
      </div>
      <div>
        <h3 className="text-white text-xl font-bold">{title}</h3>
        <p className="text-white">{desc}</p>
      </div>
    </div>
  );
};

export default MeetingActionCard;