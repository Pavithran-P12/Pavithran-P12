# Personal portfolio

## Run locally

This is a static GitHub Pages website. No application dependencies or build step are required.

```sh
python3 -B -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080/`. Both `index.html` and `projects.html` work without JavaScript; JavaScript progressively adds theme persistence, mobile navigation, scroll reveals, and project filters.

## Design and content

- The homepage leads with identity and selected work, followed by capabilities, experience, personal background, supporting credentials, and contact.
- Project illustrations are deliberately labelled interface/visual studies. They are not screenshots or live data.
- Manrope and DM Mono are self-hosted WOFF2 files. Font license texts are included in `assets/`.
- The SVG social-preview source is editable; the PNG is its generated 1200 × 630 social-media version.
- Useful historical anchors (`#projects`, `#skills`, `#experience`, `#about`, `#certifications`, `#awards`, `#stats`, and `#contributions`) remain available.
- The website privacy policy (`privacy-policy.html`), Google verification files, and InOfficeIQ redirect remain accessible at their existing paths.

## Domain and link maintenance

The current custom domain is `pavithranm.in`. `CNAME`, canonical metadata, structured data, robots, and the sitemap agree on this domain. Local assets and internal page links are relative so they also work under a GitHub Pages project path.

Projects shown on the site (verified live):

| Project | URL |
| --- | --- |
| Frame OF Love (client) | https://frameoflove.co.in/ |
| ThirdSpace Play (client) | https://tournament.pavithranm.in/ |
| This portfolio | https://pavithranm.in/ |

Only projects on their own domains are listed. Links to `*.github.io` project pages, GitHub repositories and the GitHub profile were removed on 23 Oct 2026 so visitors can't find the public source code from the site. The old `/InOfficeIQ/` path now redirects to `projects.html`.

External social platforms may block automated checks; verify these in a normal browser when updating account handles. Never guess a project path from a display name—repository names and capitalization matter.
