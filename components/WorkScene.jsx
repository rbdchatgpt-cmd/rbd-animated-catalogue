"use client";
import {products,mediaBase} from "../lib/products";
import {useState} from "react";
const samples=[
["power-reaper","Harvesting wheat","Scene awaiting original RBD harvesting footage"],
["power-weeder","Inter-row cultivation","Scene awaiting original RBD field video"],
["brush-cutter","Grass clearance","Scene awaiting original RBD working video"],
["earth-auger","Planting holes","Scene awaiting original RBD earth drilling footage"],
["chaff-cutter","Fodder preparation","Scene awaiting original RBD chaff processing footage"],
["chainsaw","Wood cutting","Scene awaiting original RBD chainsaw footage"],
["lawn-mower","Green lawn care","Scene awaiting original RBD mower footage"],
["battery-sprayer","Crop application","Scene awaiting original RBD spray footage"]
];
export default function WorkScene(){
 return <section className="work-section"><div className="container"><div className="eyebrow dark">Field applications</div><h2 className="section-heading">The work behind the machines.</h2><p className="muted" style={{maxWidth:660,marginBottom:38}}>Product-specific footage will play here once approved RBD field clips are uploaded. These illustrations use actual product photography with a stylised field background and are not real operation footage.</p>
 <div className="work-cards">{samples.map(([slug,title,note])=>{let p=products.find(x=>x.slug===slug);return <article className="work-card" key={slug}><div className="work-illustration"><span className="sky"/><span className="field"/>{p?.image&&<img src={p.image} alt={"RBD "+p.name+" product image"} loading="lazy"/>}</div><h3>{title}</h3><p>{p?.name}</p><div className="work-label">{note}</div></article>})}</div></div></section>;
}