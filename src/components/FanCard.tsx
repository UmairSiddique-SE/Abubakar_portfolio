import { useEffect, useState } from "react";
import { CATEGORIES, HANDLE, PROFILE } from "../data";
import { loadJSON, saveJSON, toast } from "../hooks";
import { CheckIcon, CopyIcon, CrownIcon, FlameIcon, MapPinIcon, TikTokIcon } from "./Icons";

type Card = { name: string; city: string; vibe: string; code: string; since: string };

type CardStyle = {
  skin: number;
  accent: string;
  glow: number;      // 0..100
  nameScale: number; // 70..130
  pattern: "dots" | "lines" | "none";
  grain: boolean;
  ring: boolean;
  barcode: boolean;
  avatar: boolean;
};

const SKINS = [
  { name: "Neon Night", bg: ["#0b0b18", "#160b26", "#22081a"], glows: ["#25f4ee", "#fe2c55", "#8f5bff"] },
  { name: "Cyber Ice", bg: ["#04141a", "#06222e", "#0a1030"], glows: ["#25f4ee", "#3ddc97", "#8f5bff"] },
  { name: "Sunset Punjab", bg: ["#1a0b06", "#2b1206", "#331020"], glows: ["#ffb62e", "#fe2c55", "#ff7a3d"] },
  { name: "Royal Grape", bg: ["#0d0618", "#1a0b2e", "#241040"], glows: ["#8f5bff", "#fe2c55", "#25f4ee"] },
  { name: "Mint Fresh", bg: ["#04140d", "#07271c", "#0a2e2a"], glows: ["#3ddc97", "#25f4ee", "#ffb62e"] },
];

const DEFAULT_STYLE: CardStyle = {
  skin: 0,
  accent: "#fe2c55",
  glow: 70,
  nameScale: 100,
  pattern: "dots",
  grain: true,
  ring: true,
  barcode: true,
  avatar: true,
};

const VIBES = CATEGORIES.map((c) => c.title);

