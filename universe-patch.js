/* Parallel Universes v1.9 unified audio */
(function(){
let pool=[],serial=0,currentFilter=null;
function variant(base,n){
 const seq=base.seq.map(c=>({...c}));
 if(n%5===1&&seq.length>2)seq.splice(seq.length-1,0,{...seq[seq.length-2],sym:'13sus',func:'suspended bridge',mood:'delay'});
 if(n%5===2&&seq.length>1)seq[1]={...seq[1],sym:seq[1].sym.includes('maj')?'maj7#11':seq[1].sym};
 if(n%5===3)seq.push({...seq[0],func:'echo / return',mood:'reframed'});
 if(n%5===4&&seq.length>2){const x=seq[1];seq[1]=seq[2];seq[2]=x}
 return {...base,seq,title:n?base.title+' · '+String.fromCharCode(65+n%26):base.title,why:n?base.why+' A related universe changes the route while preserving its emotional DNA.':base.why};
}
function make(base,n=0){serial++;const u=variant(base,n);return {...u,id:'U'+serial,score:Math.round(65+Math.random()*30+(u.cat==='Kyun'?3:0))}}
function bases(){const a=universeTemplates();return state.universeFilter==='All'?a:a.filter(x=>x.cat===state.universeFilter)}
function reset(){pool=[];serial=0;currentFilter=state.universeFilter;add(12)}
function add(n=8){const b=bases();if(!b.length)return;const s=pool.length;for(let i=0;i<n;i++){const q=s+i;pool.push(make(b[q%b.length],Math.floor(q/b.length)+1))}}
function moreLike(u,n=6){for(let i=0;i<n;i++)pool.push(make(u,i+1))}
async function preview(seq){if(window.CRMAudio)return CRMAudio.playSequence(seq);return playList(seq)}
window.renderUniverses=function(){
 if(currentFilter!==state.universeFilter)reset();if(!pool.length)reset();
 const box=document.getElementById('universes');if(!box)return;box.innerHTML='';
 pool.forEach((u,i)=>{const d=document.createElement('div');d.className='universe';d.innerHTML=`<div class="universeMeta"><h3>Universe ${String(i+1).padStart(2,'0')} · ${u.title}</h3><span class="universeScore">${u.score}% fit</span></div><div class="route">${u.seq.map(chordName).join(' → ')}</div><div class="why">${u.why}</div><div class="universeTags">${u.tags.map(t=>`<span class="universeTag">${t}</span>`).join('')}</div><div class="btnRow" style="margin-top:9px"><button class="btn small">Preview</button><button class="btn small">A</button><button class="btn small">B</button><button class="btn small primary">Use route</button><button class="btn small">Continue</button><button class="btn small">＋ More like this</button></div>`;
 const [p,a,b,use,cont,ml]=d.querySelectorAll('button');p.onclick=()=>preview(u.seq);a.onclick=()=>{if(window.CRMAudio){CRMAudio.saveA(u.seq);CRMAudio.playSequence(u.seq)}};b.onclick=()=>{if(window.CRMAudio){CRMAudio.saveB(u.seq);CRMAudio.playSequence(u.seq)}};use.onclick=()=>{pushHistory();state.lanes[state.activeSection].push(...u.seq.map(x=>({...x})));renderLane();updateExports();learnRoute(u.seq);try{renderHarmonyCompass()}catch(e){}};cont.onclick=()=>{const last=u.seq[u.seq.length-1];state.current={...last};renderCurrent();if(window.CRMAudio)CRMAudio.playChord(last);else playChord(last);generateCandidates()};ml.onclick=()=>{moreLike(u);renderUniverses()};box.appendChild(d)});
};
const more=document.getElementById('moreUniversesBtn'),regen=document.getElementById('reshuffleUniversesBtn');
if(more){more.textContent='＋ More universes';more.onclick=()=>{add(8);renderUniverses()}}
if(regen){regen.textContent='↻ Regenerate all';regen.onclick=()=>{reset();renderUniverses()}}
reset();renderUniverses();
})();