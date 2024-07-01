"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import { useMeeting } from "../_hooks/useMeeting";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useRouter } from "next/navigation";

const Table = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="flex flex-col gap-2 items-start lg:flex-row">
      <h1 className="text-base lg:text-xl font-medium text-slate-300 lg:min-w-[15%]">
        {title}:
      </h1>
      <h1
        className={cn("truncate text-sm font-bold lg:text-xl", {
          "text-primary hover:opacity-70": title === "Invite Link",
        })}
      >
        {desc}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const meetingID = useMemo(() => user?.id, [user]);
  const inviteLink = useMemo(
    () =>
      `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingID!}?personal=true`,
    [meetingID]
  );
  const { copyMeetingLink } = useMeeting();

  const { call } = useGetCallById(meetingID!);

  const startRoom = useCallback(async () => {
    if (!user || !client) return;

    const newCall = client.call("default", meetingID!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date(Date.now()).toISOString(),
          custom: {
            description: "Personal Room",
          },
        },
      });
    }

    router.push(`/meeting/${meetingID!}?personal=true`);
  }, [call, client, meetingID, router, user]);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="max-sm:text-2xl text-3xl font-bold">
        Personal Meeting Room
      </h1>

      <div className="flex w-full flex-col gap-8">
        <Table
          title="Topic"
          desc={`${user?.fullName ?? user?.username}'s personal meeting room`}
        />
        <Table title="Meeting ID" desc={meetingID!} />
        <Link href={inviteLink} target="_blank">
          <Table title="Invite Link" desc={inviteLink} />
        </Link>
      </div>
      <div className="flex gap-3">
        <Button className="hover:opacity-70" onClick={startRoom}>
          Start Room
        </Button>
        <Button
          variant="secondary"
          className="gap-2 hover:opacity-70"
          onClick={() => copyMeetingLink(inviteLink)}
        >
          <Image src="/icons/copy.svg" alt="feature" width={20} height={20} />
          Copy Invitation
        </Button>
        <Button variant="outline" className="gap-2 hover:opacity-70">
          <Image src="/icons/copy.svg" alt="feature" width={20} height={20} />
          Edit
        </Button>
        <Button variant="outline" className="gap-2 hover:opacity-70">
          <Image src="/icons/copy.svg" alt="feature" width={20} height={20} />
          Delete
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
