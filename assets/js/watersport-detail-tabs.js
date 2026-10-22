/* Product detail navigation for Bali Trans watersport pages */
(()=>{'use strict';
const main=document.querySelector('main');if(!main||document.querySelector('[data-ws-product-tabs]'))return;
const candidates=[...main.querySelectorAll('.panel,.ws-panel,.ws-section,main>section')];
const entries=[];
const match=(heading)=>{const h=heading.toLowerCase();
if(/galeri|foto|video|aktivitas watersport populer|aktivitas lain|lainnya/.test(h))return null;
if(/informasi aktivitas|ringkasan|tentang aktivitas|deskripsi|layanan /.test(h))return ['Ringkasan','ringkasan'];
if(/harga|paket|pilih|tiket|booking|pemesanan/.test(h))return ['Paket & harga','paket'];
if(/termasuk|fasilitas|yang didapat|include/.test(h))return ['Yang termasuk','termasuk'];
if(/redeem|voucher|penukaran|menggunakan tiket/.test(h))return ['Cara redeem','redeem'];
if(/lokasi|alamat|penjemputan|meeting point/.test(h))return ['Lokasi','lokasi'];
if(/syarat|ketentuan|pembatalan|kebijakan|sebelum memesan|rincian dan ketentuan/.test(h))return ['Ketentuan','ketentuan'];
if(/itinerary|jadwal perjalanan/.test(h))return ['Jadwal','jadwal'];
return null};
for(const el of candidates){const heading=el.querySelector('h2,h3');if(!heading)continue;const result=match(heading.textContent||'');if(!result)continue;
if(!el.id)el.id='ws-section-'+result[1];el.classList.add('ws-tab-section');
if(!entries.some(x=>x.id===el.id))entries.push({label:result[0],id:el.id,el})}
if(!entries.length)return;
if(!entries.some(x=>x.label==='Cara redeem')){const section=document.createElement('section');section.className=(entries[0].el.classList.contains('ws-panel')?'ws-panel':'panel')+' ws-tab-section';section.id='ws-section-redeem';section.innerHTML='<h2>Cara redeem / menggunakan voucher</h2><ol class="ws-redeem-list"><li>Buka voucher atau konfirmasi pemesanan yang diterima setelah pemesanan disetujui.</li><li>Tunjukkan voucher kepada petugas/operator sesuai petunjuk pada konfirmasi.</li><li>Pastikan titik penukaran, waktu kedatangan, nama pemesan, dokumen yang diperlukan, dan syarat peserta sebelum berangkat.</li></ol><p class="sub">Prosedur dan lokasi redeem dapat berbeda menurut operator. Ikuti detail pada voucher yang terkonfirmasi; informasi yang belum tersedia perlu dikonfirmasi sebelum pembayaran.</p>';
const before=candidates.find(el=>/syarat|ketentuan|pembatalan|kebijakan|rincian dan ketentuan/i.test(el.querySelector('h2,h3')?.textContent||''));(before||entries[entries.length-1].el).insertAdjacentElement('beforebegin',section);entries.push({label:'Cara redeem',id:section.id,el:section})}
const priority=['Ringkasan','Paket & harga','Yang termasuk','Lokasi','Cara redeem','Jadwal','Ketentuan'];entries.sort((a,b)=>priority.indexOf(a.label)-priority.indexOf(b.label));
const nav=document.createElement('nav');nav.className='ws-product-tabs';nav.dataset.wsProductTabs='';nav.setAttribute('aria-label','Navigasi detail aktivitas');nav.innerHTML='<div class="ws-product-tabs-inner">'+entries.map((x,i)=>'<a href="#'+x.id+'" data-ws-tab="'+x.id+'"'+(i===0?' aria-current="location"':'')+'>'+x.label+'</a>').join('')+'</div>';
const hero=main.querySelector('.hero,.ws-hero');if(hero)hero.insertAdjacentElement('afterend',nav);else main.insertAdjacentElement('afterbegin',nav);
const links=[...nav.querySelectorAll('[data-ws-tab]')];const activate=id=>{links.forEach(a=>{if(a.dataset.wsTab===id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});const active=links.find(a=>a.dataset.wsTab===id);if(active)active.scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'})};
links.forEach(a=>a.addEventListener('click',e=>{const target=document.getElementById(a.dataset.wsTab);if(!target)return;e.preventDefault();history.replaceState(null,'','#'+target.id);target.scrollIntoView({behavior:'smooth',block:'start'});activate(target.id)}));
if('IntersectionObserver'in window){const observer=new IntersectionObserver(items=>{const visible=items.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)activate(visible.target.id)},{rootMargin:'-16% 0px -68% 0px',threshold:[0,.15,.35]});entries.forEach(x=>observer.observe(x.el))}
})();