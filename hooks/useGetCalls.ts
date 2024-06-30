"use client";

import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useMemo, useState } from "react";

export const useGetCalls = () => {
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState<Call[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (!client || !user?.id) return;

    const loadCalls = async () => {
      setIsLoading(true);

      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user?.id },
              { members: { $in: [user?.id] } },
            ],
          },
        });

        if (calls.length > 0) {
          setCalls(calls);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.id]);

  const now = useMemo(() => new Date(), []);

  const previousCalls = useMemo(
    () =>
      calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
        return (startsAt && new Date(startsAt) < now) || !!endedAt;
      }),
    [calls, now]
  );

  const upcomingCalls = useMemo(
    () =>
      calls?.filter(({ state: { startsAt } }: Call) => {
        return startsAt && new Date(startsAt) > now;
      }),
    [calls, now]
  );

  return {
    callRecordings: calls,
    previousCalls,
    upcomingCalls,
    isLoading,
  };
};
