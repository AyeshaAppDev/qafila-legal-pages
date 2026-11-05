# GitHub-ready project report — qafila-legal-pages

**Date:** 2026-11-05  
**Intended repo:** https://github.com/AyeshaAppDev/qafila-legal-pages  
**Source (read-only):** `../nexgenztech-website/qafila-legal/`

**Not performed:** `git init` commit, push, GitHub repo creation, production deploy.

---

## Standalone project path

`d:\FAMSkill\SMM MINE\post\projects\saudia proejcts\nexgenz agency\qafila-legal-pages\`

---

## Final folder structure

```
qafila-legal-pages/
  .gitignore
  .nojekyll
  README.md
  GITHUB_PROJECT_REPORT.md
  index.html
  assets/
    qafila-legal.css
  content/
    privacy.body.html
    account-deletion.body.html
  privacy/
    index.html
  account-deletion/
    index.html
  scripts/
    build.mjs
    sync-content-from-source.mjs
```

---

## Local preview

```bash
cd qafila-legal-pages
node scripts/build.mjs
npx serve . -l 4321
```

- Privacy: http://localhost:4321/privacy/
- Deletion: http://localhost:4321/account-deletion/

---

## GitHub Pages deployment

1. Create repository **qafila-legal-pages** under **AyeshaAppDev** (empty, no README on GitHub to avoid merge conflict — or pull after push).
2. Push this folder’s contents to `main`.
3. Enable **Pages** → branch **main**, folder **/ (root)**.
4. Live URLs:
   - https://ayeshaappdev.github.io/qafila-legal-pages/privacy/
   - https://ayeshaappdev.github.io/qafila-legal-pages/account-deletion/

---

## Build verification (local)

| Check | Result |
|-------|--------|
| `node scripts/sync-content-from-source.mjs` | OK |
| `node scripts/build.mjs` | OK |
| Relative CSS `../assets/qafila-legal.css` | Present in both pages |
| Cross-links `../privacy/` / `../account-deletion/` | Present |
| `[PLACEHOLDER:` in built HTML | None expected (final content) |
| Original `nexgenztech-website` | Unmodified by sync (read-only read) |

---

## Routing limitations

1. **Project site prefix:** GitHub Pages serves at `/qafila-legal-pages/` — relative asset and page links account for this automatically.
2. **Root hub:** `index.html` at repo root is a **navigation hub only** (links to the two legal pages), not additional legal content.
3. **Canonical URLs:** HTML `<link rel="canonical">` still points to **https://nexgenztech.com/privacy/** and **/account-deletion/** for Play-aligned production URLs; GitHub Pages URL is a staging/mirror unless you add a custom domain.
4. **Extensionless URLs:** `/privacy` without trailing slash may 404 on static hosts; prefer `/privacy/`.
5. **No server-side routing:** Pure static files — no PHP, no client-side router; refresh works per-directory via `index.html`.
6. **Logo:** Header loads logo from nexgenztech.com CDN (requires network); offline preview shows alt text if blocked.

---

## Content preserved

- Final approved legal text from `nexgenztech-website/qafila-legal/content/*.php`
- NexGenZ dark theme CSS, responsive layout, header/footer, SEO title + description
- July 2025 effective date, G-11 Markaz address, infonexgenztech@gmail.com
