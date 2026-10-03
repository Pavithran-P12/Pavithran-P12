# Personal portfolio

## Run locally

This is a static GitHub Pages website. No application dependencies or build step are required.

```sh
python3 -B -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080/`. Both `index.html` and `projects.html` work without JavaScript; JavaScript progressively adds theme persistence, mobile navigation, scroll reveals, and project filters.

## Design and content

- The homepage leads with identity and selected work, followed by capabilities, experience, personal background, supporting credentials, and contact.
- The project archive retains all five original projects and links to the Financial Planner from the existing README.
- Project illustrations are deliberately labelled interface/visual studies. They are not screenshots or live data.
- InOfficeIQ is described according to its public repository and deployed calendar application: HTML, CSS, and JavaScript. Professional Angular/.NET/SQL experience remains in the capabilities and journey sections.
- Manrope and DM Mono are self-hosted WOFF2 files. Font license texts are included in `assets/`.
- The SVG social-preview source is editable; the PNG is its generated 1200 × 630 social-media version.
- Useful historical anchors (`#projects`, `#skills`, `#experience`, `#about`, `#certifications`, `#awards`, `#stats`, and `#contributions`) remain available.
- The Nocturne app privacy policy, Google verification files, and InOfficeIQ redirect remain accessible at their existing paths.

## Domain and link maintenance

The current custom domain is `pavithranm.in`. `CNAME`, canonical metadata, structured data, robots, and the sitemap agree on this domain. Local assets and internal page links are relative so they also work under a GitHub Pages project path.

Verified legacy-destination replacements:

| Intended destination | Verified URL |
| --- | --- |
| InOfficeIQ demo | https://pavithran-p12.github.io/InOfficeIQ/ |
| Weather App demo | https://pavithran-p12.github.io/Weatherapp/ |
| Sorting Hat demo | https://pavithran-p12.github.io/Sorting-hat/ |
| Portfolio entry point | https://pavithran-p12.github.io/Pavithran-P12/ |
| Financial Planner | https://pavithran-p12.github.io/Financial-Planner/ |

The bare GitHub Pages user root returns 404. The portfolio repository path above redirects to the current custom domain and is used for the legacy website link in the app privacy policy. The old nonexistent portrait reference has been replaced with a newly created social identity graphic. The projects metadata now points to the actual `projects.html` route.

External social platforms may block automated checks; verify these in a normal browser when updating account handles. Never guess a project path from a display name—repository names and capitalization matter.
