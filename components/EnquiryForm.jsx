"use client";
import {useRef,useState} from "react";
import {products,crmEndpoint} from "../lib/products";

export default function EnquiryForm({product="",model=""}){
 const ref=useRef(null);
 const [data,setData]=useState({name:"",mobile:"",city:"",product,model,message:"",consent:false,website:""});
 const [status,setStatus]=useState(null),[busy,setBusy]=useState(false);
 function edit(key,v){setData(d=>({...d,[key]:v}))}
 function validate(){if(!ref.current?.reportValidity())return "Please complete the required fields.";if(!/^[6-9]\d{9}$/.test(data.mobile))return "Please enter a valid 10-digit Indian mobile number.";if(!data.consent)return "Please provide consent to share the enquiry with RBD.";return null}
 function prepareMessage(){return ["RBD MACHINE TOOLS — PRODUCT QUOTATION REQUEST","Name: "+data.name,"Mobile: "+data.mobile,"City: "+data.city,"Product: "+data.product,"Interested model: "+(data.model||"Please advise"),"Requirement: "+(data.message||"Please send product price and details")].join("\n")}
 function whatsapp(){setStatus(null);const err=validate();if(err){setStatus({ok:false,text:err});return}
 const url="https://wa.me/919694949030?text="+encodeURIComponent(prepareMessage());const a=document.createElement("a");a.href=url;a.target="_blank";a.rel="noopener noreferrer";document.body.appendChild(a);a.click();a.remove();
 setStatus({ok:true,text:"WhatsApp has opened with your quotation request. Press Send in WhatsApp to deliver it to RBD."});
 }
 async function submit(e){e.preventDefault();setStatus(null);const err=validate();if(err){setStatus({ok:false,text:err});return}
 if(!crmEndpoint){setStatus({ok:false,text:"The online quotation database is not connected. Please use 'Request quote on WhatsApp' instead."});return}
 setBusy(true);
 try{
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),14000);
 let response;try{response=await fetch(crmEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,enquiryType:"quote",submittedAt:new Date().toISOString()}),signal:controller.signal})}finally{clearTimeout(timer)}
 const result=await response.json().catch(()=>({}));
 if(!response.ok||result.ok!==true){setStatus({ok:false,text:result.error||"The quotation server could not confirm your request. You can send it via WhatsApp instead."});return}
 setStatus({ok:true,text:"RBD quotation request received. Your reference is "+result.reference+"."});
 }catch(e){setStatus({ok:false,text:"Online submission could not be confirmed. Please choose the WhatsApp quotation option."})}finally{setBusy(false)}
 }
 return <form ref={ref} className="form-card catalogue-quote-form" onSubmit={submit} id="quote-form"><div className="eyebrow dark">RBD PRODUCT ENQUIRY</div><h3>REQUEST A QUOTE.</h3><p>Enter your details and selected machine. Request a quotation directly via WhatsApp, or submit it to RBD's online enquiry system when available.</p>
 <div className="form-grid">
 <div className="form-field"><label htmlFor="rbd-name">Name *</label><input id="rbd-name" required minLength={2} maxLength={80} autoComplete="name" value={data.name} onChange={e=>edit("name",e.target.value)} placeholder="Your full name"/></div>
 <div className="form-field"><label htmlFor="rbd-mobile">Mobile number *</label><input id="rbd-mobile" inputMode="numeric" required pattern="[6-9][0-9]{9}" minLength={10} maxLength={10} autoComplete="tel-national" value={data.mobile} onChange={e=>edit("mobile",e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="10-digit mobile"/></div>
 <div className="form-field"><label htmlFor="rbd-city">City *</label><input id="rbd-city" required minLength={2} maxLength={70} autoComplete="address-level2" value={data.city} onChange={e=>edit("city",e.target.value)} placeholder="City / district"/></div>
 <div className="form-field"><label htmlFor="rbd-product">Selected product *</label><select id="rbd-product" required value={data.product} onChange={e=>edit("product",e.target.value)}><option value="">Choose product</option>{products.map(p=><option key={p.slug} value={p.name}>{p.name}</option>)}</select></div>
 <div className="form-field full"><label htmlFor="rbd-model">Selected model</label><input id="rbd-model" maxLength={100} value={data.model} onChange={e=>edit("model",e.target.value)} placeholder="HP / model / variant"/></div>
 <div className="form-field full"><label htmlFor="rbd-message">Message</label><textarea id="rbd-message" maxLength={1000} value={data.message} onChange={e=>edit("message",e.target.value)} placeholder="Quantity, application, preferred delivery location or any questions"/></div>
 <div className="form-field" style={{position:"absolute",left:"-100vw",opacity:0}} aria-hidden="true"><label htmlFor="rbd-honeypot">Company website</label><input id="rbd-honeypot" tabIndex={-1} autoComplete="off" value={data.website} onChange={e=>edit("website",e.target.value)}/></div>
 </div>
 <label className="consent"><input type="checkbox" checked={data.consent} onChange={e=>edit("consent",e.target.checked)}/><span>I agree that RBD Machine Tools may use these details to respond to my quotation enquiry.</span></label>
 <div className="enquiry-actions"><button className="btn btn-gold" type="button" onClick={whatsapp}>REQUEST QUOTE ON WHATSAPP ↗</button><button className="btn btn-dark" type="submit" disabled={busy}>{busy?"SENDING…":"SUBMIT ONLINE ↗"}</button></div>
 <p className="note">WhatsApp enquiries are sent only after you press Send. Online submission is confirmed only when RBD's backend returns a reference number.</p>
 {status&&<p role="status" className={status.ok?"form-success":"notice"}>{status.text}</p>}
 </form>;
}
