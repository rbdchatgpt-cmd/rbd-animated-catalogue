"use client";
import {Canvas} from "@react-three/fiber";
import {Suspense,useState,useEffect} from "react";
import {useGLTF,OrbitControls,Center,Bounds,Environment} from "@react-three/drei";
import {productAssets} from "../lib/media";

function Model({url}){const {scene}=useGLTF(url);return <Center><primitive object={scene} dispose={null}/></Center>}
function ModelStage({url}){
 return <div className="model-stage" role="region" aria-label="360 degree verified RBD machinery model">
 <div className="model-note">AUTHORISED 3D MODEL • DRAG TO ROTATE • PINCH TO ZOOM</div>
 <Canvas dpr={[1,1.6]} camera={{position:[3,2,5],fov:42}} gl={{antialias:true,powerPreference:"high-performance"}}>
 <ambientLight intensity={1.5}/><directionalLight position={[3,8,6]} intensity={2.4}/><directionalLight position={[-5,3,-4]} intensity={.8} color="#ccb179"/>
 <Suspense fallback={null}><Bounds fit clip observe margin={1.28}><Model url={url}/></Bounds></Suspense>
 <OrbitControls makeDefault enablePan={false} minDistance={1.5} maxDistance={12} minPolarAngle={.3} maxPolarAngle={Math.PI-.3}/>
 </Canvas>
 </div>
}
export default function Viewer3D({product}){
 const assets=productAssets(product.slug),[zoom,setZoom]=useState(1),[active,setActive]=useState(null),[light,setLight]=useState(false);
 if(assets.model)return <><ModelStage url={assets.model}/><p className="note">360-degree viewer loads the approved RBD 3D model. Use pointer drag or touch gestures to rotate, scroll or pinch to zoom.</p><h4>Product components</h4><div className="model-choose">{product.hotspots.map(h=><button key={h} onClick={()=>setActive(h)} className={active===h?"active":""}>{h}</button>)}</div>{active&&<p className="note">Component selected: {active}. Precise geometric highlight mapping requires approved component coordinates.</p>}</>;
 return <div><div className="photo-experience"><div className="model-note">AUTHENTIC PRODUCT PHOTO · TRUE 3D MODEL PENDING</div><div className="photo-pan" style={{transform:"scale("+zoom+")"}}>{product.image?<img src={product.image} alt={"Authentic RBD "+product.name+" product photo"}/>:<div className="media-unavailable">Awaiting RBD’s original photograph or CAD reference</div>}</div></div>
 <div className="zoom-control"><label htmlFor={"zoom-"+product.slug}>Photograph zoom</label><input type="range" id={"zoom-"+product.slug} min="1" max="2.2" step=".1" value={zoom} onChange={e=>setZoom(Number(e.target.value))}/><output>{Math.round(zoom*100)}%</output></div>
 <p className="note">This is a close-up photograph viewer, not a 360° 3D machine. The machine’s shape, branding and components are unmodified. An accurate GLB can be enabled through the approved media manifest.</p>
 <h4 style={{marginTop:22}}>Component reference guide</h4><div className="model-choose">{(product.hotspots?.length?product.hotspots:["Awaiting component details"]).map(h=><button type="button" key={h} className={active===h?"active":""} onClick={()=>setActive(h)}>{h}</button>)}</div>
 {active&&<p className="note">Selected: <strong>{active}</strong>. Physical highlight coordinates will be added only after the actual machine model or annotated part photographs are supplied.</p>}
 </div>;
}
