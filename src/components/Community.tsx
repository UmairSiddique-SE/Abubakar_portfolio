import { useMemo, useState } from "react";
import { EMAIL, FAQS, SEED_COMMENTS, SOCIALS, type FanComment } from "../data";
import { loadJSON, saveJSON, toast } from "../hooks";
import {
  CheckIcon,
  CopyIcon,
  HeartIcon,
  MapPinIcon,
  PlayIcon,
  MailIcon,
  SendIcon,
  TikTokIcon,
} from "./Icons";

const AVATAR_GRADS = [
  "from-ice to-grape",
  "from-tik to-volt",
  "from-grape to-tik",
  "from-volt to-mint",
  "from-mint to-ice",
  "from-tik to-grape",
];

/* ————————————————— FAN WALL ————————————————— */

export function FanWall() {
  const [userComments, setUserComments] = useState<FanComment[]>(() => loadJSON<FanComment[]>("ma-fan-comments", []));
  const [hearted, setHearted] = useState<string[]>(() => loadJSON<string[]>("ma-fan-hearts", []));
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [freshId, setFreshId] = useState<string | null>(null);

  const all = useMemo(() => [...userComments, ...SEED_COMMENTS], [userComments]);
  const [sort, setSort] = useState<"new" | "top">("new");
  const sorted = useMemo(() => {
    if (sort === "new") return all;
    return [...all].sort(
      (a, b) => b.hearts + (hearted.includes(b.id) ? 1 : 0) - (a.hearts + (hearted.includes(a.id) ? 1 : 0))
    );
  }, [all, sort, hearted]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError("Naam toh batao — kam az kam 2 letters 😄");
    if (message.trim().length < 5) return setError("Thora aur pyaar likho — message bohat chhota hai!");
    const c: FanComment = {
      id: `u${Date.now()}`,
      name: name.trim(),
      city: city.trim() || "Pakistan",
      message: message.trim(),
      hearts: 0,
      time: "abhi",
    };
    const next = [c, ...userComments].slice(0, 30);
    setUserComments(next);
    saveJSON("ma-fan-comments", next);
    setFreshId(c.id);
    setError("");
    setName("");
    setCity("");
    setMessage("");
    window.dispatchEvent(new CustomEvent("ma-quest", { detail: "comment" }));
    toast(`Shukriya, ${c.name.split(" ")[0]}! Deewar pe lag gaya ❤️`);
  };

  const toggleHeart = (id: string) => {
    setHearted((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveJSON("ma-fan-hearts", next);
      return next;
    });
  };

  return (
    <section id="fans" className="relative overflow-hidden border-t border-edge py-24 lg:py-32">
      <div className="pointer-events-none absolute -right-40 top-20 h-[440px] w-[440px] rounded-full bg-tik/10 blur-[130px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p data-reveal className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-tik">
            <HeartIcon filled className="h-4 w-4" /> Fan Love
          </p>
          <h2 data-reveal className="mt-3 font-display text-4xl font-black tracking-tight text-cream sm:text-5xl">
            Deewar-e-<span className="grad-text">Mohabbat</span>
          </h2>
          <p data-reveal className="mt-4 max-w-md text-fog">
            {all.length} community messages. Apna message chhoro aur Mahar Abubakar ki creator community ka hissa bano.
          </p>

          <form data-reveal onSubmit={submit} className="mt-8 space-y-4 rounded-3xl border border-edge bg-panel/70 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-fog">Naam *</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aap ka naam"
                  maxLength={40}
                  className="w-full rounded-xl border border-edge bg-ink/70 px-4 py-3 text-sm text-cream placeholder:text-fog/50 transition-colors focus:border-ice"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-fog">Shehar</span>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Lahore, Karachi…"
                  maxLength={30}
                  className="w-full rounded-xl border border-edge bg-ink/70 px-4 py-3 text-sm text-cream placeholder:text-fog/50 transition-colors focus:border-ice"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-fog">Message *</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Dil ki baat likh do…"
                rows={3}
                maxLength={220}
                className="w-full resize-none rounded-xl border border-edge bg-ink/70 px-4 py-3 text-sm text-cream placeholder:text-fog/50 transition-colors focus:border-ice"
              />
            </label>
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-1.5">
                {["❤️", "😂", "🔥", "🇵🇰"].map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setMessage((m) => (m + " " + em).trimStart())}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-edge bg-ink/60 text-base transition-transform hover:-translate-y-0.5 hover:border-fog/50"
                    aria-label={`Add ${em}`}
                  >
                    {em}
                  </button>
                ))}
              </div>
              <span className="font-mono text-[11px] text-fog/60">{message.length}/220</span>
            </div>
            {error && <p className="rounded-lg bg-tik/10 px-3 py-2 text-[13px] font-semibold text-tik">{error}</p>}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl grad-hot py-3.5 font-display text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(254,44,85,0.5)]"
            >
              <SendIcon className="h-4 w-4" /> Deewar pe lagao
            </button>
          </form>
        </div>

        <div className="grid content-start gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between gap-3 sm:col-span-2">
            <p className="text-sm font-bold text-fog">
              <span className="font-display text-cream">{all.length}</span> messages
            </p>
            <div className="flex rounded-full border border-edge bg-panel/60 p-1">
              {(["new", "top"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  aria-pressed={sort === s}
                  className={`rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-all ${
                    sort === s ? "grad-brand text-ink shadow-[0_2px_14px_rgba(143,91,255,0.35)]" : "text-fog hover:text-cream"
                  }`}
                >
                  {s === "new" ? "⏱ Naye" : "❤️ Top"}
                </button>
              ))}
            </div>
          </div>
          {sorted.map((c, i) => {
            const isHearted = hearted.includes(c.id);
            return (
              <article
                key={c.id}
                {...(c.id.startsWith("u") ? {} : { "data-reveal": true })}
                style={{ "--d": `${(i % 4) * 60}ms` } as React.CSSProperties}
                className={`rounded-2xl border bg-panel/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-fog/40 ${
                  c.id.startsWith("u") ? "animate-card-in" : ""
                } ${freshId === c.id ? "border-ice/70 shadow-[0_0_36px_rgba(37,244,238,0.2)]" : "border-edge"}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br ${AVATAR_GRADS[i % AVATAR_GRADS.length]} font-display text-sm font-extrabold text-ink`}>
                    {c.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-cream">{c.name}</p>
                    <p className="flex items-center gap-1 text-[11px] text-fog">
                      <MapPinIcon className="h-3 w-3" /> {c.city} · {c.time}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-cream/90">{c.message}</p>
                <button
                  onClick={() => toggleHeart(c.id)}
                  className={`mt-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold transition-colors ${
                    isHearted ? "bg-tik/15 text-tik" : "bg-edge/40 text-fog hover:text-tik"
                  }`}
                  aria-label="Heart this message"
                >
                  <HeartIcon filled={isHearted} className={`h-3.5 w-3.5 ${isHearted ? "animate-pop" : ""}`} />
                  {c.hearts + (isHearted ? 1 : 0)}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ————————————————— COLLAB ————————————————— */

const COLLAB_TYPES = ["Brand Deal", "Shoutout", "Event / Meetup", "Squad Application", "Kuch aur"];

export function Collab() {
  const [form, setForm] = useState({ name: "", email: "", brand: "", type: COLLAB_TYPES[0], message: "" });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError("Apna naam likhein.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Sahi email address likhein — reply wahin aayega.");
    if (form.message.trim().length < 10) return setError("Proposal thora detail mein likhein (kam az kam 10 letters).");
    setError("");
    setSending(true);
    const subject = encodeURIComponent(`Mahar Abubakar — ${form.type}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nBrand: ${form.brand || "N/A"}\nType: ${form.type}\n\nProposal:\n${form.message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    window.setTimeout(() => {
      setSending(false);
      setDone(true);
      toast("Proposal details email app mein ready hain 📩");
    }, 400);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast("Email copied 📋");
    } catch {
      toast(EMAIL);
    }
  };

  return (
    <section id="collab" className="relative border-t border-edge bg-coal/50 py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-grape/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] border border-edge bg-gradient-to-br from-panel via-coal to-panel">
          <div className="grid lg:grid-cols-2">
            {/* left — pitch */}
            <div className="relative p-8 sm:p-12">
              <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-tik/15 blur-[80px]" />
              <p data-reveal className="text-[11px] font-bold uppercase tracking-[0.3em] text-mint">Collabs & Booking</p>
              <h2 data-reveal className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-cream sm:text-5xl">
                Brand ho?
                <br />
                <span className="grad-text">Viral karte hain.</span>
              </h2>
              <p data-reveal className="mt-5 max-w-md text-lg leading-relaxed text-fog">
                Naya channel, bari energy — clean desi content aur squad-level production, day-one rates pe.
                Early partner bano: <span className="font-semibold text-cream">jab feed barhegi, aapka brand saath barhega.</span>
              </p>

              <div data-reveal className="mt-8 space-y-4">
                <button
                  onClick={copyEmail}
                  className="group flex w-full max-w-md items-center justify-between gap-3 rounded-2xl border border-edge bg-ink/60 px-5 py-4 text-left transition-colors hover:border-ice/50"
                >
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-fog">Business email</span>
                    <span className="font-mono text-sm text-cream">{EMAIL}</span>
                  </span>
                  <CopyIcon className="h-4 w-4 text-fog transition-colors group-hover:text-ice" />
                </button>
                <div className="flex flex-wrap items-center gap-3">
                  {[
                    { href: SOCIALS.tiktok, icon: TikTokIcon, label: "TikTok", hover: "hover:text-ice hover:border-ice/50" },
                    { href: "#live", icon: PlayIcon, label: "Live feed", hover: "hover:text-tik hover:border-tik/50" },
                    { href: "#fans", icon: HeartIcon, label: "Fan wall", hover: "hover:text-tik hover:border-tik/50" },
                    { href: `mailto:${EMAIL}`, icon: MailIcon, label: "Email", hover: "hover:text-mint hover:border-mint/50" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                      aria-label={s.label}
                      className={`grid h-12 w-12 place-items-center rounded-xl border border-edge bg-ink/60 text-fog transition-all hover:-translate-y-1 ${s.hover}`}
                    >
                      <s.icon />
                    </a>
                  ))}
                  <span className="rounded-full border border-mint/40 bg-mint/10 px-4 py-2 text-[11px] font-bold text-mint">
                    ⚡ Reply within 48h
                  </span>
                </div>
              </div>

              <div data-reveal className="mt-10 grid max-w-md grid-cols-3 gap-3">
                {[
                  { n: "13", l: "Videos live" },
                  { n: "453", l: "Total likes" },
                  { n: "100%", l: "Original content" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-edge bg-ink/50 p-3.5 text-center">
                    <div className="font-display text-lg font-extrabold text-cream">{s.n}</div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-fog">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* right — form */}
            <div className="relative border-t border-edge bg-ink/40 p-8 sm:p-12 lg:border-l lg:border-t-0">
              {done ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <span className="grid h-20 w-20 animate-pop place-items-center rounded-full bg-mint/15 text-mint">
                    <CheckIcon className="h-9 w-9" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-extrabold text-cream">Ho gaya! 🎉</h3>
                  <p className="mt-3 max-w-xs text-fog">
                    Aapki email app mein proposal draft open ho gaya hai. Send kar dein — reply isi email address par milega.
                  </p>
                  <button
                    onClick={() => {
                      setDone(false);
                      setForm({ name: "", email: "", brand: "", type: COLLAB_TYPES[0], message: "" });
                    }}
                    className="mt-8 rounded-xl border border-edge px-6 py-3 text-sm font-bold text-cream transition-colors hover:border-ice/60 hover:text-ice"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4" data-reveal>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-fog">Naam *</span>
                      <input value={form.name} onChange={set("name")} placeholder="Full name" className="w-full rounded-xl border border-edge bg-panel/80 px-4 py-3 text-sm text-cream placeholder:text-fog/50 focus:border-ice" />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-fog">Email *</span>
                      <input value={form.email} onChange={set("email")} type="email" placeholder="you@brand.com" className="w-full rounded-xl border border-edge bg-panel/80 px-4 py-3 text-sm text-cream placeholder:text-fog/50 focus:border-ice" />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-fog">Brand / Company</span>
                      <input value={form.brand} onChange={set("brand")} placeholder="Optional" className="w-full rounded-xl border border-edge bg-panel/80 px-4 py-3 text-sm text-cream placeholder:text-fog/50 focus:border-ice" />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-fog">Kya kaam hai?</span>
                      <select value={form.type} onChange={set("type")} className="w-full appearance-none rounded-xl border border-edge bg-panel/80 px-4 py-3 text-sm text-cream focus:border-ice">
                        {COLLAB_TYPES.map((t) => (
                          <option key={t} value={t} className="bg-panel">{t}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-fog">Proposal *</span>
                    <textarea value={form.message} onChange={set("message")} rows={5} placeholder="Campaign, budget range, timeline — jitni detail utna behtar…" className="w-full resize-none rounded-xl border border-edge bg-panel/80 px-4 py-3 text-sm text-cream placeholder:text-fog/50 focus:border-ice" />
                  </label>
                  {error && <p className="rounded-lg bg-tik/10 px-3 py-2 text-[13px] font-semibold text-tik">{error}</p>}
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl grad-brand py-4 font-display text-sm font-bold text-ink transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(143,91,255,0.5)] disabled:opacity-60"
                  >
                    {sending ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" /> Bhej rahe hain…
                      </>
                    ) : (
                      <>
                        <SendIcon className="h-4 w-4" /> Send Proposal
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-fog/70">
                    Ya seedha email karo — <a className="text-ice hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ——— FAQ ——— */}
        <div className="mt-14">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-2xl font-black tracking-tight text-cream sm:text-3xl">
              Sawal? <span className="grad-text">Jawab.</span>
            </h3>
            <p className="text-sm text-fog">Jo sab poochte hain — aik jagah.</p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {FAQS.map((f, i) => (
              <details
                key={f.q}
                data-reveal
                style={{ "--d": `${(i % 2) * 70}ms` } as React.CSSProperties}
                className="group rounded-2xl border border-edge bg-panel/70 transition-colors open:border-grape/50 hover:border-fog/40 open:hover:border-grape/50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[14.5px] font-bold text-cream [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-edge text-fog transition-all group-open:border-grape/50 group-open:text-grape">
                    <span className="absolute h-[2px] w-3 rounded-full bg-current" />
                    <span className="absolute h-3 w-[2px] rounded-full bg-current transition-all duration-300 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="faq-body px-5 pb-5 text-[13.5px] leading-relaxed text-fog">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————————————————— FOOTER ————————————————— */

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-edge bg-ink">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px grad-brand opacity-60" />
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <p className="stroke-faint select-none text-center font-display text-[clamp(2.4rem,9vw,7rem)] font-black leading-none tracking-tight">
          MAHAR ABUBAKAR
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl grad-brand">
                <span className="grid h-[37px] w-[37px] place-items-center rounded-[10px] bg-ink font-display text-sm font-extrabold text-cream">M</span>
              </span>
              <span className="font-display text-sm font-bold tracking-widest text-cream">MAHAR ABUBAKAR</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fog">
              Punjab ki galiyon se, dilon tak. Comedy, trends aur desi kahaniyan — TikTok Star ke saath, roz.
            </p>
            <p className="mt-4 font-urdu text-lg leading-loose text-ice/80" dir="rtl">شکریہ — محبت جاری رکھیں</p>
            <div className="mt-5 flex gap-2.5">
              {[
                { href: SOCIALS.tiktok, icon: TikTokIcon, label: "TikTok" },
                { href: "#live", icon: PlayIcon, label: "Live feed" },
                { href: "#fans", icon: HeartIcon, label: "Fan wall" },
                { href: `mailto:${EMAIL}`, icon: MailIcon, label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-edge text-fog transition-all hover:-translate-y-1 hover:border-ice/50 hover:text-ice"
                >
                  <s.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-fog">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["#live", "Live TikTok Feed"],
                ["#vibes", "Feed ka Mood"],
                ["#about", "The Story"],
                ["#squad", "TikTok Star"],
                ["#gallery", "Gallery"],
                ["#fans", "Fan Wall"],
                ["#club", "Day-One Club"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-fog transition-colors hover:text-ice">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-fog">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-fog">
              <li><a href={`mailto:${EMAIL}`} className="font-mono transition-colors hover:text-ice">{EMAIL}</a></li>
              <li><a href="#collab" className="transition-colors hover:text-ice">Brand collabs</a></li>
              <li><a href="#collab" className="transition-colors hover:text-ice">Squad applications</a></li>
              <li className="flex items-center gap-1.5"><MapPinIcon className="h-3.5 w-3.5 text-tik" /> Punjab, Pakistan</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-edge pt-6 text-sm text-fog sm:flex-row">
          <p className="text-center sm:text-left text-fog/80">© 2026 Mahar Abubakar · All rights reserved</p>
          <div className="flex items-center gap-2 rounded-full border border-volt/40 bg-volt/10 px-4 py-2 font-display text-xs font-bold text-cream shadow-[0_0_20px_rgba(255,182,46,0.15)] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-volt animate-pulse" />
            Developed by <span className="text-volt font-black tracking-wide">Umair Siddique</span>
          </div>
        </div>
      </div>
    </footer>
  );
}