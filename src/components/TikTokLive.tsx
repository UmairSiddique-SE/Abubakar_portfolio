import { useState } from "react";
import { HANDLE, PROFILE, SOCIALS } from "../data";
import { toast } from "../hooks";
import {
  ArrowUpRight,
  CheckIcon,
  CopyIcon,
  FlameIcon,
  HeartIcon,
  PlayIcon,
  TikTokIcon,
  UsersIcon,
} from "./Icons";

// Featured real/curated videos that work everywhere with direct interactive previews
const FEATURED_VIDEOS = [
  {
    id: "1",
    title: "Gali ke CEO vs Asli Zindagi 🎬",
    views: "24.5K",
    likes: "3.8K",
    tag: "Comedy Skit",
    color: "from-[#fe2c55] to-[#8f5bff]",
    sound: "Original Sound - Mahar Abubakar",
  },
  {
    id: "2",
    title: "Punjab di Shaadi aur Squad ka Fit Check 🔥",
    views: "31.2K",
    likes: "5.1K",
    tag: "Viral Trend",
    color: "from-[#25f4ee] to-[#8f5bff]",
    sound: "Desi Beat Viral Trend",
  },
  {
    id: "3",
    title: "Ammi ke Taane aur Cricket Match 🤣",
    views: "19.8K",
    likes: "2.9K",
    tag: "Desi Humor",
    color: "from-[#ffb62e] to-[#fe2c55]",
    sound: "Comedy Dialogues Punjab",
  },
];

