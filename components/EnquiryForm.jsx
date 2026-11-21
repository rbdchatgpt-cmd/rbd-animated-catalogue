"use client";
import {useState} from "react";
import {products,crmEndpoint} from "../lib/products";

const states=["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu & Kashmir","Jharkhand","Karnataka","Kerala","Ladakh","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Other"];
const typeLabels=[["callback","Request callback"],["dealer","Dealership enquiry"],["bulk","FPO / bulk purchase"],["general","General enquiry"]];
export default function EnquiryForm({product="",model=""}){
 const [data,setData]=useState({name:"",mobile:"",state:"",city:"",product,model,message:"",enquiryType:"callback",consent:false,website:""});
 const [status,setStatus]=useState(null),[busy,setBusy]=useState(false);
 function edit(key,value){setData(v=>({...v,[key]:value}))}
 const validPhone=/^[6-9]\d{9}$/.test(data.mobile);
 function validate(){if(!validPhone)return "Please provide a valid Indian mobile number beginning with 6–9.";if(!data.consent)return "Please agree to share your details with RBD.";return null}
 function whatsapp(){setStatus(null);const err=validate();if(err){setStatus({ok:false,text:err});return}
 const msg=["RBD Machine Tools — "+typeLabels.find(([key])=>key===data.enquiryType)[1],"Name: "+data.name,"Mobile: "+data.mobile,"State: "+data.state,"City: "+data.city,"Product: "+data.product,"Interested model: "+data.model,"Message: "+data.message].join("\n");
 const url="https://wa.me/919694949030?text="+encodeURIComponent(msg);const a=document.createElement("a");a.href=url;a.target="_blank";a.rel="noopener noreferrer";document.body.appendChild(a);a.click();a.remove();setStatus({ok:true,text:"WhatsApp opened with your enquiry. Please tap Send there; it has not been sent automatically."});
 }
 async function submit(e){e.preventDefault();setStatus(null);const err=validate();if(err){setStatus({ok:false,text:err});return}
 if(!crmEndpoint){setStatus({ok:false,text:"Online callback storage is not connected yet. Please choose the WhatsApp button to send your request to RBD."});return}
 setBusy(true);
 try{const res=await fetch(crmEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,submittedAt:new Date().toISOString()}),signal:AbortSignal.timeout(12000)});const out=await res.json().catch(()=>({}));
 if(!res.ok||out.ok!==true){setStatus({ok:false,text:out.error||"The server could not save your enquiry. Please use WhatsApp or call RBD."});return}
 setStatus({ok:true,text:"Enquiry saved successfully. Reference: "+out.reference});}
 catch(e){setStatus({ok:false,text:"The callback server is unreachable. No submission was confirmed. Please use WhatsApp or call RBD."})}finally{setBusy(false)}
 }
 return <form className="form-card" onSubmit={submit}><h3 style={{fontSize:29,letterSpacing:"-.045em"}}>Enquire about RBD machinery</h3><p className="muted" style={{fontSize:13}}>Request a callback, ask about dealerships or bulk purchases, or prepare an enquiry directly in WhatsApp.</p>
 <div className="form-grid">
 <div className="form-field"><label htmlFor="rbd-type">Enquiry type</label><select id="rbd-type" value={data.enquiryType} onChange={e=>edit("enquiryType",e.target.value)}>{typeLabels.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></div>
 <div className="form-field"><label htmlFor="rbd-name">Full name</label><input id="rbd-name" autoComplete="name" required minLength={2} maxLength={80} value={data.name} onChange={e=>edit("name",e.target.value)} placeholder="Your name"/></div>
 <div className="form-field"><label htmlFor="rbd-mobile">Mobile number</label><input id="rbd-mobile" inputMode="numeric" autoComplete="tel-national" required minLength={10} maxLength={10} value={data.mobile} onChange={e=>edit("mobile",e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="10-digit Indian number"/></div>
 <div className="form-field"><label htmlFor="rbd-state">State</label><select id="rbd-state" required value={data.state} onChange={e=>edit("state",e.target.value)}><option value="">Select state</option>{states.map(s=><option key={s}>{s}</option>)}</select></div>
 <div className="form-field"><label htmlFor="rbd-city">City / District</label><input id="rbd-city" required minLength={2} maxLength={70} value={data.city} onChange={e=>edit("city",e.target.value)} placeholder="City / district"/></div>
 <div className="form-field"><label htmlFor="rbd-product">Product</label><select id="rbd-product" required value={data.product} onChange={e=>edit("product",e.target.value)}><option value="">Select a product</option>{products.map(p=><option key={p.slug}>{p.name}</option>)}</select></div>
 <div className="form-field"><label htmlFor="rbd-model">Interested model</label><input id="rbd-model" maxLength={100} value={data.model} onChange={e=>edit("model",e.target.value)} placeholder="HP / model if known"/></div>
 <div className="form-field full"><label htmlFor="rbd-message">Message</label><textarea id="rbd-message" maxLength={1000} value={data.message} onChange={e=>edit("message",e.target.value)} placeholder="Quantity, area, purpose or preferred callback time"/></div>
 <div className="form-field full" style={{position:"absolute",left:"-100vw",opacity:0}} aria-hidden="true"><label htmlFor="rbd-hp">Company website</label><input id="rbd-hp" tabIndex={-1} autoComplete="off" value={data.website} onChange={e=>edit("website",e.target.value)}/></div>
 </div>
 <label className="consent"><input type="checkbox" checked={data.consent} onChange={e=>edit("consent",e.target.checked)}/><span>I consent to RBD Machine Tools using these details to respond to my enquiry.</span></label>
 <div className="enquiry-actions"><button className="btn btn-dark" type="submit" disabled={busy}>{busy?"Submitting…":"Submit callback request ↗"}</button><button className="btn btn-light" type="button" onClick={whatsapp}>Prepare WhatsApp enquiry ↗</button></div>
 <p className="note" style={{marginTop:14}}>A callback is confirmed only when the secure API returns an enquiry reference. WhatsApp enquiries are sent only after you press Send in WhatsApp.</p>
 {status&&<p role="status" className={status.ok?"form-success":"notice"} style={{marginTop:16}}>{status.text}</p>}
 </form>;
