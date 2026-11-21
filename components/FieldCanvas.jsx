"use client";
import {Canvas,useFrame} from "@react-three/fiber";
import {useMemo,useRef} from "react";
import * as THREE from "three";

function Crops(){
 const ref=useRef();
 const instances=useMemo(()=>{
   const matrix=new THREE.Matrix4(),position=new THREE.Vector3(),scale=new THREE.Vector3(),rotation=new THREE.Quaternion();
   const transforms=[];
   for(let i=0;i<440;i++){
     const row=i%22,depth=Math.floor(i/22),jitter=Math.sin(i*13.9)*.08;
     position.set((row-10.5)*.52+jitter,0,(depth-10)*.65);
     scale.set(.8, .58+(i%7)*.12, .8);
     matrix.compose(position,rotation,scale);
     transforms.push(matrix.clone());
   }
   return transforms;
 },[]);
 const material=useMemo(()=>new THREE.MeshStandardMaterial({color:"#87a652",roughness:.84,side:THREE.DoubleSide}),[]);
 const geometry=useMemo(()=>new THREE.ConeGeometry(.10,1.3,4),[]);
 useMemo(()=>{},[]);
 return <instancedMesh ref={node=>{ref.current=node;if(node){instances.forEach((m,i)=>node.setMatrixAt(i,m));node.instanceMatrix.needsUpdate=true;}}} args={[geometry,material,instances.length]} castShadow={false} receiveShadow={false}/>;
}
function Farm(){
 const rows=useRef();
 useFrame(({clock})=>{if(rows.current)rows.current.rotation.z=Math.sin(clock.elapsedTime*.55)*.008});
 return <><color attach="background" args={["#638d79"]}/><fog attach="fog" args={["#638d79",5,25]}/><ambientLight intensity={1.6}/><directionalLight position={[-4,8,5]} intensity={3} color="#ffe2a1"/><mesh rotation={[-Math.PI/2,0,0]} position={[0,-.1,0]}><planeGeometry args={[35,35]}/><meshStandardMaterial color="#2b5434" roughness={.92}/></mesh><group ref={rows}><Crops/></group></>;
}
export default function FieldCanvas(){
 return <div className="catalogue-field-canvas" aria-hidden="true"><Canvas dpr={[1,1.25]} camera={{position:[0,3.8,7.8],fov:48}} gl={{antialias:false,powerPreference:"low-power"}}><Farm/></Canvas></div>;
}
