"use client";
import {useEffect,useRef,useState} from "react";
import {useReducedMotion} from "framer-motion";
import {gsap} from "gsap";
import Link from "next/link";
import {products} from "../lib/products";
import {approvedMedia,assetUrl} from "../lib/media";

export default function HeroExperience(){
 const root=useRef(null),machine=useRef(null),video=useRef(null),[videoFailed,setVideoFailed]=useState(false),[sound,setSound]=useState(false);
 const reduced=useReducedMotion(),p=products[0],src=assetUrl(approvedMedia.hero.video),poster=assetUrl(approvedMedia.hero.poster)||p.image;
 useEffect(()=>{if(reduced||!root.current)return;const ctx=gsap.context(()=>{gsap.fromTo(".hero-copy>*",{opacity:0,y:32},{opacity:1,y:0,stagger:.13,duration:.9,ease:"power3.out"});gsap.to(machine.current,{y:-13,rotate:-.4,duration:4,repeat:-1,yoyo:true,ease:"sine.inOut"});},root);return()=>ctx.revert()},[reduced]);
 async function enableFilmAudio(){try{if(!video.current)return;video.current.muted=false;await video.current.play();setSound(true)}catch(e){setSound(false)}}
 return <section className="hero" ref={root}>
 {src&&!videoFailed&&<video className="film-bg-video" ref={video} src={src} poster={poster||undefined} muted playsInline autoPlay loop preload="metadata" onError={()=>setVideoFailed(true)} aria-label="RBD supplied field film"/>}
 <div className="hero-rim"/><div className="cinema-veil"/>
 {!src&&<div className="hero-field-scene" aria-hidden="true">{Array.from({length:45},(_,i)=><span className="wheat-blade" key={i} style={{left:(i*37%100)+"%", "--height":((i*31)%79)+"px","--speed":((i*3)%17/10)+"s",animationDelay:-i*.17+"s"}}/>)}{Array.from({length:13},(_,i)=><span className="cinema-dust" key={"d"+i} style={{left:(i*61)%96+"%",top:(i*37)%84+"%",animationDelay:-i*.58+"s"}}/>)}</div>}
 <div className="container hero-grid"><div className="hero-copy"><div className="eyebrow">A cinematic RBD machine experience</div><h1>POWERING<br/><span className="gold">INDIAN</span><br/>FARMERS.</h1><p>Innovating Agriculture. Empowering Farmers. Building India's Future. Explore original RBD equipment and its real-world applications.</p>
 <div className="hero-cta"><Link className="btn btn-gold" href="/products/">Explore Products ↗</Link><Link className="btn btn-outline" href="/story/">Discover Our Story</Link></div>
 <div className="hero-meta"><span>Established 2020</span><span>Shark Tank India S4</span><span>Jaipur • India</span></div></div>
 <div className="hero-visual"><div className="hero-sun"/><div ref={machine} style={{width:"100%",height:"90%",display:"grid",placeItems:"center"}}>{p.image?<img alt="Original RBD Power Reaper product photograph, unmodified" src={p.image}/>:<div className="media-unavailable">Verified original product image pending</div>}</div><span className="hero-note">{src&&!videoFailed?"RBD APPROVED VIDEO":"CONCEPT SCENE · WORKING FOOTAGE PENDING"}</span></div></div>
 <div className="hero-scroll">SCROLL TO EXPLORE ↓</div>{src&&!videoFailed&&!sound&&<button className="btn btn-gold" style={{position:"absolute",right:"4%",bottom:25,zIndex:5}} type="button" onClick={enableFilmAudio}>Enter with film sound ↗</button>}
 </section>;
}
