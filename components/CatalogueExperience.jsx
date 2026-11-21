"use client";
import Link from "next/link";
import {useEffect,useMemo,useRef,useState} from "react";
import {gsap} from "gsap";
import {ArrowUpRight,ArrowDown,Search,SlidersHorizontal} from "lucide-react";
import {products} from "../lib/products";

const family={
 "power-reaper":"Harvesting","power-weeder":"Cultivation","mini-tiller":"Cultivation",
 "brush-cutter":"Cutting","chaff-cutter":"Cutting","earth-auger":"Cultivation",
 "chainsaw":"Cutting","lawn-mower":"Cutting","battery-sprayer":"Crop Care","manual-sprayer":"Crop Care",
 "water-pump":"Crop Care","hedge-trimmer":"Cutting","manual-seeder":"Cultivation",
 "chowkidar-torch":"Farm Utility"
};
const filters=["All machines","Harvesting","Cultivation","Cutting","Crop Care","Farm Utility"];

function RealProductPhoto({product,className=""}){
 const [failed,setFailed]=useState(false);
 return product.image&&!failed?<img className={className} alt={"Original RBD "+product.name+" product photograph"} src={product.image} loading="lazy" onError={()=>setFailed(true)}/>:<div className="catalogue-photo-pending"><span>ORIGINAL RBD PRODUCT PHOTO</span><strong>ASSET PENDING</strong></div>;
}
function CategoryCard({p,i}){
 return <Link href={"/products/"+p.slug+"/"} className="catalogue-product-card" aria-label={"Explore "+p.name}>
  <div className="catalogue-card-head"><span>RBD / {String(i+1).padStart(2,"0")}</span><span>{family[p.slug]}</span></div>
  <div className="catalogue-card-media"><span className="catalogue-card-orbit"/><RealProductPhoto product={p}/></div>
  <div className="catalogue-card-info"><div><h3>{p.name}</h3><p>{p.tagline}</p></div><div className="catalogue-card-arrow"><ArrowUpRight size={21}/></div></div>
  <div className="catalogue-card-foot"><span>{p.models?.length||0} {p.models?.length===1?"model":"model options"}</span><span>EXPLORE MACHINE</span></div>
 </Link>
}
function FeaturedProduct({p,i}){
 return <Link href={"/products/"+p.slug+"/"} className={"catalogue-featured feature-"+i}>
 <div className="catalogue-featured-copy"><span className="eyebrow">THE PRODUCT COLLECTION / 0{i+1}</span><h3>{p.name}</h3><p>{p.tagline}</p><span className="catalogue-featured-link">EXPLORE THE MACHINE <ArrowUpRight size={16}/></span></div>
 <div className="catalogue-featured-media"><span className="featured-orbit"/><RealProductPhoto product={p}/></div>
 </Link>
}
export default function CatalogueExperience({collectionOnly=false}){
 const root=useRef(null),machine=useRef(null);
 const [filter,setFilter]=useState("All machines"),[query,setQuery]=useState("");
 const visible=useMemo(()=>products.filter(p=>(filter==="All machines"||family[p.slug]===filter)&&(p.name+" "+p.models.join(" ")+" "+p.applications.join(" ")).toLowerCase().includes(query.trim().toLowerCase())),[filter,query]);
 useEffect(()=>{
  if(!root.current)return;
  if(window.matchMedia("(prefers-reduced-motion:reduce)").matches)return;
  let scope=gsap.context(()=>{
    gsap.fromTo(".catalogue-cover-copy > *",{y:30,opacity:0},{y:0,opacity:1,duration:.85,stagger:.12,ease:"power3.out",delay:.13});
    if(machine.current)gsap.to(machine.current,{y:-15,rotate:-1.1,duration:4.2,repeat:-1,yoyo:true,ease:"sine.inOut"});
  },root);
  return ()=>scope.revert();
 },[]);
 return <div className="catalogue-experience" ref={root}>
 {!collectionOnly&&<><section className="catalogue-cover" id="catalogue-cover">
  <div className="catalogue-field-graphics" aria-hidden="true"><div className="catalogue-field-horizon"/><div className="catalogue-field-row row-a"/><div className="catalogue-field-row row-b"/><div className="catalogue-field-row row-c"/>{Array.from({length:27},(_,i)=><span className="catalogue-wheat-stem" key={i} style={{left:((i*31)%100)+"%",height:(55+(i*13)%91)+"px",animationDelay:-(i*0.27)+"s"}}/>)}</div>
  <div className="container catalogue-cover-grid"><div className="catalogue-cover-copy"><div className="eyebrow">RBD MACHINE TOOLS</div><p className="catalogue-edition">THE OFFICIAL DIGITAL COLLECTION</p><h1>PRODUCT<br/><em>COLLECTION</em><br/>2026—27</h1><div className="catalogue-cover-rule"/><p className="catalogue-cover-tagline">POWERING INDIAN FARMERS.</p><Link className="catalogue-cover-button" href="#collection">EXPLORE OUR PRODUCTS <ArrowDown size={18}/></Link></div>
  <div className="catalogue-cover-visual"><div className="catalogue-cover-sun"/><div className="catalogue-cover-orbit orbit-first"/><div className="catalogue-cover-orbit orbit-second"/><div ref={machine} className="catalogue-cover-machine"><RealProductPhoto product={products[0]} className="catalogue-cover-product"/></div><span className="catalogue-machine-label">ORIGINAL RBD POWER REAPER · PHOTO-BASED MOTION PREVIEW</span></div></div>
  <div className="catalogue-cover-bottom"><span>RBD PRODUCT COLLECTION</span><span>14 MACHINE FAMILIES</span><span>SCROLL TO DISCOVER ↓</span></div>
 </section>
 <section className="catalogue-featured-section"><div className="container"><div className="catalogue-heading-row"><div><div className="eyebrow dark">01 / SIGNATURE MACHINES</div><h2>Built to move<br/>the field forward.</h2></div><p>The catalogue starts with the machines farmers reach for most. Every product is shown with its original RBD identity.</p></div><div className="catalogue-featured-grid">{[products[0],products[1],products[3]].map((p,i)=><FeaturedProduct p={p} i={i} key={p.slug}/>)}</div></div></section></>}
 <section className="catalogue-collection" id="collection"><div className="container"><div className="catalogue-heading-row"><div><div className="eyebrow dark">{collectionOnly?"RBD MACHINE TOOLS":"02 / EXPLORE THE COLLECTION"}</div><h2>Every RBD machine.<br/><em>One digital collection.</em></h2></div><p>Explore available models, view technical details, examine original machinery images and send an enquiry.</p></div>
 <div className="catalogue-filters"><div className="catalogue-filter-buttons" role="group" aria-label="Filter product categories">{filters.map(f=><button type="button" key={f} className={filter===f?"active":""} onClick={()=>setFilter(f)} aria-pressed={filter===f}>{f}</button>)}</div><div className="catalogue-filter-search"><Search size={17}/><input aria-label="Search machines and models" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name or HP…"/></div></div>
 <div className="catalogue-collection-count">SHOWING {String(visible.length).padStart(2,"0")} / 14 RBD MACHINE CATEGORIES</div>
 <div className="catalogue-products-grid">{visible.map(p=><CategoryCard p={p} i={products.indexOf(p)} key={p.slug}/>)}</div>
 {visible.length===0&&<div className="catalogue-no-results">No machines match your search. <button type="button" onClick={()=>{setFilter("All machines");setQuery("")}}>Show all products</button></div>}
 </div></section>
 <section className="catalogue-compare-teaser"><div className="container catalogue-compare-row"><div><span className="eyebrow">SPECIFICATION COMPARISON</span><h2>Find the right<br/><em>RBD machine.</em></h2><p>Compare up to three machine categories and their reference-model specifications without mixing variant data.</p></div><Link href="/compare/" className="btn btn-gold">COMPARE PRODUCTS <ArrowUpRight size={17}/></Link></div></section>
 </div>;
}
