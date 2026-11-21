"use client";
import {useEffect,useRef,useState} from "react";
import {motion,useReducedMotion} from "framer-motion";
import {gsap} from "gsap";
import Link from "next/link";
import {products,mediaBase} from "../lib/products";
export default function HeroExperience(){
 const root=useRef(null),machine=useRef(null),video=useRef(null);
 const[playing,setPlaying]=useState(false),[enter,setEnter]=useState(false),[videoFailed,setVideoFailed]=useState(false);
 const reduced=useReducedMotion(),p=products[0],src=mediaBase?mediaBase.replace(/\/$/,"")+"/hero-reaper.mp4":null;
 useEffect(()=>{
 if(reduced||!root.current)return;
 const ctx=gsap.context(()=>{
 gsap.fromTo(".hero-copy>*",{opacity:0,y:32},{opacity:1,y:0,stagger:.12,duration:.95,ease:"power3.out"});
 gsap.to(machine.current,{y:-19,duration:3.8,repeat:-1,yoyo:true,ease:"sine.inOut"});
 },root);
 return ()=>ctx.revert();
 },[reduced]);
 function enterSound(){setEnter(true);if(video.current){video.current.muted=false;video.current.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false))}}
 return <section className="hero" ref={root}>
 {src&&!videoFailed&&<video className="film-bg-video" ref={video} muted loop playsInline autoPlay preload="metadata" poster={p.image||undefined} onError={()=>setVideoFailed(true)} aria-label="RBD original field demonstration video"/>}
 <div className="hero-rim"/><div className="hero-wheat"/><div className="container hero-grid"><div className="hero-copy">
 <div className="eyebrow">An immersive RBD experience</div><h1>POWERING<br/><span className="gold">INDIAN</span><br/>FARMERS.</h1>
 <p>Innovating Agriculture. Empowering Farmers. Building India's Future. Explore real RBD equipment through a new digital experience.</p>
 <div className="hero-cta"><Link className="btn btn-gold" href="/products/">Explore Products ↗</Link><Link className="btn btn-outline" href="/story/">Discover Our Story</Link></div>
 <div className="hero-meta"><span>Established 2020</span><span>Shark Tank India S4</span><span>Jaipur • India</span></div></div>
 <div className="hero-visual"><div className="hero-sun"/><div ref={machine} style={{width:"100%",height:"90%",display:"grid",placeItems:"center"}}>{p.image?<img alt="Original RBD Power Reaper product photograph" src={p.image}/>:<div className="media-unavailable">Verified product image pending</div>}</div><span className="hero-note">VISUAL CONCEPT · NOT FIELD FOOTAGE</span></div></div>
 <div className="hero-scroll">SCROLL TO EXPLORE ↓</div>
 {src&&!playing&&!enter&&<button type="button" className="btn btn-gold" style={{position:"absolute",bottom:25,right:"4%",zIndex:4}} onClick={enterSound}>Enter with film sound</button>}
 </section>;
}