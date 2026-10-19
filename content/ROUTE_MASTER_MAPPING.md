# Bali Trans — Pemetaan Route ke Master Data

Tanggal: 19 Oktober 2026  
Branch: `refactor/clean-structure-content-audit`  
Cakupan: semua route discovery/region/service/duration yang didefinisikan di renderer dan kunci yang digunakan pencarian global.

## Kesimpulan

- Renderer memiliki 41 discovery route keys: 6 wilayah, 32 route tempat, 2 route durasi, dan 1 route layanan. Empat destinasi Nusa Penida kini menggunakan route artikel tersendiri.
- Master data memiliki 87 record destinasi, tetapi 12 record yang mempunyai route eksplisit.
- Ada halaman yang judulnya menggabungkan beberapa lokasi fisik, misalnya Menjangan + Taman Nasional Bali Barat, Amed + Jemeluk Bay, dan beberapa area gabungan lain. Kelingking, Crystal Bay, Diamond Beach, dan Atuh Beach sudah dipisah menjadi artikel individual. Ini bertentangan dengan aturan master data bahwa satu tempat fisik harus memiliki satu record kanonis.
- Aktivitas seperti rafting/snorkelling dan halaman area seperti Ubud/Denpasar tidak seharusnya dipaksa menjadi record destinasi tunggal.
- Jangan mengubah semua record menjadi `PUBLISHED` atau menambahkan tautan publik hanya karena route renderer ada. Status fakta dan kesiapan konten harus tetap terpisah.

## Matriks seluruh route

