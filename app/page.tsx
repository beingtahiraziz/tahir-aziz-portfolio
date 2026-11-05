import {hasHeroProfile,heroProfilePath,resume,projects,testimonials,socials,bookCallUrl,siteUrl} from '@/lib/data';
import Portfolio from '@/components/Portfolio';
export default function Page(){
 const person={'@context':'https://schema.org','@type':'Person','@id':`${siteUrl}/#person`,name:'Tahir Aziz',url:siteUrl,jobTitle:'WordPress & Shopify Full Stack Developer',description:resume.summary,telephone:'+92 306 0304319',email:'legendtahir143@gmail.com',sameAs:Object.values(socials).map(s=>s.url),knowsAbout:resume.skills,alumniOf:resume.education.map(e=>({'@type':'EducationalOrganization',name:e.institution})),subjectOf:{'@type':'MediaObject',name:'Tahir Aziz Resume PDF',contentUrl:`${siteUrl}/resume/tahir-aziz-resume.pdf`,encodingFormat:'application/pdf'}};
 const profile={'@context':'https://schema.org','@type':'ProfilePage','@id':`${siteUrl}/#profile`,url:siteUrl,mainEntity:{'@id':`${siteUrl}/#person`},hasPart:projects.map(p=>({'@type':'CreativeWork',name:p.title,url:p.url}))};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(profile)}}/><Portfolio heroProfile={hasHeroProfile?heroProfilePath:null} resume={resume} projects={projects} testimonials={testimonials} bookCallUrl={bookCallUrl}/></>
}
