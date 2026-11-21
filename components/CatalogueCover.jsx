"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import {useEffect,useRef} from "react";
import {gsap} from "gsap";
import {products} from "../lib/products";
import {approvedMedia,assetUrl,productAssets} from "../lib/media";
const FieldCanvas=dynamic(()=>import("./FieldCanvas"),{ssr:false});
const Viewer3D=dynamic(()=>import("./Viewer3D"),{ssr:false});
export default function CatalogueCover(){
 const cover=useRef(null),reaper=products[0],assets=productAssets("power-reaper");
 const video=assetUrl(approvedMedia.hero.video),poster=assetUrl(approvedMedia.hero.poster);
 useEffect(()=>{const ctx=gsap.context(()=>{gsap.fromTo(".catalogue-cover-copy > *",{opacity:0,y:24},{opacity:1,y:0,stagger:.13,duration:.75,ease:"power3.out"});gsap.fromTo(".catalogue-cover-machine",{opacity:0,y:32,scale:.94},{opacity:1,y:0,scale:1,duration:1.25,delay:.25,ease:"power3.out"});},cover);return()=>ctx.revert()},[]);
 return <section className="catalogue-cover" ref={cover} aria-label="RBD product catalogue 2026-27">
 <div className="catalogue-cover-field"><FieldCanvas/></div>
 {video&&<video className="catalogue-cover-film" src={video} poster={poster||undefined} autoPlay muted loop playsInline preload="metadata"/>}
 <div className="catalogue-cover-shade"/>
 <div className="container catalogue-cover-inner">
 <div className="catalogue-cover-copy"><div className="catalogue-edition"><span className="catalogue-line"/> THE OFFICIAL DIGITAL COLLECTION · 2026—27</div><p className="catalogue-label">RBD MACHINE TOOLS</p><h1>PRODUCT<br/><span>COLLECTION</span><br/>2026–27</h1><div className="catalogue-cover-rule"/><p className="catalogue-power">POWERING INDIAN FARMERS</p><Link href="#collection" className="catalogue-primary-cta">EXPLORE OUR PRODUCTS <span aria-hidden="true">↗</span></Link></div>
 <div className="catalogue-cover-machine">
 {assets.model?<Viewer3D product={reaper}/>:reaper.image?<img src={reaper.image} alt="Original RBD Power Reaper, product photograph" fetchPriority="high"/>:<div className="catalogue-authentic-pending">Verified Power Reaper media coming soon</div>}
 <div className="catalogue-machine-caption"><span>FEATURED / 01</span><strong>POWER REAPER</strong><small>{assets.model?"Interact with the authentic 3D machine":"Original RBD product photograph · 3D machine model pending"}</small></div>
 </div></div><span className="catalogue-cover-scroll">SCROLL TO DISCOVER <span aria-hidden="true">↓</span></span>
 </section>;
}
