"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { deliveryStages, netsuiteModules } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * What "end-to-end NetSuite implementation" actually means, stage by stage.
 *
 * This is the section the whole ERP half of the site rests on: one bullet on
 * a CV becomes a walkable lifecycle with the specific work he owns at each
 * point. The stage descriptions are standard ERP practice; every line under
 * "What Jatin owns" comes from his stated experience and nothing else.
 */
export function NetSuiteDelivery() {
  const [active, setActive] = useState(deliveryStages[0].id);
  const stage = deliveryStages.find((s) => s.id === active) ?? deliveryStages[0];

  return (
    <Section id="delivery" number="04" label="NetSuite Delivery">
      <Reveal className="mt-12 md:mt-16">
        <p className="max-w-[58ch] text-xl leading-relaxed text-text md:text-2xl md:leading-relaxed">
          An ERP implementation is seven distinct jobs wearing one job title.
          Here is where I sit in each of them.
        </p>
      </Reveal>

      {/* Stage rail. Horizontal and scrollable on small screens, so the whole
          lifecycle is legible without a vertical stack burying stage seven. */}
      <div className="mt-12 md:mt-14">
        <ol
          className="mask-edges flex gap-2 overflow-x-auto pb-3 lg:mask-none lg:gap-3 lg:overflow-visible"
          aria-label="NetSuite implementation stages"
        >
          {deliveryStages.map((item) => {
            const isActive = item.id === stage.id;
            return (
              <li key={item.id} className="shrink-0 lg:flex-1">
                <button
                  type="button"
                  onClick={() => setActive(item.id)}
                  aria-current={isActive ? "step" : undefined}
                  className={cn(
                    "group flex w-full min-h-[76px] flex-col items-start gap-2 border-t-2 px-3 pt-3 text-left transition-colors",
                    isActive
                      ? "border-accent text-text"
                      : "border-edge text-muted hover:border-muted hover:text-text",
                  )}
                >
                  <span
                    className={cn(
                      "u-mono text-2xs transition-colors",
                      isActive ? "text-accent-ink" : "text-muted/70",
                    )}
                  >
                    {item.index}
                  </span>
                  <span className="text-sm leading-tight">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 grid gap-8 border border-edge bg-surface p-6 md:p-9 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="u-mono text-2xs uppercase tracking-[0.28em] text-accent-ink">
              Stage {stage.index} · {stage.name}
            </p>
            <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-text">
              {stage.summary}
            </p>
          </div>

          <div className="lg:col-span-5">
            <p className="u-mono text-2xs uppercase tracking-[0.28em] text-muted">
              What Jatin owns here
            </p>
            <ul className="mt-4 space-y-3">
              {stage.owns.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed text-muted"
                >
                  <Check
                    aria-hidden
                    size={15}
                    strokeWidth={2}
                    className="mt-[0.2em] shrink-0 text-accent-ink"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="mt-16 md:mt-20">
        <h3 className="u-mono flex items-center gap-3 text-2xs">
          <span aria-hidden className="h-px w-8 bg-edge" />
          <span className="uppercase tracking-[0.3em] text-muted">
            Modules configured
          </span>
        </h3>

        <ul className="mt-8 grid gap-px overflow-hidden border border-edge bg-edge md:grid-cols-2">
          {netsuiteModules.map((module) => (
            <li key={module.id} className="bg-surface p-6 md:p-7">
              <h4 className="font-display text-xl md:text-2xl">{module.name}</h4>
              <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted">
                {module.scope}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {module.records.map((record) => (
                  <li
                    key={record}
                    className="u-mono rounded-pill border border-edge px-2.5 py-1 text-2xs uppercase tracking-[0.1em] text-muted"
                  >
                    {record}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
