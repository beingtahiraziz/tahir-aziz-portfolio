# Tahir Aziz Portfolio

A dark, gold glassmorphism Next.js portfolio built with TypeScript, Tailwind CSS, React Three Fiber, Framer Motion, and GSAP. Ready for Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Run `npm run build` before deploying.

## Content

- `content/resume.json` contains resume text extracted from the supplied PDF. Review and edit as needed.
- `content/projects.json` contains 73 supplied live URLs. Add a `category` using one of `WordPress & Elementor`, `SEO`, `CRO`, or `AI Automation`; add a verified `blurb` when ready. Project cards use a code-drawn browser preview so no additional photos appear. Empty categories appear in All only.
- `content/socials.json` contains the requested handles and URLs. Verify the links before launch.
- `content/testimonials.json` starts empty. Add objects shaped like `{ "quote": "...", "name": "...", "role": "..." }` only for real testimonials.
- The Hero uses the gold-themed edit of the supplied real portrait at `public/profile/tahir-aziz-gold.webp`. No other photos are displayed. If it is removed, the site displays a TA monogram.
- The supplied PDF is at `public/resume/tahir-aziz-resume.pdf`.

## Environment variables

Copy `.env.example` to `.env.local` for development, or set these in Vercel:

| Variable | Purpose |
| --- | --- |
| `CONTACT_WEBHOOK_URL` | Required to deliver contact form submissions to Make.com or GoHighLevel. Until set, the form returns a clear unavailable message and the email link remains usable. |
| `NEXT_PUBLIC_SITE_URL` | Your final public site URL, used for canonical metadata and sitemap. If unset on Vercel, the build uses `VERCEL_URL`; set this explicitly when connecting a custom domain. |
| `NEXT_PUBLIC_BOOK_CALL_URL` | Optional scheduling URL. Defaults to calling +92 306 0304319. |
| `NEXT_PUBLIC_ANALYTICS_ID` | Reserved for an optional external analytics service. Vercel Analytics and Speed Insights require no ID. |

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbeingtahiraziz%2Ftahir-aziz-portfolio)

Push this folder to your own GitHub repository, then import it into Vercel. The badge assumes the repository URL shown above; adjust it if your repository has a different name. Set `NEXT_PUBLIC_SITE_URL` to the deployed domain and `CONTACT_WEBHOOK_URL` when ready for messages.
