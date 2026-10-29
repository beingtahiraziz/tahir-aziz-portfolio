import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteUrl, hasProfile, hasHeroProfile } from '@/lib/data';
import './globals.css';

const socialImage=hasHeroProfile?'/profile/tahir-aziz-gold.webp':'/profile/tahir-aziz.jpg';
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:'Tahir Aziz | WordPress & Elementor Developer',description:'Tahir Aziz builds WordPress and Elementor websites and improves SEO, conversions, and automation for service businesses.',alternates:{canonical:'/'},openGraph:{title:'Tahir Aziz | WordPress & Elementor Developer',description:'WordPress and Elementor websites, SEO, CRO, and automation for service businesses.',type:'profile',url:siteUrl,siteName:'Tahir Aziz',locale:'en_US',...(hasProfile?{images:[{url:socialImage,width:hasHeroProfile?1178:793,height:hasHeroProfile?1335:899,alt:'Tahir Aziz'}]}:{})},twitter:{card:hasProfile?'summary_large_image':'summary',title:'Tahir Aziz | WordPress & Elementor Developer',description:'WordPress and Elementor websites, SEO, CRO, and automation for service businesses.',...(hasProfile?{images:[socialImage]}:{})},robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}<Analytics/><SpeedInsights/></body></html>}
