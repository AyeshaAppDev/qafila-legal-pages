/**
 * One-time / optional sync from nexgenztech-website (does not modify source).
 * Run from repo root: node scripts/sync-content-from-source.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcDir = path.join(root, '..', 'nexgenztech-website', 'qafila-legal', 'content');

function exportBody(filename, outName, replacements) {
  let text = fs.readFileSync(path.join(srcDir, filename), 'utf8');
  text = text.replace(/<\?php[\s\S]*?\?>/g, '').trim();
  for (const [from, to] of replacements) {
    text = text.split(from).join(to);
  }
  fs.writeFileSync(path.join(root, 'content', outName), text, 'utf8');
  console.log('Synced', outName);
}

exportBody('privacy.php', 'privacy.body.html', [
  ['href="/account-deletion/"', 'href="../account-deletion/"'],
]);
exportBody('account-deletion.php', 'account-deletion.body.html', [
  ['href="/privacy/"', 'href="../privacy/"'],
]);
