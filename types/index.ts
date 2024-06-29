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
