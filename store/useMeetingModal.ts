import { MeetingState } from "@/types";
import { create } from "zustand";
import { Call } from "@stream-io/video-react-sdk";

interface UseMeetingModal {
  meetingState: MeetingState | undefined;
  setMeetingState: (state: MeetingState) => void;
  onOpen: (state: MeetingState | undefined) => void;
  onClose: () => void;
  description: string;
  datetime: string;
  join_link: string;
  setDescription: (description: string) => void;
  setDatetime: (datetime: string) => void;
  setJoinLink: (join_link: string) => void;
  callDetails: Call | undefined;
  setCallDetails: (state: Call | undefined) => void;
}

export const useMeetingModal = create<UseMeetingModal>((set) => ({
  meetingState: undefined,
  setMeetingState: (state) => set({ meetingState: state }),
  onOpen: (state) => set({ meetingState: state }),
  onClose: () =>
    set({
      meetingState: undefined,
      callDetails: undefined,
      description: "",
      datetime: "",
    }),
  description: "",
  datetime: "",
  join_link: "",
  setDescription: (description) => set({ description }),
  setDatetime: (datetime) => set({ datetime }),
  setJoinLink: (join_link) => set({ join_link }),
  callDetails: undefined,
  setCallDetails: (state) => set({ callDetails: state }),
}));
