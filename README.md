# qafila-legal-pages

Static **Privacy Policy** and **Account Deletion** pages for the **Qafila** Hajj/Umrah app, offered by **NexGenZ Tech**.

| Page | Path |
|------|------|
| Privacy Policy (effective **July 2025**) | `/privacy/` |
| Delete Your Qafila Account | `/account-deletion/` |

**Contact:** infonexgenztech@gmail.com  
**Address:** G-11 Markaz, Islamabad, Pakistan  
**Website:** https://nexgenztech.com/

Canonical URLs for store listings point to **https://nexgenztech.com/privacy/** and **https://nexgenztech.com/account-deletion/** when hosted on the main domain. This repository is suitable for **GitHub Pages** staging or mirror hosting under `AyeshaAppDev/qafila-legal-pages`.

---

## Repository layout

```
qafila-legal-pages/
  .nojekyll                 # Disable Jekyll on GitHub Pages
  index.html                # Hub links (not a third legal document)
  assets/qafila-legal.css
  content/                  # HTML body sources (edit + rebuild)
  privacy/index.html
  account-deletion/index.html
  scripts/build.mjs
  scripts/sync-content-from-source.mjs
```

---

## Local preview

From the repository root:

```bash
node scripts/build.mjs
npx serve . -l 4321
```

Open:

- http://localhost:4321/privacy/
- http://localhost:4321/account-deletion/

**Simulate GitHub Pages base path** (optional): paths are relative, so the same files work under  
`https://ayeshaappdev.github.io/qafila-legal-pages/privacy/` without code changes.

---

## Edit content

1. Edit `content/privacy.body.html` or `content/account-deletion.body.html`, **or** sync from the NexGenZ website source (does not modify that project):

   ```bash
   node scripts/sync-content-from-source.mjs
   ```

   Requires sibling folder: `../nexgenztech-website/qafila-legal/content/`.

2. Rebuild:

   ```bash
   node scripts/build.mjs
   ```

3. Preview with `npx serve` as above.

---

## Deploy to GitHub Pages (`AyeshaAppDev/qafila-legal-pages`)

This project is **not** pushed automatically. After you create the empty repo on GitHub:

```bash
git init
git add .
git commit -m "Add Qafila privacy and account deletion pages"
git branch -M main
git remote add origin https://github.com/AyeshaAppDev/qafila-legal-pages.git
git push -u origin main
```

In GitHub: **Settings → Pages → Build and deployment**

- **Source:** Deploy from a branch  
- **Branch:** `main`  
- **Folder:** `/ (root)`

Published URLs:

- https://ayeshaappdev.github.io/qafila-legal-pages/privacy/
- https://ayeshaappdev.github.io/qafila-legal-pages/account-deletion/

Run `node scripts/build.mjs` before each deploy if you changed `content/*.body.html`.

---

## Routing notes

| Topic | Detail |
|-------|--------|
| **Trailing slash** | Use `/privacy/` and `/account-deletion/` (folder + `index.html`). URLs without a trailing slash may behave differently on static hosts. |
| **Direct refresh** | Works for folder URLs above on GitHub Pages. |
| **Assets** | CSS uses relative `../assets/qafila-legal.css` from each page folder — valid for any subpath including `/qafila-legal-pages/`. |
| **Cross-links** | Privacy ↔ deletion use relative `../privacy/` and `../account-deletion/`. |
| **Custom domain** | To serve at `nexgenztech.com/privacy/`, point DNS or reverse-proxy to this content or copy files to your main host; update canonical tags in `scripts/build.mjs` only after approved URL change. |

---

## License / legal

Content is prepared for Qafila / NexGenZ Tech. Do not change legal text without owner approval.