| Route key | Judul renderer | Kandidat master record dan status saat audit | Tindakan |
|---|---|---|---|
| `duration:full-day` | Full Day Tours in Bali | — | Filter/landing layanan berdasarkan durasi; bukan record destinasi. |
| `duration:long-trip` | Long Trips Around Bali | — | Filter/landing layanan berdasarkan durasi; bukan record destinasi. |
| `service:private-driver` | Private Driver in Bali | — | Halaman layanan; simpan pada model layanan, bukan destinasi. |
| `region:south` | Explore South Bali | — | Indeks wilayah; gunakan hanya untuk menghubungkan ke artikel destinasi yang siap. |
| `region:central` | Explore Central Bali | — | Indeks wilayah; gunakan hanya untuk menghubungkan ke artikel destinasi yang siap. |
| `region:north` | Explore North Bali | — | Indeks wilayah; gunakan hanya untuk menghubungkan ke artikel destinasi yang siap. |
| `region:east` | Explore East Bali | — | Indeks wilayah; gunakan hanya untuk menghubungkan ke artikel destinasi yang siap. |
| `region:west` | Explore West Bali | — | Indeks wilayah; gunakan hanya untuk menghubungkan ke artikel destinasi yang siap. |
| `region:nusa` | Explore the Nusa Islands | — | Indeks wilayah; gunakan hanya untuk menghubungkan ke artikel destinasi yang siap. |
| `place:lovina` | Lovina Beach & Dolphin Watching | lovina (STRUCTURE_READY · route terisi) | Rute sudah ada; lanjutkan fact-check dan review konten. |
| `place:banjar-hot-springs` | Banjar Hot Springs | banjar-hot-springs (STRUCTURE_READY · route terisi) | Rute sudah ada; lanjutkan fact-check dan review konten. |
| `place:brahmavihara-arama` | Brahmavihara-Arama Monastery | brahmavihara-arama (STRUCTURE_READY · route terisi) | Rute sudah ada; lanjutkan fact-check dan review konten. |
| `place:gitgit-waterfall` | Gitgit Waterfall | gitgit-waterfall (STRUCTURE_READY · route terisi) | Rute sudah ada; lanjutkan fact-check dan review konten. |
| `place:munduk` | Munduk Waterfalls & Highlands | munduk (STRUCTURE_READY · route terisi)<br>melanting-waterfall (PLANNED)<br>banyumala-waterfall (PLANNED)<br>lake-tamblingan (PLANNED)<br>lake-buyan (PLANNED) | Gabungan area dan beberapa tempat; pisahkan halaman/record sebelum publikasi. |
| `place:wanagiri` | Wanagiri Twin Lakes Viewpoint | wanagiri (STRUCTURE_READY · route terisi) | Rute sudah ada; verifikasi nama viewpoint spesifik dan bedakan dari tempat sekitar. |
| `place:menjangan` | Menjangan Island & West Bali National Park | menjangan (STRUCTURE_READY · route terisi)<br>west-bali-national-park (PLANNED) | Pulau dan taman nasional bukan satu tempat; pisahkan record dan rute. |
| `place:gedong-kirtya` | Gedong Kirtya Library | gedong-kirtya (STRUCTURE_READY · route terisi) | Rute sudah ada; lanjutkan fact-check dan review konten. |
| `place:uluwatu` | Uluwatu Temple & Coastal Cliffs | uluwatu-temple (PLANNED) | Kandidat satu-ke-satu; tambahkan rute master setelah review konten. |
| `place:jimbaran` | Jimbaran Coast | jimbaran-bay (PLANNED) | Kandidat satu-ke-satu; tambahkan rute master setelah review konten. |
| `place:nusa-dua` | Nusa Dua Beaches & Water Activities | nusa-dua-beach (PLANNED) | Kandidat satu-ke-satu; tambahkan rute master setelah review konten. |
| `place:denpasar` | Denpasar City Sights | — | Halaman area/kota, bukan satu destinasi fisik; klasifikasikan sebagai halaman area atau buat record kanonis yang tepat. |
| `place:ubud` | Ubud & Surrounding Villages | ubud-monkey-forest (PLANNED)<br>ubud-palace (PLANNED)<br>campuhan-ridge (PLANNED)<br>tegalalang-terrace (PLANNED) | Gabungan area dan beberapa tempat; pisahkan artikel destinasi individual. |
| `place:rafting` | River Rafting in Bali | — | Aktivitas, bukan destinasi; pindahkan ke model/kategori aktivitas. |
| `place:rice-terraces` | Rice Terraces & Nature Stops | tegalalang-terrace (PLANNED)<br>jatiluwih-terraces (PLANNED) | Beberapa lokasi berbeda; buat halaman terpisah untuk setiap rice terrace. |
| `place:amed` | Amed & Jemeluk Bay | amed-coast (PLANNED)<br>jemeluk-bay (PLANNED) | Dua lokasi berbeda; pisahkan Amed Coast dan Jemeluk Bay. |
| `place:tulamben` | Tulamben & USAT Liberty Wreck | tulamben-liberty-wreck (PLANNED) | Kandidat satu-ke-satu; tambahkan rute master setelah review konten. |
| `place:tirta-gangga` | Tirta Gangga Water Palace | tirta-gangga (PLANNED) | Kandidat satu-ke-satu; tambahkan rute master setelah review konten. |
| `place:taman-ujung` | Taman Ujung Water Palace | taman-ujung (PLANNED) | Kandidat satu-ke-satu; tambahkan rute master setelah review konten. |
| `place:lempuyang` | Lempuyang Temple | lempuyang-temple (PLANNED) | Kandidat satu-ke-satu; tambahkan rute master setelah review konten. |
| `place:besakih` | Besakih Temple | besakih-temple (PLANNED) | Kandidat satu-ke-satu; tambahkan rute master setelah review konten. |
| `place:candidasa-padangbai` | Candidasa & Padangbai | candidasa (PLANNED)<br>padangbai-blue-lagoon (PLANNED) | Gabungan area dan destinasi; pisahkan Candidasa dan Blue Lagoon/Padangbai. |
| `place:sidemen` | Sidemen Valley | sidemen-valley (PLANNED) | Kandidat satu-ke-satu; tambahkan rute master setelah review konten. |
| `place:medewi` | Medewi Surf Coast | medewi-beach (PLANNED) | Kandidat satu-ke-satu; tambahkan rute master setelah review konten. |
| `place:rambut-siwi` | Rambut Siwi Temple | rambut-siwi (PLANNED) | Kandidat satu-ke-satu; tambahkan rute master setelah review konten. |
| `place:bunut-bolong` | Bunut Bolong Tree Tunnel | bunut-bolong (PLANNED) | Kandidat satu-ke-satu; tambahkan rute master setelah review konten. |
| `place:perancak` | Perancak Fishing Village | perancak (PLANNED) | Kandidat satu-ke-satu; tambahkan rute master setelah review konten. |
| `place:gilimanuk` | Gilimanuk Bay | gilimanuk-bay (PLANNED) | Kandidat satu-ke-satu; tambahkan rute master setelah review konten. |
| `place:west-bali-national-park` | West Bali National Park | west-bali-national-park (PLANNED) | Kandidat satu-ke-satu; tentukan wilayah editorial yang konsisten dan review fakta. |
| `place:nusa-lembongan` | Nusa Lembongan & Mangrove Forest | lembongan-mangroves (PLANNED)<br>jungutbatu (PLANNED)<br>mushroom-bay (PLANNED) | Pulau/area dan atraksi berbeda; pecah ke halaman yang sesuai. |
| `place:nusa-ceningan` | Nusa Ceningan & Yellow Bridge | yellow-bridge (PLANNED)<br>blue-lagoon-ceningan (PLANNED) | Pulau dan atraksi berbeda; buat halaman terpisah. |
| `place:island-snorkelling-diving` | Snorkelling & Diving Around the Nusa Islands | — | Aktivitas lintas lokasi; pindahkan ke kategori aktivitas, bukan record destinasi. |

