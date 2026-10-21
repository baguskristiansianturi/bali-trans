/* Bali Trans watersport pricing: single source of truth for listing, detail pages and checkout. */
(() => {
  'use strict';
  const money = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
  const singles = {
    'banana-boat': {name:'Banana Boat', base:70000, unit:'orang', min:2, duration:'17 menit', activities:1, file:'watersport-banana-boat.html'},
    'parasailing': {name:'Parasailing Adventure', base:275000, unit:'orang', min:1, duration:'1 putaran (perkiraan 8 menit di udara)', activities:1, file:'watersport-parasailing.html'},
    'jet-ski': {name:'Jet Ski dengan instruktur', base:150000, unit:'orang', min:1, duration:'17 menit', activities:1, file:'watersport-jet-ski.html'},
    'rolling-donut': {name:'Rolling Donut', base:90000, unit:'orang', min:2, duration:'15 menit', activities:1, file:'watersport-flying-fish-donut-boat.html'},
    'flying-fish': {name:'Flying Fish', base:150000, unit:'orang', min:2, duration:'2 kali terbang (perkiraan 12–17 menit)', activities:1, file:'watersport-flying-fish-donut-boat.html'},
    'seawalker': {name:'Sea Walker', base:350000, unit:'orang', min:1, duration:'30 menit', activities:1, file:'watersport-sea-walker-snorkeling.html'},
    'scuba-diving': {name:'Scuba Diving', base:300000, unit:'orang', min:1, duration:'30 menit di bawah air', activities:1, file:'watersport-sea-walker-snorkeling.html'},
    'snorkeling': {name:'Snorkeling', base:150000, unit:'orang', min:2, duration:'60 menit', activities:1, file:'watersport-sea-walker-snorkeling.html'},
    'flyboard': {name:'Flyboard', base:450000, unit:'orang', min:1, duration:'15–20 menit', activities:1, file:'watersport-paket-watersport-wisata-laut.html'},
    'wakeboard': {name:'Wakeboard', base:300000, unit:'orang', min:1, duration:'1 sesi (perkiraan 15 menit)', activities:1, file:'watersport-paket-watersport-wisata-laut.html'},
    'glass-bottom-boat': {name:'Glass Bottom Boat + Pulau Penyu', base:500000, unit:'boat', min:1, duration:'Sekitar 60 menit; maksimal 10 orang per boat', activities:1, file:'watersport-glass-bottom-boat-pulau-penyu.html'}
  };
  const packages = {
    A:{name:'Paket A · Banana Boat, Parasailing, Jet Ski',base:450000,activities:3,items:['Banana Boat','Parasailing Adventure','Jet Ski dengan instruktur']},
    B:{name:'Paket B · Parasailing, Flying Fish, Banana Boat',base:450000,activities:3,items:['Parasailing Adventure','Flying Fish','Banana Boat']},
    C:{name:'Paket C · Snorkeling, Banana Boat, Flying Fish',base:325000,activities:3,items:['Snorkeling','Banana Boat','Flying Fish']},
    D:{name:'Paket D · Scuba Diving, Parasailing, Banana Boat',base:600000,activities:3,items:['Scuba Diving','Parasailing Adventure','Banana Boat']},
    E:{name:'Paket E · Scuba Diving, Parasailing, Flying Fish',base:675000,activities:3,items:['Scuba Diving','Parasailing Adventure','Flying Fish']},
    F:{name:'Paket F · Scuba Diving, Parasailing, Rolling Donut',base:620000,activities:3,items:['Scuba Diving','Parasailing Adventure','Rolling Donut']},
    G:{name:'Paket G · Sea Walker, Banana Boat, Parasailing',base:650000,activities:3,items:['Sea Walker','Banana Boat','Parasailing Adventure']},
    H:{name:'Paket H · Snorkeling, Glass Bottom Boat + Pulau Penyu',base:350000,activities:2,items:['Snorkeling','Glass Bottom Boat + Pulau Penyu']}
  };
  const audienceLabel = {domestic:'Wisatawan domestik / pemegang KITAS', foreign:'Wisatawan asing'};
  function singlePrice(item, audience) { return item.base + (audience === 'foreign' ? 100000 : 50000); }
  function packagePrice(item, audience) {
    const marked = item.base + item.activities * (audience === 'foreign' ? 100000 : 50000);
    const cap = audience === 'foreign' ? 50000 : 35000;
    return {marked, discount:Math.min(Math.round(marked * 0.15), cap), final:marked-Math.min(Math.round(marked * 0.15), cap)};
  }
  function currentProduct() {
    const file = location.pathname.split('/').pop() || '';
    const title = (document.querySelector('h1')?.textContent || '').toLowerCase();
    if (title.includes('banana')) return 'banana-boat';
    if (title.includes('jet ski') || title.includes('jetski')) return 'jet-ski';
    if (title.includes('parasailing')) return 'parasailing';
    if (title.includes('flying fish')) return 'flying-fish';
    if (title.includes('rolling donut') || title.includes('donut boat')) return 'rolling-donut';
    if (title.includes('sea walker') || title.includes('seawalker')) return 'seawalker';
    if (title.includes('scuba')) return 'scuba-diving';
    if (title.includes('snorkel')) return 'snorkeling';
    if (title.includes('glass bottom') || title.includes('pulau penyu')) return 'glass-bottom-boat';
    if (title.includes('flyboard')) return 'flyboard';
    if (title.includes('wakeboard')) return 'wakeboard';
    return Object.keys(singles).find(k => singles[k].file === file) || null;
  }
  function setPriceText(el, text) { if (el) el.textContent = text; }
  function initListing() {
    document.querySelectorAll('#watersportCards .ws-card').forEach(card => {
      const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
      let key = null;
      if (title.includes('banana')) key='banana-boat';
      else if (title.includes('jet ski') || title.includes('jetski')) key='jet-ski';
      else if (title.includes('parasailing')) key='parasailing';
      else if (title.includes('flying fish')) key='flying-fish';
      else if (title.includes('donut')) key='rolling-donut';
      else if (title.includes('sea walker') || title.includes('seawalker')) key='seawalker';
      else if (title.includes('snorkel')) key='snorkeling';
      else if (title.includes('scuba')) key='scuba-diving';
      else if (title.includes('glass bottom') || title.includes('pulau penyu')) key='glass-bottom-boat';
      else if (title.includes('flyboard')) key='flyboard';
      else if (title.includes('wakeboard')) key='wakeboard';
      const target = card.querySelector('.ws-card-price-value');
      if (key && target) {
        const item = singles[key];
        target.textContent = money(singlePrice(item,'domestic')) + (item.unit === 'boat' ? '/boat' : '/orang');
        const label = card.querySelector('.ws-card-price-label');
        if (label) label.textContent = 'Domestik · harga per ' + item.unit;
        if (!card.querySelector('.ws-foreign-note')) {
          const note=document.createElement('p'); note.className='ws-foreign-note'; note.style.cssText='font-size:12px;color:#63748d;margin:4px 0 12px';
          note.textContent='Harga wisatawan asing: '+money(singlePrice(item,'foreign'))+(item.unit==='boat'?'/boat':'/orang');
          target.parentElement?.insertAdjacentElement('afterend',note);
        }
      } else if (title.includes('paket')) {
        const label=card.querySelector('.ws-card-price-label'); const target2=card.querySelector('.ws-card-price-value');
        if (label) label.textContent='Harga paket';
        if (target2) target2.textContent='Pilih paket untuk melihat harga';
      }
    });
  }
  function initDetail() {
    const file=location.pathname.split('/').pop() || '';
    const key=currentProduct();
    if (key) {
      const item=singles[key];
      document.querySelectorAll('.price,.ws-card-price-value,[data-ws-price]').forEach(el => {
        if (el.matches('[data-ws-price]') || el.classList.contains('price')) setPriceText(el, money(singlePrice(item,'domestic'))+(item.unit==='boat'?'/boat':'/orang'));
      });
      const aside=document.querySelector('aside.panel');
      if (aside) {
        let note=aside.querySelector('[data-ws-audience-prices]');
        if (!note) { note=document.createElement('div'); note.dataset.wsAudiencePrices=''; note.style.cssText='margin:8px 0 14px;font-size:13px;line-height:1.7;color:#63748d'; aside.querySelector('.price')?.insertAdjacentElement('afterend',note); }
        note.innerHTML='<strong style="color:#172b4d">Wisatawan asing: '+money(singlePrice(item,'foreign'))+(item.unit==='boat'?'/boat':'/orang')+'</strong><br>Durasi: '+item.duration+'<br>Minimum pemesanan: '+item.min+' '+(item.unit==='boat'?'boat':'orang')+'.';
        const price=aside.querySelector('.price');
        if(price) price.insertAdjacentHTML('afterend','<a class="btn" style="margin:12px 0 4px" href="./watersport-checkout.html?type=single&product='+encodeURIComponent(key)+'">Pesan aktivitas ini</a>');
      }
    } else if (file.startsWith('watersport-paket-')) {
      const p=document.querySelector('.price');
      if(p) p.textContent='Paket mulai '+money(Math.min(...Object.values(packages).map(x=>packagePrice(x,'domestic').final)))+'/orang';
      const aside=document.querySelector('aside.panel');
      if(aside && !aside.querySelector('[data-ws-package-cta]')) {
        const a=document.createElement('a'); a.className='btn'; a.dataset.wsPackageCta=''; a.style.margin='12px 0 4px'; a.href='./watersport-checkout.html?type=package'; a.textContent='Pilih paket dan tanggal'; p?.insertAdjacentElement('afterend',a);
        const note=document.createElement('p'); note.style.cssText='font-size:13px;line-height:1.6;color:#63748d'; note.textContent='Tersedia Paket A–H. Harga berbeda untuk wisatawan domestik/KITAS dan wisatawan asing; rincian diskon ditampilkan sebelum permintaan dikirim.'; a.insertAdjacentElement('afterend',note);
      }
    }
  }
  function initCheckout() {
    const form=document.querySelector('#watersportBookingForm');
    if(!form) return;
    const params=new URLSearchParams(location.search);
    const typeEl=form.elements.audience, productEl=form.elements.product, packageEl=form.elements.packageCode, qtyEl=form.elements.quantity;
    const typeWrap=document.querySelector('[data-package-wrap]');
    const singleWrap=document.querySelector('[data-single-wrap]');
    const qtyLabel=document.querySelector('[data-quantity-label]');
    const summary=document.querySelector('#bookingSummary');
    const hiddenTotal=form.elements.estimatedTotal;
    const fmt=n=>money(n);
    function update() {
      const audience=typeEl.value;
      const isPackage=productEl.value==='package';
      if(typeWrap) typeWrap.hidden=!isPackage;
      if(singleWrap) singleWrap.hidden=isPackage;
      const item=singles[productEl.value];
      const pkg=packages[packageEl.value];
      const min=isPackage?2:(item?.min||1);
      qtyEl.min=String(min);
      if(Number(qtyEl.value)<min) qtyEl.value=String(min);
      if(qtyLabel) qtyLabel.textContent=isPackage?'Jumlah peserta (minimal 2)':'Jumlah '+(item?.unit==='boat'?'boat':'peserta')+' (minimal '+min+')';
      let unitPrice=0, discount=0, total=0, itemName='';
      if(isPackage && pkg) { const result=packagePrice(pkg,audience); unitPrice=result.final; discount=result.discount*Number(qtyEl.value); total=unitPrice*Number(qtyEl.value); itemName=pkg.name; }
      else if(item) { unitPrice=singlePrice(item,audience); total=unitPrice*Number(qtyEl.value); itemName=item.name; }
      if(summary) summary.innerHTML='<div style="font-weight:800;font-size:16px;margin-bottom:8px">'+itemName+'</div><div>Jenis wisatawan: '+audienceLabel[audience]+'</div><div>Harga per '+(isPackage?'peserta':(item?.unit||'orang'))+': '+fmt(unitPrice)+'</div>'+(discount?'<div style="color:#18794e">Diskon paket: −'+fmt(discount)+'</div>':'')+'<div style="display:flex;justify-content:space-between;gap:12px;border-top:1px solid #dfe5ec;margin-top:10px;padding-top:12px;font-weight:850"><span>Estimasi total</span><span>'+fmt(total)+'</span></div><small style="display:block;color:#667085;margin-top:8px">Estimasi harga berdasarkan daftar Bali Trans. Jadwal, ketersediaan, dan detail akhir perlu dikonfirmasi sebelum pembayaran.</small>';
      if(hiddenTotal) hiddenTotal.value=String(total);
    }
    productEl.addEventListener('change',update); packageEl.addEventListener('change',update); typeEl.addEventListener('change',update); qtyEl.addEventListener('input',update);
    const prod=params.get('product'); const type=params.get('type');
    if(type==='package') { productEl.value='package'; }
    else if(prod && singles[prod]) productEl.value=prod;
    if(params.get('package') && packages[params.get('package')]) packageEl.value=params.get('package');
    update();
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(!form.reportValidity()) return;
      const fd=new FormData(form);
      const details=[
        'Permintaan pemesanan Bali Trans — Watersport Tanjung Benoa',
        'Produk: '+(productEl.value==='package'?packages[packageEl.value].name:singles[productEl.value].name),
        'Jenis wisatawan: '+audienceLabel[typeEl.value],
        'Tanggal aktivitas: '+fd.get('activityDate'),
        'Jumlah: '+fd.get('quantity'),
        'Nama pemesan: '+fd.get('buyerName'),
        'Telepon pemesan: '+fd.get('buyerPhone'),
        'Pesanan untuk: '+(fd.get('forSomeone')?'orang lain':'diri sendiri'),
        fd.get('guestName')?'Nama peserta/tamu: '+fd.get('guestName'):'',
        fd.get('guestPhone')?'Telepon peserta/tamu: '+fd.get('guestPhone'):'',
        fd.get('notes')?'Catatan: '+fd.get('notes'):'',
        'Estimasi total: '+fmt(Number(hiddenTotal.value)),
        'Catatan: mohon konfirmasi ketersediaan dan harga akhir sebelum pembayaran.'
      ].filter(Boolean).join('\n');
      const output=document.querySelector('#bookingResult');
      if(output){output.hidden=false; output.querySelector('pre').textContent=details; output.scrollIntoView({behavior:'smooth',block:'start'});}
      const copyBtn=document.querySelector('#copyBooking');
      if(copyBtn) copyBtn.onclick=()=>navigator.clipboard?.writeText(details).then(()=>{copyBtn.textContent='Ringkasan disalin';}).catch(()=>{});
    });
    const toggle=form.elements.forSomeone;
    const guestFields=document.querySelectorAll('[data-guest-fields]');
    const setGuestFields=()=>guestFields.forEach(el=>{el.hidden=!toggle?.checked;});
    setGuestFields();
    toggle?.addEventListener('change',setGuestFields);
  }
  document.addEventListener('DOMContentLoaded',()=>{initListing();initDetail();initCheckout();});
  window.BaliTransWatersport={singles,packages,singlePrice,packagePrice,money};
})();