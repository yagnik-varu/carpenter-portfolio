"use client";

import { usePathname } from "next/navigation";
import { FileText, Phone } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { WhatsAppIcon } from "@/components/icons";
import { fmt } from "@/lib/i18n";

type Props = {
  telHref: string;
  whatsappNumber: string;
  quoteHref: string;
  businessName: string;
  /** slug -> localized service title, used to prefill WhatsApp on service pages */
  serviceTitles: Record<string, string>;
  labels: {
    call: string;
    whatsapp: string;
    quote: string;
    whatsappMessage: string;
    whatsappServiceMessage: string;
  };
};

function useWhatsappHref({ whatsappNumber, businessName, serviceTitles, labels }: Props) {
  const pathname = usePathname();
  const slug = pathname.match(/\/services\/([^/]+)/)?.[1];
  const service = slug ? serviceTitles[slug] : undefined;
  const text = service
    ? fmt(labels.whatsappServiceMessage, { name: businessName, service })
    : fmt(labels.whatsappMessage, { name: businessName });
  return { url: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, service: slug };
}

/** Mobile: sticky bottom bar (Call · WhatsApp · Quote). Desktop: floating WhatsApp button. */
export function ActionBar(props: Props) {
  const { telHref, quoteHref, labels } = props;
  const wa = useWhatsappHref(props);
  const pathname = usePathname();
  const onContactPage = pathname.endsWith("/contact");

  return (
    <>
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <div className="grid h-[var(--action-bar-h)] grid-cols-3">
          <TrackedLink
            href={telHref}
            event="call_click"
            eventProps={{ location: "action_bar" }}
            className="flex flex-col items-center justify-center gap-0.5 text-xs font-semibold text-fg"
          >
            <Phone className="size-5" aria-hidden />
            {labels.call}
          </TrackedLink>
          <TrackedLink
            href={wa.url}
            event="whatsapp_click"
            eventProps={{ location: "action_bar", service: wa.service }}
            className="flex flex-col items-center justify-center gap-0.5 text-xs font-semibold text-whatsapp"
          >
            <WhatsAppIcon className="size-5" />
            {labels.whatsapp}
          </TrackedLink>
          <TrackedLink
            href={quoteHref + (wa.service ? `?service=${wa.service}` : "")}
            event="cta_click"
            eventProps={{ location: "action_bar", type: "quote" }}
            aria-current={onContactPage ? "page" : undefined}
            className="m-2 flex flex-col items-center justify-center gap-0.5 rounded-xl bg-primary text-xs font-semibold text-primary-fg"
          >
            <FileText className="size-5" aria-hidden />
            {labels.quote}
          </TrackedLink>
        </div>
      </nav>

      <TrackedLink
        href={wa.url}
        event="whatsapp_click"
        eventProps={{ location: "floating_button", service: wa.service }}
        aria-label={labels.whatsapp}
        className="fixed right-6 bottom-6 z-40 hidden size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 md:grid"
      >
        <WhatsAppIcon className="size-7" />
      </TrackedLink>
    </>
  );
}
