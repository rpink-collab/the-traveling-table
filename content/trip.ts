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
  events: [
    {
      id: "day-01-zagreb",
      day: 1,
      date: "January 2",
      shortMonth: "JAN",
      shortDay: "02",
      city: "Zagreb",
      hook: "First sips at Dolac Market",
      opening:
        "I’m [your name], a [your major] student, beginning this journal in the cold morning light above Zagreb’s central square. The red umbrellas at Dolac Market made an easy first compass point.",
      activities:
        "We walked the produce rows, learned the rhythm of buying from small growers, and paused over fresh cheese, corn bread, and a glass of aromatic white wine. The afternoon ended with a long table and our first shared meal.",
      learned:
        "A market is more than a place to shop: it is a daily agreement between a city and the farms around it. Seeing vendors greet regulars by name made the local food system feel personal rather than abstract.",
      closing:
        "The day’s favorite bite was warm corn bread with soft cheese—simple, generous, and exactly right for the weather. Tomorrow, we follow the coast.",
      photos: [
        {
          src: "/trips/demo/zagreb-market.svg",
          alt: "An illustrated view of striped market awnings in Zagreb",
          caption: "Morning under the red umbrellas at Dolac Market.",
        },
        {
          src: "/trips/demo/zagreb-table.svg",
          alt: "An illustrated table set with bread, cheese, and wine",
          caption: "Our first table: bread, cheese, and a local white.",
        },
      ],
    },
    {
      id: "day-03-piran",
      day: 3,
      date: "January 4",
      shortMonth: "JAN",
      shortDay: "04",
      city: "Piran",
      hook: "Salt air & coastal kitchens",
      opening:
        "I’m [your name], a [your major] student, writing from Piran where narrow stone streets open suddenly onto the Adriatic. The sea set the pace before breakfast was over.",
      activities:
        "We visited the harbor, spoke with a cook about the morning catch, and shared grilled fish, bitter greens, and olive oil. A nearby kitchen introduced us to malvazija, a bright white wine that belonged beside the salt and citrus on the table.",
      learned:
        "Coastal food is shaped by restraint. The best dishes did not disguise their ingredients; they protected their freshness. That confidence made me reconsider how much technique can be expressed through what a cook chooses not to add.",
      closing:
        "My highlight was the first bite of fish with lemon and local olive oil. Next, the road turns inland toward Ljubljana.",
      photos: [
        {
          src: "/trips/demo/piran-harbor.svg",
          alt: "An illustrated Adriatic harbor with boats and terracotta roofs",
          caption: "Piran harbor in the pale winter sun.",
        },
        {
          src: "/trips/demo/piran-kitchen.svg",
          alt: "An illustrated coastal plate with fish and lemon",
          caption: "Lunch kept close to the sea: fish, greens, and citrus.",
        },
      ],
    },
    {
      id: "day-06-ljubljana",
      day: 6,
      date: "January 7",
      shortMonth: "JAN",
      shortDay: "07",
      city: "Ljubljana",
      hook: "Ljubljana’s Central Market",
      opening:
        "I’m [your name], a [your major] student, starting the morning beside the Ljubljanica River. Even in winter, the market felt like the city’s living room: practical, social, and full of small rituals.",
      activities:
        "We moved from the open-air produce stalls into the covered market, tasting pumpkin seed oil, cured meats, mountain cheeses, and potica. Later, we followed the river to a wine bar for a pour of rebula and a conversation about Slovenia’s many small vineyards.",
      learned:
        "Hospitality here was less about performance and more about attention. Vendors explained how to use each ingredient, where it came from, and who made it. The care traveled with the food, giving every taste a relationship and a place.",
      closing:
        "The dark, nutty drop of pumpkin seed oil on warm bread was the day’s smallest—and most memorable—surprise. Tomorrow brings the lake and the mountains.",
      photos: [
        {
          src: "/trips/demo/ljubljana-market.svg",
          alt: "An illustrated market colonnade with produce stands in Ljubljana",
          caption: "The market colonnade, where the city meets for groceries.",
        },
        {
          src: "/trips/demo/ljubljana-river.svg",
          alt: "An illustrated view of the Ljubljanica river and bridge",
          caption: "Following the river between tastings.",
        },
      ],
    },
    {
      id: "day-08-bled",
      day: 8,
      date: "January 9",
      shortMonth: "JAN",
      shortDay: "09",
      city: "Bled",
      hook: "Cream cake & quiet water",
      opening:
        "I’m [your name], a [your major] student, closing the trip at Lake Bled. Low clouds softened the mountains, and the island seemed to drift in and out of view as we walked the shore.",
      activities:
        "We circled part of the lake, crossed by boat, and warmed up over slices of kremšnita. The final meal brought together buckwheat, river fish, seasonal roots, and a last glass of sparkling Slovenian wine.",
      learned:
        "Food memories depend on atmosphere as much as flavor. The cream cake was delicious, but the cold walk, quiet lake, and shared anticipation made it unforgettable. Context is an ingredient too.",
      closing:
        "My last favorite bite was the crisp pastry layer on the kremšnita. The trip ends here, but the market lessons—and the habit of asking where food comes from—travel home with me.",
      photos: [
        {
          src: "/trips/demo/bled-lake.svg",
          alt: "An illustrated view of Lake Bled and its island church",
          caption: "The island appearing through the winter haze.",
        },
        {
          src: "/trips/demo/bled-cake.svg",
          alt: "An illustrated slice of Bled cream cake",
          caption: "Kremšnita after a cold walk around the lake.",
        },
      ],
    },
  ],
};
