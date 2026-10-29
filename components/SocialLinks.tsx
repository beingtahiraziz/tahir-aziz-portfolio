'use client';
import {motion} from 'framer-motion';
import {FaInstagram,FaGithub,FaTiktok,FaLinkedinIn} from 'react-icons/fa';
import socials from '@/content/socials.json';
const icons={instagram:FaInstagram,github:FaGithub,tiktok:FaTiktok,linkedin:FaLinkedinIn};
export default function SocialLinks({small=false}:{small?:boolean}){return <div className="flex items-center gap-3" aria-label="Social profiles">{(Object.keys(socials) as (keyof typeof socials)[]).map(key=>{const Icon=icons[key];const item=socials[key];return <motion.a key={key} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.label} title={item.label} whileHover={{scale:1.12,y:-3}} className={`focus-ring glass flex items-center justify-center rounded-full text-paper/75 hover:text-cyan hover:shadow-[0_0_22px_rgba(255,230,163,.28)] ${small?'h-10 w-10':'h-11 w-11'}`}><Icon size={small?16:18}/></motion.a>})}</div>}