function makeCode() {
  return `MA-${String(Date.now()).slice(-4)}`;
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function barcode(name: string): number[] {
  const src = name.length ? name : "MAHAR";
  return Array.from({ length: 24 }, (_, i) => 2 + ((src.charCodeAt(i % src.length) * (i + 3)) % 7));
}

function hexA(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

async function drawCard(card: Card, st: CardStyle): Promise<HTMLCanvasElement> {
  const W = 1000, H = 625;
  const skin = SKINS[st.skin];
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext("2d")!;
  try { await (document as Document & { fonts?: FontFaceSet }).fonts?.ready; } catch { /* fallback fonts */ }

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, skin.bg[0]);
  bg.addColorStop(0.55, skin.bg[1]);
  bg.addColorStop(1, skin.bg[2]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const g = st.glow / 100;
  const glow = (x: number, y: number, r: number, color: string, a: number) => {
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, hexA(color, a * g));
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  };
  glow(120, 80, 420, skin.glows[0], 0.26);
  glow(920, 560, 460, skin.glows[1], 0.3);
  glow(700, 120, 380, skin.glows[2], 0.26);

  if (st.pattern === "dots") {
    ctx.fillStyle = "rgba(245,242,233,0.06)";
    for (let x = 30; x < W; x += 34) for (let y = 30; y < H; y += 34) ctx.fillRect(x, y, 2, 2);
  } else if (st.pattern === "lines") {
    ctx.strokeStyle = "rgba(245,242,233,0.05)";
    ctx.lineWidth = 2;
    for (let i = -H; i < W; i += 26) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + H, H);
      ctx.stroke();
    }
  }

  if (st.grain) {
    ctx.fillStyle = "rgba(245,242,233,0.05)";
    for (let i = 0; i < 900; i++) ctx.fillRect(Math.random() * W, Math.random() * H, 1.5, 1.5);
  }

  if (st.ring) {
    const border = ctx.createLinearGradient(0, 0, W, H);
    border.addColorStop(0, skin.glows[0]);
    border.addColorStop(0.5, st.accent);
    border.addColorStop(1, skin.glows[1]);
    ctx.strokeStyle = border;
    ctx.lineWidth = 6;
  } else {
    ctx.strokeStyle = "rgba(245,242,233,0.18)";
    ctx.lineWidth = 2;
  }
  rr(ctx, 14, 14, W - 28, H - 28, 34);
  ctx.stroke();

  ctx.fillStyle = "#f5f2e9";
  ctx.font = "800 30px Unbounded, sans-serif";
  ctx.fillText("TIKTOK STAR", 64, 92);
  ctx.fillStyle = skin.glows[0];
  ctx.font = "700 19px 'Space Grotesk', sans-serif";
  ctx.fillText("D A Y - O N E   M E M B E R", 64, 126);

  ctx.fillStyle = hexA(st.accent, 0.16);
  rr(ctx, 64, 152, 240, 44, 22);
  ctx.fill();
  ctx.strokeStyle = hexA(st.accent, 0.55);
  ctx.lineWidth = 2;
  rr(ctx, 64, 152, 240, 44, 22);
  ctx.stroke();
  ctx.fillStyle = st.accent;
  ctx.font = "700 19px 'Space Grotesk', sans-serif";
  ctx.fillText("👑 ROAD TO 1K CLUB", 84, 181);

  let size = Math.round(76 * (st.nameScale / 100));
  const name = card.name.toUpperCase();
  ctx.font = `900 ${size}px Unbounded, sans-serif`;
  while (ctx.measureText(name).width > W - 340 && size > 30) {
    size -= 4;
    ctx.font = `900 ${size}px Unbounded, sans-serif`;
  }
  ctx.fillStyle = "#f5f2e9";
  ctx.shadowColor = hexA(skin.glows[1], 0.55);
  ctx.shadowOffsetX = 4;
  ctx.fillText(name, 64, 300);
  ctx.shadowColor = hexA(skin.glows[0], 0.55);
  ctx.shadowOffsetX = -4;
  ctx.fillText(name, 64, 300);
  ctx.shadowColor = "transparent";
  ctx.shadowOffsetX = 0;
  ctx.fillText(name, 64, 300);

  ctx.fillStyle = "#a6a2bd";
  ctx.font = "600 26px 'Space Grotesk', sans-serif";
  ctx.fillText(`📍 ${card.city || "Pakistan"}`, 64, 352);
  ctx.fillStyle = st.accent;
  ctx.fillText(`♬ Favourite: ${card.vibe}`, 64, 394);

  ctx.fillStyle = st.accent;
  ctx.font = "700 24px 'Space Grotesk', sans-serif";
  ctx.fillText(HANDLE, 64, 486);
  ctx.fillStyle = "#f5f2e9";
  ctx.fillText(card.code, 64, 520);
  ctx.fillStyle = "#a6a2bd";
  ctx.font = "500 20px 'Space Grotesk', sans-serif";
  ctx.fillText(`Member since ${card.since}`, 64, 552);

  if (st.barcode) {
    let bx = W - 320;
    ctx.fillStyle = hexA(st.accent, 0.9);
    barcode(card.name).forEach((w, i) => {
      if (i % 2 === 0) ctx.fillRect(bx, 470, w, 70);
      bx += w + 4;
    });
  }

  if (st.avatar) {
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(W - 150, 150, 78, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, W - 228, 72, 156, 156);
        ctx.restore();
        ctx.strokeStyle = st.accent;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(W - 150, 150, 82, 0, Math.PI * 2);
        ctx.stroke();
        resolve();
      };
      img.onerror = () => resolve();
      img.src = "/images/abubakar-hero.jpg";
    });
  }

  return cv;
}

