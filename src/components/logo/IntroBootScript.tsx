'use client';

import { useLayoutEffect, useSyncExternalStore } from 'react';

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

const subscribe = () => () => {};

/**
 * Betik yalnızca sunucudan gelen HTML'de bulunur; tarayıcı onu orada, sayfa
 * çizilmeden çalıştırır. React sayfayı tarayıcıda yeniden kurduğunda (ör. dil
 * değişiminde) betik oluşturulmaz: React'in tarayıcıda yarattığı <script>
 * zaten çalışmaz ve "Encountered a script tag…" uyarısı verir. İşi ilk
 * açılışta bittiği için yeniden çalışması da gerekmez.
 */
export function IntroBootScript() {
  // Sunucuda ve ilk eşleştirmede (hydration) true, tarayıcıdaki her yeni kurulumda false.
  const fromServer = useSyncExternalStore(
    subscribe,
    () => false,
    () => true,
  );

  // Dil değişiminde React <html>'i yeniden kurar ve betiğin eklediği `js` sınıfı
  // silinir; betik de yeniden çalışmaz. Sınıfı çizimden önce geri koy — yoksa
  // `.js`'e bağlı hareketler (logo çizimi, Hikâyemiz girişleri) çalışmaz.
  useLayoutEffect(() => {
    document.documentElement.classList.add('js');
  }, []);

  return fromServer ? <script dangerouslySetInnerHTML={{ __html: script }} /> : null;
}
