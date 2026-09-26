import { INTRO } from '@/config/intro';

/*
 * <body>'nin en başında, sayfa daha çizilmeden çalışan küçük betik.
 *
 * Animasyonun oynayıp oynamayacağına burada karar verilir ve <html>'e sınıf
 * eklenir. React yüklenmeyi beklemek, sayfanın bir an görünüp sonra katmanın
 * üstüne kapanması demek olurdu.
 */
const config = JSON.stringify({
  policy: INTRO.policy,
  key: INTRO.storageKey,
  force: INTRO.forceParam,
  pending: INTRO.pendingClass,
  started: INTRO.startedAttr,
  fallbackMs: INTRO.fallbackMs,
  repeatMs: INTRO.repeatDays * 24 * 60 * 60 * 1000,
});

const script = `(function(){
var d=document.documentElement,c=${config};
d.classList.add('js');
try{
  var force=new URLSearchParams(location.search).has(c.force);
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!force&&reduce)return;
  var play=force;
  if(!play){
    if(c.policy==='tab'){play=!sessionStorage.getItem(c.key);sessionStorage.setItem(c.key,'1');}
    else if(c.policy==='device'){play=!localStorage.getItem(c.key);localStorage.setItem(c.key,'1');}
    else{var now=Date.now(),last=Number(localStorage.getItem(c.key))||0;play=now-last>c.repeatMs;if(play)localStorage.setItem(c.key,String(now));}
  }
  if(!play)return;
  d.classList.add(c.pending);
  setTimeout(function(){if(!d.hasAttribute(c.started))d.classList.remove(c.pending);},c.fallbackMs);
}catch(e){}
})();`;

export function IntroBootScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
