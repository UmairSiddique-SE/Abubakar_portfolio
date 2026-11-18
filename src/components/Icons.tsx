type P = { className?: string };

export const TikTokIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export const InstagramIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const YouTubeIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.2V8.8L15.6 12 10 15.2z" />
  </svg>
);

export const WhatsAppIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .2-3.4-.7-2.9-1.1-4.7-4-4.9-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.3-.1.6.2.3.8 1.3 1.8 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3 0 .1 0 .7-.2 1.3z" />
  </svg>
);

export const PlayIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10.2-6.5a1 1 0 0 0 0-1.7L9.53 4.65A1 1 0 0 0 8 5.5z" />
  </svg>
);

export const HeartIcon = ({ className = "w-5 h-5", filled = false }: P & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <path d="M12 20.7S3.5 15.6 3.5 9.7a4.6 4.6 0 0 1 8.5-2.5 4.6 4.6 0 0 1 8.5 2.5c0 5.9-8.5 11-8.5 11z" strokeLinejoin="round" />
  </svg>
);

export const EyeIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const CommentIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <path d="M21 12a8.5 8.5 0 0 1-8.5 8.5c-1.5 0-3-.4-4.2-1.1L3 21l1.6-5.3A8.5 8.5 0 1 1 21 12z" strokeLinejoin="round" />
  </svg>
);

export const ShareIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <path d="M13 5.5 20.5 12 13 18.5v-4C7.5 14.5 4.5 17 3 19.5c0-6 3.5-10 10-10.5v-3.5z" strokeLinejoin="round" />
  </svg>
);

export const XIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className} aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
);

export const MenuIcon = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className} aria-hidden="true">
    <path d="M4 7h16M4 12h10M4 17h16" strokeLinecap="round" />
  </svg>
);

export const ArrowUpRight = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" className={className} aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowUp = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className} aria-hidden="true">
    <path d="M12 19V5m-6 6 6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronLeft = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className} aria-hidden="true">
    <path d="m14.5 5.5-6.5 6.5 6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronRight = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className} aria-hidden="true">
    <path d="m9.5 5.5 6.5 6.5-6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const VerifiedIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M12 1.8 14.7 4l3.4-.3 1 3.3 3 1.7-1.2 3.3 1.2 3.3-3 1.7-1 3.3-3.4-.3L12 22.2 9.3 20l-3.4.3-1-3.3-3-1.7L3.1 12 1.9 8.7l3-1.7 1-3.3L9.3 4 12 1.8z"
      fill="#25f4ee"
    />
    <path d="m8.4 12.2 2.4 2.4 4.8-5" fill="none" stroke="#07070f" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MusicIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M9 19a3 3 0 1 1-2-2.83V5.6a1 1 0 0 1 .76-.97l10-2.5A1 1 0 0 1 19 3.1v12.07A3 3 0 1 1 17 12.4V7.28L9 9.28V19z" />
  </svg>
);

export const SparkIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2c.6 4.9 2.4 6.9 7.5 7.5-5.1.6-6.9 2.6-7.5 7.5-.6-4.9-2.4-6.9-7.5-7.5C9.6 8.9 11.4 6.9 12 2zM19 14c.3 2.5 1.2 3.5 3.7 3.8-2.5.3-3.4 1.3-3.7 3.7-.3-2.4-1.2-3.4-3.7-3.7 2.5-.3 3.4-1.3 3.7-3.8z" />
  </svg>
);

export const SendIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <path d="m21 3-9.5 9.5M21 3l-6.5 18-3-8.5L3 9.5 21 3z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const VolumeIcon = ({ className = "w-5 h-5", muted = false }: P & { muted?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <path d="M11 5.5 6.5 9H3v6h3.5L11 18.5v-13z" fill="currentColor" stroke="none" />
    {muted ? (
      <path d="m15 9.5 5 5m0-5-5 5" strokeLinecap="round" />
    ) : (
      <>
        <path d="M15 9a4.2 4.2 0 0 1 0 6" strokeLinecap="round" />
        <path d="M17.5 6.5a8 8 0 0 1 0 11" strokeLinecap="round" />
      </>
    )}
  </svg>
);

export const MapPinIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const UsersIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <circle cx="9" cy="8" r="3.4" />
    <path d="M2.8 20c.6-3.4 3.1-5.3 6.2-5.3s5.6 1.9 6.2 5.3M16 5a3.4 3.4 0 0 1 0 6.6M17.6 15c2 .7 3.3 2.4 3.7 5" strokeLinecap="round" />
  </svg>
);

export const ClapperIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <rect x="3" y="9" width="18" height="11" rx="2" />
    <path d="m3.5 9 1.7-4.4L21 6.5 20 9M8.3 4.9 7 8.9m6.3-4.6L12 8.8m6.3-4.5L17 8.7" strokeLinecap="round" />
  </svg>
);

export const GlobeIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.6 2.5 3.9 5.5 3.9 9S14.6 18.5 12 21c-2.6-2.5-3.9-5.5-3.9-9S9.4 5.5 12 3z" />
  </svg>
);

export const CheckIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={className} aria-hidden="true">
    <path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CopyIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <rect x="9" y="9" width="12" height="12" rx="2.5" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" />
  </svg>
);

export const FlameIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 22c-4.4 0-7.5-2.9-7.5-7.2 0-3 1.8-5.2 3.3-7C9.2 6.2 10.5 4.6 11 2c3 1.8 4.3 4.4 3.9 7.3 1-.4 1.8-1.2 2.2-2.4 1.7 1.9 2.4 4.3 2.4 6.4 0 5.2-3.1 8.7-7.5 8.7zm.2-2c1.8 0 3-1.2 3-3 0-1.5-1-2.6-2.9-4.3-1.9 1.7-3.1 2.8-3.1 4.3 0 1.8 1.2 3 3 3z" />
  </svg>
);

export const CrownIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M3 7.5 7.5 11 12 4.5 16.5 11 21 7.5 19.2 18H4.8L3 7.5zM4.8 19.5h14.4v1.7H4.8v-1.7z" />
  </svg>
);

export const CameraIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <path d="M4 8h3l2-2.5h6L17 8h3a1.5 1.5 0 0 1 1.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 19V9.5A1.5 1.5 0 0 1 4 8z" strokeLinejoin="round" />
    <circle cx="12" cy="14" r="3.6" />
  </svg>
);

export const ScissorsIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <circle cx="6" cy="6.5" r="2.7" />
    <circle cx="6" cy="17.5" r="2.7" />
    <path d="M8.4 8.2 20.5 19M8.4 15.8 20.5 5M13.2 12.6l-2.4 2.1" strokeLinecap="round" />
  </svg>
);

export const MailIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="m4 7.5 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LaughIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M7.5 13.5a4.6 4.6 0 0 0 9 0h-9z" fill="currentColor" stroke="none" />
    <path d="M8 9.2h.01M16 9.2h.01" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

export const SunIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" fill="currentColor" stroke="none" />
    <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19" strokeLinecap="round" />
  </svg>
);

export const MoonIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.6 14.6a8.6 8.6 0 0 1-11.2-11.2A9 9 0 1 0 20.6 14.6z" />
  </svg>
);