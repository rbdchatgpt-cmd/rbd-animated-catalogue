"use client";
import {useEffect,useRef,useState} from "react";
import {Play,Pause,Volume2,VolumeX,Film} from "lucide-react";
export default function CinematicMedia({src=null,poster=null,title="RBD original machine video",description="Approved RBD footage required",autoplay=true,contain=false,videoId="rbd-video"}){
 const el=useRef(null),root=useRef(null);
 const [visible,setVisible]=useState(false),[muted,setMuted]=useState(true),[playing,setPlaying]=useState(false),[error,setError]=useState(false),[reduced,setReduced]=useState(false);
 useEffect(()=>{const media=window.matchMedia("(prefers-reduced-motion: reduce)");const cb=()=>setReduced(media.matches);cb();media.addEventListener?.("change",cb);return()=>media.removeEventListener?.("change",cb)},[]);
 useEffect(()=>{if(!src||!root.current)return;const observer=new IntersectionObserver(entries=>setVisible(entries[0].intersectionRatio>.45),{threshold:[0,.45,.85]});observer.observe(root.current);return()=>observer.disconnect()},[src]);
 useEffect(()=>{const v=el.current;if(!v||!src||error)return;if(visible&&!reduced&&autoplay){v.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false))}else{v.pause();setPlaying(false)}},[visible,src,reduced,autoplay,error]);
 async function play(){const v=el.current;if(!v)return;if(v.paused){await v.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false))}else{v.pause();setPlaying(false)}}
 async function unmute(){const v=el.current;if(!v)return;v.muted=!v.muted;setMuted(v.muted);if(v.paused){await v.play().then(()=>setPlaying(true)).catch(()=>{})}}
 return <div ref={root} className={"cinema-player"+(contain?" cinema-contain":"")} role="region" aria-label={title}>
 {!src||error?<div className="cinema-asset-pending">{poster&&<img className="cinema-pending-product" src={poster} alt="" loading="lazy"/>}<div className="cinema-pending-rings"/><Film size={33} color="#dfc382"/><strong>{title}</strong><p>{error?"This RBD video could not be loaded. "+description:description}</p><span>VERIFIED RBD WORKING FOOTAGE PENDING — NO STOCK OR SIMULATED OPERATION</span></div>:<>
 {poster&&<img alt="" className="cinema-video-poster" src={poster}/>}<video id={videoId} ref={el} className="cinema-video" src={src} poster={poster||undefined} preload="metadata" playsInline muted loop={autoplay} onError={()=>setError(true)} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} aria-label={title}/>
 <div className="cinema-controls"><button type="button" onClick={play} aria-label={playing?"Pause video":"Play video"}>{playing?<Pause size={17}/>:<Play size={17}/>}</button><span>{title}</span><button type="button" onClick={unmute} aria-label={muted?"Unmute video":"Mute video"}>{muted?<VolumeX size={17}/>:<Volume2 size={17}/>}</button></div>
 </>}
 </div>;
}