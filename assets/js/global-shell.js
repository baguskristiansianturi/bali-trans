/* One shared shell for all standalone content pages. Checkout pages intentionally do not load this file. */
(function(){
 const links=[
  ['Home','./index.html'],['Destinations','./index.html#destinations'],['Tours & activities','./index.html#activities'],
  ['Transport service','./transport-service.html'],['Travel guides','./index.html#travel-guides'],['About','./index.html#about'],['Contact','./index.html#contact']
 ];
 const linkHTML=links.map(([label,url])=>'<a href="'+url+'">'+label+'</a>').join('');
 const header=document.createElement('header');header.className='bt-site-header';header.innerHTML=
 '<div class="bt-shell"><div class="bt-header-row"><a class="bt-brand" href="./index.html" aria-label="Bali Trans home"><span class="bt-brand-mark">B</span><span><span class="bt-brand-name">Bali<span> Trans</span></span><span class="bt-brand-tag">TOURS · TRIPS · TRANSFER</span></span></a>'+
 '<nav class="bt-main-nav" aria-label="Main navigation">'+linkHTML+'</nav>'+
 '<div class="bt-actions"><button class="bt-locale" type="button" aria-label="Language and currency">🇮🇩 IDR⌄</button><button class="bt-action" type="button" id="btSearchToggle" aria-label="Search"><span aria-hidden="true">⌕</span></button><button class="bt-action bt-mobile-toggle" type="button" id="btMenuToggle" aria-label="Open menu" aria-expanded="false">☰</button></div></div></div>'+
 '<div class="bt-search-panel bt-hidden" id="btSearchPanel"><div class="bt-shell"><form id="btSearchForm" role="search"><input class="bt-search-input" type="search" id="btSearchInput" placeholder="Search tours, activities or places..." aria-label="Search tours, activities or places"></form></div></div>'+
 '<div class="bt-mobile-panel bt-hidden" id="btMobilePanel"><div class="bt-mobile-links">'+linkHTML+'</div></div>';
 const footer=document.createElement('footer');footer.className='bt-site-footer';footer.innerHTML=
 '<div class="bt-footer-inner"><div class="bt-footer-grid"><div><a class="bt-footer-brand" href="./index.html" aria-label="Bali Trans home"><span class="bt-brand-mark">B</span><span class="bt-brand-name">Bali<span> Trans</span></span></a><p class="bt-footer-copy">Discover Bali tours, local experiences and private transport. Compare trip details and contact our team to discuss your plans before booking.</p><a class="bt-footer-cta" href="./index.html#contact">Talk to our team <span aria-hidden="true">→</span></a></div>'+
 '<div class="bt-footer-cols"><section><h2>Discover</h2><ul><li><a href="./index.html#activities">All tours & activities</a></li><li><a href="./index.html#destinations">Destinations</a></li><li><a href="./watersport-tanjung-benoa.html">Watersports</a></li><li><a href="./index.html#travel-guides">Blog</a></li></ul></section>'+
 '<section><h2>Plan your trip</h2><ul><li><a href="./transport-service.html">Private transport</a></li><li><a href="./bali-airport-transfer.html">Airport transfer</a></li><li><a href="./bali-port-transfer.html">Port transfer</a></li><li><a href="./bali-private-day-tour.html">Private day tour</a></li></ul></section>'+
 '<section><h2>Help & support</h2><ul><li><a href="./index.html#help">Help centre</a></li><li><a href="./index.html#help">FAQs</a></li><li><a href="./index.html?page=contact">Contact our team</a></li></ul></section>'+
 '<section><h2>About us</h2><ul><li><a href="./index.html#about">About Bali Trans</a></li><li><a href="./terms-and-conditions.html">Terms & conditions</a></li><li><a href="./index.html#privacy">Privacy policy</a></li></ul></section></div></div>'+
 '<div class="bt-footer-note"><span aria-hidden="true" style="font-size:22px;color:#b9c9e5">ⓘ</span><div><strong>Planning something special in Bali?</strong><p>Tell us your destination, dates and group size. Confirm trip details, prices and availability with our team before booking.</p></div></div>'+
 '<div class="bt-footer-bottom"><p>© 2026 Bali Trans. Tours, experiences and private transport in Bali.</p><p>Trip details, prices and availability should be confirmed with our team before booking.</p></div></div>';
 function init(){
   // The shared shell is the only chrome on pages that load this script. Never remove semantic header/footer elements from page content.
   document.body.insertBefore(header,document.body.firstChild);document.body.appendChild(footer);
   const menu=document.getElementById('btMenuToggle'),panel=document.getElementById('btMobilePanel'),search=document.getElementById('btSearchToggle'),searchPanel=document.getElementById('btSearchPanel'),form=document.getElementById('btSearchForm'),input=document.getElementById('btSearchInput');
   menu.addEventListener('click',()=>{const open=panel.classList.toggle('bt-hidden')===false;menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰';searchPanel.classList.add('bt-hidden')});
   search.addEventListener('click',()=>{const open=searchPanel.classList.toggle('bt-hidden')===false;if(open){panel.classList.add('bt-hidden');menu.setAttribute('aria-expanded','false');input.focus()}});
   document.addEventListener('click',e=>{if(!header.contains(e.target)){panel.classList.add('bt-hidden');searchPanel.classList.add('bt-hidden');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}});
   form.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(q)location.href='./index.html?page=search&q='+encodeURIComponent(q)});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();