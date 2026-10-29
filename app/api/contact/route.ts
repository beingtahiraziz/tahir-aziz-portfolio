import {NextResponse} from 'next/server';
export async function POST(request:Request){
 try{
  const data=await request.json();
  const {name,email,projectType,message,website}=data||{};
  if(website)return NextResponse.json({ok:true});
  if(!name||!email||!message||!projectType||String(name).length>120||String(message).length>5000||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email)))return NextResponse.json({error:'Please complete all fields with a valid email.'},{status:400});
  const webhook=process.env.CONTACT_WEBHOOK_URL;
  if(!webhook)return NextResponse.json({error:'Contact form is not configured yet. Please use the email link instead.'},{status:503});
  const response=await fetch(webhook,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name,email,projectType,message,source:'tahir-aziz-portfolio'}),signal:AbortSignal.timeout(10000)});
  if(!response.ok)throw new Error('Webhook rejected request');
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:'Message could not be sent. Please try again.'},{status:500})}
}
