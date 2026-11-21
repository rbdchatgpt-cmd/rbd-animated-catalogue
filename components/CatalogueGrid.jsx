"use client";
import Link from "next/link";
import {useEffect,useMemo,useRef,useState} from "react";
import {Search,ArrowUpRight} from "lucide-react";
import {gsap} from "gsap";
import {products} from "../lib/products";
const groups={
 "power-reaper":"Harvesting","power-weeder":"Cultivation","mini-tiller":"Cultivation",
 "brush-cutter":"Cutting","chaff-cutter":"Cutting","earth-auger":"Cultivation",
 "chainsaw":"Cutting","lawn-mower":"Cutting","battery-sprayer":"Crop care",
 "manual-sprayer":"Crop care","water-pump":"Crop care","hedge-trimmer":"Cutting",
 "manual-seeder":"Cultivation","chowkidar-torch":"Farm utility"
};
const filters=["All products","Harvesting","Cultivation","Cutting","Crop care","Farm utility"];
export default function CatalogueGrid({compact=false}){
 const [filter,setFilter]=useState("All products"),[search,setSearch]=useState("");
 const root=useRef(null);
 const found=useMemo(()=>products.filter(p=>(filter==="All products"||groups[p.slug]===filter)&&(p.name+" "+p.models.join(" ")+" "+p.applications.join(" ")).toLowerCase().includes(search.trim().toLowerCase())),[filter,search]);
 useEffect(()=>{let ctx;let cancelled=false;import("gsap/ScrollTrigger").then(({ScrollTrigger})=>{if(cancelled||!root.current)return;gsap.registerPlugin(ScrollTrigger);ctx=gsap.context(()=>{gsap.fromTo(".catalogue-product-card",{opacity:0,y:24},{opacity:1,y:0,duration:.6,stagger:.05,ease:"power2.out",scrollTrigger:{trigger:root.current,start:"top 85%",once:true}})},root)});return()=>{cancelled=true;ctx?.revert()}},[]);
 return <section className="catalogue-products" id="collection" ref={root}><div className="container">
 <div className="catalogue-section-heading"><div><div className="catalogue-kicker">THE COMPLETE RBD RANGE / 14 CATEGORIES</div><h2>Explore the <em>collection.</em></h2></div><p>Discover the right machine for every job. Select a category or search by model, power or application.</p></div>
 <div className="catalogue-controls"><div className="catalogue-filter-tabs" role="group" aria-label="Filter product categories">{filters.map(f=><button type="button" key={f} className={filter===f?"active":""} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}</button>)}</div><label className="catalogue-search"><Search size={17}/><span className="sr-only">Search catalogue</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find your machine…" type="search"/></label></div>
 <div className="catalogue-count">{String(found.length).padStart(2,"0")} PRODUCT FAMILIES</div>
 <div className="catalogue-product-grid">{found.map((p,i)=><Link href={"/products/"+p.slug+"/"} className="catalogue-product-card" key={p.slug} aria-label={"Explore "+p.name}>
 <div className="catalogue-card-top"><span>{p.chapter}</span><ArrowUpRight size={21}/></div>
 <div className="catalogue-card-image">{p.image?<img src={p.image} alt={"Genuine RBD "+p.name+" product"} loading="lazy"/>:<div className="catalogue-card-pending"><span>RBD ORIGINAL IMAGE</span><strong>PENDING</strong></div>}</div>
 <div className="catalogue-card-bottom"><span>{groups[p.slug]||"Agricultural equipment"}</span><h3>{p.name}</h3><div className="catalogue-card-link">VIEW PRODUCT <ArrowUpRight size={15}/></div></div></Link>)}</div>
 {!found.length&&<div className="catalogue-empty">No products match this search. Try another category or model name.</div>}
 {!compact&&<div className="catalogue-compare-prompt"><span>Choosing between machines?</span><Link href="/compare/">COMPARE PRODUCTS <ArrowUpRight size={17}/></Link></div>}
 </div></section>;
}
