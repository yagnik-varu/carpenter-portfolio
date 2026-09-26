"use client";

import { useActionState, useEffect, useRef, useState, startTransition, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, X } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { fmt, type Locale } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { compressImage } from "@/lib/compress-image";
import {
  contactMethods,
  fieldErrorsFrom,
  MAX_PHOTOS,
  quoteSchema,
  validatePhotos,
  type QuoteErrorKey,
  type QuoteInput,
  type QuoteState,
} from "@/lib/quote";
import { submitQuote } from "@/app/[lang]/contact/actions";
import { resetTurnstile, Turnstile } from "./Turnstile";

type Props = {
  locale: Locale;
  labels: Dictionary["contact"]["form"];
  services: { slug: string; title: string }[];
  successHref: string;
};

type Photo = { file: File; url: string };

const input =
  "block w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-fg placeholder:text-fg-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none aria-[invalid=true]:border-red-600";

export function QuoteForm({ locale, labels, services, successHref }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const [state, formAction, pending] = useActionState<QuoteState, FormData>(submitQuote, { status: "idle" });
  const [clientErrors, setClientErrors] = useState<Partial<Record<keyof QuoteInput, QuoteErrorKey>>>({});
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoError, setPhotoError] = useState(false);
  const [processing, setProcessing] = useState(false);

  const serverErrors = state.status === "error" ? state.fieldErrors : {};
  const errors = { ...serverErrors, ...clientErrors };
  const formError = state.status === "error" ? state.formError : undefined;

  // Prefill service from ?service=slug (links from service pages and the action bar).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    if (slug && serviceRef.current && services.some((s) => s.slug === slug)) serviceRef.current.value = slug;
  }, [services]);

  useEffect(() => {
    if (state.status === "success") {
      track("quote_submit", { service: serviceRef.current?.value || "none", photos: photos.length, locale });
      router.push(successHref);
    } else if (state.status === "error") {
      resetTurnstile(); // tokens are single-use
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- react only to new action results
  }, [state]);

  // Release preview object URLs on unmount.
  const photosRef = useRef(photos);
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  async function addPhotos(list: FileList | null) {
    if (!list?.length) return;
    setProcessing(true);
    const room = MAX_PHOTOS - photos.length;
    const picked = Array.from(list).filter((f) => f.type.startsWith("image/")).slice(0, room);
    const compressed = await Promise.all(picked.map((f) => compressImage(f)));
    const next = [...photos.map((p) => p.file), ...compressed];
    const ok = validatePhotos(next);
    setPhotoError(!ok || list.length > room);
    if (ok) setPhotos((prev) => [...prev, ...compressed.map((file) => ({ file, url: URL.createObjectURL(file) }))]);
    setProcessing(false);
  }

  function removePhoto(index: number) {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
    setPhotoError(false);
  }

  function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.delete("photos");
    photos.forEach((p) => fd.append("photos", p.file, p.file.name));

    const result = quoteSchema.safeParse(Object.fromEntries(fd));
    if (!result.success) {
      const errs = fieldErrorsFrom(result.error);
      setClientErrors(errs);
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setClientErrors({});
    startTransition(() => formAction(fd));
  }

  const err = (field: keyof QuoteInput) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1.5 text-sm text-red-700">
        {labels.errors[errors[field]!]}
      </p>
    ) : null;
  const aria = (field: keyof QuoteInput) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
    onChange: () => errors[field] && setClientErrors((c) => ({ ...c, [field]: undefined })),
  });
  const req = <span className="text-red-700" aria-hidden> *</span>;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot — hidden from people and assistive tech. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
          {labels.name}
          {req}
        </label>
        <input id="name" name="name" autoComplete="name" required className={input} {...aria("name")} />
        {err("name")}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">
            {labels.phone}
            {req}
          </label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={input} {...aria("phone")} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
            {labels.email}
          </label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" className={input} {...aria("email")} />
          {err("email")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-semibold">
            {labels.service}
          </label>
          <select id="service" name="service" ref={serviceRef} defaultValue="" className={input}>
            <option value="">{labels.servicePlaceholder}</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
            <option value="other">{labels.otherService}</option>
          </select>
        </div>
        <div>
          <label htmlFor="city" className="mb-1.5 block text-sm font-semibold">
            {labels.city}
          </label>
          <input id="city" name="city" autoComplete="address-level2" className={input} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className="mb-1.5 block text-sm font-semibold">
            {labels.budget}
          </label>
          <select id="budget" name="budget" defaultValue="" className={input}>
            <option value="">—</option>
            {labels.budgetOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="mb-1.5 block text-sm font-semibold">
            {labels.timeline}
          </label>
          <select id="timeline" name="timeline" defaultValue="" className={input}>
            <option value="">—</option>
            {labels.timelineOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">
          {labels.message}
          {req}
        </label>
        <textarea id="message" name="message" rows={5} required placeholder={labels.messagePlaceholder} className={input} {...aria("message")} />
        {err("message")}
      </div>

      <fieldset>
        <legend className="mb-1.5 block text-sm font-semibold">{labels.photos}</legend>
        <p className="mb-3 text-sm text-fg-muted">{fmt(labels.photosHint, { max: MAX_PHOTOS })}</p>
        <div className="flex flex-wrap gap-3">
          {photos.map((p, i) => (
            <div key={p.url} className="relative size-20 overflow-hidden rounded-xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
              <img src={p.url} alt="" className="size-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                className="absolute top-1 right-1 grid size-7 place-items-center rounded-full bg-black/70 text-white"
              >
                <X className="size-4" aria-hidden />
                <span className="sr-only">{labels.removePhoto}</span>
              </button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <label className="grid size-20 cursor-pointer place-items-center rounded-xl border-2 border-dashed border-border text-fg-muted hover:border-primary hover:text-primary">
              {processing ? <Loader2 className="size-6 animate-spin" aria-hidden /> : <ImagePlus className="size-6" aria-hidden />}
              <span className="sr-only">{labels.addPhotos}</span>
              <input
                type="file"
                name="photos"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => {
                  addPhotos(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
          )}
        </div>
        {photoError && <p className="mt-1.5 text-sm text-red-700">{labels.errors.photos}</p>}
      </fieldset>

      <fieldset>
        <legend className="mb-2 block text-sm font-semibold">{labels.contactMethod}</legend>
        <div className="flex flex-wrap gap-2">
          {contactMethods.map((m, i) => (
            <label
              key={m}
              className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm has-checked:border-primary has-checked:bg-primary/5"
            >
              <input type="radio" name="contactMethod" value={m} defaultChecked={i === 0} className="accent-primary" />
              {labels.contactMethods[m]}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="consent" className="mt-0.5 size-5 accent-primary" {...aria("consent")} />
          <span>
            {labels.consent}
            {req}
          </span>
        </label>
        {err("consent")}
      </div>

      <Turnstile locale={locale} />

      {formError && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-800">
          {labels.errors[formError]}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || processing}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 font-semibold text-primary-fg transition-colors hover:bg-primary-hover disabled:opacity-60 sm:w-auto"
      >
        {pending && <Loader2 className="size-5 animate-spin" aria-hidden />}
        {pending ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
