const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const buttonStyles = {
  primary: `${base} bg-primary text-primary-fg hover:bg-primary-hover`,
  secondary: `${base} border border-border bg-surface text-fg hover:border-fg`,
  light: `${base} bg-white text-fg hover:bg-white/90`,
  ghostLight: `${base} border border-white/60 text-white hover:bg-white/10`,
  whatsapp: `${base} bg-whatsapp text-white hover:brightness-95`,
  /** Home hero: light-on-photo below lg, regular primary/secondary on the split desktop layout. */
  heroPrimary: `${base} bg-white text-fg hover:bg-white/90 lg:bg-primary lg:text-primary-fg lg:hover:bg-primary-hover`,
  heroSecondary: `${base} border border-white/60 text-white hover:bg-white/10 lg:border-border lg:bg-surface lg:text-fg lg:hover:border-fg lg:hover:bg-surface`,
};
