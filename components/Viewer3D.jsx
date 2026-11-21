"use client";
import {Canvas,useFrame} from "@react-three/fiber";
import {useState,useRef} from "react";
function Plinth({drag}){
 const g=useRef();useFrame((_,dt)=>{if(g.current)g.current.rotation.y+=(drag?dt*.14:dt*.04)});
 return <group ref={g}><mesh position={[0,-.85,0]} receiveShadow><cylinderGeometry args={[2,2,.35,96]}/><meshStandardMaterial color="#8b754d" metalness={.75} roughness={.25}/></mesh><mesh position={[0,-.64,0]}><torusGeometry args={[1.82,.025,12,100]}/><meshStandardMaterial color="#eed9a0" metalness={.9} roughness={.18}/></mesh><mesh position={[0,-.91,0]}><cylinderGeometry args={[1.96,1.96,.1,96]}/><meshStandardMaterial color="#10281d" metalness={.28} roughness={.7}/></mesh></group>;
}
export default function Viewer3D({product}){
 const [drag,setDrag]=useState(false),[selected,setSelected]=useState(0);
 return <div>
 <div className="stage3d">
 <div className="stage3d-label">CONCEPT 3D STAGE · REAL MODEL PENDING</div>
 <Canvas dpr={[1,1.5]} camera={{position:[0,1.7,7],fov:36}} shadows>
 <ambientLight intensity={1}/><spotLight position={[5,8,4]} intensity={80} angle={.6} penumbra={.9} castShadow/><pointLight position={[-5,2,3]} intensity={25} color="#e1bb73"/>
 <Plinth drag={drag}/></Canvas>
 <div className="stage3d-actual">{product.image?<img src={product.image} alt={"RBD "+product.name+" authentic product photograph (2D overlay)"}/>:<span className="media-unavailable">Original product photograph pending</span>}</div>
 </div>
 <p className="note">The illuminated platform is a 3D demonstration. The machine is a real RBD product photo—not a rotatable 3D mesh. A full 360° model will be enabled only after a verified product scan or CAD file is supplied.</p>
 <h4 style={{marginTop:23}}>Component guide</h4><div className="model-choose">{(product.hotspots?.length?product.hotspots:["Component data pending"]).map((h,i)=><button key={h} className={selected===i?"active":""} type="button" onClick={()=>setSelected(i)}>{h}</button>)}</div>
 <p className="note" style={{marginTop:15}}>Selected area: <strong>{product.hotspots?.[selected]||"Awaiting verified technical mapping"}</strong>. Component-specific annotations will follow validated images or CAD geometry.</p>
 </div>;
}