import { MeetingState } from "@/types";
import { create } from "zustand";

interface UseMeetingModal {
  meetingState: MeetingState | undefined;
  setMeetingState: (state: MeetingState) => void;
  onOpen: (state: MeetingState) => void;
  onClose: () => void;
  description: string;
  datetime: string;
  setDescription: (description: string) => void;
  setDatetime: (datetime: string) => void;
}

export const useMeetingModal = create<UseMeetingModal>((set) => ({
  meetingState: undefined,
  setMeetingState: (state) => set({ meetingState: state }),
  onOpen: (state) => set({ meetingState: state }),
  onClose: () => set({ meetingState: undefined }),
  description: "",
  datetime: "",
  setDescription: (description) => set({ description }),
  setDatetime: (datetime) => set({ datetime }),
}));
