import { HANDLE, MILESTONES, PROFILE } from "../data";
import { SparkIcon, TikTokIcon } from "./Icons";

const DNA = ["Desi Comedy", "Clean Humor", "Street Stories", "Smooth Transitions", "Lip-sync", "Daily Vlogs", "Family First", "Punjabi Swag"];

export default function About() {
  return (
    <section id="about" className="relative border-t border-edge bg-coal/50 py-24 lg:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[380px] w-[380px] rounded-full bg-ice/8 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[5fr_7fr] lg:gap-20 lg:px-8">
        {/* sticky intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p data-reveal className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-ice">
            <SparkIcon className="h-4 w-4" /> The Story
          </p>
          <h2 data-reveal className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-cream sm:text-5xl">
            Gali ka larka,
            <br />
            <span className="grad-text">bare sapne.</span>
          </h2>

          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="relative mt-10 max-w-sm">
            <div className="absolute -inset-2 rounded-3xl grad-brand opacity-30 blur-lg" />
            <div className="relative flex items-center gap-4 rounded-2xl border border-cream/12 bg-panel/90 p-5">
              <span className="relative shrink-0">
                <span className="absolute -inset-1 rounded-full grad-brand" />
                <img
                  src="/images/tiktok-avatar.jpg"
                  alt="funnyvelog607 — real TikTok display picture"
                  loading="lazy"
                  className="relative h-16 w-16 rounded-full border-[3px] border-panel object-cover"
                />
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-extrabold text-cream">{PROFILE.nickname}</p>
                <p className="truncate font-mono text-[11.5px] text-ice">{HANDLE}</p>
                <a
                  href={PROFILE.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1.5 rounded-lg bg-tik px-3 py-1.5 text-[11px] font-bold text-white transition-shadow hover:shadow-[0_4px_18px_rgba(254,44,85,0.5)]"
                >
                  <TikTokIcon className="h-3 w-3" /> Follow · Day-One Creator
                </a>
              </div>
            </div>
          </div>

          <blockquote data-reveal className="mt-10 border-l-[3px] border-tik pl-5">
            <p className="text-left font-urdu text-xl leading-loose text-cream/90" dir="rtl">
              محنت اپنی، دعا آپ کی۔
            </p>
            <p className="mt-2 text-sm italic text-fog">
              "Mehnat apni, dua aap ki — baaki algorithm ka kamaal."
            </p>
          </blockquote>
        </div>

        {/* bio + timeline */}
        <div>
          <div data-reveal className="space-y-5 text-[17px] leading-relaxed text-fog">
            <p>
              <span className="font-bold text-cream">Assalam-o-Alaikum! 🙏</span> Main hoon Mahar Abubakar — TikTok pe{" "}
              <span className="font-bold text-ice">"{PROFILE.nickname}"</span> (<span className="font-mono text-[15px] text-cream">{HANDLE}</span>),
              Punjab ki aik tang si brick-wall gali se, jahan cricket bhi hoti hai aur ab content bhi banta hai.
              May 2026 mein aik phone uthaya, pehli video upload ki — <span className="text-ice">aur us din se camera band nahi hua.</span>
            </p>
            <p>
              Abhi <span className="font-semibold text-cream">{PROFILE.videos} videos, {PROFILE.likes} likes aur {PROFILE.followers} day-one fans</span> —
              safar abhi shuru hua hai, lekin formula pehle din se clear hai:{" "}
              <span className="font-semibold text-cream">apni mitti, apni zubaan, apna humor.</span> Ammi ke taane, gali ke
              CEO, shaadi season ke fit checks — jo hum sab ki zindagi hai, wahi screen pe hai.
            </p>
            <p>
              Aur yeh safar akela nahi — <span className="font-semibold text-volt">TikTok Star</span> ke bina aik bhi video
              adhoori hai. Camera se le kar cuts tak, har frame mein poori team ka pyaar hai. Manzil? Pehle 1K, phir
              10K, phir — <span className="grad-text font-bold">Inshallah, 1M.</span>
            </p>
          </div>

          <div data-reveal className="mt-8">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-fog">Creator DNA</p>
            <div className="flex flex-wrap gap-2">
              {DNA.map((d, i) => (
                <span
                  key={d}
                  className={`rounded-full border px-4 py-1.5 text-[12.5px] font-semibold transition-transform hover:-translate-y-0.5 ${
                    ["border-ice/40 text-ice", "border-tik/40 text-tik", "border-volt/40 text-volt", "border-grape/40 text-grape"][i % 4]
                  } bg-panel/60`}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* timeline — journey + roadmap */}
          <div className="relative mt-14">
            <div className="absolute bottom-2 left-[7px] top-2 w-[2px] bg-gradient-to-b from-ice via-tik to-grape opacity-60" />
            <div className="space-y-9">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.title}
                  data-reveal
                  style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
                  className="group relative pl-10"
                >
                  <span
                    className={`absolute left-0 top-1.5 h-4 w-4 rounded-full ring-4 ring-ink transition-transform group-hover:scale-125 ${
                      m.goal ? "border-2 border-dashed border-cream/60 bg-ink" : m.accent
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-lg font-extrabold text-cream">{m.year}</span>
                    <span className="font-display text-sm font-bold tracking-wide text-fog group-hover:text-cream transition-colors">{m.title}</span>
                    {m.goal && (
                      <span className="rounded-full border border-mint/40 bg-mint/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-mint">
                        Goal
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 max-w-lg text-[15px] leading-relaxed text-fog">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}