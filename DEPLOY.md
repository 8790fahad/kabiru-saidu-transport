# Deploy to Hostinger (GitHub Actions + FTPS)

This repo deploys the Vite build output (`dist/`) to Hostinger over **FTPS** when you push to **`main`** or **`mf`**, or when you run the workflow manually (**Actions → Deploy React Frontend to Hostinger → Run workflow**).

## GitHub repository secrets

In the repo: **Settings → Secrets and variables → Actions → New repository secret**, add:

| Secret | Value |
|--------|--------|
| `FTP_HOST_MF` | FTP hostname from Hostinger (e.g. `ftp.yourdomain.com` or the IP they give you) |
| `FTP_USERNAME_MF` | FTP username |
| `FTP_PASSWORD_MF` | FTP password |

These names must match what `.github/workflows/deploy.yml` expects.

## Hostinger panel

- Upload target is **`server-dir: /`** in the workflow, which is relative to the FTP user’s home (often `public_html` maps as `/` for that user). If your files must go into a subfolder, change `server-dir` in `deploy.yml` (e.g. `/public_html/` or `/subfolder/` — check Hostinger’s doc for your plan).

## After switching from GitHub Pages

In GitHub: **Settings → Pages** → set **Source** to **None** (or disable Pages) so you are not publishing the same site twice.

## Domain

Point your domain’s DNS to **Hostinger** as they document (nameservers or A/CNAME). No GitHub Pages DNS records are required for this setup.

## Build path (`base`)

`vite.config.ts` uses `base: '/'` for hosting at the domain root. If you deploy under a subpath, set `base` to that path (e.g. `'/app/'`).
