"use client";
import Link from "next/link";
import {useState,useRef,useEffect} from "react";
import {Menu,X,Volume2,VolumeX} from "lucide-react";
const logo="https://raw.githubusercontent.com/rbdchatgpt-cmd/rbd-animated-catalogue/main/logo-crop.png";
const links=[["Products","/products/"],["Our Journey","/story/"],["Dealers","/network/"],["Support","/service/"],["Contact","/contact/"]];
export default function Header(){
 const[open,setOpen]=useState(false),[sound,setSound]=useState(false);const audio=useRef(null);
 useEffect(()=>()=>{if(audio.current){audio.current.close().catch(()=>{})}},[]);
 async function toggleSound(){
  try{
   if(!audio.current){const C=window.AudioContext||window.webkitAudioContext;const a=new C();const osc=a.createOscillator(),gain=a.createGain(),filter=a.createBiquadFilter();osc.type="sine";osc.frequency.value=62;filter.type="lowpass";filter.frequency.value=115;gain.gain.value=.012;osc.connect(filter);filter.connect(gain);gain.connect(a.destination);osc.start();audio.current=a;}
   if(sound){await audio.current.suspend();setSound(false)}
   else{await audio.current.resume();setSound(true)}
  }catch(e){setSound(false)}
 }
 return <><header className="site-header">
  <Link href="/" className="site-logo" aria-label="RBD Machine Tools Home"><span className="logo-frame"><img src={logo} alt="RBD logo extracted from the original catalogue"/></span><span className="site-logo-text">RBD Machine Tools<br/>Powering Indian Farmers</span></Link>
  <nav className="nav-links" aria-label="Primary navigation">{links.map(([name,href])=><Link key={href} href={href}>{name}</Link>)}</nav>
  <div className="head-actions"><button type="button" onClick={toggleSound} className="sound-btn" aria-pressed={sound} title="Toggle optional synthesized ambient audio">{sound?<Volume2 size={14} style={{verticalAlign:"middle"}}/>:<VolumeX size={14} style={{verticalAlign:"middle"}}/>} <span>{sound?"Sound on":"Sound off"}</span></button><button className="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>
 </header><div className={"nav-drawer"+(open?" open":"")} aria-label="Mobile navigation">{links.map(([name,href])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{name}</Link>)}</div></>;
}