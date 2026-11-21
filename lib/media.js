/**
 * Approved RBD media registry. Add only validated, RBD-owned media or licensed assets.
 * Never substitute generic machinery for a verified product model.
 * All paths are relative to NEXT_PUBLIC_MEDIA_BASE_URL, unless they are full HTTPS URLs.
 */
export const approvedMedia={
 hero:{video:null,poster:null},
 brandFilm:{video:null,poster:null},
 sharkTank:{intro:null,founders:null,workshop:null,pitch:null,investors:null,growth:null,poster:null},
 products:{
 "power-reaper":{video:null,model:null,photos:[]},
 "power-weeder":{video:null,model:null,photos:[]},
 "mini-tiller":{video:null,model:null,photos:[]},
 "brush-cutter":{video:null,model:null,photos:[]},
 "chaff-cutter":{video:null,model:null,photos:[]},
 "earth-auger":{video:null,model:null,photos:[]},
 "chainsaw":{video:null,model:null,photos:[]},
 "lawn-mower":{video:null,model:null,photos:[]},
 "battery-sprayer":{video:null,model:null,photos:[]},
 "manual-sprayer":{video:null,model:null,photos:[]},
 "water-pump":{video:null,model:null,photos:[]},
 "hedge-trimmer":{video:null,model:null,photos:[]},
 "manual-seeder":{video:null,model:null,photos:[]},
 "chowkidar-torch":{video:null,model:null,photos:[]}
 }
};
const base=process.env.NEXT_PUBLIC_MEDIA_BASE_URL||"";
export function assetUrl(path){
 if(!path)return null;
 if(/^https:\/\//.test(path))return path;
 if(!base || !/^[a-zA-Z0-9/._-]+$/.test(path))return null;
 return base.replace(/\/$/,"")+"/"+path.replace(/^\//,"");
}
export function productAssets(slug){
 const a=approvedMedia.products[slug]||{video:null,model:null,photos:[]};
 return {video:assetUrl(a.video),introVideo:assetUrl(a.introVideo)||assetUrl(a.video),workingVideo:assetUrl(a.workingVideo)||assetUrl(a.video),model:assetUrl(a.model),photos:(a.photos||[]).map(assetUrl).filter(Boolean)};
}
export function storyAssets(){return Object.fromEntries(Object.entries(approvedMedia.sharkTank).map(([k,v])=>[k,assetUrl(v)]))}
