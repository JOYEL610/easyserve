# EasyServe website

This is the website for EasyServe Online Centre in Nallamkallu, Edakkazhiyur.

**Live site: https://easyserve-one.vercel.app**

This is the free Vercel address. It will change to your own domain once you connect one. See
"Connecting your own domain" below.

EasyServe helps people get government papers done. Things like ration cards, income
certificates and PAN cards.

## What the website does

- Shows every service EasyServe offers.
- Shows which papers you need to bring for each service.
- Is in English. One button at the top switches it to Malayalam.
- Has an "Enquire now" button. It opens WhatsApp so people can message EasyServe.
- Lets customers make an account and see how their work is going.
- Lets EasyServe staff log in and update each customer's work.
- Has a terms page, a privacy page and a cookie pop-up.
- Is built so Google can find it easily.

## How to run it on your computer

You need Node.js version 22.18 or newer. Get it from https://nodejs.org.

Type these in the terminal, one at a time:

```bash
npm install
```

```bash
cp .env.example .env.local
```

Now open the file `.env.local` and fill it in. The next part tells you how.

```bash
npm run create-admin
```

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## The settings file

The file `.env.local` holds your settings. It stays on your computer. It never goes to GitHub.

| Setting | What it is for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your website address. Like `https://yourdomain.com`. |
| `SESSION_SECRET` | A long secret word that keeps logins safe. Make one with `openssl rand -base64 48`. |
| `ADMIN_NAME` | The name of the staff account. |
| `ADMIN_PHONE` | The phone number staff log in with. |
| `ADMIN_PASSWORD` | The password staff log in with. Use 12 letters or more. |
| `DATABASE_URL` | Where the database lives. Leave it empty for now. |
| `DATABASE_AUTH_TOKEN` | The key to the database. Leave it empty for now. |
| `NEXT_PUBLIC_GA_ID` | Your Google Analytics ID. Only if you want visitor counts. |

To change the staff password, put a new one in `ADMIN_PASSWORD` and run `npm run create-admin`
again.

## Where to change things

| What you want to change | File to open |
| --- | --- |
| A service, or the papers it needs | `src/content/services.ts` |
| Phone number, WhatsApp number, Instagram link | `src/lib/site.ts` |
| Any words on the site, English or Malayalam. The address too. | `src/i18n/dict.ts` |
| The home page layout | `src/views/HomeView.tsx` |
| The service boxes and tables | `src/components/ServiceBoxes.tsx` |
| The terms page | `src/app/(en)/terms/page.tsx` |
| The privacy page | `src/app/(en)/privacy/page.tsx` |
| The photos on the home and services pages | `public/images/` |
| The small icon in the browser tab | `src/app/favicon.ico`, `src/app/icon.png`, `src/app/apple-icon.png` |
| The logo | `public/brand/easyserve-logo.png` (full logo) and `easyserve-mark.png` (just the ES sign) |

### How to add a new service

1. Open `src/content/services.ts`.
2. Copy one of the services already there.
3. Change the name and the list of papers.
4. Fill in the Malayalam too. These are the lines ending in `Ml`, like `nameMl` and `summaryMl`.
   For each paper, `en` is English and `ml` is Malayalam.
5. Save.

The new service now shows up everywhere by itself. It gets its own page too.

If you do not know the list of papers yet, add the line `listPending: true`. The page will then
tell people to message you for the list.

## Two languages

The website opens in English. The button at the top says **മലയാളം**. Click it and the same page
opens in Malayalam. Click **English** to go back.

- English pages look like `yourdomain.com/services/ration-card`.
- Malayalam pages look like `yourdomain.com/ml/services/ration-card`.

Google sees both. So people who search in Malayalam can find the site too.

These pages are in both languages: the home page, the services page and every service page.

These pages are in English only for now: login, create account, customer account, staff page,
terms and privacy.

**Please ask someone who reads Malayalam well to check the Malayalam words before launch.** They
were written for this site and have not been checked by a native speaker. All of them are in two
files: `src/i18n/dict.ts` and `src/content/services.ts`.

## The database

**This is not set up yet. We will do it later.**

A database is where the website keeps customer accounts and their requests.

