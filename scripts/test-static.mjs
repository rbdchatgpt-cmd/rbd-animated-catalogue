import fs from "node:fs/promises";
import path from "node:path";
const slugs=["power-reaper","power-weeder","mini-tiller","brush-cutter","chaff-cutter","earth-auger","chainsaw","lawn-mower","battery-sprayer","manual-sprayer","water-pump","hedge-trimmer","manual-seeder","chowkidar-torch"];
const routes=["","products","compare",...slugs.map(s=>"products/"+s)];
let failures=[];
for(const route of routes){try{const page=await fs.readFile(path.join("out",route,"index.html"),"utf8");if(!page.includes("<html")||!page.includes("RBD"))throw Error("Expected catalogue HTML is missing")}catch(e){failures.push((route||"/")+": "+e.message)}}
for(const file of ["sitemap.xml","robots.txt","RBD-Catalogue-Web.pdf","rbd-logo.png"]){try{await fs.stat(path.join("out",file))}catch{failures.push(file+" not exported")}}
try{const images=JSON.parse(await fs.readFile("lib/official-images.json","utf8"));for(const image of Object.values(images))await fs.stat(path.join("out",image.replace(/^\//,"")))}catch(e){failures.push("RBD original image source: "+e.message)}
for(const route of ["story","about","network","service","contact"]){try{await fs.stat(path.join("out",route,"index.html"));failures.push("Corporate route remains: "+route)}catch{}}
if(failures.length){console.error("[RBD CATALOGUE QUALITY GATE] FAILED\n"+failures.join("\n"));process.exit(1)}
console.log("[RBD CATALOGUE QUALITY GATE] PASS: "+routes.length+" product-focused routes and original assets.");