/**
 * Resume HTML, built from `src/data/portfolio.ts`.
 *
 * Single column, real selectable text, standard section headings and no
 * layout tables — an applicant-tracking parser reads this correctly, which
 * matters more on a resume than any amount of art direction. The typographic
 * language still follows the site: mono for anything that is data, hairline
 * rules, exact alignment.
 *
 * Nothing here is written by hand twice. Every fact comes from the same
 * exports the website renders, so the document cannot drift from the site.
 */

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const SUMMARY = {
  netsuite: (d) =>
    `Oracle NetSuite Functional Consultant delivering end-to-end ERP implementations — requirement gathering, fit/gap analysis, module configuration, functional testing, user training, go-live and hypercare. Configured across ${d.netsuiteModules
      .map((m) => m.name)
      .join(", ")}. B.Tech (Hons.) CSE specialising in AI & ML, with applied computer-vision work alongside the ERP practice.`,
  seam: () =>
    `Enterprise systems and applied machine learning. Two years delivering Oracle NetSuite ERP implementations end to end for paying clients, alongside a B.Tech (Hons.) CSE specialising in AI & ML and hands-on computer-vision work. Enterprise systems generate large, structured, underused data; I read the process and build the model.`,
};

export function buildResumeHtml(data, variant = "netsuite") {
  const { profile, experience, education, builds, skillGroups, netsuiteModules, deliveryStages } = data;

  /* Trimmed so the contact line never wraps: the "www." and the full state
     name pushed it onto a second row, which looks like a mistake on a
     document this formal. */
  const contact = [
    profile.email,
    profile.linkedin.replace(/^https:\/\/(www\.)?/, ""),
    profile.github.replace(/^https:\/\/(www\.)?/, ""),
    "Pune, India",
  ];

  const experienceHtml = experience
    .map((entry) => {
      const roles = entry.roles
        .map(
          (role) => `
        <div class="role">
          <div class="row">
            <span class="role-title">${esc(role.title)}${
              /intern|trainee/i.test(role.title) &&
              /intern|trainee/i.test(role.employment)
                ? ""
                : `<span class="dim"> · ${esc(role.employment)}</span>`
            }</span>
            <span class="mono dates">${esc(role.period)}</span>
          </div>
          <ul>${role.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
        </div>`,
        )
        .join("");
      const meta = [entry.location, entry.mode].filter(Boolean).join(" · ");
      return `
      <div class="entry">
        <div class="row">
          <span class="company">${esc(entry.company)}</span>
          <span class="mono dim">${esc(meta)}</span>
        </div>
        ${roles}
      </div>`;
    })
    .join("");

  const projectsHtml = builds
    .map(
      (b) => `
      <div class="entry compact">
        <div class="row">
          <span class="role-title">${esc(b.title)}<span class="dim"> — ${esc(b.context)}</span></span>
          <span class="mono dates">${esc(b.dates)}</span>
        </div>
        <p>${esc(b.approach)}</p>
        <p class="mono stack">${b.stack.map(esc).join(" · ")}<span class="dim"> — ${esc(b.result)}</span></p>
      </div>`,
    )
    .join("");

  /* The site's "Learning" list mixes formal coursework with what he is
     currently reading about. A resume should only carry the former — an
     interest listed as a skill reads as padding — so the aspirational entry
     is dropped here and coursework moves inline under Education, which also
     buys back the line that was pushing this onto a second page. */
  const coursework = (skillGroups.find((g) => g.id === "learning")?.items ?? [])
    .filter((item) => /\(|NetSuite ERP Implementation/.test(item));

  const skillsHtml = skillGroups
    .filter((g) => g.id !== "learning")
    .map(
      (g) => `
      <div class="row skills-row">
        <span class="mono label">${esc(g.label)}</span>
        <span class="skills">${g.items.map(esc).join(" · ")}</span>
      </div>`,
    )
    .join("");

  const netsuiteBlock = `
    <section>
      <h2>NetSuite Scope</h2>
      <div class="row skills-row">
        <span class="mono label">Modules</span>
        <span class="skills">${netsuiteModules.map((m) => esc(m.name)).join(" · ")}</span>
      </div>
      <div class="row skills-row">
        <span class="mono label">Lifecycle</span>
        <span class="skills">${deliveryStages.map((s) => esc(s.name)).join(" · ")}</span>
      </div>
    </section>`;

  const projectsBlock = `
    <section>
      <h2>Projects</h2>
      ${projectsHtml}
    </section>`;

  // The two variants differ only in the summary and in whether ERP scope or
  // project work is given the higher position.
  const middle =
    variant === "netsuite"
      ? netsuiteBlock + projectsBlock
      : projectsBlock + netsuiteBlock;

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${esc(profile.name)} — Resume</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 11mm 13mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Geist", -apple-system, "Helvetica Neue", Arial, sans-serif;
    font-size: 8.55pt;
    line-height: 1.34;
    color: #14181d;
    -webkit-font-smoothing: antialiased;
  }
  .mono { font-family: "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace; }
  .dim { color: #5c6873; font-weight: 400; }

  header { border-bottom: 1.2px solid #14181d; padding-bottom: 5.5pt; margin-bottom: 8pt; }
  .name { font-size: 19pt; font-weight: 700; letter-spacing: -0.02em; line-height: 1; }
  .title { font-size: 9.4pt; font-weight: 500; margin-top: 2pt; color: #1f6f66; }
  .contact { margin-top: 4.5pt; font-size: 7.7pt; color: #3f4a55; }
  .contact { white-space: nowrap; }
  .contact span:not(:last-child)::after { content: "  ·  "; color: #9aa4ae; }

  h2 {
    font-family: "Geist Mono", ui-monospace, monospace;
    font-size: 7.6pt; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.17em;
    color: #5c6873;
    margin: 8.5pt 0 4pt;
    padding-bottom: 2.2pt;
    border-bottom: 0.6px solid #d6dce2;
  }
  section:first-of-type h2 { margin-top: 0; }

  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 10pt; }
  .company { font-size: 9.6pt; font-weight: 600; }
  .role-title { font-weight: 600; }
  .dates { font-size: 7.6pt; color: #3f4a55; white-space: nowrap; }
  .entry { margin-bottom: 5pt; }
  .entry.compact { margin-bottom: 4.5pt; }
  .role { margin-top: 1.8pt; }
  ul { margin: 1.5pt 0 0; padding-left: 10pt; }
  li { margin-bottom: 0.8pt; }
  p { margin: 1.5pt 0 0; }
  .stack { font-size: 7.5pt; color: #5c6873; margin-top: 2pt; }

  .skills-row { margin-bottom: 2.2pt; align-items: flex-start; }
  .label { font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.12em; color: #5c6873; width: 74pt; flex: 0 0 74pt; padding-top: 0.6pt; }
  .skills { flex: 1; }
  .summary { margin-bottom: 2pt; }
</style></head>
<body>
  <header>
    <div class="name">${esc(profile.name)}</div>
    <div class="title">${esc(profile.role)}</div>
    <div class="contact mono">${contact.map((c) => `<span>${esc(c)}</span>`).join("")}</div>
  </header>

  <section>
    <h2>Summary</h2>
    <p class="summary">${esc(SUMMARY[variant](data))}</p>
  </section>

  <section>
    <h2>Experience</h2>
    ${experienceHtml}
  </section>

  ${middle}

  <section>
    <h2>Education</h2>
    <div class="entry compact">
      <div class="row">
        <span class="company">${esc(education.institution)}</span>
        <span class="mono dates">${esc(education.period)}</span>
      </div>
      <p>${esc(education.qualification)} — Specialisation: ${esc(education.specialisation)} · CGPA 9.37 / 10</p>
      <p class="dim">CBSE XII 89% (Central Academy, Ajmer) · CBSE X 90% (All Saints, Ajmer)</p>
      <p class="dim">Coursework: ${coursework.map(esc).join(" · ")}</p>
    </div>
  </section>

  <section>
    <h2>Achievements</h2>
    <p>Dean&rsquo;s List of Excellence ×5 — highest GPA, semesters 3, 4, 5, 6 and 7 · 1st place, MUJHACKX Hackathon · Student Placement Coordinator, AIML Department, MUJ · Certificate of Appreciation, ACM Student Chapter</p>
  </section>

  <section>
    <h2>Skills</h2>
    ${skillsHtml}
  </section>
</body></html>`;
}
