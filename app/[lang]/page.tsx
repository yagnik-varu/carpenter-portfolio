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
import { SpecSheet } from "@/components/craft/SpecSheet";
import { buttonStyles } from "@/components/ui/button";
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
    <Link
      href={href(lang, path)}
      className="focus-ring group inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-primary"
    >
      {t.actions.viewAll}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
  const e = t.home.eyebrows;

  return (
    <>
      <Hero locale={lang} t={t} rating={reviews.rating} reviewCount={reviews.count} />
      <TrustBar t={t} />

      <Section
        index="01"
        eyebrow={e.services}
        title={t.home.servicesTitle}
        subtitle={t.home.servicesSubtitle}
        action={viewAll("/services")}
      >
        <ul className="no-scrollbar fade-edges -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-1 pb-4 md:mx-0 md:grid md:grid-cols-6 md:gap-5 md:overflow-visible md:px-0 md:[mask-image:none]">
          {services.map((service, i) => (
            // 6-col grid: rows of three cards; when two are left over they share a row (2 + 3 for five).
            <li
              key={service.slug}
              className={`w-[78%] shrink-0 snap-center sm:w-[45%] md:w-auto ${
                services.length % 3 === 2 && i < 2 ? "md:col-span-3" : "md:col-span-2"
              }`}
            >
              <ServiceCard
                service={service}
                locale={lang}
                learnMore={t.actions.learnMore}
                rangeLabel={t.services.startingFrom}
                tone={i}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section
        index="02"
        eyebrow={e.projects}
        title={t.home.projectsTitle}
        subtitle={t.home.projectsSubtitle}
        action={viewAll("/projects")}
      >
        {/* Bento: one large tile + four small. 2-col on phones, 4-col from lg. */}
        <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:auto-rows-[16rem] lg:grid-cols-4">
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
        <Section index="03" eyebrow={e.beforeAfter} title={t.home.beforeAfterTitle} subtitle={t.home.beforeAfterSubtitle}>
          <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center md:gap-12">
            <div className="rounded-3xl shadow-lift">
              <BeforeAfter
                before={spotlight.beforeAfter.before}
                after={spotlight.beforeAfter.after}
                locale={lang}
                labels={{ before: t.projects.before, after: t.projects.after, hint: t.projects.dragHint }}
              />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold md:text-3xl">{l(spotlight.title, lang)}</h3>
              <p className="mt-3 text-fg-muted">{l(spotlight.summary, lang)}</p>
              <SpecSheet
                className="mt-5"
                rows={[
                  { label: t.projects.location, value: spotlight.location },
                  { label: t.projects.duration, value: l(spotlight.duration, lang) },
                  { label: t.projects.materials, value: l(spotlight.materials, lang) },
                ]}
              />
              <Link
                href={href(lang, `/projects/${spotlight.slug}`)}
                className={`${buttonStyles.secondary} mt-6`}
              >
                {t.actions.viewProject} <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Section>
      )}

      <Section
        index="04"
        eyebrow={e.reviews}
        title={t.home.reviewsTitle}
        action={<RatingSummary rating={reviews.rating} count={reviews.count} t={t} />}
      >
        <ReviewList
          reviews={reviews.reviews.slice(0, 3)}
          t={t}
          layout="featured"
          fromGoogle={reviews.source === "google"}
        />
        <div className="mt-8 flex justify-center">
          <GoogleReviewsLink url={reviews.url} t={t} />
        </div>
      </Section>

      <MeetOwner locale={lang} t={t} index="05" />

      <div className="graph-paper border-y border-border bg-surface">
        <Section index="06" eyebrow={e.process} title={t.home.processTitle}>
          <Process t={t} />
        </Section>
      </div>

      <Section index="07" eyebrow={e.faq} title={t.home.faqTitle} action={viewAll("/faq")}>
        <Faq items={generalFaq(t).slice(0, 4)} />
      </Section>

      <CtaBand locale={lang} t={t} image={ctaImage} />
    </>
  );
}
