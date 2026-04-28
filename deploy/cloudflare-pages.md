# Cloudflare Pages Deployment Guide

## 1) Push to GitHub

Push this project to your repository.

## 2) Create Cloudflare Pages Project

In Cloudflare Dashboard:

1. Go to **Workers & Pages**.
2. Select **Create application** -> **Pages** -> **Connect to Git**.
3. Choose your GitHub repository.

## 3) Build Settings

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `18` or newer

## 4) Environment Variables

Add these in Pages project settings:

- `VITE_FORMSPREE_ENDPOINT` = `https://formspree.io/f/your-form-id`
- `VITE_TURNSTILE_SITE_KEY` = `YOUR_TURNSTILE_SITE_KEY`
- `VITE_LINKEDIN_URL` = `https://www.linkedin.com/in/your-profile`
- `VITE_X_URL` = `https://x.com/your-handle`
- `VITE_GITHUB_URL` = `https://github.com/your-handle`

## 5) Turnstile Domain Allowlist

In Cloudflare Turnstile widget settings, allow:

- `codensecurity.com`
- `www.codensecurity.com`
- `localhost`

## 6) Attach Custom Domain

Add `codensecurity.com` (and optionally `www.codensecurity.com`) in Pages custom domains.

## 7) DNS

Set Cloudflare DNS records according to Pages instructions and verify the domain.
