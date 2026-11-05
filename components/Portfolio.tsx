'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, Search, Target, Workflow, Download, Mail, Menu, X, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, ShoppingBag, Database, Layers3 } from 'lucide-react';
import SocialLinks from './SocialLinks';

const Scene = dynamic(() => import('./Scene'), { ssr: false });
type Resume = { summary: string; skills: string[]; experience: { role: string; company: string; period: string; periodShort: string; bullets: string[] }[]; tools: string[]; certifications: string[]; expertise: { title: string; detail: string }[]; education: { qualification: string; institution: string; period: string; detail: string }[] };
type Project = { title: string; url: string; category: string; blurb: string; image: string; alt: string; categoryStatus?: string };
type Testimonial = { quote: string; name: string; role?: string };
const filters = ['All', 'WordPress & Elementor', 'SEO', 'CRO', 'AI Automation'];
const steps = ['Plan the platform', 'Build the experience', 'Secure the foundation', 'Improve visibility', 'Capture leads', 'Connect & automate', 'Measure & optimize'];
const services = [
  { icon: Code2, title: 'WordPress & web platforms', copy: 'Custom WordPress builds, plugins, child themes, ACF templates, multilingual sites, LMS platforms, and marketplaces.', number: '01' },
  { icon: ShoppingBag, title: 'Shopify & eCommerce', copy: 'Shopify and WooCommerce storefronts, theme customization, integrations, and conversion-focused shopping journeys.', number: '02' },
  { icon: Database, title: 'Custom apps & portals', copy: 'Laravel, React, TypeScript, PHP, MySQL, and Supabase applications with secure dashboards and role-based access.', number: '03' },
  { icon: Search, title: 'SEO, AEO & GEO', copy: 'Technical, on-page, and local SEO, schema markup, and search experiences designed for Google and AI discovery.', number: '04' },
  { icon: Workflow, title: 'AI & automation', copy: 'CRM pipelines, n8n and Make workflows, chatbots, LLM features, APIs, and webhooks that connect the work.', number: '05' },
  { icon: ShieldCheck, title: 'Security & performance', copy: 'Malware cleanup, hardening, hosting, email deliverability, and Core Web Vitals improvements.', number: '06' },
];
const nav = [['About', '#about'], ['Services', '#services'], ['Work', '#work'], ['Process', '#process'], ['Experience', '#experience'], ['Education', '#education'], ['Contact', '#contact']];
const fade = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } };

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} variants={reduce ? undefined : fade} initial={reduce ? false : 'hidden'} whileInView={reduce ? undefined : 'show'} viewport={{ once: true, amount: .12 }} transition={{ duration: .6, delay }}>{children}</motion.div>;
}

function BrowserMockup({ project, index }: { project: Project; index: number }) {
  const palettes = [
    'from-[#352915] via-[#1f1a13] to-[#0e0d0b]',
    'from-[#302719] via-[#171510] to-[#1f180e]',
    'from-[#423017] via-[#201a12] to-[#0d0c0a]',
  ];
  return <div className={`relative aspect-[1.46] overflow-hidden bg-gradient-to-br ${palettes[index % palettes.length]}`}>
    <div className="absolute inset-x-[7%] bottom-[-12%] top-[12%] overflow-hidden rounded-t-xl border border-champagne/20 bg-[#100f0c] shadow-[0_25px_70px_rgba(0,0,0,.45)]">
      <div className="flex h-9 items-center gap-1.5 border-b border-white/10 bg-[#211b12] px-3">
        <i className="h-1.5 w-1.5 rounded-full bg-amber/70"/><i className="h-1.5 w-1.5 rounded-full bg-white/25"/><i className="h-1.5 w-1.5 rounded-full bg-white/25"/>
        <span className="ml-3 min-w-0 flex-1 truncate rounded-md bg-black/25 px-3 py-1 text-[10px] text-champagne/55">{project.title}</span>
      </div>
      <div className="grid h-full grid-cols-[.22fr_1fr]">
        <div className="border-r border-white/10 bg-white/[.025] p-3"><div className="mb-5 h-3 w-3 rounded-full bg-gold/70"/><div className="space-y-2.5">{[1,2,3,4].map(x=><div key={x} className="h-1.5 w-full rounded bg-white/10"/>)}</div></div>
        <div className="p-5 sm:p-7"><div className="mb-6 h-1.5 w-16 rounded bg-gold/65"/><div className="h-5 w-[70%] rounded bg-champagne/25"/><div className="mt-3 h-2 w-[53%] rounded bg-white/10"/><div className="mt-6 h-8 w-24 rounded-md bg-gold/45"/><div className="mt-8 grid grid-cols-3 gap-2">{[1,2,3].map(x=><div key={x} className="h-20 rounded-md border border-white/10 bg-white/[.035]"/>)}</div></div>
      </div>
    </div>
    <span className="absolute bottom-4 right-5 rounded-full border border-champagne/20 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[.18em] text-champagne/75 backdrop-blur">Live site</span>
  </div>;
}

