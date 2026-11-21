"use client";
import {useState} from "react";import {products,crmEndpoint} from "../lib/products";
const states=["Andhra Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Gujarat","Haryana","Himachal Pradesh","Jammu & Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Odisha","Punjab","Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","Uttarakhand","West Bengal","Other"];
export default function EnquiryForm({product="",model=""}){
 const [data,setData]=useState({name:"",mobile:"",state:"",city:"",product,model,message:"",consent:false});const [status,setStatus]=useState("");
 function edit(key,value){setData(d=>({...d,[key]:value}))}
 async function submit(e){
 e.preventDefault();setStatus("");const mob=data.mobile.replace(/\D/g,"");if(mob.length!==10){setStatus("Please enter a valid 10-digit Indian mobile number.");return}if(!data.consent){setStatus("Please confirm consent to share these enquiry details with RBD.");return}
 const msg=["RBD Machine Tools — Enquiry","Name: "+data.name,"Mobile: "+mob,"State: "+data.state,"City: "+data.city,"Product: "+data.product,"Model: "+data.model,"Message: "+data.message].join("\n");
 if(crmEndpoint){try{const url=new URL(crmEndpoint);if(url.protocol!=="https:")throw Error("HTTPS required");const res=await fetch(crmEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,mobile:mob})});if(!res.ok)throw Error("CRM endpoint returned "+res.status);setStatus("Your enquiry was submitted to the configured enquiry endpoint.");return}catch(e){setStatus("CRM connection was unavailable. Opening WhatsApp as the fallback.")}}
 const url="https://wa.me/919694949030?text="+encodeURIComponent(msg);window.open(url,"_blank","noopener,noreferrer");setStatus("WhatsApp has been opened with your prepared enquiry. Press Send in WhatsApp to finish.");
 }
 return <form className="form-card" onSubmit={submit}><h3 style={{fontSize:29,letterSpacing:"-.045em"}}>Request a callback</h3><p className="muted" style={{fontSize:13}}>Share the details below. Your enquiry opens in WhatsApp unless an authorised CRM endpoint is configured.</p>
 <div className="form-grid">
 <div className="form-field"><label htmlFor="rbd-name">Full name</label><input id="rbd-name" autoComplete="name" required maxLength={80} value={data.name} onChange={e=>edit("name",e.target.value)} placeholder="Your name"/></div>
 <div className="form-field"><label htmlFor="rbd-mobile">Mobile number</label><input id="rbd-mobile" inputMode="tel" autoComplete="tel-national" required maxLength={10} value={data.mobile} onChange={e=>edit("mobile",e.target.value.replace(/\D/g,""))} placeholder="10-digit number"/></div>
 <div className="form-field"><label htmlFor="rbd-state">State</label><select id="rbd-state" required value={data.state} onChange={e=>edit("state",e.target.value)}><option value="">Choose your state</option>{states.map(s=><option key={s}>{s}</option>)}</select></div>
 <div className="form-field"><label htmlFor="rbd-city">City / District</label><input id="rbd-city" required value={data.city} onChange={e=>edit("city",e.target.value)} maxLength={70} placeholder="Your city"/></div>
 <div className="form-field"><label htmlFor="rbd-product">Product</label><select id="rbd-product" required value={data.product} onChange={e=>edit("product",e.target.value)}><option value="">Select product</option>{products.map(p=><option key={p.slug}>{p.name}</option>)}</select></div>
 <div className="form-field"><label htmlFor="rbd-model">Interested model</label><input id="rbd-model" value={data.model} maxLength={75} onChange={e=>edit("model",e.target.value)} placeholder="Model name / power"/></div>
 <div className="form-field full"><label htmlFor="rbd-message">Message</label><textarea id="rbd-message" value={data.message} maxLength={900} onChange={e=>edit("message",e.target.value)} placeholder="Share your requirement, quantity or preferred callback time"/></div>
 </div><label className="consent"><input type="checkbox" checked={data.consent} onChange={e=>edit("consent",e.target.checked)}/><span>I agree to share these details with RBD Machine Tools to respond to my enquiry. No data is stored by this static preview.</span></label>
 <button type="submit" className="btn btn-dark">Send enquiry via WhatsApp ↗</button>{status&&<p role="status" className="notice" style={{marginTop:17}}>{status}</p>}
 </form>;
}