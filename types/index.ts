export type NavItem = {
  label: string;
  icon: string;
  path: string;
};

export enum MeetingState {
  STARTING = "STARTING",
  JOINING = "JOINING",
  SCHEDULING = "SCHEDULING",
}

export enum CallLayout {
  GRID = "GRID",
  SPEAKER_LEFT = "SPEAKER_LEFT",
  SPEAKER_RIGHT = "SPEAKER_RIGHT",
}
