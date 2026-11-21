import {spawn} from "node:child_process";
import {setTimeout as sleep} from "node:timers/promises";
const PORT=19433,base="http://127.0.0.1:"+PORT;
const child=spawn(process.execPath,["server.mjs"],{cwd:process.cwd(),env:{...process.env,PORT:String(PORT),DATABASE_URL:"",ALLOWED_ORIGINS:"http://example.test",NODE_ENV:"test"},stdio:["ignore","pipe","pipe"]});
let logs="";child.stdout.on("data",d=>logs+=d.toString());child.stderr.on("data",d=>logs+=d.toString());
async function ready(){for(let i=0;i<70;i++){try{let r=await fetch(base+"/health");if(r.ok)return await r.json()}catch(e){}await sleep(100)}throw Error("Health endpoint failed: "+logs)}
async function run(){
 const health=await ready();if(!health.ok||health.databaseConnected!==false)throw Error("Health status inconsistent");
 const opts={method:"POST",headers:{"Content-Type":"application/json","Origin":"http://example.test"}};
 let r=await fetch(base+"/api/enquiries",{...opts,body:JSON.stringify({name:"X"})});if(r.status!==400)throw Error("Invalid enquiry must return HTTP 400");
 const valid={name:"Test Buyer",mobile:"9999999999",state:"Rajasthan",city:"Jaipur",product:"Power Reaper",model:"10 HP",message:"Test only",enquiryType:"callback",consent:true,website:""};
 r=await fetch(base+"/api/enquiries",{...opts,body:JSON.stringify(valid)});if(r.status!==503)throw Error("Unconfigured database must return HTTP 503, got "+r.status);
 const response=await r.json();if(response.ok!==false)throw Error("Cannot claim success without DB");
 r=await fetch(base+"/api/enquiries",{...opts,headers:{...opts.headers,Origin:"http://untrusted.example"},body:JSON.stringify(valid)});if(r.status<400)throw Error("Untrusted origin must be blocked");
 console.log("[RBD API TEST] PASS: health, invalid data, honest DB 503, restricted CORS. No personal data stored.");
}
try{await run()}catch(e){console.error("[RBD API TEST] FAILED:",e.message);process.exitCode=1}
finally{child.kill("SIGTERM")}
