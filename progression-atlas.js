(()=>{
const PATTERNS=[
['Pop','I–V–vi–IV','Open / anthemic',[[0,'maj'],[4,'maj'],[5,'min'],[3,'maj']]],
['Pop','vi–IV–I–V','Emotional / familiar',[[5,'min'],[3,'maj'],[0,'maj'],[4,'maj']]],
['Pop','I–vi–IV–V','Classic 50s',[[0,'maj'],[5,'min'],[3,'maj'],[4,'maj']]],
['Pop','I–IV–vi–V','Bright lift',[[0,'maj'],[3,'maj'],[5,'min'],[4,'maj']]],
['Pop','IV–V–iii–vi','J-pop motion',[[3,'maj'],[4,'maj'],[2,'min'],[5,'min']]],
['Pop','I–iii–IV–iv','Bittersweet turn',[[0,'maj'],[2,'min'],[3,'maj'],[3,'min']]],
['City Pop','Imaj7–VI7–ii7–V7','Urban turnaround',[[0,'maj7'],[5,'7'],[1,'min7'],[4,'7']]],
['City Pop','Imaj7–iii7–VI7–ii7–V7','Extended city loop',[[0,'maj7'],[2,'min7'],[5,'7'],[1,'min7'],[4,'7']]],
['City Pop','IVmaj7–V7–iii7–vi7','Glossy lift',[[3,'maj7'],[4,'7'],[2,'min7'],[5,'min7']]],
['City Pop','ii7–V7–Imaj7–VI7','Forward cycle',[[1,'min7'],[4,'7'],[0,'maj7'],[5,'7']]],
['City Pop','Imaj7–#Idim7–ii7–V7','Chromatic approach',[[0,'maj7'],[1,'dim7'],[1,'min7'],[4,'7']]],
['City Pop','Imaj7–III7–vi7–II7','Secondary-dominant glow',[[0,'maj7'],[2,'7'],[5,'min7'],[1,'7']]],
['Jazz','ii7–V7–Imaj7','Major cadence',[[1,'min7'],[4,'7'],[0,'maj7']]],
['Jazz','iiø7–V7alt–iMaj7','Minor cadence',[[1,'m7b5'],[4,'7alt'],[0,'minmaj7']]],
['Jazz','Imaj7–VI7–ii7–V7','Rhythm changes turn',[[0,'maj7'],[5,'7'],[1,'min7'],[4,'7']]],
['Jazz','iii7–VI7–ii7–V7','Back-cycle',[[2,'min7'],[5,'7'],[1,'min7'],[4,'7']]],
['Jazz','Imaj7–#Idim7–ii7–#IIdim7–iii7','Diminished passing',[[0,'maj7'],[1,'dim7'],[1,'min7'],[3,'dim7'],[2,'min7']]],
['Jazz','Imaj7–IV7–iii7–VI7','Backdoor color',[[0,'maj7'],[3,'7'],[2,'min7'],[5,'7']]],
['Neo Soul','Imaj9–iii9–vi9–IVmaj9','Silky loop',[[0,'maj9'],[2,'min9'],[5,'min9'],[3,'maj9']]],
['Neo Soul','ii9–V13–Imaj9–IVmaj9','Warm resolution',[[1,'min9'],[4,'13'],[0,'maj9'],[3,'maj9']]],
['Neo Soul','Imaj9–bIIImaj7–ii9–V13','Side-slip color',[[0,'maj9'],[2,'maj7'],[1,'min9'],[4,'13']]],
['Neo Soul','vi9–ii9–V13–Imaj9','Soul cycle',[[5,'min9'],[1,'min9'],[4,'13'],[0,'maj9']]],
['Neo Soul','Imaj7–V/vi–vi9–iv9','Kyun descent',[[0,'maj7'],[2,'7'],[5,'min9'],[3,'min9']]],
['Gospel','I–III7–IV–iv','Amen with borrow',[[0,'maj'],[2,'7'],[3,'maj'],[3,'min']]],
['Gospel','I–V/vi–vi–IV–ii–V','Gospel lift',[[0,'maj'],[2,'7'],[5,'min'],[3,'maj'],[1,'min'],[4,'maj']]],
['Gospel','IV–iv–I/3–VI7–ii7–V7','Church walkdown',[[3,'maj'],[3,'min'],[2,'min'],[5,'7'],[1,'min7'],[4,'7']]],
['Rock','I–bVII–IV–I','Mixolydian rock',[[0,'maj'],[6,'maj'],[3,'maj'],[0,'maj']]],
['Rock','i–bVI–bIII–bVII','Arena minor',[[0,'min'],[5,'maj'],[2,'maj'],[6,'maj']]],
['Rock','I–IV–I–bVII','Classic drive',[[0,'maj'],[3,'maj'],[0,'maj'],[6,'maj']]],
['Rock','i–bVII–bVI–V','Descending tension',[[0,'min'],[6,'maj'],[5,'maj'],[4,'maj']]],
['Electronic','i–bVI–bIII–bVII','EDM minor loop',[[0,'min'],[5,'maj'],[2,'maj'],[6,'maj']]],
['Electronic','i–bVII–bVI–bVII','Dark pulse',[[0,'min'],[6,'maj'],[5,'maj'],[6,'maj']]],
['Electronic','I–V–ii–IV','Open dance',[[0,'maj'],[4,'maj'],[1,'min'],[3,'maj']]],
['Electronic','vi–I–V–IV','Floating pop-electronic',[[5,'min'],[0,'maj'],[4,'maj'],[3,'maj']]],
['Cinematic','i–bVI–bIII–bVII','Epic minor',[[0,'min'],[5,'maj'],[2,'maj'],[6,'maj']]],
['Cinematic','i–iv–bVI–V','Dramatic rise',[[0,'min'],[3,'min'],[5,'maj'],[4,'maj']]],
['Cinematic','I–bIII–bVI–V','Heroic chromatic',[[0,'maj'],[2,'maj'],[5,'maj'],[4,'maj']]],
['Cinematic','i–bII–bVI–V','Phrygian tension',[[0,'min'],[1,'maj'],[5,'maj'],[4,'maj']]],
['Modal','i–IV','Dorian openness',[[0,'min'],[3,'maj']]],
['Modal','I–bVII–IV','Mixolydian loop',[[0,'maj'],[6,'maj'],[3,'maj']]],
['Modal','i–bII','Phrygian gravity',[[0,'min'],[1,'maj']]],
['Modal','I–II','Lydian lift',[[0,'maj'],[1,'maj']]],
['Borrowed','I–iv–I','Minor subdominant',[[0,'maj'],[3,'min'],[0,'maj']]],
['Borrowed','I–bVI–IV–V','Borrowed drama',[[0,'maj'],[5,'maj'],[3,'maj'],[4,'maj']]],
['Borrowed','I–bVII–IV–iv','Double mixture',[[0,'maj'],[6,'maj'],[3,'maj'],[3,'min']]],
['Borrowed','I–III7–vi–iv','Secondary + mixture',[[0,'maj'],[2,'7'],[5,'min'],[3,'min']]],
['Turnaround','I–VI7–ii7–V7','Classic turnaround',[[0,'maj'],[5,'7'],[1,'min7'],[4,'7']]],
['Turnaround','I–#Idim7–ii7–V7','Chromatic turnaround',[[0,'maj'],[1,'dim7'],[1,'min7'],[4,'7']]],
['Turnaround','I–III7–VI7–II7–V7','Dominant chain',[[0,'maj'],[2,'7'],[5,'7'],[1,'7'],[4,'7']]],
['Blues','I7–IV7–I7–V7–IV7–I7','12-bar skeleton',[[0,'7'],[3,'7'],[0,'7'],[4,'7'],[3,'7'],[0,'7']]],
['Blues','I7–#I°7–ii7–V7','Jazz-blues passing',[[0,'7'],[1,'dim7'],[1,'min7'],[4,'7']]],
['Kyun','Imaj7–V/vi–vi7–IVmaj7','Tender lift',[[0,'maj7'],[2,'7'],[5,'min7'],[3,'maj7']]],
['Kyun','IVmaj7–V–iii7–vi7','Anime/J-pop lift',[[3,'maj7'],[4,'maj'],[2,'min7'],[5,'min7']]],
['Kyun','Imaj9–iii7–iv6–V7','Unexpected ache',[[0,'maj9'],[2,'min7'],[3,'min6'],[4,'7']]],
['Kyun','vi9–IVmaj7–Imaj7–V/vi','Suspended return',[[5,'min9'],[3,'maj7'],[0,'maj7'],[2,'7']]]
];
const ROOTS=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
const DEG=[0,2,4,5,7,9,11];
const Q={maj:[0,4,7],min:[0,3,7],7:[0,4,7,10],maj7:[0,4,7,11],min7:[0,3,7,10],maj9:[0,4,7,11,14],min9:[0,3,7,10,14],13:[0,4,7,10,14,21],dim7:[0,3,6,9],m7b5:[0,3,6,10],minmaj7:[0,3,7,11],min6:[0,3,7,9],'7alt':[0,4,6,10,13]};
let key=0,filter='All',ctx;
function noteName(n){return ROOTS[(n+120)%12]}
function chordLabel([d,q]){const r=(key+DEG[d%7])%12;return noteName(r)+({maj:'',min:'m',7:'7',maj7:'maj7',min7:'m7',maj9:'maj9',min9:'m9',13:'13',dim7:'dim7',m7b5:'m7b5',minmaj7:'mMaj7',min6:'m6','7alt':'7alt'}[q]||q)}
function playChord(ch,t,d=.58){ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();const [deg,q]=ch,base=48+key+DEG[deg%7],ints=Q[q]||Q.maj;ints.forEach((iv,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=i?'sine':'triangle';o.frequency.value=440*Math.pow(2,(base+iv-69)/12);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(i?.035:.06,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g).connect(ctx.destination);o.start(t);o.stop(t+d+.03)})}
function playSeq(seq){ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();let t=ctx.currentTime+.04;seq.forEach(ch=>{playChord(ch,t,.64);t+=.68})}
function mount(){if(document.getElementById('progressionAtlas'))return;const host=document.createElement('section');host.id='progressionAtlas';host.innerHTML=`<style>#progressionAtlas{max-width:1180px;margin:28px auto 80px;padding:0 18px;color:#eef2f6;font-family:-apple-system,BlinkMacSystemFont,sans-serif}#progressionAtlas h2{font-size:24px;margin:0 0 6px}.paSub{color:#9ca7b3;margin-bottom:14px}.paBar{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0 18px}.paBar select{background:#151a20;color:#eef2f6;border:1px solid #303842;border-radius:12px;padding:10px 12px}.paGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px}.paCard{background:#11161b;border:1px solid #2d353e;border-radius:16px;padding:14px}.paCat{font-size:12px;color:#f2bd4d;text-transform:uppercase;letter-spacing:.08em}.paName{font-weight:800;font-size:19px;margin:5px 0}.paChords{font-size:16px;color:#d7dee6;line-height:1.45}.paMood{font-size:13px;color:#929daa;margin:5px 0 10px}.paPlay{border:0;border-radius:10px;background:#f2bd4d;color:#151515;font-weight:800;padding:9px 12px}</style><h2>PROGRESSION ATLAS · 56 patterns</h2><div class="paSub">Popだけでなく、City Pop / Jazz / Neo Soul / Gospel / Modal / Borrowed / Cinematicまで横断して比較できます。</div><div class="paBar"><select id="paKey">${ROOTS.map((x,i)=>`<option value="${i}">Key ${x}</option>`).join('')}</select><select id="paFilter"></select></div><div class="paGrid" id="paGrid"></div>`;document.body.appendChild(host);const cats=['All',...new Set(PATTERNS.map(x=>x[0]))];const fs=host.querySelector('#paFilter');fs.innerHTML=cats.map(c=>`<option>${c}</option>`).join('');host.querySelector('#paKey').onchange=e=>{key=+e.target.value;render()};fs.onchange=e=>{filter=e.target.value;render()};render()}
function render(){const g=document.getElementById('paGrid');if(!g)return;g.innerHTML='';PATTERNS.filter(p=>filter==='All'||p[0]===filter).forEach(p=>{const d=document.createElement('div');d.className='paCard';d.innerHTML=`<div class="paCat">${p[0]}</div><div class="paName">${p[1]}</div><div class="paChords">${p[3].map(chordLabel).join(' → ')}</div><div class="paMood">${p[2]}</div><button class="paPlay">▶ HEAR</button>`;d.querySelector('button').onclick=()=>playSeq(p[3]);g.appendChild(d)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(mount,1200));else setTimeout(mount,1200);
})();