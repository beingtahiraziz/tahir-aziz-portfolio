# Tahir Aziz Portfolio

A dark, gold glassmorphism Next.js portfolio built with TypeScript, Tailwind CSS, React Three Fiber, Framer Motion, and GSAP. Ready for Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Run `npm run build` before deploying.

## Content

- `content/resume.json` contains resume text extracted from the supplied PDF, including two education entries and three separate certifications. Add the third education entry when its qualification, institution, and dates are confirmed.
- `content/projects.json` contains 73 supplied live URLs. Four filters now work using provisional browsing tags. Review each `category` before treating it as a claim about services delivered, and add verified `blurb` text when ready. Project cards use code-drawn browser previews; no additional photos appear. Empty categories appear in All only.
- `content/socials.json` contains the requested handles and URLs. Verify the links before launch.
- `content/testimonials.json` starts empty. Add objects shaped like `{ "quote": "...", "name": "...", "role": "..." }` only for real testimonials.
- The Hero uses the gold-themed edit of the supplied real portrait at `public/profile/tahir-aziz-gold.webp`. No other photos are displayed. If it is removed, the site displays a TA monogram.
- The supplied PDF is at `public/resume/tahir-aziz-resume.pdf`.

## Environment variables

Copy `.env.example` to `.env.local` for development, or set these in Vercel:

| Variable | Purpose |
| --- | --- |
| `CONTACT_WEBHOOK_URL` | Optional endpoint for the scaffolded serverless API route. The visible form currently opens WhatsApp with a prefilled message and offers an email option to `legendtahir143@gmail.com`. Visitors confirm sending in WhatsApp or their email app. |
| `NEXT_PUBLIC_SITE_URL` | Your final public site URL, used for canonical metadata and sitemap. If unset on Vercel, the build uses `VERCEL_URL`; set this explicitly when connecting a custom domain. |
| `NEXT_PUBLIC_BOOK_CALL_URL` | Optional scheduling URL. Defaults to calling +92 306 0304319. |
| `NEXT_PUBLIC_ANALYTICS_ID` | Reserved for an optional external analytics service. Vercel Analytics and Speed Insights require no ID. |

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbeingtahiraziz%2Ftahir-aziz-portfolio)

The source repository is [beingtahiraziz/tahir-aziz-portfolio](https://github.com/beingtahiraziz/tahir-aziz-portfolio). Set `NEXT_PUBLIC_SITE_URL` to the deployed domain and `CONTACT_WEBHOOK_URL` when ready for form delivery.
