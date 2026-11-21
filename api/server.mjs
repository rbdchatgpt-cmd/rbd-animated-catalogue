import express from "express";
import cors from "cors";
import helmet from "helmet";
import pg from "pg";
import {rateLimit} from "express-rate-limit";
import {z} from "zod";

const app=express();
app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({limit:"12kb",strict:true}));
const origins=(process.env.ALLOWED_ORIGINS||"https://rbd-field-cinema-next.onrender.com").split(",").map(x=>x.trim()).filter(Boolean);
const corsOptions={origin(origin,cb){if(!origin||origins.includes(origin))return cb(null,true);cb(new Error("CORS origin not allowed"))},methods:["POST","GET","OPTIONS"],allowedHeaders:["Content-Type"]};
app.use(cors(corsOptions));
app.use("/api/enquiries",rateLimit({windowMs:60*60*1000,limit:10,standardHeaders:"draft-7",legacyHeaders:false,message:{ok:false,error:"Too many requests. Please try again later."}}));

const schema=z.object({
 name:z.string().trim().min(2).max(80),
 mobile:z.string().regex(/^[6-9]\d{9}$/,"Valid 10-digit Indian mobile number required"),
 state:z.string().trim().min(2).max(60),
 city:z.string().trim().min(2).max(70),
 product:z.string().trim().min(2).max(100),
 model:z.string().trim().max(100).default(""),
 message:z.string().trim().max(1000).default(""),
 enquiryType:z.enum(["callback","dealer","bulk","general"]),
 consent:z.literal(true),
 website:z.string().max(0).optional(),
 submittedAt:z.string().optional()
}).strict();

const DATABASE_URL=process.env.DATABASE_URL||"";
const pool=DATABASE_URL?new pg.Pool({connectionString:DATABASE_URL,max:5,idleTimeoutMillis:10000,connectionTimeoutMillis:5000,ssl:process.env.DB_SSL==="true"?{rejectUnauthorized:true}:undefined}):null;
let dbReady=false,dbIssue="";
async function setup(){
 if(!pool){dbIssue="DATABASE_URL missing";return}
 try{
 await pool.query("CREATE TABLE IF NOT EXISTS rbd_enquiries (id BIGSERIAL PRIMARY KEY, name VARCHAR(80) NOT NULL, mobile VARCHAR(10) NOT NULL, state VARCHAR(60) NOT NULL, city VARCHAR(70) NOT NULL, product VARCHAR(100) NOT NULL, model VARCHAR(100) NOT NULL DEFAULT '', message TEXT NOT NULL DEFAULT '', enquiry_type VARCHAR(20) NOT NULL, consent BOOLEAN NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());");
 dbReady=true;dbIssue="";
 }catch(e){dbReady=false;dbIssue="Database initialization failed";console.error("RBD database connection failed",e.code||e.name)}
}
await setup();
app.get("/health",(req,res)=>res.status(200).json({ok:true,service:"rbd-lead-api",databaseConnected:dbReady}));
app.post("/api/enquiries",async(req,res)=>{
 const parsed=schema.safeParse(req.body);
 if(!parsed.success){return res.status(400).json({ok:false,error:"Invalid enquiry fields",fields:parsed.error.issues.map(i=>i.path.join("."))})}
 if(!pool||!dbReady){return res.status(503).json({ok:false,error:"Secure callback service is not configured. Please use WhatsApp or call RBD."})}
 const d=parsed.data;
 try{
 const q=await pool.query("INSERT INTO rbd_enquiries(name,mobile,state,city,product,model,message,enquiry_type,consent) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id",[
 d.name,d.mobile,d.state,d.city,d.product,d.model,d.message,d.enquiryType,d.consent]);
 res.status(201).json({ok:true,reference:"RBD-"+String(q.rows[0].id).padStart(6,"0"),message:"Enquiry securely saved"});
 }catch(e){console.error("Enquiry save failure",e.code||e.name);res.status(503).json({ok:false,error:"Could not save your enquiry. Please try WhatsApp instead."})}
});
app.use((err,req,res,next)=>{console.error("Request rejected",err.message);if(!res.headersSent)res.status(400).json({ok:false,error:"Invalid request"})});
const PORT=Number(process.env.PORT||10000);
const server=app.listen(PORT,"0.0.0.0",()=>console.log("RBD enquiries API listening on "+PORT+"; DB ready="+dbReady));
process.on("SIGTERM",()=>{server.close(async()=>{await pool?.end();process.exit(0)})});
