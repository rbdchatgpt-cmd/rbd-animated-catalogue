"use client";
import {useState} from "react";import {motion} from "framer-motion";
import CinematicMedia from "./CinematicMedia";
import {storyAssets} from "../lib/media";
const chapters=[
 {year:"2020",label:"01 / THE BEGINNING",name:"The vision takes shape.",desc:"RBD Machine Tools was established in Rajasthan, with a focus on making farming equipment more accessible.",asset:"intro",kind:"Company-owned founding footage"},
 {year:"2020 — ONWARD",label:"02 / THE FOUNDERS",name:"The people behind RBD.",desc:"Bhupendra Kumar Tailor and Devendra Kumar Tailor developed the RBD business around practical agricultural machinery.",asset:"founders",kind:"Approved founder interview"},
 {year:"THE EARLY YEARS",label:"03 / THE FACTORY",name:"Built through persistence.",desc:"Share RBD's authentic early manufacturing challenges and workshop development through company-owned photographs and footage. Specific incidents await RBD source material.",asset:"workshop",kind:"Original factory and manufacturing clips"},
 {year:"2025",label:"04 / SHARK TANK INDIA S4",name:"A national platform.",desc:"RBD appeared on Shark Tank India Season 4. Once licensed company-owned clips are supplied, this chapter can show the founders' actual pitch highlights.",asset:"pitch",kind:"Authorised Shark Tank India highlights"},
 {year:"2025",label:"05 / THE CONVERSATION",name:"Speaking with investors.",desc:"The investor interaction chapter awaits the approved original clips and RBD's verified account of the discussion. No dialogue is invented here.",asset:"investors",kind:"Approved investor interaction footage"},
 {year:"THE FUTURE",label:"06 / WHAT COMES NEXT",name:"Building for Indian farmers.",desc:"RBD's product collection continues across harvesting, cultivation, spraying, fodder and farm care. The next chapter belongs to documented team and farmer stories.",asset:"growth",kind:"Documented company growth and future vision"}
];
export default function DocumentaryExperience(){
 const assets=storyAssets(),[active,setActive]=useState(0),c=chapters[active];
 return <div className="doc-experience"><div className="doc-selector" aria-label="RBD documentary chapters">{chapters.map((ch,i)=><button type="button" aria-pressed={active===i} className={active===i?"active":""} key={ch.label} onClick={()=>setActive(i)}><small>{ch.label}</small><strong>{ch.name}</strong></button>)}</div>
 <div className="doc-main"><div className="doc-details"><div className="eyebrow">{c.year}</div><motion.div key={active} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.42}}><h2>{c.name}</h2><p>{c.desc}</p></motion.div><p className="doc-timeline-count">CHAPTER {String(active+1).padStart(2,"0")} OF 06</p>
 <div className="doc-progress">{chapters.map((x,i)=><button key={i} className={i===active?"active":""} onClick={()=>setActive(i)} aria-label={"Go to chapter "+(i+1)}/>)}</div></div>
 <CinematicMedia key={active} title={c.kind} src={assets[c.asset]} poster={assets.poster} description={"Upload RBD-owned "+c.kind.toLowerCase()+" for this chapter."} videoId={"chapter-"+active}/>
 </div></div>;
}
