# CLAUDE.md

Guidance for AI assistants (and future me) working in this repository.

## What this repo is

This repo does **two jobs at once**:

1. **GitHub profile README** — the repo is named `Pavithran-P12` (same as the GitHub username), so `README.md` renders on github.com/Pavithran-P12. Treat `README.md` as profile content, not developer docs. Don't add build notes or site internals there.
2. **Personal portfolio website** — served by GitHub Pages at the custom domain **https://pavithranm.in** (`CNAME`).

## Stack

- Plain **HTML + CSS + vanilla JS**. No framework, no bundler, no `package.json`, no build step.
- Whatever is committed to `main` is what goes live.
- Fonts (Manrope, DM Mono) are self-hosted WOFF2 in `assets/` (licenses in `assets/FONT-LICENSES.txt`). Don't add Google Fonts or other CDN links to the portfolio pages.

## Run locally

```sh
python3 -B -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/
```

## File map

| Path | Purpose |
| --- | --- |
| `index.html` | Homepage: hero → selected work → capabilities (`#skills`) → journey (`#experience`) → about → credentials → GitHub strip → contact |
| `projects.html` | Project archive with case studies and category filters |
| `style.css` | All styles for every page. Formatted one declaration per line (2-space indent); keep it that way so diffs stay readable |
| `main.js` | Progressive enhancement only: theme toggle, mobile menu, scroll reveals, active nav link, project filters, footer year |
| `404.html` | Custom not-found page (GitHub Pages serves it for any missing URL). Uses **root-absolute** paths (`/style.css`) because it can be served at any depth — don't make them relative |
| `apple-touch-icon.png` | 180×180 iOS icon rendered from `favicon.svg` (full-bleed, no rounded corners; iOS rounds it). Regenerate if the favicon changes |
| `.github/workflows/site-checks.yml` | CI: fails if `CNAME` is missing/wrong, and runs a link checker (lychee) on push, PRs and weekly |
| `cv/index.html` | The CV as a web page (`/cv/`, `noindex`) and the **source of the PDF**. Self-contained styles in the site's look; screen view has a Download button |
| `assets/Pavithran-M-CV.pdf` | One-page A4 CV, linked as "Download CV" in the homepage hero and "CV (PDF)" in both contact sections |
| `support.html` | "Support my dream" page: the dream, what support pays for, and the Razorpay link (`https://razorpay.me/@pavithranm`). Linked from the main nav ("Donate" with a hand-holding-heart icon) and every page footer |
| `privacy-policy.html` | Privacy policy for **this website** (uses `style.css`, `.legal` styles). Linked as "Privacy" in every page footer. If you add analytics, a form, embeds or any third-party script, update it and its "Last updated" date first. |
| `InOfficeIQ/index.html` | Old URL kept alive: redirects to `projects.html` (the InOfficeIQ project is no longer listed) |
| `google*.html` | Google Search Console verification files — **do not delete or edit** |
| `CNAME` | Custom domain. Must contain exactly `pavithranm.in` |
| `robots.txt`, `sitemap.xml` | SEO. Update `sitemap.xml` when adding a public page |
| `assets/social-preview.svg` / `.png` | Open Graph image. SVG is the editable source; PNG is the exported 1200×630 version — re-export the PNG after editing the SVG |
| `PORTFOLIO.md` | Design and link-maintenance notes, including the verified-URL table |

## Core principles (keep these)

- **Works without JavaScript.** Everything in `main.js` is an enhancement. Elements JS controls start with `hidden` in HTML and JS reveals them (`.theme-toggle`, `.menu-toggle`, `.project-filters`). Keep that pattern for new interactive bits.
- **Accessibility is a feature.** Keep the skip link, `aria-*` states, `:focus-visible` styles, `prefers-reduced-motion` handling, and decorative SVGs marked `aria-hidden="true"`. Every external link uses `target="_blank" rel="noopener noreferrer"`.
- **Relative internal links** (`style.css`, `projects.html`, `assets/...`) so the site works both on the custom domain and under the GitHub Pages project path.
- **No GitHub profile or source-code links** on the site or CV (no `github.com/...` repo links, no "View source", no GitHub in `sameAs`). Source repos are public, including client work, so the site points to live apps only. **Also no `pavithran-p12.github.io` links**: they reveal the GitHub username. Only projects on their own domains (client sites, pavithranm.in) are shown. The privacy policy's links to GitHub's own documentation stay, because they explain the hosting.
- **Link to files, not folders**: use `cv/index.html`, never `cv/`. A folder link works on GitHub Pages but shows a file listing when the site is opened locally from disk.
- The main nav on every page is: Work · About · Journey · CV · Donate (hand-holding-heart icon, to `support.html`) · Say hello. Keep it in sync across `index.html`, `projects.html`, `privacy-policy.html`, `support.html` and `404.html`.
- **Keep legacy anchors working**: `#projects`, `#skills`, `#experience`, `#about`, `#certifications`, `#awards`, `#stats`, `#contributions`, `#contact`, and the project IDs on `projects.html`: `#frameoflove`, `#thirdspace`, `#portfolio`.
- **Project visuals are hand-built HTML/SVG "interface studies"**, labelled as such. They are not screenshots or live data — don't caption them as real.
- **Client work:** ThirdSpace Play (tournament.pavithranm.in, a badminton tournament platform, project 02, `.tsp-*` mockup with made-up team labels, never real player names) sits alongside Frame OF Love.
- **Client work (Frame OF Love, frameoflove.co.in)** is project 01 and the first featured block on the homepage. Its mockup (`.fol-*` classes, end of `style.css`) uses gradient placeholders, not the client's photos — don't copy the studio's images into this repo. Its footer credits "P12" with a link back here.

