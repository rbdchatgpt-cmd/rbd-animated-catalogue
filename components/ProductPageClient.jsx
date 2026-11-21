"use client";
import {useState} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {motion} from "framer-motion";
import {ArrowRight,ArrowUpRight,Check,Play,Download,Maximize2} from "lucide-react";
import {products} from "../lib/products";
import {productAssets} from "../lib/media";
import EnquiryForm from "./EnquiryForm";
import CinematicMedia from "./CinematicMedia";

const Viewer3D=dynamic(()=>import("./Viewer3D"),{ssr:false,loading:()=> <div className="catalogue-pending-model">Loading product inspection interface…</div>});
const applications={
 harvest:"Wheat fields and harvesting environments",
 cultivate:"Agricultural soil and inter-row field work",
 trim:"Grass, vegetation and field-border environments",
 chaff:"Green fodder preparation and livestock feed",
 drill:"Plantation rows and agricultural soil",
 wood:"Controlled timber cutting environment",
 mow:"Landscaped green lawn environment",
 spray:"Agricultural crop care and spraying",
 pump:"Irrigation and water delivery",
 sow:"Seed sowing rows",
 light:"Night-time farm utility and inspection"
};
function Photo({product,className=""}){
 const [failed,setFailed]=useState(false);
 return product.image&&!failed?<img className={className} src={product.image} alt={"Original RBD "+product.name+" machine photo"} onError={()=>setFailed(true)}/>:<div className="catalogue-photo-pending"><strong>ORIGINAL PHOTO PENDING</strong><span>No generic machinery substituted</span></div>;
}
function QuickWhatsapp({product,model,label="WHATSAPP ENQUIRY",className="btn btn-outline"}){
 const url="https://wa.me/919694949030?text="+encodeURIComponent("Hello RBD Machine Tools,\nI am interested in "+product.name+".\nSelected model: "+model+".\nPlease share product details and quotation.");
 return <a href={url} target="_blank" rel="noopener noreferrer" className={className}>{label} <ArrowUpRight size={16}/></a>;
}
function IntroCinema({product,video}){
 return <section className="catalogue-intro-section" id="film"><div className="container"><div className="catalogue-section-kicker">01 / PRODUCT CINEMA</div><div className="catalogue-subhead"><h2>MEET THE<br/><em>{product.name.toUpperCase()}.</em></h2><p>An immersive look at the actual RBD machine, with original field footage supported when supplied.</p></div>
 {video?<CinematicMedia src={video} poster={product.image} title={product.name+" introduction"} description="Authorised RBD product introduction"/>:<div className="catalogue-photo-film"><div className="catalogue-photo-film-glow"/><div className="catalogue-photo-film-copy"><span>RBD ORIGINAL PRODUCT IMAGE</span><h3>{product.name.toUpperCase()}</h3><p>{product.tagline}</p><small>MOTION PHOTO PREVIEW · ORIGINAL MP4 NOT YET SUPPLIED</small></div><div className="catalogue-photo-film-machine"><Photo product={product}/></div><div className="catalogue-film-floor"/><span className="catalogue-photo-film-badge">APPROVED PRODUCT FOOTAGE REQUIRED FOR VIDEO PLAYBACK</span></div>}
 </div></section>
}
function ProductFilm({product,video}){
 const label=applications[product.scene]||"Real agricultural product working environment";
 return <section className="catalogue-work-film" id="working-video"><div className="container"><div className="catalogue-section-kicker">05 / FIELD APPLICATION</div><div className="catalogue-subhead"><h2>SEE IT<br/><em>AT WORK.</em></h2><p>{label}. Real motion footage will appear here once supplied by RBD.</p></div><CinematicMedia src={video} poster={product.image} title={product.name+" field working demonstration"} description={"An original RBD demonstration video showing "+label.toLowerCase()+" has not been supplied yet. No simulated product operation is presented as real."}/></div></section>
}
export default function ProductPageClient({product}){
 const assets=productAssets(product.slug),[model,setModel]=useState(product.models?.[0]||"Model pending"),[show3D,setShow3D]=useState(false);
 const index=products.findIndex(p=>p.slug===product.slug);
 const prev=products[(index-1+products.length)%products.length],next=products[(index+1)%products.length];
 const isReference=model===product.models[0];
 return <>
 <section className="catalogue-product-hero">
  <div className="container catalogue-breadcrumb"><Link href="/#collection">RBD COLLECTION</Link><span>/</span><span>{product.name.toUpperCase()}</span></div>
  <div className="catalogue-product-hero-shape"/>
  <div className="container catalogue-product-hero-grid"><motion.div className="catalogue-product-hero-copy" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.65}}>
   <div className="eyebrow">{product.chapter}</div><h1>{product.name.toUpperCase()}</h1><p className="catalogue-product-tagline">{product.tagline}</p><p className="catalogue-product-intro">{product.intro}</p>
   <div className="catalogue-hero-facts"><span>{product.models.length} MODEL OPTIONS</span><span>ORIGINAL RBD IDENTITY</span></div>
   <div className="catalogue-product-actions"><a className="btn btn-gold" href="#product-overview">GET PRODUCT DETAILS <ArrowRight size={16}/></a><QuickWhatsapp product={product} model={model}/><a className="btn btn-outline" href="#request-quote">REQUEST A QUOTE <ArrowRight size={16}/></a></div>
  </motion.div>
  <motion.div className="catalogue-product-hero-visual" initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} transition={{duration:.85}}><div className="catalogue-product-halo"/><Photo product={product}/><span>ACTUAL RBD MACHINE PHOTO · UNMODIFIED</span></motion.div></div>
  <div className="catalogue-hero-bottom"><span>PRODUCT COLLECTION 2026—27</span><span>SCROLL TO INSPECT ↓</span></div>
 </section>
 <nav className="product-sticky-nav" aria-label="Product catalogue sections"><div className="container"><a href="#film">INTRO</a><a href="#product-overview">OVERVIEW</a><a href="#inspection">360° VIEW</a><a href="#models">MODELS</a><a href="#specifications">SPECIFICATIONS</a><a href="#working-video">FIELD VIDEO</a><a href="#request-quote">GET QUOTE</a></div></nav>
 <IntroCinema product={product} video={assets.video}/>
 <section className="catalogue-overview-section" id="product-overview"><div className="container"><div className="catalogue-section-kicker dark">02 / THE MACHINE</div><div className="catalogue-overview-grid"><div><h2 className="catalogue-large-title">BUILT FOR<br/><em>THE TASK.</em></h2><p className="catalogue-overview-intro">{product.intro}</p><div className="catalogue-feature-list">{product.features.map((feature,i)=><div key={feature}><span>{String(i+1).padStart(2,"0")}</span><strong>{feature}</strong><Check size={18}/></div>)}</div></div><div className="catalogue-overview-visual"><Photo product={product}/><span className="catalogue-overview-cap">ORIGINAL RBD PRODUCT IMAGE</span></div></div></div></section>
 <section className="catalogue-inspection-section" id="inspection"><div className="container"><div className="catalogue-section-kicker">03 / INSPECT THE MACHINE</div><div className="catalogue-subhead"><h2>EVERY ANGLE.<br/><em>EVERY DETAIL.</em></h2><p>Zoom in on the original photograph. A true interactive 360° machine model becomes available only when its verified RBD GLB model is provided.</p></div>
 <div className="catalogue-inspection-grid"><div><Viewer3D product={product}/></div><div className="catalogue-inspection-sidebar"><div className="catalogue-details-label">PRODUCT GALLERY</div><div className="catalogue-original-photo"><Photo product={product}/></div>{assets.photos.length?assets.photos.map((src,i)=><div className="catalogue-original-photo" key={src}><img src={src} alt={"Approved RBD "+product.name+" angle "+(i+2)}/></div>):<div className="catalogue-angles-pending">ADDITIONAL ORIGINAL ANGLES PENDING<br/>UP TO 360° WHEN ASSETS ARE AVAILABLE</div>}<p className="note">Machine logos, shapes, colours and components are preserved. No generic substitutes are used.</p></div></div></div></section>
 <section className="catalogue-specs-section" id="models"><div className="container"><div className="catalogue-section-kicker dark">04 / MODELS & SPECIFICATIONS</div><div className="catalogue-subhead"><h2>CHOOSE YOUR<br/><em>CONFIGURATION.</em></h2><p>Select an available variant. Only confirmed specifications for the reference model appear; values are never transferred to other variants.</p></div>
 <div className="catalogue-model-spec-grid"><div className="catalogue-model-panel"><div className="catalogue-details-label">AVAILABLE RBD MODELS</div><div className="catalogue-variant-grid">{product.models.map((m,i)=><button type="button" aria-pressed={model===m} className={model===m?"active":""} key={m} onClick={()=>setModel(m)}><span>VARIANT {String(i+1).padStart(2,"0")}</span><strong>{m}</strong><ArrowUpRight size={17}/></button>)}</div><div className="catalogue-specs-action"><QuickWhatsapp product={product} model={model} className="btn btn-dark" label="ASK ABOUT THIS MODEL"/></div></div>
 <div className="catalogue-technical-panel" id="specifications"><div className="catalogue-details-label">TECHNICAL SPECIFICATIONS</div><h3>{model}</h3>{!isReference&&<p className="notice">The exact approved specifications for this variant are pending. Reference values from other models are intentionally hidden.</p>}
 {isReference&&product.specs.length?<div className="catalogue-technical-table">{product.specs.map(([k,v])=><div key={k}><span>{k}</span><strong>{v}</strong></div>)}</div>:isReference?<p className="notice">Verified specifications for this product have not been supplied yet.</p>:null}
 <p className="note" style={{marginTop:18}}>Source: {product.source}. Confirm your chosen model’s current specification sheet directly with RBD.</p><a className="catalogue-pdf-link" href="/RBD-Catalogue-Web.pdf" download><Download size={17}/> DOWNLOAD ORIGINAL PDF CATALOGUE</a>
 </div></div>
 <div className="catalogue-applications"><div className="catalogue-details-label">APPLICATIONS</div><div className="catalogue-applications-list">{product.applications.map((a,i)=><div key={a}><span>{String(i+1).padStart(2,"0")}</span><strong>{a}</strong></div>)}</div></div>
 </div></section>
 <ProductFilm product={product} video={assets.video}/>
 <section className="catalogue-quote-section" id="request-quote"><div className="container catalogue-quote-grid"><div className="catalogue-quote-intro"><div className="catalogue-section-kicker">06 / REQUEST A PRODUCT QUOTE</div><h2>YOUR RBD<br/><em>MACHINE.</em><br/>YOUR NEXT MOVE.</h2><p>Ask for pricing, model availability, product details and buying information. Your selected model is added automatically.</p><div className="catalogue-enquiry-preview"><span>SELECTED MACHINE</span><strong>{product.name}</strong><span>MODEL</span><strong>{model}</strong></div><a className="btn btn-outline" href="/RBD-Catalogue-Web.pdf" download>DOWNLOAD FULL CATALOGUE <Download size={16}/></a></div><EnquiryForm key={product.slug+"-"+model} product={product.name} model={model}/></div></section>
 <nav className="catalogue-product-next" aria-label="Explore other products"><Link href={"/products/"+prev.slug+"/"}><small>← PREVIOUS MACHINE</small><strong>{prev.name}</strong></Link><Link href="/#collection"><small>EXPLORE</small><strong>ALL 14 MACHINES ↗</strong></Link><Link href={"/products/"+next.slug+"/"}><small>NEXT MACHINE →</small><strong>{next.name}</strong></Link></nav>
 </>;
}