Right now the website saves these in a small file on your own computer. That is fine for testing.
It will not work on the live website.

Good to know:

- The main pages work with no database. Home, services, terms and privacy are all fine.
- Only login, customer requests and the staff page need the database.

### How to set it up later

We use a database service called Turso. It has a free plan.

1. Go to https://turso.tech and make an account.
2. Make a new database. Pick the Mumbai region. It is the closest to Kerala.
3. Copy the database address. It starts with `libsql://`.
4. Make a token. This is like a key.
5. In Vercel, open your project. Go to **Settings**, then **Environment Variables**.
6. Add `DATABASE_URL` and paste the address.
7. Add `DATABASE_AUTH_TOKEN` and paste the token.
8. Go to **Deployments** and click **Redeploy**.
9. Make the staff account in the new database. Put the same two settings in `.env.local` on your
   computer, then run:

```bash
npm run create-admin
```

You do not need to change any code. The website makes its own tables the first time it runs.

## Putting the website online

The website is hosted on Vercel. Each time you push to GitHub, Vercel updates the live site by
itself.

For login to work on the live site, add these in Vercel under **Settings**, then **Environment
Variables**:

1. `SESSION_SECRET`. Make a new one. Do not reuse the one from your computer.
2. `DATABASE_URL` and `DATABASE_AUTH_TOKEN`. See "The database" above.

Then click **Redeploy**.

Until you do this, the main pages work but login does not.

## Connecting your own domain

A domain is your own website name, like `easyserve.in`.

### Step 1. Buy a domain

Buy one from GoDaddy, Namecheap, Hostinger or any other seller.

### Step 2. Add it in Vercel

1. Open your project in Vercel.
2. Go to **Settings**, then **Domains**.
3. Type your domain and click **Add**.
4. Add it with `www` in front too, like `www.easyserve.in`.

Vercel now shows you some records to copy. Keep this page open.

### Step 3. Add the records where you bought the domain

1. Log in to the site where you bought the domain.
2. Find the page called **DNS** or **DNS records**.
3. Add the records Vercel showed you. They usually look like this:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Always use the values Vercel shows you. They can be different from the ones above.

4. Save.

### Step 4. Wait

It can take a few minutes. Sometimes it takes up to a day. Vercel shows a green tick when the
domain is ready. Vercel also adds the lock sign (https) for free.

### Step 5. Tell the website its new name

1. In Vercel, go to **Settings**, then **Environment Variables**.
2. Add `NEXT_PUBLIC_SITE_URL`. Set it to your full address, like `https://easyserve.in`. No slash
   at the end.
3. Click **Redeploy**.

This matters. Google uses this address to know which website is yours.

### Step 6. Tell Google

1. Go to https://search.google.com/search-console.
2. Add your domain.
3. Send in your sitemap. It lives at `https://yourdomain.com/sitemap.xml`.

## Things still to do

- [ ] Set up the database
- [ ] Buy and connect a domain
- [ ] Add `SESSION_SECRET` in Vercel
- [ ] Make the staff account on the live site
- [ ] Add Google Analytics, if you want it
- [ ] Ask a Malayalam reader to check the Malayalam words. Check the place name നാലാംകല്ല് too.
- [ ] Get the list of papers for these services: passport, police clearance certificate,
      employment registration, Sabarimala virtual queue, scholarships, CV and print and scan.
- [ ] Ask a lawyer to read the terms and privacy pages. The refund rules and the "we keep your
      papers for 90 days" rule are first drafts. The owner must say if they are right.

## Photos

The photos are free stock photos from Unsplash (https://unsplash.com). The Unsplash licence lets
you use them on a business site for free. No credit is needed.

To swap one, put your own photo in `public/images/` with the same file name. Best size is 1200
wide and 800 tall. Real photos of the EasyServe centre would be better than stock photos.

## Good to know about safety

- Passwords are scrambled before they are saved. Nobody can read them, not even staff.
- If someone types the wrong password 5 times, that number is locked for 15 minutes.
- Never put `.env.local` on GitHub. It holds your secrets.

## What it is built with

Next.js 16, TypeScript and Tailwind CSS. Fonts: Plus Jakarta Sans for headings, Inter for text,
Anek Malayalam for Malayalam.