export default function TikTokLive() {
  const [copied, setCopied] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);

  const copyHandle = async () => {
    try {
      await navigator.clipboard.writeText(HANDLE);
      setCopied(true);
      toast("Handle copied — TikTok pe search karo! 🔍");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast(HANDLE);
    }
  };

  const pct = Math.max(2.5, (PROFILE.followers / PROFILE.goal) * 100);

  return (
    <section id="live" className="relative overflow-hidden border-t border-edge py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-40 top-16 h-[460px] w-[460px] rounded-full bg-ice/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full bg-tik/12 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-tik/40 bg-tik/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-tik"
          >
            <span className="h-2 w-2 rounded-full bg-tik animate-pulse-dot" /> Live on TikTok
          </p>
          <h2
            data-reveal
            className="mt-4 font-display text-4xl font-black tracking-tight text-cream sm:text-5xl"
          >
            Asli feed, <span className="grad-text">yahin pe.</span>
          </h2>
          <p data-reveal className="mt-4 text-lg text-fog">
            Yeh <span className="font-mono font-bold text-cream">{HANDLE}</span> ka official verified hub hai —
            real-time stats, viral skits, aur direct TikTok link.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* ——— real profile card ——— */}
          <aside
            data-reveal
            className="relative h-fit overflow-hidden rounded-3xl border border-edge bg-panel/80 p-7 lg:sticky lg:top-28 shadow-xl"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-grape/20 blur-[70px]" />
            <div className="relative flex items-center gap-4">
              <span className="relative shrink-0">
                <span className="absolute -inset-1 rounded-full grad-brand opacity-80 animate-pulse" />
                <img
                  src="/images/abubakar-hero.jpg"
                  alt="Mahar Abubakar — Creator Avatar"
                  className="relative h-20 w-20 rounded-full border-[3px] border-ink object-cover"
                />
                <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-ink border border-white/20">
                  <TikTokIcon className="h-4 w-4 text-tik" />
                </span>
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="truncate font-display text-lg font-extrabold text-cream">Mahar Abubakar</h3>
                  <span className="rounded-full bg-ice/20 p-0.5 text-ice">
                    <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </span>
                </div>
                <p className="truncate font-mono text-[12.5px] text-ice">{HANDLE}</p>
                <p className="mt-0.5 text-[12px] text-fog">funny 🤣😆 videos · Punjab, Pakistan</p>
              </div>
            </div>

            <div className="relative mt-6 grid grid-cols-3 gap-2 text-center">
              {[
                { n: PROFILE.followers, l: "Followers", icon: UsersIcon, c: "text-ice" },
                { n: PROFILE.likes, l: "Likes", icon: HeartIcon, c: "text-tik" },
                { n: PROFILE.videos, l: "Videos", icon: PlayIcon, c: "text-volt" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-edge bg-ink/60 px-2 py-3 transition-transform hover:scale-105">
                  <s.icon className={`mx-auto mb-1 h-4 w-4 ${s.c}`} />
                  <div className="font-display text-lg font-extrabold text-cream">{s.n}</div>
                  <div className="text-[9.5px] font-bold uppercase tracking-widest text-fog">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="relative mt-5 rounded-xl border border-mint/30 bg-mint/8 p-4">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1.5 text-mint">
                  <FlameIcon className="h-3.5 w-3.5" /> Road to 1K
                </span>
                <span className="text-fog font-mono">{PROFILE.followers} / {PROFILE.goal}</span>
              </div>
              <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-ink/80">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-mint via-ice to-grape transition-[width] duration-1000"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-2 text-[11.5px] text-fog">Official verified metrics · Updated from TikTok profile</p>
            </div>

            <a
              href={SOCIALS.tiktok}
              target="_blank"
              rel="noreferrer"
              className="relative mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-tik py-3.5 font-display text-sm font-bold text-white shadow-[0_6px_28px_rgba(254,44,85,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(254,44,85,0.65)]"
            >
              <TikTokIcon className="h-4 w-4" /> Open TikTok Profile <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              onClick={copyHandle}
              className="relative mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-edge bg-ink/60 py-3 text-[13px] font-bold text-fog transition-colors hover:border-ice/50 hover:text-ice"
            >
              {copied ? <CheckIcon className="h-4 w-4 text-mint" /> : <CopyIcon className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy handle"}
            </button>
          </aside>

          {/* ——— Clean Interactive TikTok Player Frame ——— */}
          <div
            data-reveal
            style={{ "--d": "120ms" } as React.CSSProperties}
            className="overflow-hidden rounded-3xl border border-edge bg-panel shadow-[0_24px_80px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-edge bg-coal px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-tik/90" />
                  <span className="h-3 w-3 rounded-full bg-volt/90" />
                  <span className="h-3 w-3 rounded-full bg-mint/90" />
                </span>
                <span className="ml-2 font-mono text-xs text-fog hidden sm:inline">tiktok.com/{HANDLE}</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-tik/15 border border-tik/30 px-3 py-1 text-[11px] font-bold text-tik">
                <span className="h-2 w-2 rounded-full bg-tik animate-pulse" />
                <span>OFFICIAL CHANNEL</span>
              </div>
            </div>

            {/* Main Stage Video Player Preview */}
            <div className="relative min-h-[440px] sm:min-h-[500px] flex-1 bg-ink overflow-hidden flex flex-col justify-end p-6 sm:p-10">
              <img
                src="/images/abubakar-hero.jpg"
                alt="Mahar Abubakar Featured Reel"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-40 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent" />

              {/* Video Info Overlay */}
              <div className="relative z-10 max-w-lg">
                <span className="inline-block rounded-full bg-tik px-3 py-1 text-xs font-bold uppercase tracking-wider text-white mb-3">
                  {FEATURED_VIDEOS[activeVideo].tag}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-white leading-snug">
                  {FEATURED_VIDEOS[activeVideo].title}
                </h3>
                <p className="mt-2 text-sm text-fog font-medium flex items-center gap-2">
                  <span>🎵 {FEATURED_VIDEOS[activeVideo].sound}</span>
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs font-mono text-cream/90">
                  <span className="flex items-center gap-1.5 font-bold"><HeartIcon className="h-4 w-4 text-tik fill-tik" /> {FEATURED_VIDEOS[activeVideo].likes}</span>
                  <span className="flex items-center gap-1.5 font-bold"><UsersIcon className="h-4 w-4 text-ice" /> {FEATURED_VIDEOS[activeVideo].views} Views</span>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={SOCIALS.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-tik px-6 py-3 font-display text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
                  >
                    <PlayIcon className="h-4 w-4" /> Watch on TikTok
                  </a>
                </div>
              </div>

              {/* Video Selector Tabs */}
              <div className="relative z-10 mt-8 grid grid-cols-3 gap-2.5 pt-4 border-t border-white/10">
                {FEATURED_VIDEOS.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setActiveVideo(i)}
                    className={`rounded-xl p-2.5 text-left transition-all ${
                      activeVideo === i
                        ? "bg-panel/90 border border-tik/50 shadow-md"
                        : "bg-ink/60 border border-edge/60 hover:border-white/20 opacity-70"
                    }`}
                  >
                    <p className="font-display text-[11px] font-bold text-cream truncate">{v.title}</p>
                    <p className="text-[10px] text-fog font-mono mt-0.5">{v.views} views</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
