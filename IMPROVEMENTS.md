# Improvements

A review of the portfolio as of October 2026. The site is in good shape: fast, accessible, works without JavaScript, self-hosted fonts, proper SEO metadata. The quick wins and tooling below were done on 20 Oct 2026; what's left needs your input (content) or isn't worth doing yet (framework).

---

## 1. "Should I add a framework?" — short answer: no (not React/Angular/Vue)

### Why a framework wouldn't help here

| What a framework gives you | Does this site need it? |
| --- | --- |
| Component state, reactivity | No. The only state is theme, menu open/closed, and a filter. `main.js` handles all of it in ~150 lines. |
| Client-side routing | No. Two pages. Normal links are faster and better for SEO. |
| Large-team code organisation | No. One author. |
| Rich interactive UI | No. It's a content site. |

### What it would cost

- **Speed.** Right now the whole site is roughly 22 KB HTML + 35 KB CSS + 6 KB JS + fonts. A React or Angular SPA starts at 40–150 KB of JS before any content, and the page shows nothing until that JS runs.
- **SEO and link previews.** Static HTML is indexed immediately. A client-rendered SPA needs SSR/prerendering to match what you already have.
- **Losing "works without JavaScript"**, which is currently a real strength.
- **Maintenance.** `node_modules`, dependency updates, a build pipeline and a GitHub Actions deploy, all to show the same content.

### "But wouldn't an Angular portfolio show off my Angular skills?"

Not really. Recruiters look at what the site *says* and how it *feels* (fast, clean, works on their phone). They don't inspect the stack. You show Angular/.NET skill much better with **a real Angular + .NET Core project in the Work section** (see sections 3–4). The portfolio itself saying "No framework needed for a small, mostly static site" is already a good engineering judgment signal.

### When a build tool *would* be worth it

The real pain in this repo isn't missing reactivity, it's **duplication**: the header, footer, contact section, `<head>` metadata and three project mockups are copy-pasted between `index.html` and `projects.html`. If any of these happen, move to a **static site generator** (still outputs plain HTML, ships zero or near-zero JS):

- You add a **blog / notes / TIL** section (Markdown posts) → this is the biggest trigger.
- You go past ~6–8 projects, or want one page per project.
- You add a third or fourth page that shares the header/footer.

Options, in order of fit:

1. **Eleventy (11ty)** — closest to what you have. Keep your HTML/CSS/JS exactly as they are, pull the header/footer into includes, put projects in a `projects.json` data file. Minimal learning curve.
2. **Astro** — component syntax that will feel familiar from Angular, ships zero JS by default, great Markdown/blog support. Slightly bigger migration.

Either way you'd add a GitHub Actions workflow to build and deploy to Pages. Until one of the triggers above happens, **stay plain HTML**.

---

## 2. Done (20 Oct 2026)

- [x] **Mobile readability.** Raised 58 `font-size` declarations that were 6–10px to a floor of 11px (mono labels) / 12px (body text). Decorative text inside the `aria-hidden` project mockups was left as is. Checked at 375px: no horizontal overflow.
- [x] **Job title.** JSON-LD `jobTitle` is now "Software Analyst" (your actual title). The hero still says "Full Stack Developer" as positioning.
- [x] **`projects.html` metadata.** Added `og:locale`, `og:image:width/height`, `twitter:title`, `twitter:description`.
- [x] **Privacy policy.** Removed the `[ ]` around the date; replaced the Google Fonts `@import` with the system font stack.
- [x] **`404.html`.** Custom not-found page matching the site, light and dark.
- [x] **`apple-touch-icon.png`.** 180×180, rendered from `favicon.svg`; linked from both pages.
- [x] **`theme-color`.** Light and dark variants via `media`, so the browser bar is right before JS runs; `main.js` updates both.
- [x] **`sitemap.xml`.** Added `<lastmod>`.
- [x] **`style.css` formatted.** One declaration per line. Verified lossless: the formatted and unformatted CSS render pixel-identical screenshots on every page, both themes, desktop and mobile.
- [x] **GitHub Actions (`.github/workflows/site-checks.yml`).** Fails if `CNAME` is missing or not `pavithranm.in`; runs the lychee link checker on push, PRs and every Monday.

Not done, on purpose:
- **Google verification files.** Both kept. Check in Search Console whether both properties are still in use before deleting either.
- **HTML validation and Lighthouse CI.** Left out for now; they need tuning so they don't fail on day one. Worth adding once the link check has run green for a while.

---

## 3. Are the projects really portfolio-worthy? (vs. the Frame OF Love client site)

Frame OF Love was added on 20 Oct 2026 as project 01 ("Client work") and is now the first featured project on the homepage. Measured against it, here is an honest read of each project:

| Project | Strength as portfolio evidence | Why |
| --- | --- | --- |
| **Frame OF Love** | **Strongest** | A real client, a real business need, live on the client's own domain, built with a modern tool (Astro), credited in its footer. It shows you can deliver for someone else, which a personal demo can't. |
| **InOfficeIQ** | Good | Solves a real problem of your own and has actual logic (calendar and date calculations). Original idea. |
| **ReadmePacman** | Fine as a fun extra | Shows GitHub Actions and automation. If it mainly configures an existing Pac-Man contribution action rather than code you wrote, say so ("set up", not "built"); reviewers will check. |
| **Weather App** | Weak on the homepage | Calling a weather API is one of the most common tutorial projects. Fine in the archive. |
| **Sorting Hat** | Weak | Also a common tutorial-style quiz. Fine in the archive as a playful piece. |
| **This portfolio** | Good | Well-built, accessible, documented. Strong supporting evidence. |

**The big gap:** none of the showcased projects has a backend, API or database, yet the headline is full stack (Angular / .NET / SQL). Frame OF Love is a static site too. Recruiters for .NET roles will look for that layer first.

**To make Frame OF Love even stronger:**
- [ ] Ask the client for a one- or two-line **testimonial** and add it to the case study.
- [ ] Add a **real screenshot** of the live site next to the mockup (with the client's permission for any photos shown).
- [ ] Add an **outcome** if you have one (e.g. enquiries via WhatsApp per month, page speed score, "replaced an Instagram-only presence").
- [ ] If the code can be public, link the **source**.
- [ ] If you want more client work: say **"Open to freelance websites"** in the contact section.

**Homepage line-up to aim for:** Frame OF Love (featured) → your .NET + Angular + SQL project (featured, once it exists) → InOfficeIQ + ReadmePacman as the pair. Move Weather App to the archive only.

---

## 4. Still to do: content (needs you)

These matter more to recruiters than anything technical:

- [ ] **Show your day-job stack in the Work section.** Every showcased project is a vanilla-JS front end, while the headline is Angular / .NET / SQL. Build and add one end-to-end project: ASP.NET Core Web API + Angular + SQL Server (Azure free tier or similar).
- [ ] **Real screenshots alongside the mockups.** Add one real screenshot or short GIF per case study so visitors see the actual app without clicking out.
- [ ] **CV / résumé link** (PDF) in the header or contact section.
- [ ] **Numbers for the Agilysys role**, like the 30% / 40% on Infosys.
- [ ] Optional: a short **"Now"** section (what you're learning or building this month).

## 5. Optional extras

- **Analytics:** if you want visitor counts, use GoatCounter, Plausible or Cloudflare Web Analytics (no cookie banner needed). Avoid Google Analytics.
- **Contact form:** `mailto:` is fine. If you want a form, Formspree / Web3Forms work with plain HTML.
- **Framework:** revisit only when a trigger from section 1 happens (blog, many projects, more shared pages). Then migrate to Eleventy.
