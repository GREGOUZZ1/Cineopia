const filmQuery = `query Film($s:String!){
  popularTitles(country:FR,first:12,filter:{searchQuery:$s,objectTypes:[MOVIE]}){
    edges{node{... on Movie{
      content(country:FR,language:fr){title originalTitle originalReleaseYear externalIds{imdbId} credits{role name}}
      offers(country:FR,platform:WEB){monetizationType standardWebURL package{clearName}}
    }}}
  }
}`;
const detailsCache=new Map();
const detailRequests=new Set();
const offerTypes={FLATRATE:'Abonnement',RENT:'Location',BUY:'Achat',FREE:'Gratuit',ADS:'Avec publicité',CINEMA:'Cinéma'};
const normalizedTitle=s=>clean(String(s||'')).replace(/[^\p{L}\p{N}]/gu,'');
function sameFilm(movie,f){
  const c=movie.content;
  if(!c)return false;
  if(/^tt\d+$/.test(f.id)&&c.externalIds?.imdbId)return c.externalIds.imdbId===f.id;
  return Number(c.originalReleaseYear)===Number(f.year)&&[c.title,c.originalTitle].some(t=>normalizedTitle(t)===normalizedTitle(f.title));
}
function formatDetails(movie){
  const credits=movie?.content?.credits||[];
  const names=role=>[...new Set(credits.filter(c=>c.role===role).map(c=>c.name).filter(Boolean))];
  const links=new Map();
  for(const offer of movie?.offers||[]){
    if(!/^https?:\/\//i.test(offer.standardWebURL)||!offer.package?.clearName)continue;
    const name=offer.package.clearName, type=offerTypes[offer.monetizationType]||'Voir le film';
    links.set(name+'|'+type,{name,type,url:offer.standardWebURL});
  }
  return {cast:names('ACTOR'),directors:names('DIRECTOR'),links:[...links.values()]};
}
async function loadFilmDetails(f){
  if(detailsCache.has(f.id)||detailRequests.has(f.id))return;
  detailRequests.add(f.id);
  try{
    const r=await fetch('/disponibilite-fr',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query:filmQuery,variables:{s:f.title}}),signal:AbortSignal.timeout(15000)});
    if(!r.ok)throw Error();
    const data=await r.json(),edges=data.data?.popularTitles?.edges;
    if(!Array.isArray(edges))throw Error();
    const movie=edges.map(e=>e.node).find(m=>sameFilm(m,f));
    detailsCache.set(f.id,formatDetails(movie));
  }catch{f.offersError=true}finally{
    detailRequests.delete(f.id);
    if(dialog.open&&detailId===f.id)detail(f.id);
  }
}
function creditsAndOffers(f){
  const data=detailsCache.get(f.id)||preparedDetails[f.id], waiting=detailRequests.has(f.id)||(!data&&!f.offersError);
  const director=data?.directors?.join(', ')||f.director, actors=data?.cast?.length?data.cast:f.cast||[];
  const blank=waiting?'Chargement…':'Non renseigné';
  const items=(data?.links||[]).map(o=>'<li><a class="link" href="'+esc(o.url)+'" target="_blank" rel="noopener noreferrer">'+esc(o.name)+'</a> · '+esc(o.type)+'</li>').join('');
  return '<p><b>Réalisation</b><br>'+esc(director||blank)+'</p><p><b>Acteurs</b><br>'+esc(actors.join(', ')||blank)+'</p><h3>Où le voir en France ?</h3>'+(items?'<ul class="offers">'+items+'</ul><small>Données JustWatch</small>':'<p>'+ (waiting?'Recherche des plateformes…':f.offersError&&!data?'Disponibilités momentanément indisponibles.':'Aucune offre française identifiée.')+'</p>');
}
