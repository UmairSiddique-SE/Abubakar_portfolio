import { useEffect, useState } from "react";
import { SOCIALS } from "../data";
import { TikTokIcon } from "./Icons";

const ITEMS = [
  { id: "home", label: "Feed", icon: "🔥", href: "#home" },
  { id: "live", label: "Live", icon: "🔴", href: "#live" },
  { id: "squad", label: "Squad", icon: "👑", href: "#squad" },
  { id: "collab", label: "Collab", icon: "🤝", href: "#collab" },
];

export default function MobileBottomBar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home", "live", "squad", "collab"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden pointer-events-none pb-safe">
      <div className="mx-auto max-w-md px-3 pb-2 pt-1">
        <nav className="pointer-events-auto flex items-center justify-around rounded-2xl bg-ink/90 backdrop-blur-xl border border-white/10 px-2 py-2 shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_20px_rgba(254,44,85,0.15)]">
          {ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                  isActive ? "text-cream" : "text-fog/70 hover:text-cream"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-t from-tik/25 to-transparent border-b-2 border-tik" />
                )}
                <span className="text-base leading-none mb-1">{item.icon}</span>
                <span className={`text-[10px] font-display font-bold tracking-tight ${isActive ? "text-white" : ""}`}>
                  {item.label}
                </span>
              </a>
            );
          })}

          {/* Quick Direct TikTok Follow Button on Mobile Bar */}
          <a
            href={SOCIALS.tiktok}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-tik px-3 py-2 text-[11px] font-bold text-white shadow-[0_0_15px_rgba(254,44,85,0.5)] transition-transform active:scale-95"
          >
            <TikTokIcon className="h-3.5 w-3.5" />
            <span>Follow</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
