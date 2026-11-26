import { useCallback, useEffect, useRef, useState } from "react";
import { HANDLE, PROFILE, SOCIALS } from "../data";
import { toast } from "../hooks";
import { ArrowUpRight, CheckIcon, CopyIcon, EyeIcon, FlameIcon, HeartIcon, TikTokIcon, UsersIcon } from "./Icons";

type Status = "loading" | "ready" | "fallback";

const SCRIPT_ID = "tiktok-embed-js";

export default function TikTokLive() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [copied, setCopied] = useState(false);

  const attachWatcher = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return () => {};

    if (wrap.querySelector("iframe")) {
      setStatus("ready");
      return () => {};
    }

    setStatus("loading");
    const io = new MutationObserver(() => {
      if (wrap.querySelector("iframe")) {
        setStatus("ready");
        io.disconnect();
        clearTimeout(timer);
      }
    });
    io.observe(wrap, { childList: true, subtree: true });
    const timer = window.setTimeout(() => {
      io.disconnect();
      setStatus((s) => (s === "loading" ? "fallback" : s));
    }, 9000);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const detach = attachWatcher();
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = "https://www.tiktok.com/embed.js";
      document.body.appendChild(script);
    }
    return detach;
  }, [attachWatcher]);

  const retry = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    // If the blockquote is still unprocessed, reload the embed script fresh.
    if (wrap.querySelector("blockquote")) {
      document.getElementById(SCRIPT_ID)?.remove();
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `https://www.tiktok.com/embed.js?r=${Date.now()}`;
      document.body.appendChild(script);
    }
    attachWatcher();
  };

  const copyHandle = async () => {
    try {
      await navigator.clipboard.writeText(HANDLE);
      setCopied(true);
      toast("Handle copied — TikTok pe search karo! 🔍");
      window.setTimeout(() => setCopied(false), 2000);
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
          <p data-reveal className="inline-flex items-center gap-2 rounded-full border border-tik/40 bg-tik/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-tik">
            <span className="h-2 w-2 rounded-full bg-tik animate-pulse-dot" /> Live from TikTok
          </p>
          <h2 data-reveal className="mt-4 font-display text-4xl font-black tracking-tight text-cream sm:text-5xl">
            Asli feed, <span className="grad-text">yahin pe.</span>
          </h2>
          <p data-reveal className="mt-4 text-lg text-fog">
            Yeh <span className="font-mono font-bold text-cream">{HANDLE}</span> ka live profile hai — videos yahin
            chalti hain, aur nayi upload khud yahan aa jati hai.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* ——— real profile card ——— */}
          <aside data-reveal className="relative h-fit overflow-hidden rounded-3xl border border-edge bg-panel/80 p-7 lg:sticky lg:top-28">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-grape/20 blur-[70px]" />
            <div className="relative flex items-center gap-4">
              <span className="relative shrink-0">
                <span className="absolute -inset-1 rounded-full grad-brand opacity-80" />
                <img
                  src="/images/tiktok-avatar.jpg"
                  alt={`${PROFILE.nickname} — real TikTok avatar`}
                  className="relative h-20 w-20 rounded-full border-[3px] border-ink object-cover"
                />
                <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-ink">
                  <TikTokIcon className="h-4 w-4 text-ice" />
                </span>
              </span>
              <div className="min-w-0">
                <h3 className="truncate font-display text-lg font-extrabold text-cream">{PROFILE.nickname}</h3>
                <p className="truncate font-mono text-[12.5px] text-ice">{HANDLE}</p>
                <p className="mt-0.5 text-[12px] text-fog">{PROFILE.signature}</p>
              </div>
            </div>

            <div className="relative mt-6 grid grid-cols-3 gap-2 text-center">
              {[
                { n: PROFILE.followers, l: "Followers", icon: UsersIcon, c: "text-ice" },
                { n: PROFILE.likes, l: "Likes", icon: HeartIcon, c: "text-tik" },
                { n: PROFILE.videos, l: "Videos", icon: EyeIcon, c: "text-volt" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-edge bg-ink/60 px-2 py-3">
                  <s.icon className={`mx-auto mb-1 h-4 w-4 ${s.c}`} />
                  <div className="font-display text-lg font-extrabold text-cream">{s.n}</div>
                  <div className="text-[9.5px] font-bold uppercase tracking-widest text-fog">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="relative mt-5 rounded-xl border border-mint/30 bg-mint/8 p-4">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1.5 text-mint"><FlameIcon className="h-3.5 w-3.5" /> Road to 1K</span>
                <span className="text-fog">{PROFILE.followers} / {PROFILE.goal}</span>
              </div>
              <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-ink/80">
                <div className="h-full rounded-full bg-gradient-to-r from-mint via-ice to-grape transition-[width] duration-1000" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-[11.5px] text-fog">Har follow is bar ko aage barhata hai — day-one bano! 🚀</p>
            </div>

            <a
              href={SOCIALS.tiktok}
              target="_blank"
              rel="noreferrer"
              className="relative mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-tik py-3.5 font-display text-sm font-bold text-white shadow-[0_6px_28px_rgba(254,44,85,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(254,44,85,0.65)]"
            >
              <TikTokIcon className="h-4 w-4" /> Follow {HANDLE}
            </a>
            <button
              onClick={copyHandle}
              className="relative mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-edge bg-ink/60 py-3 text-[13px] font-bold text-fog transition-colors hover:border-ice/50 hover:text-ice"
            >
              {copied ? <CheckIcon className="h-4 w-4 text-mint" /> : <CopyIcon className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy handle"}
            </button>
            <p className="relative mt-4 text-center text-[11px] leading-relaxed text-fog/70">
              Mahar Abubakar ka official channel · Punjab, Pakistan
            </p>
          </aside>

          {/* ——— the live embed window ——— */}
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="overflow-hidden rounded-3xl border border-edge bg-panel shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
            {/* window chrome */}
            <div className="flex items-center gap-3 border-b border-edge bg-coal px-5 py-3.5">
              <span className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-tik/90" />
                <span className="h-3 w-3 rounded-full bg-volt/90" />
                <span className="h-3 w-3 rounded-full bg-mint/90" />
              </span>
              <span className="flex min-w-0 items-center gap-2 font-mono text-[12px] text-fog">
                <TikTokIcon className="h-3.5 w-3.5 shrink-0 text-cream" />
                <span className="truncate">tiktok.com/{HANDLE}</span>
              </span>
              <span className={`ml-auto flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${status === "ready" ? "bg-mint/15 text-mint" : status === "loading" ? "bg-volt/15 text-volt" : "bg-tik/15 text-tik"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${status === "ready" ? "bg-mint" : status === "loading" ? "bg-volt animate-pulse-dot" : "bg-tik"}`} />
                {status === "ready" ? "Live" : status === "loading" ? "Connecting" : "Offline"}
              </span>
            </div>

            {/* embed body — white canvas like TikTok itself */}
            <div ref={wrapRef} className="relative min-h-[560px] bg-white">
              <div className={status === "fallback" ? "hidden" : ""}>
                <blockquote
                  className="tiktok-embed"
                  cite={PROFILE.url}
                  data-unique-id="funnyvelog607"
                  data-embed-from="embed_page"
                  data-embed-type="creator"
                  style={{ maxWidth: "780px", minWidth: "288px", margin: "0 auto" }}
                >
                  <section>
                    <a target="_blank" rel="noreferrer" href={PROFILE.url} title={HANDLE}>
                      {HANDLE}
                    </a>
                  </section>
                </blockquote>
              </div>

              {status === "loading" && (
                <div className="absolute inset-0 grid place-items-center bg-white">
                  <div className="w-full max-w-sm px-8 text-center">
                    <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-[3px] border-neutral-200 border-t-[#fe2c55]" />
                    <p className="font-display text-sm font-bold text-neutral-800">Feed connect ho rahi hai…</p>
                    <p className="mt-1 text-xs text-neutral-500">TikTok se live videos aa rahi hain</p>
                    <div className="mt-6 space-y-3">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="h-4 rounded-full bg-[linear-gradient(90deg,#eee_25%,#f8f8f8_50%,#eee_75%)] bg-[length:200%_100%] animate-shimmer"
                          style={{ width: `${88 - i * 18}%`, margin: "0 auto" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {status === "fallback" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white to-neutral-100 px-6 py-10 text-center">
                  <img src="/images/abubakar-hero.jpg" alt="Mahar Abubakar avatar" className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-xl" />
                  <h3 className="mt-4 font-display text-xl font-extrabold text-neutral-900">{PROFILE.nickname}</h3>
                  <p className="font-mono text-sm text-neutral-500">{HANDLE}</p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">
                    Embedded feed is waqt load nahi ho saki (network ya ad-blocker) — lekin asli videos aik tap door hain:
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={SOCIALS.tiktok}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-[#fe2c55] px-6 py-3.5 font-display text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                    >
                      <TikTokIcon className="h-4 w-4" /> TikTok pe kholo <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <button
                      onClick={retry}
                      className="rounded-xl border border-neutral-300 bg-white px-6 py-3.5 font-display text-sm font-bold text-neutral-700 transition-colors hover:border-neutral-500"
                    >
                      ↻ Dobara try karo
                    </button>
                  </div>
                  <p className="mt-5 text-[11px] text-neutral-400">{PROFILE.videos} videos · {PROFILE.likes} likes · {PROFILE.followers} followers</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}