## Artikel destinasi Nusa Penida yang sudah dipisah

| Artikel ID | Destinasi master | Route master | Status |
|---|---|---|---|
| `nusa-penida-kelingking-beach` | `kelingking-beach` | `?page=blog-read&item=nusa-penida-kelingking-beach` | PUBLISHED — sumber Indonesia Travel dan Polri |
| `nusa-penida-crystal-bay` | `crystal-bay` | `?page=blog-read&item=nusa-penida-crystal-bay` | PUBLISHED — sumber Indonesia Travel dan panduan keselamatan Polri |
| `nusa-penida-diamond-beach` | `diamond-beach` | `?page=blog-read&item=nusa-penida-diamond-beach` | PUBLISHED — sumber Indonesia Travel dan Polri |
| `nusa-penida-atuh-beach` | `atuh-beach` | `?page=blog-read&item=nusa-penida-atuh-beach` | PUBLISHED — sumber Indonesia Travel dan panduan keselamatan Polri |

Kartu wilayah Nusa dan pencarian global sekarang membuka artikel individual tersebut, bukan halaman gabungan. Foto masing-masing artikel memiliki kredit dan lisensi di halaman Photo Credits.

## Urutan pembenahan yang disarankan

1. **Pisahkan halaman gabungan** menjadi route dan artikel kanonis per destinasi fisik.
2. **Pisahkan jenis konten**: indeks wilayah, destinasi, aktivitas, durasi layanan, dan halaman layanan tidak boleh bercampur dalam satu model.
3. **Isi field route hanya untuk rute yang benar-benar tersedia** dan jaga route master tetap sinkron dengan UI serta metadata.
4. **Tautkan kartu wilayah hanya ke halaman yang tersedia**. Untuk destinasi yang belum memiliki artikel, tampilkan status pembaruan tanpa tombol “Explore destination” yang mengarah ke halaman yang salah.
5. **Lakukan fact-check per artikel** dengan sumber bertanggal sebelum mengubah `content_status` menjadi siap atau `page_status` menjadi `PUBLISHED`.

## Batas audit

Pemetaan ini adalah audit struktur dan relasi route. Ini bukan verifikasi fakta untuk semua destinasi. Record tanpa sumber dan tanggal pengecekan tetap belum terverifikasi.
