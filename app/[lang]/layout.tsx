import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Inter, Noto_Sans_Gujarati, Noto_Serif_Gujarati } from "next/font/google";
import "../globals.css";
import { business } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale, l, locales } from "@/lib/i18n";
import { services } from "@/content/services";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ActionBar } from "@/components/layout/ActionBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", axes: ["opsz"] });
// Gujarati fonts are only downloaded by the browser when Gujarati glyphs are rendered.
const gujaratiSans = Noto_Sans_Gujarati({ subsets: ["gujarati"], variable: "--font-gujarati-sans", preload: false });
const gujaratiSerif = Noto_Serif_Gujarati({ subsets: ["gujarati"], variable: "--font-gujarati-serif", preload: false });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#2f4a3a",
  viewportFit: "cover",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || business.url),
    title: { default: business.name, template: `%s | ${business.name}` },
    description: l(business.description, lang),
    applicationName: business.name,
    openGraph: { siteName: business.name, locale: lang === "gu" ? "gu_IN" : "en_CA", type: "website" },
    formatDetection: { telephone: false },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${fraunces.variable} ${gujaratiSans.variable} ${gujaratiSerif.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-surface focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header locale={lang} t={t} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={lang} t={t} />
        <ActionBar
          telHref={`tel:${business.contact.phone}`}
          whatsappNumber={business.contact.whatsapp}
          quoteHref={`/${lang}/contact`}
          businessName={business.name}
          serviceTitles={Object.fromEntries(services.map((s) => [s.slug, l(s.title, lang)]))}
          labels={{
            call: t.actions.call,
            whatsapp: t.actions.whatsapp,
            quote: t.actions.quote,
            whatsappMessage: t.actions.whatsappMessage,
            whatsappServiceMessage: t.actions.whatsappServiceMessage,
          }}
        />
      </body>
    </html>
  );
}
