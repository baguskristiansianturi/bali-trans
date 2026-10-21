/* Bali Trans watersport pricing: single source of truth for listing, detail pages and checkout. */
(() => {
  'use strict';
  const money = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
  const singles = {
    'banana-boat': {name:'Banana Boat', base:70000, unit:'orang', min:2, duration:'18 menit', activities:1, file:'watersport-banana-boat.html', age:7, description:'Duduk bersama peserta lain di atas perahu berbentuk pisang yang ditarik speedboat. Ikuti instruksi petugas dan posisi duduk yang ditentukan.', note:'Minimal pemesanan acuan: 2 orang. Durasi Bali Trans ditetapkan 18 menit, tiga menit lebih lama dari acuan umum sekitar 15 menit.'},
    'parasailing': {name:'Parasailing Adventure', base:275000, unit:'orang', min:1, duration:'1 putaran (perkiraan 5 menit di udara)', activities:1, file:'watersport-parasailing.html', age:7, description:'Nikmati pemandangan pantai dari udara saat parasut ditarik perahu. Pelaksanaan bergantung pada angin, cuaca, dan keputusan keselamatan operator.', note:'Jika cuaca tidak mendukung, jadwal atau penggantian aktivitas harus dikonfirmasi sebelum menyetujui.'},
    'jet-ski': {name:'Jet Ski dengan instruktur', base:150000, unit:'orang', min:1, duration:'15 menit', activities:1, file:'watersport-jet-ski.html', age:7, description:'Rasakan pengalaman mengendarai jet ski dengan pendamping instruktur. Untuk tiket acuan ini, peserta didampingi instruktur; bukan tiket berkendara mandiri.', note:'Ikuti arahan instruktur, gunakan perlengkapan keselamatan, dan konfirmasi ketentuan usia/berat sebelum memesan.'},
    'rolling-donut': {name:'Rolling Donut', base:90000, unit:'orang', min:2, duration:'18 menit', activities:1, file:'watersport-rolling-donut-tanjung-benoa.html', age:7, description:'Duduk di atas pelampung berbentuk donat yang ditarik speedboat. Gerakan dan tingkat guncangan bergantung pada kondisi laut serta arahan operator.', note:'Minimal pemesanan acuan: 2 orang. Durasi Bali Trans ditetapkan 18 menit, tiga menit lebih lama dari acuan umum sekitar 15 menit. Pastikan peserta memenuhi syarat kesehatan dan keselamatan.'},
    'flying-fish': {name:'Flying Fish', base:150000, unit:'orang', min:2, duration:'3 kali terbang (jumlah penerbangan sesuai kondisi dan keputusan operator)', activities:1, file:'watersport-flying-fish-tanjung-benoa.html', age:7, description:'Berbaring atau berpegangan pada wahana berbentuk ikan yang ditarik speedboat sehingga dapat terangkat oleh angin. Pengalaman bergantung pada kondisi cuaca dan laut.', note:'Minimal pemesanan acuan: 2 orang. Bali Trans menyediakan tiga kali terbang, dibandingkan acuan umum dua kali terbang. Jumlah aktual tetap mengikuti cuaca dan keputusan operator. Ikuti posisi tubuh dan instruksi keselamatan dari petugas.'},
    'seawalker': {name:'Sea Walker', base:350000, unit:'orang', min:1, duration:'30 menit', activities:1, file:'watersport-sea-walker-tanjung-benoa.html', age:12, description:'Berjalan di bawah permukaan laut menggunakan helm khusus dan mengikuti pendampingan operator. Waktu aktivitas mengacu pada sesi berjalan di bawah air.', note:'Panduan acuan usia minimal 12 tahun; persyaratan kesehatan dan ketentuan operator wajib dikonfirmasi.'},
    'scuba-diving': {name:'Scuba Diving', base:300000, unit:'orang', min:1, duration:'30 menit di bawah air', activities:1, file:'watersport-scuba-diving-tanjung-benoa.html', age:12, description:'Pengalaman menyelam dengan peralatan scuba dan pengarahan instruktur. Durasi acuan adalah waktu di bawah air; total waktu di lokasi dapat lebih lama.', note:'Panduan acuan usia minimal 12 tahun. Peserta harus mengikuti pemeriksaan dan instruksi operator.'},
    'snorkeling': {name:'Snorkeling', base:150000, unit:'orang', min:2, duration:'60 menit', activities:1, file:'watersport-snorkeling-tanjung-benoa.html', age:12, description:'Amati kehidupan laut dari permukaan menggunakan masker dan snorkel. Acuan ini tidak mencakup pendamping yang selalu berada di samping peserta saat berenang.', note:'Acuan menyebut minimal 2 orang dan usia minimal 12 tahun. Peserta harus bisa berenang; konfirmasi ketentuan operator sebelum memesan.'},
    'flyboard': {name:'Flyboard', base:450000, unit:'orang', min:1, duration:'15–20 menit', activities:1, file:'watersport-flyboard-tanjung-benoa.html', age:12, description:'Berdiri di atas papan yang didorong tekanan air dan mendapat arahan instruktur untuk menjaga keseimbangan.', note:'Acuan usia minimal 12 tahun; ketersediaan wahana, syarat fisik, dan sesi perlu dikonfirmasi.'},
    'wakeboard': {name:'Wakeboard', base:300000, unit:'orang', min:1, duration:'1 sesi (perkiraan 15 menit)', activities:1, file:'watersport-wakeboard-tanjung-benoa.html', age:12, description:'Berdiri di atas papan sambil ditarik perahu, dengan pengarahan teknik dan keselamatan sebelum memulai.', note:'Acuan usia minimal 12 tahun; konfirmasi tingkat pengalaman dan persyaratan operator.'},
    'glass-bottom-boat': {name:'Glass Bottom Boat + Pulau Penyu', base:500000, unit:'boat', min:1, duration:'Sekitar 60 menit; maksimal 10 orang per boat', activities:1, file:'watersport-glass-bottom-boat-pulau-penyu.html', age:0, description:'Perjalanan menggunakan perahu dengan bagian dasar transparan untuk melihat bawah laut, dilanjutkan kunjungan ke Pulau Penyu.', note:'Harga acuan dihitung per boat, maksimal 10 orang. Tiket masuk Pulau Penyu belum termasuk dalam harga boat acuan.'}
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
  function singlePrice(item, audience) {
    if (item.unit === 'boat') return audience === 'foreign' ? 300000 : 200000;
    return item.base + (audience === 'foreign' ? 100000 : 50000);
  }
  function packagePrice(item, audience) {
    const marked = item.base + item.activities * (audience === 'foreign' ? 100000 : 50000);
    const cap = audience === 'foreign' ? 50000 : 35000;
    return {marked, discount:Math.min(Math.round(marked * 0.15), cap), final:marked-Math.min(Math.round(marked * 0.15), cap)};
  }
  function currentProduct() {
    const file = location.pathname.split('/').pop() || '';
    const requested = new URLSearchParams(location.search).get('product');
    if (requested && singles[requested]) return requested;
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
    if (file.startsWith('watersport-paket-')) return null;
    return Object.keys(singles).find(k => singles[k].file === file) || null;
  }
  function setPriceText(el, text) { if (el) el.textContent = text; }
  function initListing() {
    const cardsRoot=document.querySelector('#watersportCards');
    if(cardsRoot && !cardsRoot.dataset.expandedCatalog) {
      cardsRoot.dataset.expandedCatalog='true';
      const present=(key)=>[...cardsRoot.querySelectorAll('h3')].some(h=>{
        const t=h.textContent.toLowerCase();
        if(t.includes(' dan ') && key!=='glass-bottom-boat') return false;
        return key==='rolling-donut'?t.includes('rolling donut'):key==='scuba-diving'?t.includes('scuba'):key==='flyboard'?t.includes('flyboard'):key==='wakeboard'?t.includes('wakeboard'):key==='snorkeling'?t.includes('snorkel'):key==='seawalker'?t.includes('sea walker')||t.includes('seawalker'):key==='flying-fish'?t.includes('flying fish'):key==='glass-bottom-boat'?t.includes('glass bottom'):key==='jet-ski'?t.includes('jet ski'):key==='banana-boat'?t.includes('banana'):key==='parasailing'?t.includes('parasailing'):false;
      });
      const extraActivities=['flying-fish','rolling-donut','seawalker','snorkeling','scuba-diving','flyboard','wakeboard'];
      const images={"jet-ski":"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/6b/48/b4/a-vibrant-beach-scene.jpg?h=900&s=1&w=1200","banana-boat":"https://www.jtb.co.jp/smartphone/kaigai_opt/img/front/srh/200004072_base_14542929989130.jpg","parasailing":"https://excursionmania.com/cdn-cgi/image/quality%3D75%2Cformat%3Dwebp%2Cw%3Dauto%2Ch%3Dauto%2Cfit%3Dscale-down%2Ctrim%3Dborder/https%3A/excursionmania.com/supplier/uploads/excursions/excursions/ex-2666/exciting-parasailing-jet-ski-b17386131421.jpg","flying-fish":"https://emibalitours.com/uploads/2023/May/27/2/watersport-flying-fish-di-bali_760x525.jpg","rolling-donut":"https://images.squarespace-cdn.com/content/v1/63a162ea8ae00d39baefb4ff/1d4215fe-8f35-440e-a797-8978bb914099/rolling-donut-bali-watersport.jpg?format=1000w","seawalker":"https://cdn.getyourguide.com/img/tour/1dc2d777020d814ac9a947e69744698b8c310304ae51132677d6cf6eac9f46b9.jpg/98.jpg","snorkeling":"https://blog.mybalibuddy.com/wp-content/uploads/2023/07/snorkeling-paradise-exploring-balis-colorful-marine-life.jpg","scuba-diving":"https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW%2BQmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF%2BVkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk%3D/8059095816824/Diving-at-Tanjung-Benoa-Beach-by-Suci-Tiara-Wisata-963dfb5f-62a0-4986-a37b-672a13ff6573.jpeg?_src=imagekit&tr=q-60%2Cc-at_max%2Cw-1280%2Ch-720","glass-bottom-boat":"https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcrop%2Cgravity%3Dcenter%2Cquality%3D60%2Cwidth%3D400%2Cheight%3D265%2Cdpr%3D2/tour_img/f92b1eb2aa70f339f58e7c3ae81ebf4d260d9b9b58ff9140d7a685287380957a.jpg","flyboard":"https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcrop%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D400%2Cheight%3D265%2Cdpr%3D2/tour_img/14bb36d25e0ed9dc03d9e8885638715bb760d7bc5afa88f55c299d6dfea58d06.png","wakeboard":"https://baliside.com/storage/1086/watersport-wakeboard.webp"}; const imgFor=key=>images[key]||images['wakeboard'];
      extraActivities.forEach(key=>{
        const item=singles[key]; if(!item || present(key)) return;
        const article=document.createElement('article'); article.className='ws-card'; article.dataset.category=key==='scuba-diving'?'bawah-laut':'adrenalin';
        article.innerHTML='<img src="'+imgFor(key)+'" alt="'+item.name+' di Tanjung Benoa Bali" loading="lazy"><div class="ws-card-body"><span class="ws-tag">Aktivitas watersport</span><h3>'+item.name+' Tanjung Benoa</h3><p class="ws-muted text-sm">'+item.description+'</p><div class="ws-card-price"><span class="ws-card-price-label">Domestik · harga per '+item.unit+'</span><span class="ws-card-price-value">'+money(singlePrice(item,'domestic'))+(item.unit==='boat'?'/boat':'/orang')+'</span></div><p class="ws-foreign-note" style="font-size:12px;color:#63748d;margin:4px 0 12px">Wisatawan asing: '+money(singlePrice(item,'foreign'))+(item.unit==='boat'?'/boat':'/orang')+'</p><a class="ws-btn" href="./'+item.file+'?product='+key+'">Lihat detail <i class="fas fa-arrow-right" aria-hidden="true"></i></a></div>';
        cardsRoot.appendChild(article);
      });
      Object.entries(packages).forEach(([code,pkg])=>{
        const article=document.createElement('article'); article.className='ws-card'; article.dataset.category='paket';
        const local=packagePrice(pkg,'domestic'), foreign=packagePrice(pkg,'foreign');
        article.innerHTML='<img src="'+imgFor(pkg.items.some(x=>x.toLowerCase().includes('snorkel'))?'snorkeling':pkg.items.some(x=>x.toLowerCase().includes('flying fish'))?'flying-fish':'banana-boat')+'" alt="'+pkg.name+'" loading="lazy"><div class="ws-card-body"><span class="ws-tag">Paket kombinasi</span><h3>'+pkg.name+'</h3><p class="ws-muted text-sm">'+pkg.items.join(' · ')+'.</p><div class="ws-card-price"><span class="ws-card-price-label">Domestik / orang</span><span class="ws-card-price-value">'+money(local.final)+'</span></div><p class="ws-foreign-note" style="font-size:12px;color:#63748d;margin:4px 0 12px">Wisatawan asing: '+money(foreign.final)+'/orang</p><a class="ws-btn" href="./watersport-checkout.html?type=package&package='+code+'">Pilih Paket '+code+' <i class="fas fa-arrow-right" aria-hidden="true"></i></a></div>';
        cardsRoot.appendChild(article);
      });
    }
    document.querySelectorAll('#watersportCards .ws-card').forEach(card => {
      const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
      if(card.dataset.category==='paket') {
        const label=card.querySelector('.ws-card-price-label'); const target=card.querySelector('.ws-card-price-value');
        if(label) label.textContent='Harga paket';
        if(target && !/^paket [a-h] ·/i.test(title)) target.textContent='Pilih paket untuk melihat harga';
        return;
      }
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
          const note=document.createElement('p'); note.className='ws-foreign-note'; note.style.cssText='';
          note.className='ws-foreign-note ws-price-foreign'; note.innerHTML='<span>Wisatawan asing</span><strong>'+money(singlePrice(item,'foreign'))+(item.unit==='boat'?'/boat':'/orang')+'</strong>'; 
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
        note.className='ws-price-foreign'; note.innerHTML='<span>Wisatawan asing</span><strong>'+money(singlePrice(item,'foreign'))+(item.unit==='boat'?'/boat':'/orang')+'</strong><small>Durasi: '+item.duration+' · Minimum: '+item.min+' '+(item.unit==='boat'?'boat':'orang')+'</small>'; 
        const price=aside.querySelector('.price');
        if(price) price.insertAdjacentHTML('afterend','<a class="btn" style="margin:12px 0 4px" href="./watersport-checkout.html?type=single&product='+encodeURIComponent(key)+'">Pesan aktivitas ini</a>');
      }
      const content=document.querySelector('.wrap.content');
      if(content && !content.querySelector('[data-ws-expanded-detail]')) {
        const section=document.createElement('section'); section.className='panel'; section.dataset.wsExpandedDetail=''; section.style.gridColumn='1 / -1';
        const age=item.age ? 'Panduan usia acuan: minimal '+item.age+' tahun; syarat akhir dapat berbeda menurut operator.' : 'Periksa ketentuan peserta yang berlaku sebelum berangkat.';
        section.innerHTML='<h2>Rincian '+item.name+'</h2><p>'+item.description+'</p><div class="facts"><div class="fact"><b>Durasi</b><span>'+item.duration+'</span></div><div class="fact"><b>Harga</b><span>'+money(singlePrice(item,'domestic'))+(item.unit==='boat'?'/boat':'/orang')+' untuk domestik/KITAS; '+money(singlePrice(item,'foreign'))+(item.unit==='boat'?'/boat':'/orang')+' untuk wisatawan asing.</span></div><div class="fact"><b>Persyaratan peserta</b><span>'+age+' '+item.note+'</span></div><div class="fact"><b>Sebelum aktivitas</b><span>Ikuti briefing dan gunakan perlengkapan yang diwajibkan. Harga akhir, isi tiket, jadwal, cuaca, pembatalan, dan fasilitas yang termasuk harus dikonfirmasi sebelum pembayaran.</span></div></div><p class="sub">Makan siang, dokumentasi, biaya tambahan, atau tiket masuk destinasi tidak dianggap termasuk kecuali tertulis jelas pada konfirmasi pemesanan.</p>';
        content.appendChild(section);
      }
    } else if (file.startsWith('watersport-paket-')) {
      const p=document.querySelector('.price');
      if(p) p.textContent='Paket mulai '+money(Math.min(...Object.values(packages).map(x=>packagePrice(x,'domestic').final)))+'/orang';
      const aside=document.querySelector('aside.panel');
      if(aside && !aside.querySelector('[data-ws-package-cta]')) {
        const a=document.createElement('a'); a.className='btn'; a.dataset.wsPackageCta=''; a.style.margin='12px 0 4px'; a.href='./watersport-checkout.html?type=package'; a.textContent='Pilih paket dan tanggal'; p?.insertAdjacentElement('afterend',a);
        const note=document.createElement('p'); note.style.cssText='font-size:13px;line-height:1.6;color:#63748d'; note.textContent='Tersedia Paket A–H. Harga berbeda untuk wisatawan domestik/KITAS dan wisatawan asing; rincian diskon ditampilkan sebelum permintaan dikirim.'; a.insertAdjacentElement('afterend',note);
      }
      const content=document.querySelector('.wrap.content');
      if(content && !content.querySelector('[data-ws-package-list]')) {
        const section=document.createElement('section'); section.className='panel'; section.dataset.wsPackageList=''; section.style.gridColumn='1 / -1';
        const cards=Object.entries(packages).map(([code,pkg])=>{const local=packagePrice(pkg,'domestic');const foreign=packagePrice(pkg,'foreign');return '<article style="border:1px solid #dfe7f2;border-radius:12px;padding:14px;margin-top:10px"><h3 style="font-size:16px;margin:0 0 7px">'+pkg.name+'</h3><p style="margin:0 0 8px">'+pkg.items.join(' · ')+'</p><div style="font-size:13px;line-height:1.7"><b>Domestik/KITAS: '+money(local.final)+'/orang</b><br>Wisatawan asing: '+money(foreign.final)+'/orang<br><span style="color:#18794e">Diskon paket domestik '+money(local.discount)+' · asing '+money(foreign.discount)+' per peserta</span></div><a class="btn" style="margin-top:10px" href="./watersport-checkout.html?type=package&package='+code+'">Pilih Paket '+code+'</a></article>';}).join('');
        section.innerHTML='<h2>Pilih paket watersport</h2><p>Harga paket mengacu pada daftar harga paket yang digunakan sebagai dasar, ditambah margin per aktivitas, lalu dikurangi diskon 15% dengan batas maksimal Rp35.000 untuk domestik/KITAS dan Rp50.000 untuk wisatawan asing.</p>'+cards+'<p class="sub">Harga akhir dan ketersediaan harus dikonfirmasi sebelum pembayaran. Komponen yang termasuk mengikuti konfirmasi tiket.</p>';
        content.appendChild(section);
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