export default function Portfolio({ heroProfile, resume, projects, testimonials, bookCallUrl }: { heroProfile: string | null; resume: Resume; projects: Project[]; testimonials: Testimonial[]; bookCallUrl: string }) {
  const heroRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState('All');
  const [menu, setMenu] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [quote, setQuote] = useState(0);
  const [formState, setFormState] = useState('');
  const [sceneReady, setSceneReady] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const media = window.matchMedia('(min-width: 1024px)');
    let timeout: number | undefined;
    const schedule = () => { if (timeout) clearTimeout(timeout); if (media.matches) timeout = window.setTimeout(() => setSceneReady(true), 1200); else setSceneReady(false); };
    schedule(); media.addEventListener('change', schedule);
    return () => { if (timeout) clearTimeout(timeout); media.removeEventListener('change', schedule); };
  }, [reduce]);

  useEffect(() => {
    if (reduce || !heroRef.current) return;
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.to(heroRef.current, { '--hero-a': '#11100b', '--hero-b': '#493216', duration: 8, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        gsap.to('.hero-orb', { y: 90, opacity: .3, scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } });
      }, heroRef);
    })();
    return () => ctx?.revert();
  }, [reduce]);

  const visible = projects.filter(p => filter === 'All' || p.category === filter);
  const displayed = showAll ? visible : visible.slice(0, 9);
  function contactMessage(form: HTMLFormElement) {
    const data = Object.fromEntries(new FormData(form));
    return `New portfolio enquiry\n\nName: ${data.name}\nEmail: ${data.email}\nProject type: ${data.projectType}\n\nMessage:\n${data.message}`;
  }
  function sendContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = contactMessage(e.currentTarget);
    window.open(`https://wa.me/923060304319?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setFormState('WhatsApp opened with your message. Please review it and press Send there.');
  }
  function emailContact() {
    const form = document.querySelector<HTMLFormElement>('#contact-form');
    if (!form || !form.reportValidity()) return;
    const subject = 'New portfolio enquiry';
    const body = contactMessage(form);
    window.location.href = `mailto:legendtahir143@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormState('Your email app opened with the message ready to send.');
  }

  return <main className="overflow-hidden">
    <header className="fixed inset-x-4 top-4 z-50 mx-auto max-w-[1320px] sm:top-6">
      <div className="glass-strong flex min-h-[66px] items-center justify-between rounded-full px-5 sm:px-7">
        <a href="#top" aria-label="Tahir Aziz home" className="focus-ring font-display text-xl font-bold tracking-tight text-paper sm:text-2xl">Tahir <span className="text-amber">Aziz.</span></a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">{nav.map(([label, href]) => <a key={href} href={href} className="focus-ring text-xs font-bold uppercase tracking-[.12em] text-[#E7DFCF] transition hover:text-champagne">{label}</a>)}</nav>
        <div className="flex items-center gap-3"><a href="https://wa.me/923060304319" target="_blank" rel="noopener noreferrer" className="focus-ring hidden rounded-full bg-gold px-5 py-2.5 text-xs font-bold text-ink transition hover:bg-amber sm:inline-flex">Let&apos;s talk <ArrowUpRight className="ml-1.5 h-3.5 w-3.5"/></a><button onClick={() => setMenu(!menu)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} className="focus-ring rounded-full p-2 text-champagne lg:hidden">{menu ? <X size={21}/> : <Menu size={21}/>}</button></div>
      </div>
      {menu && <nav className="glass-strong mt-2 grid gap-1 rounded-[28px] p-4 lg:hidden" aria-label="Mobile navigation">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)} className="focus-ring rounded-xl px-4 py-3 text-sm text-paper hover:bg-white/5">{label}</a>)}</nav>}
    </header>

    <section ref={heroRef} id="top" className="hero-bg relative min-h-screen overflow-hidden pt-32">
      <div className="hero-orb pointer-events-none absolute right-[-16rem] top-[12%] h-[39rem] w-[39rem] rounded-full bg-gold/10 blur-[110px]"/>
      {sceneReady && <Scene/>}
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-[1320px] items-center gap-12 px-6 pb-24 lg:grid-cols-[1.08fr_.92fr] lg:gap-14 lg:px-10">
        <div className="max-w-[700px]"><motion.p initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-7 flex items-center gap-3"><span className="h-px w-10 bg-gold"/> Full stack digital developer</motion.p>
          <h1 className="font-display text-[clamp(4.7rem,9vw,9rem)] font-medium leading-[.91] tracking-[-.075em]"><motion.span initial={reduce ? false : { opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }} className="block">Tahir</motion.span><motion.span initial={reduce ? false : { opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .1 }} className="text-gradient block">Aziz<span className="text-gold">.</span></motion.span></h1>
          <motion.p initial={reduce ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .22 }} className="mt-9 max-w-xl border-l border-gold/55 pl-5 text-base leading-8 text-[#E7DFCF] sm:text-lg">WordPress &amp; Shopify Full Stack Developer <span className="text-gold">/</span> Custom Web Apps, SEO, Security &amp; AI Automation</motion.p>
          <motion.div initial={reduce ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }} className="mt-9 flex flex-wrap gap-3"><a href="#work" className="focus-ring button-primary inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold">Explore my work <ArrowUpRight size={16}/></a><a href={bookCallUrl} className="focus-ring button-secondary inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-paper">Book a call <ArrowRight size={16}/></a></motion.div>
          <div className="mt-10 flex flex-wrap items-center gap-5"><SocialLinks/><a href="https://wa.me/923060304319" target="_blank" rel="noopener noreferrer" className="focus-ring text-xs font-bold text-champagne hover:text-amber">WhatsApp +92 306 0304319 ↗</a></div>
        </div>
        <Reveal className="relative mx-auto w-full max-w-[460px] lg:ml-auto"><div className="absolute -inset-4 rotate-6 rounded-[43%] border border-gold/25"/><div className="absolute -inset-2 -rotate-6 rounded-[43%] border border-champagne/15"/><div className="glass-strong relative aspect-[.87] overflow-hidden rounded-[40%] p-2 shadow-[0_45px_130px_rgba(214,167,58,.13)]"><div className="relative h-full overflow-hidden rounded-[39%] bg-panel">{heroProfile ? <Image src={heroProfile} alt="Portrait of Tahir Aziz in warm gold lighting" fill priority sizes="(max-width: 1024px) 86vw, 460px" className="object-cover"/> : <div className="flex h-full items-center justify-center font-display text-9xl text-gradient">TA</div>}</div></div><div className="glass-strong absolute -bottom-5 left-0 rounded-2xl px-5 py-3 text-xs text-[#E7DFCF]">Building from <strong className="block pt-1 text-sm text-paper">Bahawalpur, Pakistan</strong></div></Reveal>
      </div>
      <a href="#about" aria-label="Scroll to About" className="focus-ring absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-gold"><ArrowDown size={20}/></a>
    </section>

    <section id="about" className="relative border-t border-gold/10 bg-[#10100d]"><div className="section-wrap grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
      <Reveal><p className="eyebrow mb-8">01 / About</p><h2 className="section-title">The person<br/>behind the <em className="text-gradient">pixels.</em></h2><div className="fine-rule mt-12 max-w-xs"/><div className="mt-10 grid grid-cols-2 gap-8"><div><strong className="font-display text-5xl text-champagne">3+</strong><span className="mt-2 block text-xs uppercase tracking-widest text-[#D5CFBF]">Years of experience</span></div><div><strong className="font-display text-5xl text-champagne">250+</strong><span className="mt-2 block text-xs uppercase tracking-widest text-[#D5CFBF]">Projects delivered</span></div></div></Reveal>
      <div className="lg:pt-12"><Reveal><p className="font-display text-2xl leading-snug text-paper sm:text-3xl">Secure, scalable, fast, and conversion-focused digital solutions.</p><p className="mt-8 text-base leading-8 text-[#D5CFBF]">{resume.summary}</p></Reveal><div className="mt-10 flex flex-wrap gap-2">{resume.skills.slice(0, 20).map((skill, i) => <Reveal key={skill} delay={Math.min(i * .03, .25)}><span className="inline-block rounded-full border border-gold/20 bg-gold/[.045] px-4 py-2 text-xs text-champagne">{skill}</span></Reveal>)}</div></div>
    </div></section>

    <section id="services" className="relative bg-[radial-gradient(circle_at_10%_35%,rgba(214,167,58,.16),transparent_38%),radial-gradient(circle_at_95%_80%,rgba(214,167,58,.11),transparent_34%),#0a0a08]"><div className="section-wrap"><div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-end"><Reveal><p className="eyebrow mb-5">02 / What I do</p><h2 className="section-title">From platform<br/>to <em className="text-gradient">product.</em></h2></Reveal><Reveal><p className="max-w-md text-base leading-8 text-[#D5CFBF] lg:ml-auto">Full stack delivery across websites, commerce, custom applications, discovery, automation, and security.</p></Reveal></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{services.map((service, i) => <Reveal key={service.title} delay={(i % 3) * .07}><motion.article whileHover={reduce ? undefined : { y: -5 }} className={`glass-card ${i === 0 ? 'glass-card-featured' : ''} group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:p-9`}><span className="pointer-events-none absolute -right-3 -top-10 font-display text-[10rem] leading-none text-gold/[.055]">{service.number}</span><div className="flex items-start justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-champagne"><service.icon size={23}/></span><span className="eyebrow text-champagne/55">{service.number} / 06</span></div><div><h3 className="font-display text-[1.8rem] leading-tight">{service.title}</h3><p className="mt-3 max-w-md text-sm leading-7 text-[#D5CFBF]">{service.copy}</p></div></motion.article></Reveal>)}</div>
    </div></section>

    <section id="expertise" className="relative overflow-hidden bg-[#0f0e0b]"><div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-gold/10 blur-3xl"/><div className="section-wrap relative grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20"><Reveal className="lg:sticky lg:top-32 lg:self-start"><p className="eyebrow mb-5">03 / Beyond the build</p><h2 className="section-title">The details<br/>that make it <em className="text-gradient">work.</em></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#D5CFBF]">From search visibility to infrastructure, these capabilities connect the entire client journey.</p></Reveal><div className="grid gap-4 sm:grid-cols-2">{resume.expertise.map((item, i) => <Reveal key={item.title} delay={(i % 2) * .07}><article className="glass-card relative h-full min-h-[230px] overflow-hidden rounded-[26px] p-6 sm:p-7"><span className="font-display text-4xl text-gold/35">{String(i + 1).padStart(2, '0')}</span><div className="fine-rule my-5"/><h3 className="font-display text-xl text-paper sm:text-2xl">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#D5CFBF]">{item.detail}</p></article></Reveal>)}</div></div></section>

    <section id="work" className="bg-[radial-gradient(circle_at_75%_20%,rgba(214,167,58,.13),transparent_35%),#14120e]"><div className="section-wrap"><Reveal className="flex flex-col gap-8 border-b border-gold/20 pb-10 lg:flex-row lg:items-end lg:justify-between"><div><p className="eyebrow mb-5">04 / Portfolio</p><h2 className="section-title">Selected <em className="text-gradient">work.</em></h2></div><p className="max-w-md text-sm leading-7 text-[#D5CFBF]">A selection of live websites across industries. Explore the full collection and browse by focus.</p></Reveal>
      <div className="mt-8 flex gap-2 overflow-x-auto pb-3" role="tablist" aria-label="Project categories">{filters.map(f => <button key={f} role="tab" aria-selected={filter === f} onClick={() => { setFilter(f); setShowAll(false); }} className={`focus-ring shrink-0 rounded-full px-5 py-2.5 text-xs font-bold transition ${filter === f ? 'bg-gold text-ink' : 'border border-gold/20 text-[#E7DFCF] hover:border-gold/50 hover:text-champagne'}`}>{f}</button>)}</div>
      <p className="mb-7 text-xs leading-5 text-[#BFB49F]">Focus tags are provisional browsing labels; confirm the service delivered on each project before publishing case study claims.</p>
      {visible.length > 0 ? <><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{displayed.map((project, i) => <Reveal key={project.url} delay={Math.min((i % 3) * .07, .14)}><motion.article whileHover={reduce ? undefined : { y: -5 }} className="glass-card group h-full overflow-hidden rounded-[24px] transition-colors"><BrowserMockup project={project} index={i}/><div className="p-6"><div className="mb-3 flex items-center justify-between gap-3"><span className="text-[10px] font-bold uppercase tracking-[.2em] text-gold">{project.category || 'Live project'}</span><span className="font-display text-lg text-gold/50">{String(i + 1).padStart(2, '0')}</span></div><h3 className="min-w-0 break-words font-display text-[1.45rem] leading-tight text-paper">{project.title}</h3>{project.blurb && <p className="mt-3 text-sm leading-6 text-[#D5CFBF]">{project.blurb}</p>}<div className="fine-rule my-5"/><a href={project.url} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-champagne transition hover:text-amber">Visit site <ArrowUpRight size={15}/></a></div></motion.article></Reveal>)}</div>{visible.length > 9 && <div className="mt-10 text-center"><button onClick={() => setShowAll(!showAll)} className="focus-ring button-secondary rounded-full px-8 py-3 text-sm font-bold text-paper">{showAll ? 'Show fewer projects' : `View all ${visible.length} projects`}</button></div>}</> : <p className="rounded-2xl border border-gold/20 p-8 text-[#D5CFBF]">No projects have this focus tag yet.</p>}
    </div></section>

    <section id="process" className="relative overflow-hidden bg-[#0b0b09]">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-gold/[.055] blur-3xl" aria-hidden="true"/>
      <div className="section-wrap relative">
        <Reveal className="mb-16 grid gap-7 border-b border-gold/20 pb-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div><p className="eyebrow mb-5">05 / Process</p><h2 className="section-title">From idea<br/>to <em className="text-gradient">impact.</em></h2></div>
          <p className="max-w-md text-sm leading-8 text-[#D5CFBF] md:justify-self-end">From the first platform decision through secure delivery, search visibility, lead capture, and measurable improvement.</p>
        </Reveal>
        <div className="relative pl-9 md:pl-0">
          <div className="absolute bottom-10 left-3 top-8 w-px bg-gold/20 md:left-1/2 md:-translate-x-1/2" aria-hidden="true"/>
          <motion.div className="absolute left-3 top-8 w-px origin-top bg-gradient-to-b from-[#f6c85f] via-gold to-transparent md:left-1/2 md:-translate-x-1/2" initial={{ height: 0 }} whileInView={{ height: 'calc(100% - 5rem)' }} viewport={{ once: true, amount: .08 }} transition={{ duration: reduce ? 0 : 1.8, ease: 'easeOut' }} aria-hidden="true"/>
          <ol className="space-y-5 md:space-y-0">{steps.map((step, i) => <li key={step} className={`relative md:grid md:grid-cols-[1fr_64px_1fr] md:items-center ${i ? 'md:-mt-10' : ''}`}>
            <span className="absolute -left-[2.25rem] top-7 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-gold/70 bg-[#19150e] shadow-[0_0_0_6px_#0b0b09,0_0_24px_rgba(214,167,58,.35)] md:static md:col-start-2 md:row-start-1 md:mx-auto md:h-7 md:w-7" aria-hidden="true"><span className="h-2 w-2 rounded-full bg-[#f6c85f]"/></span>
            <Reveal className={`${i % 2 === 0 ? 'md:col-start-1 md:pr-5' : 'md:col-start-3 md:pl-5'} md:row-start-1`} delay={.05}>
              <article className="group relative overflow-hidden rounded-[26px] border border-gold/25 bg-[linear-gradient(135deg,rgba(255,230,163,.13),rgba(26,22,15,.76)_55%,rgba(11,11,9,.88))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.12),0_18px_50px_rgba(0,0,0,.2)] backdrop-blur-xl transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_22px_55px_rgba(0,0,0,.3),0_0_32px_rgba(214,167,58,.1)] sm:p-8">
                <span className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] leading-none text-gold/[.07]" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="relative flex items-center justify-between gap-4"><span className="eyebrow">Step {String(i + 1).padStart(2, '0')} / 07</span><ArrowUpRight size={17} className="text-gold/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true"/></div>
                <h3 className="relative mt-8 font-display text-2xl leading-tight text-paper sm:text-[1.7rem]">{step}</h3>
                <div className="relative mt-6 h-px w-20 bg-gradient-to-r from-gold to-transparent" aria-hidden="true"/>
              </article>
            </Reveal>
          </li>)}</ol>
        </div>
      </div>
    </section>

    <section id="experience" className="bg-[#19150e]"><div className="section-wrap"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20"><Reveal><p className="eyebrow mb-5">06 / Experience</p><h2 className="section-title">The work<br/><em className="text-gradient">behind it.</em></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#D5CFBF]">WordPress, custom applications, and Shopify experience from my current resume.</p><div className="mt-8 flex flex-wrap gap-3"><a href="/resume/tahir-aziz-resume.pdf" download className="focus-ring button-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold"><Download size={17}/> Download resume</a><a href="/resume" className="focus-ring button-secondary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-paper">Read full resume <ArrowUpRight size={16}/></a></div></Reveal><div className="divide-y divide-gold/20 border-t border-gold/20">{resume.experience.map((job, i) => <Reveal key={job.role + i}><article className="py-9"><div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-gold">0{i + 1} / {job.company}</p><h3 className="mt-2 font-display text-2xl sm:text-3xl">{job.role}</h3></div><time className="glass shrink-0 rounded-full px-4 py-2 text-xs font-bold tracking-wide text-champagne">{job.periodShort}</time></div><div><ul className="mt-5 space-y-2 text-sm leading-7 text-[#D5CFBF]">{job.bullets.map(b => <li key={b} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"/>{b}</li>)}</ul></div></article></Reveal>)}</div></div><Reveal className="mt-14 border-t border-gold/20 pt-8"><p className="eyebrow mb-5">Tools &amp; platforms</p><div className="flex flex-wrap gap-x-6 gap-y-3">{resume.tools.map(t => <span key={t} className="text-sm text-[#E7DFCF]">{t}<span className="ml-6 text-gold/35">/</span></span>)}</div></Reveal></div></section>

    <section id="education" className="relative bg-[radial-gradient(circle_at_10%_80%,rgba(214,167,58,.16),transparent_38%),#0e0d0a]"><div className="section-wrap"><Reveal><p className="eyebrow mb-5">07 / Education</p><h2 className="section-title">Built on <em className="text-gradient">curiosity.</em></h2><p className="mt-6 max-w-xl text-sm leading-7 text-[#D5CFBF]">Academic studies listed in my resume.</p></Reveal><div className="mt-12 grid gap-5 md:grid-cols-2">{resume.education.map((item, i) => <Reveal key={item.qualification} delay={i * .08}><article className="glass-card relative h-full min-h-[260px] overflow-hidden rounded-[28px] p-7 sm:p-9"><span className="absolute right-7 top-6 font-display text-5xl text-gold/20">0{i + 1}</span><p className="eyebrow mb-10">{item.period}</p><h3 className="max-w-sm font-display text-2xl leading-tight text-paper sm:text-3xl">{item.qualification}</h3><p className="mt-5 text-sm leading-6 text-champagne">{item.institution}</p>{item.detail && <p className="mt-2 text-xs text-[#D5CFBF]">{item.detail}</p>}</article></Reveal>)}</div><Reveal className="mt-10"><p className="eyebrow mb-4">Certifications</p><div className="flex flex-wrap gap-3">{resume.certifications.map(c => <span key={c} className="glass rounded-full px-5 py-2.5 text-sm text-champagne">{c}</span>)}</div></Reveal></div></section>

    {testimonials.length > 0 && <section className="bg-[#0b0b09]"><div className="section-wrap"><p className="eyebrow mb-8">08 / Testimonials</p><div className="glass-strong max-w-4xl rounded-[32px] p-8 sm:p-14"><blockquote className="font-display text-2xl leading-snug sm:text-4xl">“{testimonials[quote].quote}”</blockquote><p className="mt-7 text-sm font-bold">{testimonials[quote].name}{testimonials[quote].role && <span className="ml-2 font-normal text-[#D5CFBF]">· {testimonials[quote].role}</span>}</p><div className="mt-8 flex gap-3"><button aria-label="Previous testimonial" onClick={() => setQuote((quote - 1 + testimonials.length) % testimonials.length)} className="focus-ring glass rounded-full p-3"><ChevronLeft size={18}/></button><button aria-label="Next testimonial" onClick={() => setQuote((quote + 1) % testimonials.length)} className="focus-ring glass rounded-full p-3"><ChevronRight size={18}/></button></div></div></div></section>}

    <section id="contact" className="relative overflow-hidden bg-[#0c0b09]"><div className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full border-[70px] border-gold/[.06]"/><div className="section-wrap relative grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20"><Reveal><p className="eyebrow mb-5">Let&apos;s collaborate</p><h2 className="section-title">Make the<br/>next move <em className="text-gradient">count.</em></h2><p className="mt-7 max-w-md text-sm leading-8 text-[#D5CFBF]">Tell me what you&apos;re building. We can talk through your website, store, custom application, search visibility, security, or automation goals.</p><div className="mt-10 space-y-4"><a href="mailto:legendtahir143@gmail.com" className="focus-ring flex items-center gap-3 text-sm text-champagne hover:text-amber"><Mail size={17}/> legendtahir143@gmail.com</a><a href="https://wa.me/923060304319" target="_blank" rel="noopener noreferrer" className="focus-ring flex items-center gap-3 text-sm text-champagne hover:text-amber"><Sparkles size={17}/> WhatsApp +92 306 0304319</a><a href="tel:+923060304319" className="focus-ring inline-block text-sm text-[#E7DFCF] hover:text-champagne">Call +92 306 0304319</a></div></Reveal>
      <form id="contact-form" onSubmit={sendContact} className="glass-strong rounded-[30px] p-6 sm:p-10"><p className="font-display text-2xl">Tell me about your project.</p><div className="mt-8 grid gap-5 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-widest text-[#E7DFCF]">Name<input name="name" required maxLength={120} placeholder="Your name" className="focus-ring mt-2 w-full rounded-xl border border-gold/20 bg-black/20 p-3.5 font-sans text-sm normal-case tracking-normal text-paper outline-none"/></label><label className="text-xs font-bold uppercase tracking-widest text-[#E7DFCF]">Email<input name="email" type="email" required placeholder="you@company.com" className="focus-ring mt-2 w-full rounded-xl border border-gold/20 bg-black/20 p-3.5 font-sans text-sm normal-case tracking-normal text-paper outline-none"/></label></div><label className="mt-5 block text-xs font-bold uppercase tracking-widest text-[#E7DFCF]">Project type<select name="projectType" required defaultValue="" className="focus-ring mt-2 w-full rounded-xl border border-gold/20 bg-[#211b12] p-3.5 font-sans text-sm normal-case tracking-normal text-paper outline-none"><option value="" disabled>Select a focus</option>{['WordPress development', 'Shopify & eCommerce', 'Custom web application', 'SEO, AEO & GEO', 'AI & automation', 'Security & performance', 'Something else'].map(x => <option key={x}>{x}</option>)}</select></label><label className="mt-5 block text-xs font-bold uppercase tracking-widest text-[#E7DFCF]">Message<textarea name="message" required rows={5} maxLength={5000} placeholder="A little about your goals..." className="focus-ring mt-2 w-full resize-y rounded-xl border border-gold/20 bg-black/20 p-3.5 font-sans text-sm normal-case tracking-normal text-paper outline-none"/></label><input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true"/><p className="mt-4 text-xs leading-5 text-[#D5CFBF]">WhatsApp opens with your details filled in. Review and press Send there.</p><button type="submit" className="focus-ring button-primary mt-5 flex w-full items-center justify-center gap-2 rounded-xl p-4 text-sm font-bold">Continue in WhatsApp <ArrowUpRight size={16}/></button><button type="button" onClick={emailContact} className="focus-ring button-secondary mt-3 flex w-full items-center justify-center gap-2 rounded-xl p-4 text-sm font-bold text-paper">Email instead <Mail size={16}/></button>{formState && <p role="status" className="mt-4 text-sm text-[#E7DFCF]">{formState}</p>}</form>
    </div></section>

    <footer className="border-t border-gold/15 bg-ink"><div className="mx-auto grid max-w-[1320px] gap-9 px-6 py-11 lg:grid-cols-[1fr_auto_auto] lg:items-end lg:px-10"><div><a href="#top" className="focus-ring font-display text-3xl">Tahir <span className="text-amber">Aziz.</span></a><p className="mt-4 text-xs text-[#BFB49F]">© 2026 Tahir Aziz. All rights reserved.</p></div><nav className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-[#D5CFBF]" aria-label="Footer navigation">{nav.map(([label, href]) => <a key={href} href={href} className="focus-ring hover:text-champagne">{label}</a>)}</nav><SocialLinks small/></div></footer>
  </main>;
}
