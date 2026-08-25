(()=>{
function currentHarmony(){
  try{
    if(window.state&&state.current&&typeof window.chordName==='function'){
      const n=chordName(state.current); if(n)return String(n).trim();
    }
  }catch(e){}
  const label=[...document.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent?.trim()==='CURRENT HARMONY');
  const box=label?.parentElement;
  if(box){
    const hits=[...box.querySelectorAll('*')].filter(e=>e.children.length===0&&/^[A-G](?:#|b)?(?:maj|min|m|dim|aug|sus|add|\d)/.test(e.textContent?.trim()||''));
    if(hits.length)return hits[0].textContent.trim();
  }
  return null;
}
function prepend(seq,opt){
  const cur=currentHarmony();
  if(!cur||!Array.isArray(seq)||!seq.length)return seq;
  if(opt&&opt.midi){
    const first=seq[0];
    const curMidi=window.CRMAudio?.midiFor?.(cur,0,48);
    if(!curMidi)return seq;
    if(Array.isArray(first)&&first.join(',')===curMidi.join(','))return seq;
    return [curMidi,...seq];
  }
  const first=typeof seq[0]==='string'?seq[0].trim():'';
  if(first===cur)return seq;
  return [cur,...seq];
}
function patchAudio(){
  if(!window.CRMAudio||CRMAudio.__researchOriginPatched)return false;
  const oldPlay=CRMAudio.playSequence.bind(CRMAudio),oldA=CRMAudio.saveA.bind(CRMAudio),oldB=CRMAudio.saveB.bind(CRMAudio);
  CRMAudio.playSequence=(seq,opt={})=>oldPlay(window.__crmResearchOriginActive?prepend(seq,opt):seq,opt);
  CRMAudio.saveA=(seq,opt={})=>oldA(window.__crmResearchOriginActive?prepend(seq,opt):seq,opt);
  CRMAudio.saveB=(seq,opt={})=>oldB(window.__crmResearchOriginActive?prepend(seq,opt):seq,opt);
  CRMAudio.__researchOriginPatched=true;
  return true;
}
function enhanceCards(){
  const cur=currentHarmony(); if(!cur)return;
  document.querySelectorAll('#crmResearchGrid .crCard').forEach(card=>{
    const route=card.querySelector('.crRoute'); if(!route)return;
    let raw=route.dataset.crmRawRoute||route.textContent.trim();
    route.dataset.crmRawRoute=raw;
    const parts=raw.split('→').map(x=>x.trim()).filter(Boolean);
    route.textContent=(parts[0]===cur?parts:[cur,...parts]).join(' → ');
    if(!card.querySelector('.crmOriginHint')){
      const hint=document.createElement('div');hint.className='crmOriginHint';
      hint.style.cssText='font-size:11px;color:#84919d;margin-top:-3px;margin-bottom:7px';
      hint.textContent='Current harmony stays fixed as the starting point.';
      route.after(hint);
    }
  });
}
document.addEventListener('click',e=>{
  if(!e.target.closest?.('#crmResearchGrid .crCard button'))return;
  window.__crmResearchOriginActive=true;
  setTimeout(()=>{window.__crmResearchOriginActive=false},0);
},true);
const mo=new MutationObserver(()=>{patchAudio();enhanceCards()});
mo.observe(document.documentElement,{childList:true,subtree:true,characterData:true});
setInterval(()=>{patchAudio();enhanceCards()},900);
setTimeout(()=>{patchAudio();enhanceCards()},1700);
})();