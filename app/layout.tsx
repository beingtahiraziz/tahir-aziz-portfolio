import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteUrl, hasHeroProfile } from '@/lib/data';
import '@fontsource/lato/latin-400.css';
import '@fontsource/lato/latin-700.css';
import '@fontsource/playfair-display/latin-500.css';
import '@fontsource/playfair-display/latin-700.css';
import './globals.css';

const socialImage='/profile/tahir-aziz-gold.webp';
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:'Tahir Aziz | WordPress & Shopify Full Stack Developer',description:'Tahir Aziz builds WordPress and Shopify websites, custom web apps, and secure automation, with technical SEO, AEO/GEO, and conversion optimization.',alternates:{canonical:'/'},openGraph:{title:'Tahir Aziz | WordPress & Shopify Full Stack Developer',description:'WordPress, Shopify, custom web apps, SEO, security, and AI automation.',type:'profile',url:siteUrl,siteName:'Tahir Aziz',locale:'en_US',...(hasHeroProfile?{images:[{url:socialImage,width:1178,height:1335,alt:'Tahir Aziz'}]}:{})},twitter:{card:hasHeroProfile?'summary_large_image':'summary',title:'Tahir Aziz | WordPress & Shopify Full Stack Developer',description:'WordPress, Shopify, custom web apps, SEO, security, and AI automation.',...(hasHeroProfile?{images:[socialImage]}:{})},robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}<Analytics/><SpeedInsights/></body></html>}
