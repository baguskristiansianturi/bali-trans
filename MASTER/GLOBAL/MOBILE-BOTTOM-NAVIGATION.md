# GLB-003 — Master Navigasi Bawah Perangkat Seluler

**Status penerapan:** SUDAH DITERAPKAN untuk halaman masuk SPA  
**Status persetujuan:** BELUM DICATAT DI MASTER INI  
**Sumber markup:** `index.html`  
**Perilaku:** fungsi navigasi SPA yang dirujuk oleh tombol  
**Versi yang diperiksa:** `a8d4282293d98923ecf160f52d95fe6168dd905d`

## Item Saat Ini

Bar navigasi bawah memiliki empat tindakan:
1. Jelajahi — `navigateTo('home')`
2. Aktivitas — `navigateTo('packages')`
3. Panduan — `navigateTo('blog')`
4. Keranjang — `navigateTo('cart')`

Item keranjang memiliki lencana jumlah item.

## Perilaku Responsif Saat Ini

- Bar menggunakan utilitas `md:hidden` dan ditujukan untuk tampilan SPA pada layar sempit/perangkat seluler.
- Bagian bawah halaman menyediakan ruang tambahan pada perangkat seluler dan menghilangkan ruang tersebut mulai ukuran medium.
- Kerangka global memiliki aturan perlindungan khusus agar tidak menghapus navigasi bawah empat item yang telah disetujui ketika header/footer disisipkan.

## Cakupan dan Pengecualian

- Bar ini merupakan bagian dari kerangka SPA di `index.html`.
- Bar ini tidak dicatat sebagai navigasi bawah universal untuk semua halaman HTML mandiri.
- Mode checkout sengaja menyembunyikan navigasi bawah perangkat seluler.

## Dampak Perubahan

Perubahan dapat memengaruhi navigasi SPA dan ruang tampilan perangkat seluler. Uji keempat rute, jumlah lencana, lapisan/modal, mode checkout, dan tata letak layar sempit.
