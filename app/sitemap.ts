import type { MetadataRoute } from 'next';
import {siteUrl} from '@/lib/data';
export default function sitemap():MetadataRoute.Sitemap{return [{url:siteUrl,lastModified:new Date(),changeFrequency:'monthly',priority:1},{url:`${siteUrl}/resume`,lastModified:new Date(),changeFrequency:'monthly',priority:.7},{url:`${siteUrl}/resume/tahir-aziz-resume.pdf`,lastModified:new Date(),changeFrequency:'yearly',priority:.4}]}
