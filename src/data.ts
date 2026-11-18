export const HANDLE = "@funnyvelog607";
export const EMAIL = "collab@maharabubakar.pk";

/* Real, fetched from tiktok.com/@funnyvelog607 */
export const PROFILE = {
  nickname: "funny videos 🤣",
  signature: "funny 🤣😆 videos",
  followers: 25,
  following: 6,
  likes: 453,
  videos: 13,
  goal: 1000,
  url: "https://www.tiktok.com/@funnyvelog607",
};

export const SOCIALS = {
  tiktok: PROFILE.url,
};

export const STATS = [
  { label: "Day-One Family", value: PROFILE.followers, suffix: "", icon: "users" as const, accent: "text-ice" },
  { label: "Total Likes", value: PROFILE.likes, suffix: "", icon: "heart" as const, accent: "text-tik" },
  { label: "Videos Live", value: PROFILE.videos, suffix: "", icon: "clapper" as const, accent: "text-volt" },
  { label: "Road to 1K", value: PROFILE.goal, suffix: "", icon: "flame" as const, accent: "text-mint", goal: true },
];

/* ——— THE COMPLETE SQUAD (roles assigned) ———
   Photos: drop files into src/assets/squad/{slug}.jpg — they appear automatically. */
export type Member = {
  slug: string;
  name: string;
  role: string;
  handle?: string;
  quote: string;
  skills: string[];
  accent: "ice" | "tik" | "volt" | "grape" | "mint";
  icon: "crown" | "laugh" | "flame" | "camera" | "users";
  grad: string;
  leader?: boolean;
  bio: string;
  tools: string[];
  day: string;
};

export const SQUAD: Member[] = [
  {
    slug: "abubakar",
    name: "Mahar Abubakar",
    role: "Captain · Face & Ideas",
    handle: HANDLE,
    quote: "Camera on, tension off — kahani apni, andaaz apna.",
    skills: ["Comedy", "Storytelling", "Direction"],
    accent: "tik",
    icon: "crown",
    grad: "from-[#fe2c55] to-[#8f5bff]",
    leader: true,
    bio: "Channel ka chehra aur dimagh — idea se le kar final cut tak har scene ki direction. Gali ki kahaniyan, duniya ke liye. Captain hone ka matlab: sab se pehle shoot pe, sab se baad mein so.",
    tools: ["Ideas", "Direction", "Acting"],
    day: "Itwar",
  },
  {
    slug: "umair",
    name: "Raja Umair",
    role: "Camera & Cuts",
    quote: "Raat ki shoot ho ya din — frame perfect chahiye.",
    skills: ["Shooting", "Editing", "Transitions"],
    accent: "grape",
    icon: "camera",
    grad: "from-[#8f5bff] to-[#25f4ee]",
    bio: "Raat ki shoots ka specialist — camera, cuts aur transitions. Jo smooth dikhta hai, woh iski mehnat hai. Feed ka har transition aur angle isi ke control mein hota hai.",
    tools: ["Camera", "CapCut", "Lighting"],
    day: "Jummah",
  },
  {
    slug: "ilyas",
    name: "Mahar Ilyas",
    role: "Manager · Brand Deals",
    quote: "Deal aisi karo ke sab khush — brand bhi, fans bhi.",
    skills: ["Collabs", "Planning", "Events"],
    accent: "mint",
    icon: "users",
    grad: "from-[#3ddc97] to-[#25f4ee]",
    bio: "Suit wala banda jo baat ko deal banata hai — brands, budgets aur schedules sab iski zimmedari. Squad ka har shoot time pe shuru hota hai, aur har reply 48 hours mein jata hai.",
    tools: ["Deals", "Calendar", "Calls"],
    day: "Peer",
  },
  {
    slug: "abdullah",
    name: "Mahar Abdullah",
    role: "Co-Star · Comedy",
    quote: "Scene chhota ho, hasi bari honi chahiye.",
    skills: ["Skits", "Timing", "Reactions"],
    accent: "volt",
    icon: "laugh",
    grad: "from-[#ffb62e] to-[#fe2c55]",
    bio: "Reaction ka badshah — aik expression se poora scene palat deta hai. Skits ki jaan; script se hat kar jo improv karta hai, wohi aksar best part ban jata hai.",
    tools: ["Improv", "Expressions", "Timing"],
    day: "Peer",
  },
  {
    slug: "mujtaba",
    name: "Raja Mujtaba",
    role: "Trends & Performance",
    quote: "Naya trend? Pehle apni gali mein try hota hai.",
    skills: ["Hooks", "Lip-sync", "Energy"],
    accent: "ice",
    icon: "flame",
    grad: "from-[#25f4ee] to-[#8f5bff]",
    bio: "Trend ki speed pe chalne wala performer — naya sound aaye, yeh pehle se ready hai. Hooks aur energy iska hathiyar; pehle 3 second mein viewer rokna iski specialty.",
    tools: ["Hook lines", "Lip-sync", "Dance"],
    day: "Budh",
  },
];

/* Content categories — every card leads to the real live feed */
export const CATEGORIES = [
  {
    title: "Comedy Skits",
    icon: "laugh" as const,
    accent: "volt" as const,
    desc: "Ammi ke taane, gali ke CEO, doston ki beizzati — asli zindagi ki comedy.",
    tags: ["#desicomedy", "#skits"],
  },
  {
    title: "Trend Drops",
    icon: "flame" as const,
    accent: "tik" as const,
    desc: "Jo trend chale, apne desi andaaz mein — pehle din, poore confidence ke saath.",
    tags: ["#trends", "#fyp"],
  },
  {
    title: "Desi Vlogs",
    icon: "clapper" as const,
    accent: "ice" as const,
    desc: "Chai, chhat aur shehar — subah se raat tak ki chhoti chhoti kahaniyan.",
    tags: ["#vlog", "#punjab"],
  },
  {
    title: "Squad Moments",
    icon: "users" as const,
    accent: "grape" as const,
    desc: "Paanch yaar, aik camera — shoots ke peeche ki asli masti aur dosti.",
    tags: ["#maharsquad", "#bts"],
  },
];