## Theming

- Colour tokens live on `:root` (light) and `[data-theme=dark]` at the top of `style.css`. Use the variables (`--bg`, `--surface`, `--text`, `--muted`, `--line`, `--accent`), never hard-coded colours, for anything that should follow the theme.
- A tiny inline `<script>` in each page's `<head>` sets `data-theme` before paint to avoid a flash. If you change theme logic, change it in **both** pages' head script **and** `main.js`.
- There are two `theme-color` metas (with `media="(prefers-color-scheme: …)"`) so the browser bar is right before JS runs; `main.js` sets both to the chosen theme (`#f6f4ee` light / `#1c201d` dark).

## Text size

- Readable text has a floor of **11px** (mono uppercase labels) and **12px** (everything else), including inside media queries.
- Smaller sizes are only OK inside the decorative, `aria-hidden` project mockups (`.visual-topline`, `.mock-label`, `.calendar-*`, `.weather-forecast`, `.workflow-line`, etc.), which are illustrations.

## Things that are duplicated (edit in every place)

There's no templating, so these are copy-pasted between `index.html` and `projects.html`:

- `<head>` meta block, theme script, font preload, icons, `theme-color` metas
- Header / nav / theme + menu buttons (also in `404.html`)
- Contact section and footer (footer also in `404.html`)
- The Frame OF Love, InOfficeIQ, Weather and ReadmePacman visual mockups (homepage cards and archive case studies)

When changing any of these, grep both files and update both.

## Adding a project

1. In `projects.html`, add an `<article class="case-study" id="<slug>" data-category="client|tools|experiments|web">` following an existing one (visual + `case-copy` with `dl.case-notes`).
2. Renumber the `01 / …` eyebrows and the number in each `.visual-topline`, and update the static count text in `.filter-count` (`07 projects / the whole collection`) — JS recalculates it, but the no-JS fallback is hard-coded.
3. Optionally feature it on `index.html` in `#projects`.
4. Update the meta description of `projects.html` if it lists project names.
5. **Verify every demo/repo URL in a browser before committing.** GitHub Pages repo paths are case-sensitive (`Weatherapp`, `Sorting-hat`, `InOfficeIQ`). Never guess a URL from a display name. Record verified URLs in `PORTFOLIO.md`.

## SEO / metadata

- Canonical URL, `og:url`, JSON-LD, `robots.txt`, `sitemap.xml` and `CNAME` must all agree on `https://pavithranm.in`.
- JSON-LD (`Person` + `WebSite`) lives only in `index.html`. `jobTitle` is the actual title (Software Analyst); "Full Stack Developer" is the visible positioning line. Keep `jobTitle`, `worksFor` and `sameAs` in sync with LinkedIn.
- Bump `<lastmod>` in `sitemap.xml` when page content changes meaningfully.

## Content facts (source of truth is the visible site)

- Current role: Software Analyst at Agilysys (Dec 2025 – present), working on .NET (ASP.NET Core) + Angular + SQL Server. Previously Technology Analyst at Infosys (Apr 2022 – Dec 2025).
- Based in Chennai. B.Tech IT, KGiSL Institute of Technology, 2019.
- Contact email shown on the site and in the privacy policy: pavi.12.pavi@gmail.com. WhatsApp: +91 97896 12615, linked as `https://wa.me/919789612615` (contact sections, support page, CV).
- Footer on every page: © · Privacy · Support my dream. If you add or change a payment, contact or tracking method, update `privacy-policy.html` and its date too.

## Updating the CV

1. Edit `cv/index.html` (content and styles live there). Keep it to **one A4 page** and keep the text real (no images of text) so applicant-tracking systems can read it.
2. Regenerate the PDF: open `cv/index.html` from a local server in Chrome → Print → Save as PDF, paper **A4**, margins **None**, **Background graphics** on. Save over `assets/Pavithran-M-CV.pdf`.
3. Check it's still one page and that the site's experience section and the CV agree (dates, titles, awards).

## Deploying

Commit and push to `main` → GitHub Pages publishes automatically. Check https://pavithranm.in after a minute or two. Don't touch `CNAME` casually; deleting it unbinds the domain (git history shows this happened several times).

## Before you finish a change

- Open both pages locally in light **and** dark theme, at desktop and ~375px width.
- Tab through the page with the keyboard; the menu should close on `Esc`.
- Check the page still reads correctly with JavaScript disabled.
- No console errors.
- After pushing, check the **Site checks** workflow on GitHub is green.
