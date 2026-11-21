"use client";
import {useEffect,useRef,useState} from "react";
import {Play,Pause,Volume2,VolumeX,Film} from "lucide-react";

export default function CinematicMedia({src=null,poster=null,title="RBD original footage",description="Approved RBD footage required",autoplay=true,contain=false,videoId="rbd-video"}){
 const el=useRef(null),root=useRef(null),[visible,setVisible]=useState(false),[muted,setMuted]=useState(true),[playing,setPlaying]=useState(false),[error,setError]=useState(false),[ready,setReady]=useState(false),[reduced,setReduced]=useState(false);
 useEffect(()=>{const media=window.matchMedia("(prefers-reduced-motion: reduce)");const onChange=()=>setReduced(media.matches);onChange();media.addEventListener?.("change",onChange);return()=>media.removeEventListener?.("change",onChange)},[]);
 useEffect(()=>{if(!src||!root.current)return;let ob=new IntersectionObserver(entries=>setVisible(entries[0].intersectionRatio>.45),{threshold:[0,.45,.85]});ob.observe(root.current);return()=>ob.disconnect()},[src]);
 useEffect(()=>{const v=el.current;if(!v||!src||error)return;if(visible&&!reduced&&autoplay){v.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false))}else{v.pause();setPlaying(false)}},[visible,src,reduced,autoplay,error]);
 async function play(){const v=el.current;if(!v)return;if(v.paused){await v.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false))}else{v.pause();setPlaying(false)}}
 async function unmute(){const v=el.current;if(!v)return;v.muted=!v.muted;setMuted(v.muted);if(v.paused){await v.play().then(()=>setPlaying(true)).catch(()=>{})}}
 const missing=!src||error;
 return <div ref={root} className={"cinema-player"+(contain?" cinema-contain":"")} role="region" aria-label={title}>
 {missing?<div className="cinema-asset-pending"><div className="cinema-pending-rings"/><Film size={32} color="#dfc382"/><strong>{title}</strong><p>{error?"This media file did not load. "+description:description}</p><span>ORIGINAL RBD MEDIA PENDING — NO STOCK OR THIRD-PARTY FOOTAGE</span></div>:<>
 {poster&&<img alt="" className="cinema-video-poster" src={poster}/>}
 <video id={videoId} ref={el} className="cinema-video" src={src} poster={poster||undefined} preload="metadata" playsInline muted loop={autoplay} onCanPlay={()=>setReady(true)} onError={()=>setError(true)} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} aria-label={title}/>
 <div className="cinema-controls"><button type="button" onClick={play} aria-label={playing?"Pause video":"Play video"}>{playing?<Pause size={17}/>:<Play size={17}/>}</button><span>{title}</span><button type="button" onClick={unmute} aria-label={muted?"Unmute video":"Mute video"}>{muted?<VolumeX size={17}/>:<Volume2 size={17}/>}</button></div>
 </>}
 </div>;
}
