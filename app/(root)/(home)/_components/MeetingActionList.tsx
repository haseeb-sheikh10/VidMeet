import { meetingActionCards } from "@/constants";
import MeetingActionCard from "./MeetingActionCard";

const MeetingActionList = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {meetingActionCards.map((card, key) => (
        <MeetingActionCard key={key} {...card} />
      ))}
    </section>
  );
};

export default MeetingActionList;
