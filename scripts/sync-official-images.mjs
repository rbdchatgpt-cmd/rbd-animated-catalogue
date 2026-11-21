// Build-time asset import from user-owned RBD product pages only.
// Outputs /public/media/*.webp and an explicit manifest. Never guesses a machine photo.
import fs from "node:fs/promises";
import path from "node:path";
const origin="https://www.rbdmachine.com";
const targets={
 "mini-tiller":"/rbd-mini-tiller-3hprbd-mt-3hp",
 "chainsaw":"/rbd-62cc-chain-sawrbd-cs-62cc",
 "lawn-mower":"/lawn-mowerrbd-lm18",
 "battery-sprayer":"/18l-backpack-battery-sprayerrbd-18l-bs",
 "manual-sprayer":"/rbd-manual-sprayerrbd-ms",
 "water-pump":"/water-pump-3x3rbd-wp-3",
 "hedge-trimmer":"/hedge-trimmer-cutterrbd-ht",
 "chowkidar-torch":"/torchrbd-ct-2"
};
const dir=new URL("../public/media/",import.meta.url), manifestPath=new URL("../lib/official-images.json",import.meta.url);
await fs.mkdir(dir,{recursive:true});
const result={};
const decode=v=>v.replaceAll("&amp;","&").replaceAll("&#x2F;","/").replaceAll("&quot;",'"');
function extractTag(html,name){
 const tags=html.match(/<meta\b[^>]*>/gi)||[];
 for(const t of tags){if(!new RegExp("(?:property|name)=[\\\"']"+name+"[\\\"']","i").test(t))continue;const m=t.match(/content=[\x22\x27]([^\x22\x27]+)[\x22\x27]/i);if(m)return decode(m[1])}
 return null;
}
async function fetchSafe(url,timeout=12000){
 const ctl=new AbortController();const timer=setTimeout(()=>ctl.abort(),timeout);
 try{return await fetch(url,{signal:ctl.signal,redirect:"follow",headers:{"User-Agent":"RBD-Owned-Product-Asset-Sync/1.0 (+https://www.rbdmachine.com)"}})}finally{clearTimeout(timer)}
}
for(const [slug,productPath] of Object.entries(targets)){
 try{
 const page=await fetchSafe(origin+productPath);
 if(!page.ok)throw Error("page HTTP "+page.status);
 const html=await page.text();
 let image=extractTag(html,"og:image")||extractTag(html,"twitter:image");
 if(!image)throw Error("verified product meta image absent");
 const u=new URL(image,origin);if(!["www.rbdmachine.com","rbdmachine.com"].includes(u.hostname))throw Error("image not hosted by RBD");
 if(!u.pathname.includes("/img/"))throw Error("image path is not a product image");
 const res=await fetchSafe(u.toString(),15000);
 if(!res.ok)throw Error("image HTTP "+res.status);
 const type=res.headers.get("content-type")||"";
 if(!/^image\/(webp|jpeg|png)/i.test(type))throw Error("unrecognised image type: "+type);
 const bytes=new Uint8Array(await res.arrayBuffer());
 if(bytes.length<1200||bytes.length>8000000)throw Error("image outside size limits");
 const ext=type.toLowerCase().includes("webp")?"webp":type.toLowerCase().includes("png")?"png":"jpg";
 const filename=slug+"."+ext;
 await fs.writeFile(new URL(filename,dir),bytes);
 result[slug]="/media/"+filename;
 console.log("[RBD media]",slug,"imported",Math.ceil(bytes.length/1024)+"KB",u.hostname);
 }catch(e){console.log("[RBD media]",slug,"pending:",e.message)}
}
await fs.writeFile(manifestPath,JSON.stringify(result,null,2)+"\n");
console.log("RBD image import complete:",Object.keys(result).length,"verified files.");
