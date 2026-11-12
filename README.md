# EasyServe Online Centre

Website for EasyServe, a service centre in Nallamkallu, Edakkazhiyur that prepares and files
government certificates and online applications.

- Public site: services, the documents each one needs (English and Malayalam), WhatsApp enquiry
- Customer accounts: raise a request and follow its status
- Admin dashboard: review requests, set status, leave a note for the customer
- Terms, privacy policy, cookie consent
- SEO: per-page metadata, sitemap, robots, structured data, Open Graph image

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS 4.

## Run it locally

Needs Node.js 22.18 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in SESSION_SECRET and the admin details
npm run create-admin
npm run dev
```

Open http://localhost:3000.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public address of the site. Used for canonical URLs, the sitemap and structured data. |
| `SESSION_SECRET` | Signs login sessions. At least 32 random characters (`openssl rand -base64 48`). |
| `DATABASE_URL`, `DATABASE_AUTH_TOKEN` | Optional. Hosted libSQL / Turso database. Without them the app uses a local file, `data/easyserve.db`. |
| `ADMIN_NAME`, `ADMIN_PHONE`, `ADMIN_PASSWORD` | Read by `npm run create-admin`. Run it again with a new password to reset it. |
| `NEXT_PUBLIC_GA_ID` | Optional. Google Analytics 4 ID. Loads only after a visitor accepts all cookies. |

## Where things live

| Path | What |
| --- | --- |
| `src/content/services.ts` | Every service, its options and its document list. Edit this to add or change a service. |
| `src/lib/site.ts` | Phone number, WhatsApp number, address, Instagram link. |
| `src/app/page.tsx` | Home page. |
| `src/app/services/` | Services index and the page for each service. |
| `src/app/account/`, `src/app/admin/` | Customer and admin dashboards. |
| `src/app/actions/` | Login, registration and request actions. |
| `src/app/terms/`, `src/app/privacy/` | Legal pages. |
| `src/components/CookieConsent.tsx` | Cookie banner and analytics loader. |

### Adding a service

Add an entry to `services` in `src/content/services.ts`. It then appears on the home page, the
services page, the footer, the sitemap and the customer request form, and gets its own page at
`/services/<slug>`. Set `listPending: true` when the document list is not confirmed yet; the page
then asks people to message for the list instead of showing one.

## Database

**Not set up yet. To be provided later.** Until then the app runs on a local file,
`data/easyserve.db`, which is created on first run and is not in git. That is enough for
development and for trying the login features on one machine.

The public pages (home, services, terms, privacy) do not use the database at all. Only customer
accounts, requests and the admin dashboard do.

### What the database holds

| Table | Contents |
| --- | --- |
| `users` | Customer and admin accounts: name, phone, hashed password, role. |
| `requests` | Requests raised by customers: service, note, status, staff note. |

Tables are created automatically on first connection (see `src/lib/schema.ts`). There is nothing
to migrate by hand.

### Connecting a real database later

The app speaks libSQL, so any hosted libSQL database works. With [Turso](https://turso.tech):

1. Create a database in the Turso dashboard (pick a region close to India, such as Mumbai).
2. Copy its URL (`libsql://<name>-<org>.turso.io`) and create an auth token for it.
3. Set these two variables on the host (and in `.env.local` if you want to use it locally):

   ```
   DATABASE_URL=libsql://<name>-<org>.turso.io
   DATABASE_AUTH_TOKEN=<token>
   ```

4. Create the admin account in that database:

   ```bash
   npm run create-admin
   ```

Nothing in the code needs to change. Accounts in the local file are not copied across, so
customers register again on the live site.

## Deploying

The site needs a Node.js host (for example Vercel) because of the login features. Serverless hosts
have a read-only filesystem, so the local file database will not work there: connect a hosted
database first (see [Database](#database)).

Set on the host:

1. `NEXT_PUBLIC_SITE_URL`: the real domain, no trailing slash.
2. `SESSION_SECRET`: a fresh value, not the one from your laptop.
3. `DATABASE_URL` and `DATABASE_AUTH_TOKEN`: from the database step above.
4. Optionally `NEXT_PUBLIC_GA_ID` for analytics.

Login attempts are rate limited in memory (five failures in fifteen minutes per number). On
serverless hosting, add the host's own rate limiting as well.

## Still to set up

- [ ] Hosted database (`DATABASE_URL`, `DATABASE_AUTH_TOKEN`)
- [ ] Domain name (`NEXT_PUBLIC_SITE_URL`)
- [ ] Hosting account and production `SESSION_SECRET`
- [ ] Admin account on the live database (`npm run create-admin`)
- [ ] Google Analytics ID, if wanted (`NEXT_PUBLIC_GA_ID`)

## Before going live

- Have the terms and privacy policy reviewed. The refund rules and the 90-day document retention
  period in them are placeholders for the owner to confirm.
- Replace `public/brand/easyserve-logo.jpg` (150 px, taken from the Instagram profile) with the
  original logo file.
- Confirm document lists for the services marked `listPending`.
