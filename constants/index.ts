import { MeetingState, NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    label: "Home",
    icon: "/icons/Home.svg",
    path: "/",
  },
  {
    label: "Upcoming",
    icon: "/icons/upcoming.svg",
    path: "/upcoming",
  },
  {
    label: "Pevious",
    icon: "/icons/previous.svg",
    path: "/previous",
  },
  {
    label: "Recordings",
    icon: "/icons/Video.svg",
    path: "/recordings",
  },
  {
    label: "Personal Room",
    icon: "/icons/add-personal.svg",
    path: "/personal-room",
  },
];

export const meetingActionCards = [
  {
    title: "New Meeting",
    desc: "Start an instant meeting",
    color: "#FF742E",
    icon: "/icons/add-meeting.svg",
    state: MeetingState.STARTING,
  },
  {
    title: "Join Meeting",
    desc: "via invitation link",
    color: "#0e78f9",
    icon: "/icons/join-meeting.svg",
    state: MeetingState.JOINING,
  },
  {
    title: "Schedule Meeting",
    desc: "Plan your meeting",
    color: "#830EF9",
    icon: "/icons/schedule.svg",
    state: MeetingState.SCHEDULING,
  },
  {
    title: "View Recordings",
    desc: "Meeting recordings",
    color: "#F9A90E",
    icon: "/icons/recordings.svg",
    state: undefined,
  },
];

export const avatarImages = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
];
