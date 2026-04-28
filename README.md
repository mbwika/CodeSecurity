# Code & Security Website

One-page cybersecurity consulting website built with React + Vite + Tailwind CSS.

## Stack

- React (JavaScript)
- Vite
- Tailwind CSS
- Formspree (`EmailUS`) + Cloudflare Turnstile
- Cloudflare Pages deployment
- Nginx production config (HTTPS-ready with Let's Encrypt paths)

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from `.env.example` and fill in real values:
   ```bash
   cp .env.example .env
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```

## Environment Variables

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
VITE_TURNSTILE_SITE_KEY=YOUR_TURNSTILE_SITE_KEY
VITE_LINKEDIN_URL=https://www.linkedin.com/in/your-profile
VITE_X_URL=https://x.com/your-handle
VITE_GITHUB_URL=https://github.com/your-handle
```

## Formspree + Turnstile Setup

1. Create a form in Formspree and copy the endpoint (`https://formspree.io/f/...`) to `VITE_FORMSPREE_ENDPOINT`.
2. In Cloudflare Turnstile, create a widget and allow:
   - `codensecurity.com`
   - `www.codensecurity.com`
   - `localhost`
3. Add Turnstile site key to `VITE_TURNSTILE_SITE_KEY`.
4. In Formspree form settings, enable CAPTCHA and select Cloudflare Turnstile, then paste your Turnstile secret key.
5. In Formspree, enable auto-response so clients receive confirmation text after form submission.
6. Set destination email in Formspree to `consulting@codensecurity.com`.

## Cloudflare Pages Deployment

In Cloudflare Pages project settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variables: same values from `.env`
- Production branch: `main` (or your chosen branch)

`public/_redirects` and `public/_headers` are included for SPA routing and security headers.

## Nginx Deployment

Use [deploy/nginx/codensecurity.com.conf](/C:/Users/colli/OneDrive/Documents/New%20project/deploy/nginx/codensecurity.com.conf) on your server. It includes:

- HTTP to HTTPS redirect
- Let's Encrypt cert paths
- SPA fallback to `/index.html`
- direct routes for `/privacy-policy.html` and `/terms.html`

Build and copy `dist/` to your server root (`/var/www/codensecurity/dist` in the example config).
