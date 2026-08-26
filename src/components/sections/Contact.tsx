import { ArrowUpRight, Download, Mail } from "lucide-react";

import { contact, profile } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GitHubMark, LinkedInMark } from "@/components/ui/BrandIcons";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function Contact() {
  return (
    <Section id="contact" number="08" label="Contact">
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

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-[46ch] text-lg text-muted">{contact.sub}</p>
        </Reveal>

        <Reveal delay={0.28} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href={`mailto:${contact.email}`}>
            <Mail aria-hidden size={17} strokeWidth={1.8} />
            {contact.email}
          </MagneticButton>

          <a
            href={contact.resume}
            download
            className="inline-flex min-h-[56px] items-center gap-2.5 rounded-card border border-edge px-7 text-base text-text transition-colors hover:border-accent hover:text-accent-ink"
          >
            Download resume
            <Download aria-hidden size={16} strokeWidth={1.6} />
          </a>
        </Reveal>

        <RevealGroup as="ul" className="mt-14 grid gap-px overflow-hidden border border-edge bg-edge sm:grid-cols-3">
          <ContactRow
            label="LinkedIn"
            value="jatin-acharya"
            href={profile.linkedin}
            icon={<LinkedInMark size={15} />}
          />
          <ContactRow
            label="GitHub"
            value="AcharyaJatin20"
            href={profile.github}
            icon={<GitHubMark size={15} />}
          />
          <ContactRow
            label="Phone"
            value={profile.phone}
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
          />
        </RevealGroup>
      </div>
    </Section>
  );
}

function ContactRow({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href: string;
  icon?: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <RevealItem as="li" className="bg-surface">
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="group flex min-h-[88px] flex-col justify-center gap-2 p-6 transition-colors hover:bg-accent/[0.04]"
      >
        <span className="u-mono flex items-center gap-2 text-2xs uppercase tracking-[0.28em] text-muted">
          {icon}
          {label}
        </span>
        <span className="flex items-center gap-2 text-text transition-colors group-hover:text-accent-ink">
          {value}
          {external && (
            <ArrowUpRight
              aria-hidden
              size={14}
              strokeWidth={1.8}
              className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          )}
        </span>
      </a>
    </RevealItem>
  );
}
