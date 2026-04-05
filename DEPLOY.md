# GitHub Pages & custom domain

## One-time GitHub setup

1. Open the repo on GitHub: **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”). If you do not see this option, ensure the repository is **public** (or you are on a plan that allows private Pages).
3. Push to `main` (or run the workflow manually: **Actions → Deploy to GitHub Pages → Run workflow**). The workflow **Deploy to GitHub Pages** builds with Vite and publishes the `dist` folder.
4. After the first successful run, open **Settings → Pages** again — GitHub shows the live URL. For this project it should be:

   `https://8790fahad.github.io/kabiru-saidu-transport/`

5. If the first deploy fails with a **permissions** or **environment** error, open **Settings → Actions → General**, scroll to **Workflow permissions**, and choose **Read and write permissions** (or ensure **Allow GitHub Actions to create and approve pull requests** is set as needed for your org). Re-run the failed workflow.

**Project layout:** `vite.config.ts` sets `base` to `/kabiru-saidu-transport/` only for production builds so asset URLs work under Project Pages. If you rename the GitHub repository, update `GITHUB_PAGES_BASE` to match (`/<repo-name>/`).

**Static hosting:** `public/.nojekyll` is copied into `dist` so GitHub Pages does not run Jekyll on the site (avoids edge cases with `_` paths). The workflow uses `include-hidden-files: true` so `.nojekyll` is included in the uploaded artifact.

---

## Buying a domain

You can register a name from any accredited registrar. Common options:

| Provider | Notes |
|----------|--------|
| [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) | Often at-cost pricing; good DNS if you also use Cloudflare |
| [Namecheap](https://www.namecheap.com/) | Straightforward UI, frequent promos |
| [Google Domains](https://domains.google/) | (If available in your region) |
| Local / African registrars | Search “domain registration Nigeria” if you want `.ng` or local support |

Steps are usually the same everywhere:

1. Search for a name (e.g. `kabirusaidulogistics.com`).
2. Add to cart and pay for **1+ years** (you must renew before expiry).
3. Complete **WHOIS** contact info (privacy is often included).
4. After purchase, you control **DNS** for that domain at the registrar (or Cloudflare if you move DNS there).

---

## Pointing your domain at GitHub Pages

You have two common patterns.

### A) Apex domain (`yourdomain.com`)

In your DNS (registrar or Cloudflare):

| Type | Name | Value |
|------|------|--------|
| **A** | `@` | `185.199.108.153` |
| **A** | `@` | `185.199.109.153` |
| **A** | `@` | `185.199.110.153` |
| **A** | `@` | `185.199.111.153` |

(These are GitHub’s documented IPs; they can change—check [GitHub Pages custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for the latest.)

### B) Subdomain (`www.yourdomain.com`)

| Type | Name | Value |
|------|------|--------|
| **CNAME** | `www` | `8790fahad.github.io` |

Use your **GitHub username** in the CNAME target, not the repo name.

### In the GitHub repo

1. **Settings → Pages → Custom domain** — enter `yourdomain.com` or `www.yourdomain.com`.
2. Wait for DNS checks to pass (can take a few minutes to 48 hours).
3. Optionally enable **Enforce HTTPS** once GitHub provisions a certificate.

### Vite: use the site at the domain root

GitHub will serve your site at `https://yourdomain.com/` (root path). You must **not** use the `/kabiru-saidu-transport/` base in production anymore.

In `vite.config.ts`, set:

```ts
const GITHUB_PAGES_BASE = '/'
```

Commit and push so the next build outputs assets with root-relative URLs.

Optional: add a `public/CNAME` file containing only your hostname (e.g. `www.yourdomain.com`) if you want the domain stored in the repo—GitHub can also manage this from the UI only.

---

## Quick checklist

- [ ] Pages **Source** = GitHub Actions  
- [ ] Workflow run succeeded on `main`  
- [ ] `GITHUB_PAGES_BASE` matches deployment (repo path vs `/` for custom domain)  
- [ ] DNS A/CNAME records point to GitHub  
- [ ] Custom domain saved under **Settings → Pages**  
- [ ] **Enforce HTTPS** after certificate is ready  

For official detail, see: [GitHub Pages documentation](https://docs.github.com/en/pages).
