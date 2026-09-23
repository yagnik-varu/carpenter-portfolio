import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business, yearsInBusiness } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { getCategories, getProjects, getReviews, getServices } from "@/lib/content";
import { generalFaq } from "@/lib/faq";
import { fmt, href, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { GoogleReviewsLink, RatingSummary, ReviewList } from "@/components/sections/Reviews";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = await getDictionary(lang);
  const vars = { city: business.address.city, years: yearsInBusiness };
  return {
    title: { absolute: `${fmt(t.meta.homeTitle, vars)} | ${business.name}` },
    description: fmt(t.meta.homeDescription, vars),
  };
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

  const viewAll = (path: string) => (
    <Link href={href(lang, path)} className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
      {t.actions.viewAll} <ArrowRight className="size-4" aria-hidden />
    </Link>
  );

  return (
    <>
      <Hero locale={lang} t={t} />
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
        <ul className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <ProjectCard
                project={project}
                category={categories.find((c) => c.id === project.category)}
                locale={lang}
                index={i}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title={t.home.reviewsTitle}
        action={<RatingSummary rating={reviews.rating} count={reviews.count} t={t} />}
      >
        <ReviewList reviews={reviews.reviews.slice(0, 3)} t={t} />
        <div className="mt-6 flex justify-center">
          <GoogleReviewsLink url={reviews.url} t={t} />
        </div>
      </Section>

      <Section title={t.home.processTitle}>
        <Process t={t} />
      </Section>

      <Section title={t.home.faqTitle} action={viewAll("/faq")}>
        <Faq items={generalFaq(t).slice(0, 4)} />
      </Section>

      <CtaBand locale={lang} t={t} />
    </>
  );
}
