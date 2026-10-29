
document.documentElement.classList.add('js');
// Повече части влизат поотделно: карти, панели, стъпки и въпроси
[['.system-copy > *',0],['.system-art',2],['.cases .head > *',0],['.premium-projects .project',0],['.services-heading > *',0],['.service-tabs',1],['.service-panels',2],['.steps li',0],['.faq details',0]].forEach(([sel,base])=>document.querySelectorAll(sel).forEach((el,i)=>{el.classList.add('rv');el.style.setProperty('--i',base+i);}));

const toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('.menu');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Затвори меню':'Отвори меню');menu.classList.toggle('open',open);});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Отвори меню');}));
document.querySelectorAll('.slist li').forEach(li=>li.querySelector('button').addEventListener('click',()=>{
  document.querySelectorAll('.slist li').forEach(o=>{o.classList.remove('on');o.querySelector('button').setAttribute('aria-expanded','false')});
  li.classList.add('on');li.querySelector('button').setAttribute('aria-expanded','true');
}));
// Формата за одит праща към Web3Forms от браузъра и показва отговора на място
const auditForm=document.getElementById('f'),okMsg=document.getElementById('ok');
auditForm.addEventListener('submit',async e=>{
  e.preventDefault();
  const req=[...auditForm.querySelectorAll('[required]')];let bad=null;
  req.forEach(f=>{const wrong=!f.value.trim()||(f.type==='email'&&!/^\S+@\S+\.\S+$/.test(f.value));f.setAttribute('aria-invalid',String(wrong));if(wrong&&!bad)bad=f;});
  if(bad){okMsg.className='ok err';okMsg.textContent='Попълни име и валиден имейл.';okMsg.hidden=false;bad.focus();return;}
  const btn=auditForm.querySelector('button[type=submit]'),label=btn.firstChild.textContent;
  btn.disabled=true;btn.firstChild.textContent='Изпращане… ';
  try{
    const res=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{Accept:'application/json'},body:new FormData(auditForm)});
    const data=await res.json();if(!data.success)throw new Error(data.message);
    auditForm.reset();okMsg.className='ok';okMsg.textContent='Благодарим! Ще се свържем с теб до 1 работен ден.';
  }catch(err){okMsg.className='ok err';okMsg.textContent='Не успяхме да изпратим формата. Опитай пак или пиши на info@nextype.bg.';}
  okMsg.hidden=false;btn.disabled=false;btn.firstChild.textContent=label;
});
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  const els=[...document.querySelectorAll('.rv')].filter(e=>e.getBoundingClientRect().top>innerHeight);
  els.forEach(e=>e.classList.add('pre'));
  const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.remove('pre');io.unobserve(x.target)}}),{rootMargin:'0px 0px -8% 0px'});
  els.forEach(e=>io.observe(e));
}

const serviceTabs=[...document.querySelectorAll('.service-tab')];
function selectService(index){serviceTabs.forEach((tab,i)=>{const active=i===index;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;document.getElementById(tab.getAttribute('aria-controls')).hidden=!active;});}
serviceTabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectService(index));tab.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(index+1)%serviceTabs.length;else if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(index-1+serviceTabs.length)%serviceTabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=serviceTabs.length-1;else return;event.preventDefault();selectService(next);serviceTabs[next].focus();});});

// Low-density ambient network, active only while visible.
(()=>{const canvas=document.querySelector('.neural-canvas');if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;const region=canvas.parentElement,motion=matchMedia('(prefers-reduced-motion: reduce)');let w=0,h=0,nodes=[],frame=0,last=0,visible=false;
function size(){w=region.clientWidth;h=region.clientHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);nodes=Array.from({length:w<600?26:48},(_,i)=>({x:((i*137.53)%997)/997*w,y:((i*223.77)%991)/991*h,vx:Math.sin(i*2.4)*.22,vy:Math.cos(i*1.8)*.18}));draw(false);}
function draw(move){ctx.clearRect(0,0,w,h);for(let i=0;i<nodes.length;i++){const a=nodes[i];if(move){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>w)a.vx*=-1;if(a.y<0||a.y>h)a.vy*=-1;}for(let j=i+1;j<nodes.length;j++){const b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<165){ctx.strokeStyle='rgba(140,163,229,'+((1-d/165)*.4)+')';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}ctx.fillStyle='rgba(182,198,255,'+(.45+.25*Math.sin((performance.now()/1200)+i))+')';ctx.beginPath();ctx.arc(a.x,a.y,i%5===0?1.8:1.1,0,Math.PI*2);ctx.fill();}}
function loop(time){frame=0;if(!visible||document.hidden||motion.matches)return;if(time-last>40){draw(true);last=time;}frame=requestAnimationFrame(loop);}
function sync(){if(frame){cancelAnimationFrame(frame);frame=0;}if(visible&&!document.hidden&&!motion.matches)frame=requestAnimationFrame(loop);else draw(false);}
new ResizeObserver(size).observe(region);new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(region);document.addEventListener('visibilitychange',sync);motion.addEventListener('change',sync);size();})();
if(matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches){document.querySelectorAll('.premium-projects .project').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');});});}
