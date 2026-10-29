import {hasProfile,profilePath,hasHeroProfile,heroProfilePath,resume,projects,testimonials,socials,bookCallUrl,siteUrl} from '@/lib/data';
import Portfolio from '@/components/Portfolio';
export default function Page(){
 const person={'@context':'https://schema.org','@type':'Person',name:'Tahir Aziz',url:siteUrl,jobTitle:'WordPress Developer',telephone:'+92 306 0304319',email:'tahirazizofficial1@gmail.com',sameAs:Object.values(socials).map(s=>s.url)};
 const profile={'@context':'https://schema.org','@type':'ProfilePage',mainEntity:{'@type':'Person',name:'Tahir Aziz'},hasPart:projects.map(p=>({'@type':'CreativeWork',name:p.title,url:p.url}))};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(profile)}}/><Portfolio profile={hasProfile?profilePath:null} heroProfile={hasProfile?(hasHeroProfile?heroProfilePath:profilePath):null} resume={resume} projects={projects} testimonials={testimonials} bookCallUrl={bookCallUrl}/></>
}
