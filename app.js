const main = document.querySelector('main');
const dialog = document.querySelector('dialog');
const all = [...films,...releases];
const byId = new Map(all.map(f => [f.id,f]));
const key = 'app-film-liste-v1';
try {
  const records=JSON.parse(localStorage.getItem('app-film-fiches')||'[]');
  for(const f of records)if(/^(tt|w)[0-9]+$/.test(f?.id) && typeof f.title==='string')byId.set(f.id,f);
} catch {}
let saved = new Set();
try {
  const stored = JSON.parse(localStorage.getItem(key));
  if (Array.isArray(stored)) saved = new Set(stored.filter(id => byId.has(id) || /^w[0-9]+$/.test(id)));
} catch {}
let genre = 'Tous', query = '', detailId = null;
const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dateLabel = date => new Intl.DateTimeFormat('fr-FR',{dateStyle:'long',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));
const clean = value => value.toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ');
function page(){return ['sorties','liste','recherche'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'decouvrir'}
function saveButton(f,small=false){
  const on=saved.has(f.id);
  const label=on?'Retirer de ma liste':'Ajouter à ma liste';
  return '<button class="'+(small?'add':'secondary')+'" data-save="'+f.id+'" aria-label="'+esc(label+' · '+f.title)+'" aria-pressed="'+on+'">'+(small?(on?'✓':'+'):(on?'✓ Dans ma liste':'+ Ma liste'))+'</button>';
}
function cards(items){
  return '<div class="grid">'+items.map(f=>'<article class="card"><button class="movie" data-open="'+f.id+'"><span class="cover"><img loading="lazy" src="'+f.poster+'" alt=""></span><strong>'+esc(f.title)+'</strong><span class="dim">'+esc(f.year+' · '+f.genre)+'</span></button>'+saveButton(f,true)+'</article>').join('')+'</div>';
}
function row(f){
  return '<button class="row" data-open="'+f.id+'"><strong>'+esc(f.title)+'</strong><span class="dim">'+esc(f.genre)+'</span><span aria-hidden="true">＋</span></button>';
}
function home(){
  const f=films[0];
  const genres=['Tous',...new Set(films.map(f=>f.genre))];
  return '<div class="hero"><img class="back" src="assets/dune.webp" alt=""><div class="hero-copy"><div class="kicker">Film à la une</div><h1>DUNE</h1><div class="subtitle">Deuxième partie</div><div class="meta"><span>2024</span><span>2 h 46</span><span>Science-fiction</span></div><p>'+esc(f.about)+'</p><div class="actions"><a class="primary" href="#recherche">Explorer le catalogue</a><button class="secondary" data-open="'+f.id+'">Découvrir le film</button>'+saveButton(f)+'</div></div></div><section><div class="heading"><h2>La sélection</h2><a class="link" href="#recherche">Tout le catalogue</a></div><div class="filters" aria-label="Genre">'+genres.map(g=>'<button class="pill" data-genre="'+g+'" aria-pressed="'+(g===genre)+'">'+g+'</button>').join('')+'</div>'+cards(genre==='Tous'?films:films.filter(f=>f.genre===genre))+'</section>';
}
function calendar(){
  const dates=[...new Set(releases.map(f=>f.date))];
  return '<h1 class="page-title">Sorties en France</h1><p class="notice">Calendrier du 25 novembre 2026 au 17 février 2027 · édition du 24 novembre 2026</p><section>'+dates.map(d=>'<h2 class="datehead">'+dateLabel(d)+'</h2>'+releases.filter(f=>f.date===d).map(row).join('')).join('')+'</section>';
}
function list(){
  const items=[...saved].reverse().map(id=>byId.get(id)).filter(Boolean);
  return '<h1 class="page-title">Ma liste</h1><p class="notice">Tes films à voir, enregistrés dans ce navigateur.</p><section>'+(items.length?cards(items.filter(f=>f.poster))+items.filter(f=>!f.poster).map(row).join(''):'<div class="empty"><p>Ta liste est encore vide. Utilise le bouton + sur une affiche pour y garder un film.</p><a class="link" href="#decouvrir">Parcourir les films</a></div>')+'</section>';
}
function results(){
  const term=clean(query.trim());
  const remote=onlineFilms;
  const local=term?all.filter(f=>clean([f.title,f.director,f.genre,f.year].join(' ')).includes(term)):films;
  const matches=term?archives.filter(f=>f.searchText.includes(term)):archives;
  const names=new Set();
  const unique=f=>{const k=clean(f.title)+'|'+f.year;if(names.has(k))return false;names.add(k);return true};
  const ordered=[...local.filter(f=>clean(f.title)===term),...remote,...local].filter(unique);
  const indexed=matches.filter(unique);
  const result=[...ordered,...indexed];
  const visible=result.slice(0,resultsLimit);
  const count=archiveReady?archives.length.toLocaleString('fr-FR')+' entrées dans l’index cinéma américain, avec recherche internationale via Cinemeta.':archiveFailed?'Index hors ligne indisponible.':'Chargement de l’index cinéma…';
  const posters=visible.filter(f=>f.poster),rows=visible.filter(f=>!f.poster);
  return '<p class="notice">'+count+'</p>'+(searchState?'<p role="status" class="notice">'+esc(searchState)+'</p>':'')+(term?'<p aria-live="polite">'+result.length.toLocaleString('fr-FR')+' résultat'+(result.length===1?'':'s')+'</p>':'')+(posters.length?cards(posters):'')+rows.map(row).join('')+(!result.length&&!searchState?'<p class="empty">Aucun titre trouvé. Essaie le titre original ou une autre orthographe.</p>':'')+(result.length>resultsLimit?'<button class="secondary more" id="more">Afficher davantage de films</button>':'');

}
function render(){
  const p=page();
  const names={decouvrir:'Découvrir',sorties:'Sorties',liste:'Ma liste',recherche:'Rechercher'};
  document.title=names[p]+' · APP FILM';
  document.querySelectorAll('nav a').forEach(a=>{if(a.hash==='#'+p)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  document.getElementById('count').textContent=saved.size;
  if(p==='recherche'){
    main.innerHTML='<h1 class="page-title">Explorer le catalogue</h1><input id="query" class="query" type="search" aria-label="Titre, cinéaste ou genre" placeholder="Ex. Titanic, Avatar, Amélie…" value="'+esc(query)+'"><section id="results">'+results()+'</section>';
  } else main.innerHTML=p==='sorties'?calendar():p==='liste'?list():home();
}
function detail(id){
  const f=byId.get(id);
  if(!f)return;
  detailId=id;
  const external=/^tt[0-9]+$/.test(f.id)||/^w[0-9]+$/.test(f.id);
  const watch=external?'https://www.justwatch.com/fr/recherche?q='+encodeURIComponent(f.title):'https://www.allocine.fr/film/fichefilm-'+f.id+'/streaming/';
  const source=/^tt/.test(f.id)?'<a class="link" href="https://www.imdb.com/title/'+f.id+'/" target="_blank" rel="noopener">Fiche IMDb</a>':f.article?'<a class="link" href="https://en.wikipedia.org/wiki/'+encodeURIComponent(f.article)+'" target="_blank" rel="noopener">Fiche Wikipédia</a>':'';
  const info=[f.year,f.runtime,f.genre].filter(Boolean).join(' · ');
  document.getElementById('inside').innerHTML=(f.poster?'<img src="'+f.poster+'" alt="">':'')+'<h2>'+esc(f.title)+'</h2><div class="dim">'+esc(info)+'</div>'+(f.director?'<p>Un film de '+esc(f.director)+'</p>':'')+(f.about?'<p>'+esc(f.about)+'</p>':'')+(f.date?'<p>Sortie française le '+dateLabel(f.date)+'</p>':'')+'<div class="actions">'+saveButton(f)+'<a class="primary" target="_blank" rel="noopener" href="'+esc(watch)+'">Où le voir ?</a>'+source+'</div>';
  if(!dialog.open)dialog.showModal();
}
document.addEventListener('click',event=>{
  const b=event.target.closest('button');if(!b)return;
  if(b.dataset.open){detail(b.dataset.open);enrich(b.dataset.open)}
  if(b.id==="more"){resultsLimit+=36;updateResults()}
  if(b.dataset.save){
    const id=b.dataset.save;
    if(saved.has(id))saved.delete(id);else saved.add(id);
    try{localStorage.setItem('app-film-fiches',JSON.stringify([...saved].filter(id=>/^(w|tt)/.test(id)).map(id=>byId.get(id)).filter(Boolean)));localStorage.setItem(key,JSON.stringify([...saved]))}catch{}
    const inDialog=dialog.open;
    render();
    if(inDialog)detail(id);
    const scope=inDialog?dialog:main;
    scope.querySelector('[data-save="'+id+'"]')?.focus({preventScroll:true});
  }
  if(b.dataset.genre){genre=b.dataset.genre;render();main.querySelector('[data-genre="'+genre+'"]').focus({preventScroll:true})}
  if(b.id==='searchbtn'){if(page()==='recherche')document.getElementById('query').focus();else location.hash='recherche'}
  if(b.id==='close')dialog.close();
});
dialog.addEventListener('close',()=>{main.querySelector('[data-open="'+detailId+'"]')?.focus({preventScroll:true});detailId=null});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
main.addEventListener('input',e=>{if(e.target.id==='query'){query=e.target.value;resultsLimit=36;searchOnline()}});
window.addEventListener('hashchange',()=>{if(dialog.open)dialog.close();render();window.scrollTo(0,0);if(page()==='recherche')document.getElementById('query').focus()});
render();

loadArchive();
