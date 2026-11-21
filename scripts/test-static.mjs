import fs from "node:fs/promises";import path from "node:path";
const slugs=["power-reaper","power-weeder","mini-tiller","brush-cutter","chaff-cutter","earth-auger","chainsaw","lawn-mower","battery-sprayer","manual-sprayer","water-pump","hedge-trimmer","manual-seeder","chowkidar-torch"];
const routes=["","products","story","about","compare","contact","network","service",...slugs.map(s=>"products/"+s)];
let failures=[];
for(const route of routes){
 const file=path.join("out",route,"index.html");
 try{const page=await fs.readFile(file,"utf8");if(!page.includes("RBD")||!page.includes("<html"))throw Error("HTML content missing");}
 catch(e){failures.push(route||"/"+": "+e.message)}
}
for(const name of ["sitemap.xml","robots.txt"]){try{await fs.stat(path.join("out",name))}catch(e){failures.push(name+" missing")}}
try{const imageManifest=JSON.parse(await fs.readFile("lib/official-images.json","utf8"));for(const file of Object.values(imageManifest)){await fs.stat(path.join("out",file.replace(/^\//,"")))}}
catch(e){failures.push("RBD image manifest: "+e.message)}
if(failures.length){console.error("[RBD QUALITY GATE] FAILED\n"+failures.join("\n"));process.exit(1)}
console.log("[RBD QUALITY GATE] PASS: "+routes.length+" routes, "+slugs.length+" product pages, sitemap, robots and sourced image assets.");
