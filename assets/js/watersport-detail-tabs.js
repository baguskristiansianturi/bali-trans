/* Klook/Traveloka-inspired navigation for standalone watersport detail pages.
   Content stays product-specific; redemption instructions avoid unverified operator promises. */
(() => {
  const main = document.querySelector('main');
  if (!main || document.querySelector('[data-ws-product-tabs]')) return;

  const panels = [...main.querySelectorAll('.panel, .ws-panel, section')].filter(el =>
    el.querySelector('h2, h3') && !el.closest('.related, .ws-related, footer')
  );
  if (!panels.length) return;

  const classify = (panel, index) => {
    const heading = (panel.querySelector('h2, h3')?.textContent || '').toLowerCase();
    if (/galeri|foto|video/.test(heading)) return null;
    if (/informasi aktivitas|ringkasan|tentang aktivitas|deskripsi/.test(heading)) return ['Ringkasan', 'ringkasan'];
    if (/harga|paket|pilih|tiket|booking|pemesanan/.test(heading)) return ['Paket & harga', 'paket-harga'];
    if (/termasuk|fasilitas|yang didapat|include/.test(heading)) return ['Yang termasuk', 'termasuk'];
    if (/redeem|voucher|penukaran|menggunakan tiket/.test(heading)) return ['Cara redeem', 'redeem'];
    if (/lokasi|alamat|penjemputan|meeting point/.test(heading)) return ['Lokasi', 'lokasi'];
    if (/syarat|ketentuan|pembatalan|kebijakan|sebelum memesan/.test(heading)) return ['Ketentuan', 'ketentuan'];
    if (/aktivitas watersport populer|aktivitas lain|lainnya/.test(heading)) return null;
    return null;
  };

  const mapped = [];
  panels.forEach((panel, index) => {
    const item = classify(panel, index);
    if (!item) return;
    const [label, id] = item;
    if (!panel.id) panel.id = 'ws-detail-' + id;
    panel.classList.add('ws-tab-section');
    panel.style.scrollMarginTop = '132px';
    if (!mapped.some(entry => entry.id === panel.id)) mapped.push({ label, id: panel.id, panel });
  });

  // Add a clearly qualified redeem section when a dedicated one does not exist.
  if (!mapped.some(item => item.id.includes('redeem'))) {
    const section = document.createElement('section');
    section.className = (panels[0].classList.contains('ws-panel') ? 'ws-panel' : 'panel') + ' ws-tab-section';
    section.id = 'ws-detail-redeem';
    section.innerHTML = '<h2>Cara redeem / menggunakan voucher</h2><p>Ikuti petunjuk pada voucher konfirmasi dan tunjukkan voucher kepada petugas sesuai arahan operator. Sebelum berangkat, pastikan titik penukaran, waktu kedatangan, nama pemesan, dokumen yang diperlukan, dan ketentuan peserta sudah dikonfirmasi. Detail operasional dapat berbeda untuk setiap aktivitas dan penyedia.</p>';
    const before = panels.find(panel => /syarat|ketentuan|pembatalan|kebijakan/i.test(panel.querySelector('h2, h3')?.textContent || ''));
    (before || panels[panels.length - 1]).insertAdjacentElement('beforebegin', section);
    mapped.push({ label: 'Cara redeem', id: section.id, panel: section });
  }

  if (!mapped.some(item => item.label === 'Ringkasan')) {
    const first = panels.find(panel => !/galeri|foto|aktivitas watersport populer|aktivitas lain/i.test(panel.querySelector('h2, h3')?.textContent || ''));
    if (first) {
      first.id = first.id || 'ws-detail-ringkasan';
      mapped.unshift({ label: 'Ringkasan', id: first.id, panel: first });
    }
  }
  if (!mapped.length) return;

  const nav = document.createElement('nav');
  nav.className = 'ws-product-tabs';
  nav.setAttribute('aria-label', 'Navigasi detail aktivitas');
  nav.setAttribute('data-ws-product-tabs', '');
  nav.innerHTML = '<div class="ws-product-tabs-inner">' + mapped.map((item, index) =>
    '<a href="#' + item.id + '" data-ws-tab="' + item.id + '"' + (index === 0 ? ' aria-current="location"' : '') + '>' + item.label + '</a>'
  ).join('') + '</div>';
  const hero = main.querySelector('.hero, .ws-hero');
  if (hero) hero.insertAdjacentElement('afterend', nav);
  else main.insertAdjacentElement('afterbegin', nav);

  const links = [...nav.querySelectorAll('[data-ws-tab]')];
  const activate = id => {
    links.forEach(link => {
      const active = link.dataset.wsTab === id;
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const active = links.find(link => link.dataset.wsTab === id);
    if (active) active.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  };
  links.forEach(link => link.addEventListener('click', event => {
    const target = document.getElementById(link.dataset.wsTab);
    if (!target) return;
    event.preventDefault();
    history.replaceState(null, '', '#' + target.id);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    activate(target.id);
  }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) activate(visible.target.id);
    }, { rootMargin: '-18% 0px -65% 0px', threshold: [0, .15, .35] });
    mapped.forEach(item => observer.observe(item.panel));
  }
})();