import {
  builds,
  contact,
  deliveryStages,
  experience,
  netsuiteModules,
  profile,
  skillGroups,
} from "@/data/portfolio";

/**
 * A clipboard-ready summary assembled entirely from `portfolio.ts`.
 *
 * Deterministic on purpose: no model, no generation, no chance of a sentence
 * appearing here that is not already true elsewhere on the site. A recruiter
 * pasting this into an ATS or an email gets exactly the same claims the page
 * makes.
 */
export function buildHiringSummary(): string {
  const current = experience[0];
  const currentRole = current.roles[0];

  const systems = skillGroups.find((group) => group.id === "systems");
  const models = skillGroups.find((group) => group.id === "models");

  const lines = [
    `${profile.name} — ${profile.role}`,
    profile.tagline,
    "",
    `Currently: ${currentRole.title} at ${current.company}, ${current.location} (${currentRole.period}).`,
    `NetSuite delivery: ${deliveryStages.map((stage) => stage.name).join(" → ")}.`,
    `Modules configured: ${netsuiteModules.map((module) => module.name).join(", ")}.`,
    "",
    `Systems: ${systems?.items.join(", ")}.`,
    `Models: ${models?.items.join(", ")}.`,
    "",
    `Selected work: ${builds
      .map((build) => `${build.title} (${build.stack.join("/")})`)
      .join("; ")}.`,
    "",
    `Based in ${profile.location}.`,
    `Contact: ${contact.email} · ${profile.linkedin}`,
  ];

  return lines.join("\n");
}
