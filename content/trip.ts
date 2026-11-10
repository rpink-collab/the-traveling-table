export type TripPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export type TripEvent = {
  id: string;
  day: number;
  date: string;
  shortMonth: string;
  shortDay: string;
  city: string;
  hook: string;
  opening: string;
  activities: string;
  learned: string;
  closing: string;
  photos: TripPhoto[];
};

export type Trip = {
  title: string;
  eyebrow: string;
  description: string;
  events: TripEvent[];
};

// Sample content keeps the first local build complete. Replace it event-by-event
// using docs/EVENT_WORKFLOW.md and the content/event-inbox folder.
export const trip: Trip = {
  title: "The Traveling Table",
  eyebrow: "University of Delaware · Winter 2027 · January 2–28",
  description:
    "Follow University of Delaware students as we explore the food, culture, and hospitality of Vienna, Ljubljana, and Venice through daily stories, photos, and reflections.",
 
  events: Array.from({ length: 27 }, (_, index) => {
    const day = index + 1;
    const dateNumber = index + 2;
    const formattedDate = String(dateNumber).padStart(2, "0");

    return {
      id: `day-${String(day).padStart(2, "0")}`,
      day,
      date: `January ${dateNumber}`,
      shortMonth: "JAN",
      shortDay: formattedDate,
      city: `Day ${day}`,
      hook: "Today's adventure",
      opening: "Today's journal entry is coming soon.",
      activities: "We'll share our experiences and activities here.",
      learned: "Our reflections and lessons learned will appear here.",
      closing: "Stay tuned for more from The Traveling Table!",
      photos: [],
    };
  }),
};