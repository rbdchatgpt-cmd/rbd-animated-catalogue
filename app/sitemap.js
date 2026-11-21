import {products} from "../lib/products";
export const dynamic="force-static";
export default function sitemap(){const base="https://rbd-field-cinema-next.onrender.com";return ["","products","compare",...products.map(p=>"products/"+p.slug)].map(path=>({url:base+"/"+(path?path+"/":""),changeFrequency:"monthly",priority:path?0.7:1}))}
