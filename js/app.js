(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],val=i=>$('#'+i).value;
let mode='qr',logo=null,cur=null,touched=0,rid=0;
const need=(c,m)=>{if(!c)throw new Error(m)};
const num=(i,a,b,d=a)=>{const n=parseFloat(val(i));return Math.min(b,Math.max(a,isNaN(n)?d:n))};
const deb=(f,t=250)=>{let h;return(...a)=>{clearTimeout(h);h=setTimeout(()=>f(...a),t)}};
const lum=h=>{const[r,g,b]=[1,3,5].map(i=>parseInt(h.substr(i,2),16)/255).map(c=>c<=.03928?c/12.92:((c+.055)/1.055)**2.4);return .2126*r+.7152*g+.0722*b};
const say=(m,s='')=>{const e=$('#msg');e.textContent=(s==='ok'?'✓ ':s?'! ':'')+m;e.dataset.s=s};
const lock=on=>$$('[data-f],#cp').forEach(b=>b.disabled=!on);
const tr=()=>$('#tr').checked;
const digits=s=>{const d=s.replace(/\D/g,'');need(d.length>=10,'Informe o número com código do país, ex.: +55 47 99999-9999.');return d};
const esc=s=>s.replace(/([\\;,:"])/g,'\\$1'),vc=s=>s.replace(/([\\;,])/g,'\\$1').replace(/\r?\n/g,'\\n'),mail=s=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);
const PH='placeholder="+55 47 99999-9999"';
const TYPES={
link:{n:'URL / Link',f:[['u','Endereço do site','url','placeholder="https://exemplo.com.br"']],b:v=>{need(v.u,'Informe o endereço.');try{return new URL(/^https?:\/\//i.test(v.u)?v.u:'https://'+v.u).href}catch{need(0,'Endereço inválido.')}}},
texto:{n:'Texto',f:[['t','Texto','area']],b:v=>{need(v.t,'Digite o texto.');return v.t}},
wifi:{n:'Wi-Fi',f:[['s','Nome da rede (SSID)'],['p','Senha'],['k','Segurança','sel',[['WPA','WPA/WPA2/WPA3'],['WEP','WEP'],['nopass','Sem senha']]],['h','Rede oculta','chk']],b:v=>{need(v.s,'Informe o nome da rede.');const o=v.k==='nopass';need(o||v.p,'Informe a senha ou escolha "Sem senha".');return`WIFI:T:${v.k};S:${esc(v.s)};${o?'':'P:'+esc(v.p)+';'}${v.h?'H:true;':''};`}},
email:{n:'E-mail',f:[['a','E-mail de destino','email'],['s','Assunto'],['m','Mensagem (opcional)','area']],b:v=>{need(mail(v.a),'Informe um e-mail válido.');const q=[v.s&&'subject='+encodeURIComponent(v.s),v.m&&'body='+encodeURIComponent(v.m)].filter(Boolean).join('&');return'mailto:'+v.a+(q?'?'+q:'')}},
telefone:{n:'Telefone',f:[['n','Telefone com código do país','tel',PH]],b:v=>'tel:+'+digits(v.n)},
sms:{n:'SMS',f:[['n','Número com código do país','tel',PH],['m','Mensagem','area']],b:v=>`SMSTO:+${digits(v.n)}:${v.m}`},
whatsapp:{n:'WhatsApp',f:[['n','Número com código do país','tel',PH],['m','Mensagem (opcional)','area']],b:v=>`https://wa.me/${digits(v.n)}${v.m?'?text='+encodeURIComponent(v.m):''}`},
contato:{n:'Contato (vCard)',f:[['fn','Nome'],['ln','Sobrenome'],['tel','Telefone','tel',PH],['em','E-mail','email'],['org','Empresa'],['ti','Cargo'],['ad','Endereço'],['web','Site','url']],b:v=>{need(v.fn||v.ln,'Informe nome ou sobrenome.');need(!v.em||mail(v.em),'E-mail inválido.');return['BEGIN:VCARD','VERSION:3.0',`N:${vc(v.ln)};${vc(v.fn)};;;`,`FN:${vc((v.fn+' '+v.ln).trim())}`,v.org&&`ORG:${vc(v.org)}`,v.ti&&`TITLE:${vc(v.ti)}`,v.tel&&`TEL;TYPE=CELL:${v.tel.replace(/[^\d+]/g,'')}`,v.em&&`EMAIL:${v.em}`,v.ad&&`ADR;TYPE=WORK:;;${vc(v.ad)};;;;`,v.web&&`URL:${v.web}`,'END:VCARD'].filter(Boolean).join('\n')}}
};
const BF={
CODE128:{n:'CODE 128',ex:'ABC-123',ok:s=>/^[\x20-\x7E]+$/.test(s),m:'CODE 128 aceita apenas caracteres ASCII imprimíveis (sem acentos).'},
CODE39:{n:'CODE 39',ex:'CODE-39',ok:s=>/^[0-9A-Z\-. $\/+%]+$/.test(s.toUpperCase()),m:'CODE 39 aceita A–Z, 0–9 e - . espaço $ / + %.'},
EAN13:{n:'EAN-13',ex:'5901234123457',len:13},EAN8:{n:'EAN-8',ex:'96385074',len:8},UPC:{n:'UPC-A',ex:'036000291452',len:12},ITF14:{n:'ITF-14',ex:'10012345000017',len:14}};
const cd=d=>(10-[...d].reverse().reduce((s,c,i)=>s+c*(i%2?1:3),0)%10)%10;
function bval(f,v){const F=BF[f];if(!v)return{e:'Informe o conteúdo do código.'};
if(!F.len)return F.ok(v)?{}:{e:F.m};
if(!/^\d+$/.test(v))return{e:`${F.n} aceita somente dígitos.`};
if(v.length===F.len-1)return{e:`Falta o dígito verificador (calculado: ${cd(v)}).`,fix:v+cd(v)};
if(v.length!==F.len)return{e:`${F.n} exige ${F.len} dígitos; você digitou ${v.length}.`};
const b=v.slice(0,-1);return cd(b)===+v.slice(-1)?{}:{e:`Dígito verificador inválido; o correto seria ${cd(b)}.`,fix:b+cd(b)}}
const fld=([k,l,t='text',x=''])=>{const a=`id="f-${k}" data-k="${k}"`;return t==='area'?`<label>${l}<textarea ${a} rows="3"></textarea></label>`:t==='sel'?`<label>${l}<select ${a}>${x.map(([v,n])=>`<option value="${v}">${n}</option>`).join('')}</select></label>`:t==='chk'?`<label class="chk"><input type="checkbox" ${a}>${l}</label>`:`<label>${l}<input ${a} type="${t}" autocomplete="off" ${x}></label>`};
const toCanvas=(svg,w,h,bg)=>new Promise((ok,no)=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');if(bg){x.fillStyle=bg;x.fillRect(0,0,w,h)}x.drawImage(i,0,0,w,h);ok(c)};i.onerror=()=>no(new Error('Falha ao converter a imagem.'));i.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)});
const dec=async s=>{if(!('BarcodeDetector' in window))return null;try{const r=await new BarcodeDetector({formats:['qr_code']}).detect(await toCanvas(s,512,512,tr()?val('bg'):null));return r[0]?r[0].rawValue:''}catch{return null}};
const qsvg=(m,size)=>QRRender.svg(m,{size,margin:Math.round(size*num('mg',0,20,10)/100),fg:val('fg'),bg:tr()?'':val('bg'),style:val('sty'),logo:logo&&{url:logo.url,r:logo.r,pct:num('lw',10,30,20)}});
async function renderQR(manual){
const id=++rid,k=val('qtype'),out=$('#stq');let text,m;
try{const v=Object.fromEntries($$('#qf [data-k]').map(e=>[e.dataset.k,e.type==='checkbox'?e.checked:e.value.trim()]));text=TYPES[k].b(v);m=QRRender.matrix(text,logo?'H':'M')}
catch(e){cur=null;lock();out.replaceChildren();$('#meta').textContent='';const q=touched||manual,o=/overflow/i.test(String(e));return say(o?'Conteúdo longo demais para um QR Code.':q?e.message:'Preencha o formulário para gerar o código.',q||o?'err':'')}
const s=qsvg(m,360);out.innerHTML=s;const g=out.firstChild;g.setAttribute('role','img');g.setAttribute('aria-label','QR Code gerado');
cur={m,text,name:'qrcode-'+k};lock(1);$('#fn').placeholder=cur.name;
const z=num('sz',128,4096,1024);$('#meta').textContent=`${TYPES[k].n}, correção de erros ${logo?'H':'M'}, exportação em ${z} × ${z} px`;
const A=lum(val('fg')),B=lum(tr()?'#ffffff':val('bg')),w=[];
if(A>=B||(B+.05)/(A+.05)<4)w.push('Contraste baixo ou código invertido: alguns leitores podem não reconhecê-lo.');
if(logo&&num('lw',10,30,20)>24)w.push('Logomarca grande: pode comprometer a leitura.');
const got=await dec(s);if(id!==rid)return;
if(got!==null&&got!==text)w.push('Leitura automática não confirmada; reduza a logomarca, aumente o contraste ou simplifique o conteúdo.');
say(w.length?w.join(' '):got===null?'Código gerado. Verificação automática indisponível neste navegador; teste com um leitor antes de imprimir.':'Código gerado e leitura verificada. Teste com um leitor antes de imprimir.',w.length?'err':'ok')}
function drawBC(manual){
const f=val('bfmt'),v=val('bval').trim(),r=bval(f,v),x=$('#bfix'),o=$('#stb');
$('#bval').placeholder='ex.: '+BF[f].ex;x.hidden=!r.fix;
if(r.fix){x.textContent='Usar dígito verificador: '+r.fix;x.onclick=()=>{$('#bval').value=r.fix;touched=1;drawBC()}}
if(r.e){cur=null;lock();o.replaceChildren();$('#meta').textContent='';const q=!v&&!touched&&!manual;return say(r.e,q?'':'err')}
try{const d=f==='CODE39'?v.toUpperCase():v,bo={bw:num('bw',1,6,2),h:num('bh',30,300,100),mg:num('bm',0,60,10),text:$('#bt').checked,fs:num('bfs',8,40,16),align:val('bal'),fg:val('bfg'),bg:val('bbg')},b=Barcode.build(f,d,bo);
o.innerHTML=b.svg;const g=o.firstChild;g.setAttribute('role','img');g.setAttribute('aria-label','Código de barras gerado');
cur={text:d,name:'barcode-'+f.toLowerCase(),bc:k=>Barcode.build(f,d,{...bo,k})};lock(1);$('#fn').placeholder=cur.name;
$('#meta').textContent=`${BF[f].n}, ${b.w} × ${b.h} px`;say('Código gerado.','ok')
}catch{cur=null;lock();say('Não foi possível gerar o código com estes dados.','err')}}
const render=m=>mode==='qr'?renderQR(m):(rid++,drawBC(m)),rd=deb(()=>render());
const clean=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\.(svg|png|jpe?g)$/i,'').replace(/[^\w.-]+/g,'-').replace(/^[-.]+|-+$/g,'').slice(0,60);
const save=(b,n)=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),2000)};
async function exp(f){
if(!cur)return;
try{let s,w,h,bg;
if(mode==='qr'){w=h=num('sz',128,4096,1024);s=qsvg(cur.m,w);bg=val('bg')}
else{const k=f==='svg'?1:+val('sc'),r=cur.bc(k);s=r.svg;w=Math.round(r.w*k);h=Math.round(r.h*k);bg=val('bbg')}
const n=(clean(val('fn'))||cur.name)+'.'+f;
if(f==='svg')save(new Blob(['<?xml version="1.0" encoding="UTF-8"?>\n'+s],{type:'image/svg+xml'}),n);
else{const c=await toCanvas(s,w,h,f==='jpeg'?bg:null),b=await new Promise(r=>c.toBlob(r,'image/'+f,.92));need(b,'Falha ao exportar o arquivo.');save(b,n)}
say(`Arquivo ${n} baixado.`,'ok')
}catch(e){say(e.message||'Falha ao exportar o arquivo.','err')}}
/* Interface */
const cf=(i,l,v)=>`<label>${l}<span class="cf"><input type="color" id="${i}" value="${v}"><input id="${i}h" class="mono" value="${v}" maxlength="7" spellcheck="false" aria-label="${l} (HEX)"></span></label>`;
$$('[data-cf]').forEach(e=>{const[i,l,v]=e.dataset.cf.split('|');e.innerHTML=cf(i,l,v)});
$$('input[type=color]').forEach(c=>{const h=$('#'+c.id+'h');c.addEventListener('input',()=>h.value=c.value);h.addEventListener('input',()=>{if(/^#[0-9a-f]{6}$/i.test(h.value))c.value=h.value})});
const PRE=[['Padrão','#162638','#ffffff'],['Executivo','#1D4263','#f4f7fb'],['Tecnológico','#0B7E82','#ffffff'],['Digital','#2563EB','#ffffff']];
$('#pre').innerHTML=PRE.map(([n,a,b],i)=>`<button type="button" class="chip" data-p="${i}"><i style="background:${a}"></i><i style="background:${b}"></i>${n}</button>`).join('');
$$('.chip').forEach(b=>b.onclick=()=>{const[,a,c]=PRE[b.dataset.p];[['fg',a],['bg',c]].forEach(([i,v])=>{$('#'+i).value=v;$('#'+i+'h').value=v});touched=1;render()});
$('#qtype').innerHTML=Object.entries(TYPES).map(([k,t])=>`<option value="${k}">${t.n}</option>`).join('');
$('#bfmt').innerHTML=Object.entries(BF).map(([k,f])=>`<option value="${k}">${f.n}${k==='CODE128'?' (padrão)':''}</option>`).join('');
const form=()=>{$('#qf').innerHTML=TYPES[val('qtype')].f.map(fld).join('');touched=0};
$('#qtype').onchange=()=>{form();render()};
const logoUI=()=>{$('#li').hidden=!logo;$('#lw').disabled=!logo};
$('#lf').onchange=async e=>{const f=e.target.files[0];if(!f)return;
try{const svg=/svg/.test(f.type)||/\.svg$/i.test(f.name);
need(svg||/^image\/(png|jpeg|webp)$/.test(f.type),'Formato não aceito. Use PNG, JPEG, WebP ou SVG.');
need(f.size<=2097152,'Imagem muito grande (máximo 2 MB).');
const u=URL.createObjectURL(svg?new Blob([f],{type:'image/svg+xml'}):f),im=new Image();
await new Promise((ok,no)=>{im.onload=ok;im.onerror=()=>no(new Error('Imagem incompatível ou corrompida.'));im.src=u});URL.revokeObjectURL(u);
const w=im.naturalWidth||256,h=im.naturalHeight||256,m=Math.max(w,h),k=svg?512/m:Math.min(1,512/m),c=document.createElement('canvas');
c.width=Math.max(1,Math.round(w*k));c.height=Math.max(1,Math.round(h*k));c.getContext('2d').drawImage(im,0,0,c.width,c.height);
logo={url:c.toDataURL('image/png'),r:c.width/c.height};$('#lt').src=logo.url;$('#ln').textContent=`${f.name} (${Math.max(1,Math.round(f.size/1024))} KB)`;
logoUI();touched=1;render(1)
}catch(x){e.target.value='';say(x.message,'err')}};
$('#lr').onclick=()=>{logo=null;$('#lf').value='';logoUI();render()};
document.addEventListener('input',e=>{const t=e.target;if(t.id==='fn'||t.type==='file')return;if(t.type==='range')$('#'+t.id+'o').textContent=t.value;if(!/^(qtype|bfmt)$/.test(t.id))touched=1;rd()});
$$('.tab').forEach(b=>b.onclick=()=>{mode=b.dataset.m;const q=mode==='qr';$$('.tab').forEach(t=>t.setAttribute('aria-pressed',t===b));[['qr',q],['stq',q],['szl',q],['bc',!q],['stb',!q],['scl',!q]].forEach(([i,on])=>$('#'+i).hidden=!on);touched=0;render()});
$$('[data-f]').forEach(b=>b.onclick=()=>exp(b.dataset.f));
$('#gen').onclick=()=>{touched=1;render(1)};
$('#cp').onclick=async()=>{try{await navigator.clipboard.writeText(cur.text);say('Conteúdo copiado.','ok')}catch{say('Não foi possível copiar o conteúdo.','err')}};
$('#clr').onclick=()=>{$$(mode==='qr'?'#qf [data-k]':'#bval').forEach(e=>e.type==='checkbox'?e.checked=false:e.tagName==='SELECT'?e.selectedIndex=0:e.value='');touched=0;render()};
$('#yr').textContent=new Date().getFullYear();
form();lock();render();
})();
