/**
 * Minimal local emulation of how Vercel serves `dist/` with this project's vercel.json, so SEO
 * checks can verify real HTTP behaviour (status codes, redirects, soft 404s, headers) before a
 * deploy. Emulated, in Vercel's order: trailing-slash strip (trailingSlash:false) → redirects →
 * filesystem → rewrites → 404.html with status 404. It is a test harness, not a production server.
 */
import { createServer, type Server } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

interface VercelConfig {
  redirects?: { source: string; destination: string; permanent?: boolean }[];
  rewrites?: { source: string; destination: string }[];
  headers?: { source: string; headers: { key: string; value: string }[] }[];
}

const CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
};

/** Converts a Vercel source pattern ("/admin/(.*)", "/services/:id") to an anchored RegExp. */
function sourceToRegExp(source: string): RegExp {
  const pattern = source
    .replace(/\(\.\*\)|:\w+\*/g, '__ANY__')
    .replace(/:\w+/g, '__SEGMENT__')
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/__ANY__/g, '.*')
    .replace(/__SEGMENT__/g, '[^/]+');
  return new RegExp(`^${pattern}$`);
}

export function startDistServer(port = 4180): Promise<{ server: Server; baseUrl: string }> {
  const frontendDir = fileURLToPath(new URL('../..', import.meta.url));
  const distDir = join(frontendDir, 'dist');
  const config = JSON.parse(readFileSync(join(frontendDir, 'vercel.json'), 'utf8')) as VercelConfig;
  const redirects = (config.redirects ?? []).map((r) => ({ ...r, re: sourceToRegExp(r.source) }));
  const rewrites = (config.rewrites ?? []).map((r) => ({ ...r, re: sourceToRegExp(r.source) }));
  const headerRules = (config.headers ?? []).map((h) => ({ ...h, re: sourceToRegExp(h.source) }));

  function fileFor(urlPath: string): string | undefined {
    const candidate = normalize(join(distDir, decodeURIComponent(urlPath)));
    if (!candidate.startsWith(distDir)) return undefined;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
    return undefined;
  }

  const server = createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const path = url.pathname;
    const send = (status: number, file: string, extra: Record<string, string> = {}) => {
      const headers: Record<string, string> = { 'Content-Type': CONTENT_TYPES[extname(file)] ?? 'application/octet-stream', ...extra };
      for (const rule of headerRules) {
        if (rule.re.test(path)) for (const h of rule.headers) headers[h.key] = h.value;
      }
      res.writeHead(status, headers);
      res.end(req.method === 'HEAD' ? undefined : readFileSync(file));
    };

    if (path.length > 1 && path.endsWith('/')) {
      res.writeHead(308, { Location: path.replace(/\/+$/, '') + url.search });
      res.end();
      return;
    }
    const redirect = redirects.find((r) => r.re.test(path));
    if (redirect) {
      res.writeHead(redirect.permanent === false ? 307 : 308, { Location: redirect.destination });
      res.end();
      return;
    }
    const direct = path === '/' ? undefined : fileFor(path);
    if (direct) return send(200, direct);
    const rewrite = rewrites.find((r) => r.re.test(path));
    if (rewrite) {
      const target = fileFor(rewrite.destination);
      if (target) return send(200, target);
    }
    send(404, join(distDir, '404.html'));
  });

  return new Promise((resolvePromise) => {
    server.listen(port, '127.0.0.1', () => {
      resolvePromise({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  void startDistServer(Number(process.env.PORT ?? 4180)).then(({ baseUrl }) => {
    console.log(`[serve-dist] Serving dist/ with vercel.json routing at ${baseUrl}`);
  });
}
