import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";

import { contact, profile } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { GitHubMark, LinkedInMark } from "@/components/ui/BrandIcons";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";
import { HiringToolkit } from "@/components/ui/HiringToolkit";

export function Contact() {
  return (
    <Section id="contact" number="09" label="Contact">
      <div className="mt-12 md:mt-16">
        <p
          className="max-w-[16ch] font-display leading-[0.92]"
          style={{
            fontSize: "var(--text-4xl)",
            fontVariationSettings: '"wght" 600, "wdth" 88, "opsz" 72',
          }}
        >
          <SplitText text={contact.heading} />
        </p>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <p className="max-w-[46ch] text-lg text-muted">{contact.sub}</p>
            </Reveal>
            <ContactForm />
          </div>

          <Reveal delay={0.25} className="lg:col-span-4 lg:col-start-9">
            <p className="u-mono text-2xs uppercase tracking-[0.28em] text-muted">
              Or go direct
            </p>

            <RevealGroup as="ul" className="mt-5 space-y-px">
              <DirectRow
                icon={<Mail aria-hidden size={15} strokeWidth={1.7} />}
                label="Email"
                value={contact.email}
                href={`mailto:${contact.email}`}
              />
              <DirectRow
                icon={<LinkedInMark size={15} />}
                label="LinkedIn"
                value="jatin-acharya"
                href={profile.linkedin}
              />
              <DirectRow
                icon={<GitHubMark size={15} />}
                label="GitHub"
                value="AcharyaJatin20"
                href={profile.github}
              />
              <DirectRow
                icon={<MapPin aria-hidden size={15} strokeWidth={1.7} />}
                label="Based in"
                value={profile.location}
              />
            </RevealGroup>

            <a
              href={contact.resume}
              download
              className="mt-7 inline-flex min-h-[48px] items-center gap-2.5 rounded-card border border-edge px-5 text-sm text-text transition-colors hover:border-accent hover:text-accent-ink"
            >
              Download resume
              <Download aria-hidden size={16} strokeWidth={1.6} />
            </a>
          </Reveal>
        </div>

        <HiringToolkit />
      </div>
    </Section>
  );
}

function DirectRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const external = href?.startsWith("http");
  const body = (
    <>
      <span className="u-mono flex items-center gap-2 text-2xs uppercase tracking-[0.24em] text-muted">
        <span className="text-accent-ink">{icon}</span>
        {label}
      </span>
      <span className="flex items-center gap-1.5 text-text">
        {value}
        {external && (
          <ArrowUpRight
            aria-hidden
            size={13}
            strokeWidth={1.8}
            className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </span>
    </>
  );

  return (
    <RevealItem as="li">
      {href ? (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group flex min-h-[64px] flex-col justify-center gap-1.5 border-b border-edge py-3 transition-colors hover:text-accent-ink"
        >
          {body}
        </a>
      ) : (
        <div className="flex min-h-[64px] flex-col justify-center gap-1.5 border-b border-edge py-3">
          {body}
        </div>
      )}
    </RevealItem>
  );
}
