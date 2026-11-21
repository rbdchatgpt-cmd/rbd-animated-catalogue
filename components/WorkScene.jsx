"use client";
import Link from "next/link";
import {products} from "../lib/products";
import {productAssets} from "../lib/media";
import CinematicMedia from "./CinematicMedia";
const scenes=[
 {slug:"power-reaper",title:"Golden wheat harvest",detail:"Follow the reaper through a wheat field.",theme:"harvest"},
 {slug:"power-weeder",title:"Crop-row cultivation",detail:"Cultivating and loosening soil between rows.",theme:"cultivation"},
 {slug:"brush-cutter",title:"Grass and vegetation care",detail:"Managing green vegetation and field borders.",theme:"grass"},
 {slug:"chaff-cutter",title:"Fodder processing",detail:"Green fodder feeding into the cutter and collecting the output.",theme:"fodder"},
 {slug:"earth-auger",title:"Plantation preparation",detail:"Drilling a planting hole in agricultural soil.",theme:"soil"},
 {slug:"chainsaw",title:"Wood cutting",detail:"Carefully controlled wood-cutting demonstrations.",theme:"wood"},
 {slug:"lawn-mower",title:"Lawn maintenance",detail:"Even mowing across a green lawn.",theme:"lawn"},
 {slug:"battery-sprayer",title:"Crop spraying",detail:"Application across crops using the actual RBD sprayer.",theme:"spray"}
];
export default function WorkScene(){
return <section className="work-section" id="field-applications"><div className="container"><div className="eyebrow dark">Field applications</div><h2 className="section-heading">Every machine.<br/>Its own environment.</h2><p className="muted" style={{maxWidth:800,marginBottom:35}}>The environments below are stylised visual chapters, not simulated footage of a machine operating. Each chapter is ready for its own approved RBD work video; only footage supplied by RBD will appear as actual operation.</p>
<div className="work-cards">{scenes.map((scene,i)=>{const p=products.find(x=>x.slug===scene.slug);const video=productAssets(scene.slug).video;return <article className="work-card cinematic-field-card" key={scene.slug}>
 <div className={"field-scene-preview theme-"+scene.theme}>
 {video?<CinematicMedia src={video} poster={p.image} title={p.name+" field work"} description="Original machine demonstration" autoplay/>:<><div className="field-sky"/><div className="field-floor"/><div className="field-stage-number">{String(i+1).padStart(2,"0")}</div>{p.image&&<img src={p.image} alt={"Authentic RBD "+p.name+" product photograph, concept backdrop only"} loading="lazy"/>}<span className="field-scene-caption">CONCEPT / FIELD FOOTAGE PENDING</span></>}
 </div><div className="work-card-content"><span className="eyebrow dark" style={{fontSize:9}}>0{i+1} · {p.name}</span><h3>{scene.title}</h3><p>{scene.detail}</p><Link href={"/products/"+scene.slug+"/"} className="work-details">Explore the machine ↗</Link></div>
 </article>})}</div></div></section>;
}
