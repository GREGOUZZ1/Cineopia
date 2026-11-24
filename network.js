const genreNames = {Action:'Action',Adventure:'Aventure',Animation:'Animation',Biography:'Biographie',Comedy:'Comédie',Crime:'Policier',Documentary:'Documentaire',Drama:'Drame',Family:'Famille',Fantasy:'Fantastique',Historical:'Historique',History:'Histoire',Horror:'Horreur',Musical:'Comédie musicale',Mystery:'Mystère',Romance:'Romance','Science Fiction':'Science-fiction','Sci-Fi':'Science-fiction',Thriller:'Thriller',War:'Guerre',Western:'Western'};
const archives = [];
const searchCache = new Map();
let onlineFilms = [], searchState = '', searchTimer, searchRun = 0;
let resultsLimit = 36, archiveReady = false, archiveFailed = false;
const onlineBase='https://v3-cinemeta.strem.io';
function decodeMovie(m){
  if(!m || !/^tt\d+$/.test(m.id)||typeof m.name!=='string') return null;
  return {id:m.id,title:m.name,year:String(m.releaseInfo||m.year||'').slice(0,4),genre:(m.genres||[]).map(g=>genreNames[g]||g).join(', '),director:[].concat(m.director||[]).join(', '),about:m.description||'',runtime:String(m.runtime||''),poster:'https://images.metahub.space/poster/small/'+m.id+'/img'};
}
async function loadArchive(){
  archiveFailed=false;
  try{
    const r=await fetch('films.json');if(!r.ok)throw Error();
    const rows=await r.json();
    rows.forEach(([title,year,genres,article],i)=>{
      const f={id:'w'+i,title,year,genre:genres.map(g=>genreNames[g]||g).join(', '),article};
      f.searchText=clean([title,year,f.genre].join(' '));archives.push(f);byId.set(f.id,f);
    });
    archiveReady=true;
  }catch{archiveFailed=true}
  if(page()==='recherche')updateResults();
}
function updateResults(){
  const out=document.getElementById('results');if(out)out.innerHTML=results();
}
function searchOnline(){
  const n=++searchRun, term=query.trim();
  clearTimeout(searchTimer);onlineFilms=[];searchState='';
  if(term.length<2){updateResults();return}
  if(searchCache.has(term)){onlineFilms=searchCache.get(term);updateResults();return}
  searchState='Recherche dans le catalogue international…';updateResults();
  searchTimer=setTimeout(async()=>{
    try{
      const r=await fetch(onlineBase+'/catalog/movie/top/search='+encodeURIComponent(term)+'.json',{signal:AbortSignal.timeout(10000)});
      if(!r.ok)throw Error();
      const data=await r.json();if(!Array.isArray(data.metas))throw Error();
      const items=data.metas.map(decodeMovie).filter(Boolean);
      if(n!==searchRun)return;
      onlineFilms=items;searchCache.set(term,items);
      for(const f of items)if(!byId.has(f.id))byId.set(f.id,f);
      searchState='';
    }catch{if(n!==searchRun)return;searchState='Le catalogue en ligne est momentanément indisponible. Les résultats intégrés restent accessibles.'}
    updateResults();
  },350);
}
async function enrich(id){
  const f=byId.get(id);if(!/^tt\d+$/.test(id)||f.about||f.detailPending)return;
  f.detailPending=true;
  try{
    const r=await fetch(onlineBase+'/meta/movie/'+id+'.json',{signal:AbortSignal.timeout(8000)});
    if(!r.ok)return;
    const rich=decodeMovie((await r.json()).meta);
    if(rich && rich.id===id){Object.assign(f,rich);if(dialog.open&&detailId===id)detail(id)}
  }catch{}finally{delete f.detailPending}
}