export default function FanCard() {
  const saved = loadJSON<Card | null>("ma-fan-card", null);
  const [name, setName] = useState(saved?.name ?? "");
  const [city, setCity] = useState(saved?.city ?? "");
  const [vibe, setVibe] = useState(saved?.vibe ?? VIBES[0]);
  const [card, setCard] = useState<Card | null>(saved);
  const [st] = useState<CardStyle>(() => ({ ...DEFAULT_STYLE, ...loadJSON<Partial<CardStyle>>("ma-card-style", {}) }));
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (card) saveJSON("ma-fan-card", card);
  }, [card]);
  useEffect(() => saveJSON("ma-card-style", st), [st]);

  const skin = SKINS[st.skin];
  const valid = name.trim().length >= 2;
  const preview: Card = card ?? {
    name: name.trim() || "Aap ka Naam",
    city: city.trim() || "Pakistan",
    vibe,
    code: "MA-••••",
    since: "aaj",
  };

  const download = async () => {
    if (!valid) return;
    const c = card ?? {
      name: name.trim(),
      city: city.trim(),
      vibe,
      code: makeCode(),
      since: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    };
    if (!card) {
      setCard(c);
      window.dispatchEvent(new CustomEvent("ma-quest", { detail: "card" }));
    }
    setBusy(true);
    try {
      const cv = await drawCard(c, st);
      await new Promise<void>((resolve) => {
        cv.toBlob((blob) => {
          if (blob) {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `mahar-squad-day-one-${c.code}.png`;
            a.click();
            setTimeout(() => URL.revokeObjectURL(a.href), 4000);
            toast("Card save ho gaya — story pe lagao! 📸");
          }
          resolve();
        }, "image/png");
      });
    } catch {
      toast("Download mein masla — screenshot bhi kaam karega 📸");
    }
    setBusy(false);
  };

  const copyCaption = async () => {
    const c = card ?? preview;
    const text = `Main Mahar Squad ka Day-One member hoon! 🚀 Card ${c.code} · ${PROFILE.followers}+ fans, manzil 1K — ${HANDLE} ko abhi follow karo: ${PROFILE.url}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast("Caption copied — bas paste karo! 🔗");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast(text);
    }
  };

  return (
    <section id="club" className="relative overflow-hidden border-t border-edge py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-40 top-10 h-[440px] w-[440px] rounded-full bg-volt/10 blur-[130px] animate-blob" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[440px] w-[440px] rounded-full bg-ice/10 blur-[130px] animate-blob-slow" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p data-reveal className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-volt">
            <CrownIcon className="h-4 w-4" /> Day-One Club
          </p>
          <h2 data-reveal className="mt-3 font-display text-4xl font-black tracking-tight text-cream sm:text-5xl">
            TikTok Star <span className="grad-text">Card</span>
          </h2>
          <p data-reveal className="mt-4 text-lg text-fog">
            Naam likho aur apna exclusive <span className="font-bold text-cream">TikTok Star Card</span> generate karo.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          {/* ——— details form ——— */}
          <div data-reveal className="w-full max-w-xl space-y-4 rounded-3xl border border-edge bg-panel/70 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-fog">Naam *</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={22}
                  placeholder="Aap ka naam"
                  className="w-full rounded-xl border border-edge bg-ink/70 px-4 py-3 text-sm text-cream placeholder:text-fog/50 focus:border-volt"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-fog">Shehar</span>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  maxLength={20}
                  placeholder="Lahore, Karachi…"
                  className="w-full rounded-xl border border-edge bg-ink/70 px-4 py-3 text-sm text-cream placeholder:text-fog/50 focus:border-volt"
                />
              </label>
            </div>
            <div>
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-fog">Favourite vibe</span>
              <div className="flex flex-wrap gap-2">
                {VIBES.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVibe(v)}
                    className={`rounded-full px-4 py-2 text-[12px] font-bold transition-all ${
                      vibe === v ? "grad-brand text-ink shadow-[0_4px_20px_rgba(143,91,255,0.4)]" : "border border-edge bg-ink/60 text-fog hover:text-cream"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Live card preview directly inside card generator */}
            <div className="mt-6 pt-2">
              <div className={`relative mx-auto w-full rounded-[2rem] p-[3px] grad-brand ${card ? "animate-pop" : ""}`}>
                <div
                  className="dark-scope relative aspect-[8/5] overflow-hidden rounded-[calc(2rem-3px)] p-6 sm:p-7"
                  style={{ background: `linear-gradient(135deg, ${skin.bg[0]} 0%, ${skin.bg[1]} 55%, ${skin.bg[2]} 100%)` }}
                >
                  <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full blur-[70px] opacity-25" style={{ background: skin.glows[0] }} />
                  <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full blur-[80px] opacity-30" style={{ background: skin.glows[1] }} />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-sm font-black tracking-wide text-cream sm:text-base">TIKTOK STAR</p>
                        <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.3em] sm:text-[10px]" style={{ color: skin.glows[0] }}>Day-One Member</p>
                        <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-volt/40 bg-volt/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-volt sm:text-[10px]">
                          <CrownIcon className="h-3 w-3" /> Road to 1K Club
                        </span>
                      </div>
                      <span className="relative shrink-0">
                        <span className="absolute -inset-1 rounded-full grad-brand" />
                        <img src="/images/abubakar-hero.jpg" alt="Mahar Abubakar" className="relative h-12 w-12 rounded-full border-2 border-ink object-cover sm:h-14 sm:w-14" />
                      </span>
                    </div>

                    <p
                      className="chroma mt-auto truncate font-display font-black leading-tight text-cream text-2xl sm:text-3xl"
                    >
                      {preview.name.toUpperCase()}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-fog sm:text-[12px]">
                      <span className="flex items-center gap-1"><MapPinIcon className="h-3 w-3" /> {preview.city || "Pakistan"}</span>
                      <span className="flex items-center gap-1 text-volt"><FlameIcon className="h-3 w-3" /> {preview.vibe}</span>
                    </div>

                    <div className="mt-2.5 flex items-end justify-between gap-3 border-t border-cream/10 pt-2.5">
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 truncate font-mono text-[11px] font-bold text-ice"><TikTokIcon className="h-3 w-3 shrink-0" /> {HANDLE}</p>
                        <p className="mt-0.5 font-mono text-[9.5px] text-cream/70">{preview.code} · since {preview.since}</p>
                      </div>
                      <div className="flex h-6 items-end gap-[2px] opacity-80" aria-hidden="true">
                        {barcode(preview.name).map((w, i) => (
                          <span key={i} style={{ width: Math.max(1.5, w / 2.4), height: "100%", background: i % 2 === 0 ? "#fe2c55" : "transparent" }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-3">
              <button
                onClick={download}
                disabled={!valid || busy}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl grad-brand px-6 py-3.5 font-display text-sm font-bold text-ink transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(143,91,255,0.5)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {busy ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" /> : <CheckIcon className="h-4 w-4" />}
                Download Card PNG
              </button>
              <button
                onClick={copyCaption}
                disabled={!valid}
                className="flex items-center gap-2 rounded-xl border border-edge bg-ink/60 px-5 py-3.5 text-xs font-bold text-fog transition-colors hover:border-ice/50 hover:text-ice disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copied ? <CheckIcon className="h-4 w-4 text-mint" /> : <CopyIcon className="h-4 w-4" />} Caption
              </button>
            </div>
            {!valid && <p className="text-[12px] text-fog/70">Naam likhein (kam az kam 2 huroof) — card generate ho jayega.</p>}
          </div>
        </div>

        <div data-reveal className="mt-8 flex flex-wrap gap-2.5">
          {["Story feature ka chance", "Shoutout list mein naam", "Pehle updates"].map((p) => (
            <span key={p} className="flex items-center gap-1.5 rounded-full border border-mint/30 bg-mint/8 px-3.5 py-1.5 text-[11.5px] font-bold text-mint">
              <CheckIcon className="h-3 w-3" /> {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}