const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-[color,background-color,border-color,box-shadow,transform] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const buttonStyles = {
  primary: `${base} bg-primary text-primary-fg shadow-card hover:bg-primary-hover`,
  secondary: `${base} border border-border bg-surface text-fg hover:border-fg`,
  light: `${base} bg-surface text-fg hover:bg-inverse`,
  ghostLight: `${base} border border-inverse/60 text-inverse hover:bg-inverse/10`,
  whatsapp: `${base} bg-whatsapp text-inverse hover:brightness-95`,
  /** Home hero: light-on-photo below lg, regular primary/secondary on the split desktop layout. */
  heroPrimary: `${base} bg-surface text-fg hover:bg-inverse lg:bg-primary lg:text-primary-fg lg:shadow-card lg:hover:bg-primary-hover`,
  heroSecondary: `${base} border border-inverse/60 text-inverse hover:bg-inverse/10 lg:border-border lg:bg-surface lg:text-fg lg:hover:border-fg lg:hover:bg-surface`,
};