/* Channel breakdown — totals match the live profile (13 videos · 453 likes);
   category split is the team's own estimate. */
export const PULSE = {
  categories: [
    { key: "Comedy", videos: 5, likes: 187, color: "var(--color-volt)", text: "text-volt", bg: "bg-volt" },
    { key: "Trends", videos: 4, likes: 142, color: "var(--color-tik)", text: "text-tik", bg: "bg-tik" },
    { key: "Vlogs", videos: 2, likes: 64, color: "var(--color-ice)", text: "text-ice", bg: "bg-ice" },
    { key: "Squad", videos: 2, likes: 60, color: "var(--color-grape)", text: "text-grape", bg: "bg-grape" },
  ],
  weeks: [0, 1, 1, 2, 2, 2, 3, 2],
};

export const FAQS = [
  {
    q: "Collab ka rate kya hai?",
    a: "Day-one rates — budget ke hisaab se package banta hai. Proposal form bharo, Mahar Ilyas 48 hours mein reply karega. Early brands ko hamesha behtar deal milti hai.",
  },
  {
    q: "Content kis style ka hota hai?",
    a: "Clean desi comedy, trends aur vlogs — family-friendly, poori squad ke saath. Aisa content jo ghar mein sab ke saath dekha ja sake, yehi humari pehchaan hai.",
  },
  {
    q: "Videos kab upload hoti hain?",
    a: "Hafte mein 4 drops: Peer ko Comedy, Budh ko Trend, Jummah ko Vlog aur Itwar ko Squad content — raat 9 baje. Live feed section mein nayi video khud aa jati hai.",
  },
  {
    q: "Squad mein kaise shamil ho sakta hoon?",
    a: "Collab form mein 'Squad Application' select karo aur apna talent batao — acting, camera, editing ya kuch naya. Raja aur Mahar brothers hamesha naye talent ko dekhte hain.",
  },
  {
    q: "Day-One member card kya cheez hai?",
    a: "Club section mein apna naam likho, TikTok-style member card banao, PNG download karo aur story pe squad ko tag karo. Best cards ko shoutout milta hai!",
  },
];

export const MILESTONES = [
  {
    year: "May 2026",
    title: "Pehla Qadam",
    text: "TikTok account bana — aik phone, aik gali, aur bohat saara yaqeen.",
    accent: "bg-ice",
    goal: false,
  },
  {
    year: "2026",
    title: "13 Videos, 453 Likes",
    text: "Comedy, trends aur vlogs — har upload ke saath naya experiment, naya seekhna.",
    accent: "bg-volt",
    goal: false,
  },
  {
    year: "Nov 2026",
    title: "Squad + Website",
    text: "Poora TikTok Star crew aik saath — aur @funnyvelog607 ka apna official ghar live.",
    accent: "bg-tik",
    goal: false,
  },
  {
    year: "Next",
    title: "1K Family",
    text: "Pehla bara milestone — day-one fans ke saath road to 1,000.",
    accent: "bg-mint",
    goal: true,
  },
  {
    year: "Goal",
    title: "10K + Pehla Collab",
    text: "Barhti community, behtar production aur pehli brand deal.",
    accent: "bg-grape",
    goal: true,
  },
  {
    year: "Sapna",
    title: "1M — Inshallah",
    text: "Punjab ki gali se duniya ki For You page tak. Dua karo, saath chalo.",
    accent: "bg-ice",
    goal: true,
  },
];

export type FanComment = {
  id: string;
  name: string;
  city: string;
  message: string;
  hearts: number;
  time: string;
};

export const SEED_COMMENTS: FanComment[] = [
  {
    id: "c1",
    name: "Ayesha Khan",
    city: "Karachi",
    message: "Bhai aap ki videos pe poora ghar hasta hai 😂 ammi bhi ab fan hain!",
    hearts: 42,
    time: "2h",
  },
  {
    id: "c2",
    name: "Bilal Raza",
    city: "Lahore",
    message: "Day-one fan here 🙌 jab 1M honge toh bolna 'main pehle se tha'!",
    hearts: 35,
    time: "5h",
  },
  {
    id: "c3",
    name: "Fatima Noor",
    city: "Multan",
    message: "Clean comedy jo family ke saath dekh saken — yehi baat alag hai ❤️",
    hearts: 29,
    time: "9h",
  },
  {
    id: "c4",
    name: "Ahmed Nawaz",
    city: "Islamabad",
    message: "Mujtaba bhai ke transitions dekh ke editing seekh raha hoon 🎬 ustaad ho!",
    hearts: 21,
    time: "1d",
  },
  {
    id: "c5",
    name: "Zainab Ali",
    city: "Faisalabad",
    message: "Abdullah bhai ke reactions best hain 😭 poori squad hi kamaal hai ✨",
    hearts: 18,
    time: "1d",
  },
  {
    id: "c6",
    name: "Tariq Mehmood",
    city: "Dubai",
    message: "Overseas Pakistani here — aap ki videos ghar ki yaad dila deti hain 🇵🇰",
    hearts: 50,
    time: "2d",
  },
];

export function compact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}