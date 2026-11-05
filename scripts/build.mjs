/**
 * Build static HTML for GitHub Pages (project site base: /qafila-legal-pages/).
 * Run: node scripts/build.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

/** Production canonical URLs (Play / nexgenztech.com). */
const CANONICAL_ORIGIN = 'https://nexgenztech.com';

/** GitHub Pages project site (for optional og:url in README; canonical stays nexgenztech.com). */
const GITHUB_PAGES_BASE = '/qafila-legal-pages';

function layoutStart({ pageTitle, metaDescription, canonicalPath, cssHref }) {
  const canonicalUrl = `${CANONICAL_ORIGIN}${canonicalPath}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${pageTitle} | NexGenZ Tech</title>
  <meta name="description" content="${metaDescription}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="robots" content="index,follow">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${cssHref}">
</head>
<body class="qafila-legal-page">
<header class="ngz-site-header" role="banner">
  <div class="ngz-header-inner">
    <a class="ngz-logo" href="https://nexgenztech.com/" title="NexGenZ Tech">
      <img src="https://nexgenztech.com/wp-content/uploads/2026/01/nexgenztech-logo-no-bg-05.png" alt="NexGenZ Tech" width="180" height="48">
    </a>
    <nav aria-label="Primary">
      <ul class="ngz-nav">
        <li><a href="https://nexgenztech.com/">Home</a></li>
        <li><a href="https://nexgenztech.com/services/">What We Do</a></li>
        <li><a href="https://nexgenztech.com/#contact">Contact Us</a></li>
      </ul>
    </nav>
  </div>
</header>
<main class="qafila-legal-main">
`;
}

const layoutEnd = `</main>
<footer class="ngz-site-footer" role="contentinfo">
  <div class="ngz-footer-inner">
    <div>
      <strong>NexGenZ Tech</strong><br>
      G-11 Markaz, Islamabad, Pakistan · <a href="mailto:infonexgenztech@gmail.com">infonexgenztech@gmail.com</a>
    </div>
    <div>© ${new Date().getFullYear()} NexGenZ Tech — Qafila legal information</div>
  </div>
</footer>
</body>
</html>
`;

const pages = [
  {
    slug: 'privacy',
    pageTitle: 'Privacy Policy',
    metaDescription:
      'Privacy Policy for the Qafila Hajj and Umrah companion app, offered by NexGenZ Tech. Effective July 2025.',
    canonicalPath: '/privacy/',
    bodyFile: 'privacy.body.html',
  },
  {
    slug: 'account-deletion',
    pageTitle: 'Delete Your Qafila Account',
    metaDescription:
      'How to request deletion of your Qafila account and associated data. NexGenZ Tech.',
    canonicalPath: '/account-deletion/',
    bodyFile: 'account-deletion.body.html',
  },
];

for (const page of pages) {
  const body = fs.readFileSync(path.join(root, 'content', page.bodyFile), 'utf8');
  const html =
    layoutStart({
      ...page,
      cssHref: '../assets/qafila-legal.css',
    }) +
    body +
    layoutEnd;
  const outDir = path.join(root, page.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  console.log('Built', `${page.slug}/index.html`);
}

const hubHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Qafila Legal Pages | NexGenZ Tech</title>
  <meta name="description" content="Privacy Policy and account deletion information for the Qafila app.">
  <meta name="robots" content="noindex,follow">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/qafila-legal.css">
</head>
<body class="qafila-legal-page">
<header class="ngz-site-header"><div class="ngz-header-inner">
  <a class="ngz-logo" href="https://nexgenztech.com/"><img src="https://nexgenztech.com/wp-content/uploads/2026/01/nexgenztech-logo-no-bg-05.png" alt="NexGenZ Tech" width="180" height="48"></a>
</div></header>
<main class="qafila-legal-main qafila-legal-hero">
  <h1>Qafila legal pages</h1>
  <p class="subtitle">Static pages for Google Play and user reference</p>
  <ul>
    <li><a href="privacy/">Privacy Policy</a> (effective July 2025)</li>
    <li><a href="account-deletion/">Delete Your Qafila Account</a></li>
  </ul>
</main>
<footer class="ngz-site-footer"><div class="ngz-footer-inner">
  <div><strong>NexGenZ Tech</strong><br>G-11 Markaz, Islamabad, Pakistan</div>
</div></footer>
</body>
</html>`;

fs.writeFileSync(path.join(root, 'index.html'), hubHtml, 'utf8');
console.log('Built index.html (navigation hub)');
