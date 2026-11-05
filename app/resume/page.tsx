import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, ArrowLeft } from 'lucide-react';
import { resume, siteUrl } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Resume | Tahir Aziz, WordPress & Shopify Full Stack Developer',
  description: 'Read Tahir Aziz’s experience in WordPress, Shopify, custom web applications, SEO, security, and AI automation. View education, skills, and download the PDF resume.',
  alternates: { canonical: '/resume' },
  openGraph: {
    title: 'Tahir Aziz Resume | Full Stack Developer',
    description: 'Experience, skills, education, and a downloadable PDF resume for Tahir Aziz.',
    url: `${siteUrl}/resume`,
    type: 'profile',
  },
};

export default function ResumePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteUrl}/resume#profile`,
    url: `${siteUrl}/resume`,
    name: 'Tahir Aziz Resume',
    mainEntity: { '@id': `${siteUrl}/#person` },
    about: ['WordPress development', 'Shopify development', 'Custom web applications', 'Technical SEO', 'AI automation'],
  };

  return <main className="min-h-screen bg-ink text-paper">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:px-10">
      <div className="mb-16 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="focus-ring inline-flex items-center gap-2 text-sm text-champagne hover:text-amber"><ArrowLeft size={17}/> Back to portfolio</Link>
        <a href="/resume/tahir-aziz-resume.pdf" download className="focus-ring button-primary inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold"><Download size={16}/> Download PDF</a>
      </div>

      <header className="border-b border-gold/25 pb-12">
        <p className="eyebrow mb-5">Professional resume</p>
        <h1 className="font-display text-5xl leading-tight sm:text-7xl">Tahir <span className="text-gradient">Aziz.</span></h1>
        <p className="mt-5 max-w-2xl text-lg text-champagne">WordPress &amp; Shopify Full Stack Developer · Custom Web Apps · SEO · Security · AI Automation</p>
        <p className="mt-5 text-sm text-[#D5CFBF]">Bahawalpur, Pakistan · <a className="hover:text-amber" href="tel:+923060304319">+92 306 0304319</a> · <a className="hover:text-amber" href="mailto:legendtahir143@gmail.com">legendtahir143@gmail.com</a></p>
      </header>

      <section className="py-12" aria-labelledby="summary-heading"><h2 id="summary-heading" className="font-display text-3xl">Professional summary</h2><p className="mt-5 max-w-4xl leading-8 text-[#D5CFBF]">{resume.summary}</p></section>

      <section className="border-t border-gold/20 py-12" aria-labelledby="experience-heading"><h2 id="experience-heading" className="font-display text-3xl">Experience</h2><div className="mt-6 space-y-6">{resume.experience.map(job => <article key={`${job.company}-${job.role}`} className="glass-card rounded-3xl p-6 sm:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow">{job.company}</p><h3 className="mt-2 font-display text-2xl">{job.role}</h3></div><span className="text-sm text-champagne">{job.periodShort}</span></div><ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-[#D5CFBF]">{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></article>)}</div></section>

      <section className="border-t border-gold/20 py-12" aria-labelledby="skills-heading"><h2 id="skills-heading" className="font-display text-3xl">Skills &amp; tools</h2><div className="mt-6 flex flex-wrap gap-2">{resume.skills.map(skill => <span key={skill} className="glass rounded-full px-4 py-2 text-sm text-champagne">{skill}</span>)}</div></section>

      <section className="border-t border-gold/20 py-12" aria-labelledby="education-heading"><h2 id="education-heading" className="font-display text-3xl">Education</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{resume.education.map(item => <article key={item.qualification} className="glass-card rounded-3xl p-6"><p className="text-xs font-bold uppercase tracking-widest text-gold">{item.period}</p><h3 className="mt-4 font-display text-xl">{item.qualification}</h3><p className="mt-2 text-sm text-[#D5CFBF]">{item.institution}</p></article>)}</div><h3 className="mt-10 font-display text-xl">Certifications</h3><ul className="mt-3 flex flex-wrap gap-2">{resume.certifications.map(item => <li key={item} className="glass rounded-full px-4 py-2 text-sm text-champagne">{item}</li>)}</ul></section>
    </div>
  </main>;
}
