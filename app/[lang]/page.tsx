import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business, ctaImage, yearsInBusiness } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { getCategories, getProjects, getReviews, getServices } from "@/lib/content";
import { generalFaq } from "@/lib/faq";
import { fmt, href, l, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { GoogleReviewsLink, RatingSummary, ReviewList } from "@/components/sections/Reviews";
import { Process } from "@/components/sections/Process";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { MeetOwner } from "@/components/sections/MeetOwner";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = await getDictionary(lang);
  const vars = { city: business.address.city, years: yearsInBusiness };
  return pageMetadata({
    lang,
    path: "/",
    title: { absolute: `${fmt(t.meta.homeTitle, vars)} | ${business.name}` },
    description: fmt(t.meta.homeDescription, vars),
  });
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const [t, services, projects, categories, reviews] = await Promise.all([
    getDictionary(lang),
    getServices(),
    getProjects({ featured: true }),
    getCategories(),
    getReviews(),
  ]);

  const featured = projects.slice(0, 5);
  const spotlight = projects.find((p) => p.beforeAfter);

  const viewAll = (path: string) => (
    <Link href={href(lang, path)} className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
      {t.actions.viewAll} <ArrowRight className="size-4" aria-hidden />
    </Link>
  );

  return (
    <>
      <Hero locale={lang} t={t} rating={reviews.rating} reviewCount={reviews.count} />
      <TrustBar t={t} />

      <Section title={t.home.servicesTitle} subtitle={t.home.servicesSubtitle} action={viewAll("/services")}>
        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {services.map((service, i) => (
            <li key={service.slug} className="w-[78%] shrink-0 snap-center sm:w-[45%] md:w-auto">
              <ServiceCard service={service} locale={lang} learnMore={t.actions.learnMore} tone={i} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t.home.projectsTitle} subtitle={t.home.projectsSubtitle} action={viewAll("/projects")}>
        {/* Bento: one large tile + four small. 2-col on phones, 4-col from lg. */}
        <ul className="reveal grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 lg:auto-rows-[16rem]">
          {featured.map((project, i) => (
            <li key={project.slug} className={i === 0 ? "col-span-2 lg:row-span-2" : ""}>
              <ProjectCard
                project={project}
                category={categories.find((c) => c.id === project.category)}
                locale={lang}
                index={i}
                size={i === 0 ? "lg" : "sm"}
              />
            </li>
          ))}
        </ul>
      </Section>

      {spotlight?.beforeAfter && (
        <Section title={t.home.beforeAfterTitle} subtitle={t.home.beforeAfterSubtitle}>
          <div className="reveal grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center md:gap-10">
            <BeforeAfter
              before={spotlight.beforeAfter.before}
              after={spotlight.beforeAfter.after}
              locale={lang}
              labels={{ before: t.projects.before, after: t.projects.after, hint: t.projects.dragHint }}
            />
            <div>
              <h3 className="font-serif text-2xl font-semibold">{l(spotlight.title, lang)}</h3>
              <p className="mt-1 text-sm text-fg-muted">
                {spotlight.location} · {l(spotlight.duration, lang)}
              </p>
              <p className="mt-3 text-fg-muted">{l(spotlight.summary, lang)}</p>
              <Link
                href={href(lang, `/projects/${spotlight.slug}`)}
                className="mt-4 inline-flex min-h-11 items-center gap-1 font-semibold text-primary"
              >
                {t.actions.viewProject} <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Section>
      )}

      <Section
        title={t.home.reviewsTitle}
        action={<RatingSummary rating={reviews.rating} count={reviews.count} t={t} />}
      >
        <ReviewList reviews={reviews.reviews.slice(0, 3)} t={t} fromGoogle={reviews.source === "google"} />
        <div className="mt-6 flex justify-center">
          <GoogleReviewsLink url={reviews.url} t={t} />
        </div>
      </Section>

      <MeetOwner locale={lang} t={t} />

      <Section title={t.home.processTitle}>
        <Process t={t} />
      </Section>

      <Section title={t.home.faqTitle} action={viewAll("/faq")}>
        <Faq items={generalFaq(t).slice(0, 4)} />
      </Section>

      <CtaBand locale={lang} t={t} image={ctaImage} />
    </>
  );
}
