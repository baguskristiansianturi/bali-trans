# Catatan Kelanjutan Kerja — Bali Travel / BDM Trans

> Dokumen ini adalah titik masuk untuk melanjutkan pekerjaan setelah percakapan baru dimulai. Baca dokumen ini dan `ROADMAP.md` sebelum mengubah kode. Jangan meminta pemilik mengulang konteks yang sudah tercatat di sini kecuali ada informasi baru yang benar-benar diperlukan.

## Cara melanjutkan di chat baru

Mulai dengan membaca:
1. `HANDOFF.md` — status kerja terakhir, hal yang sudah/belum diverifikasi, dan langkah berikutnya.
2. `ROADMAP.md` — keputusan strategi dan batasan produk yang lebih lengkap.
3. `README.md` — gambaran struktur repository.

Lalu periksa kondisi GitHub terkini secara langsung. Dokumen ini adalah catatan kerja, bukan pengganti pemeriksaan branch, PR, file, deployment, atau hasil pengujian yang terbaru. Gunakan status aktual repository bila berbeda dari catatan ini.

## Identitas proyek dan prinsip kerja

- Repository: `baguskristiansianturi/bdm-trans-indonesia`.
- Nama kerja website untuk tahap perencanaan: **Bali Travel**. Ini bukan rename repository atau keputusan final nama merek publik.
- Pemilik menggunakan ponsel Android dengan keterbatasan perangkat; prioritaskan perubahan kecil, mudah ditinjau, dan pengujian mobile.
- Beri laporan jujur. Jangan menyebut sesuatu selesai, teruji, ter-deploy, atau siap menerima booking tanpa bukti yang sesuai.
- Bedakan **rencana**, **perubahan kode**, **hasil pengujian**, **deployment**, dan **kesiapan operasional**.
- Jangan memasukkan ide baru ke roadmap sebagai keputusan final tanpa persetujuan pemilik.
- Jangan membahas kepada publik bahwa proyek sedang dibangun kembali, sedang mencari mitra, atau belum memiliki armada. Komunikasi publik harus berfokus pada kebutuhan pelanggan dan informasi layanan yang benar.
- Cloudflare tidak lagi direncanakan. Tidak menggunakan CodeIgniter. Backend Go/Golang dan Google Cloud merupakan arah masa depan, belum dianggap tersedia atau dikonfigurasi.

## Status terakhir yang tercatat

**Tahap: dokumentasi strategi dan aturan kerja; belum masuk ke implementasi fitur atau PR kode.**

- [x] Branch kerja `docs/brand-led-bdm-revival-roadmap` dibuat dari `main`.
- [x] `ROADMAP.md` dibuat dan berisi strategi, prioritas produk, panduan konten/lokalisasi, pricing, review, availability, dan batasan deployment.
- [x] `README.md` diperbarui untuk menunjuk ke roadmap.
- [x] Roadmap menetapkan prioritas peluncuran pada tiket/aktivitas dan paket tour; tiket harus dapat dibeli tanpa wajib menyewa kendaraan.
- [x] Roadmap mencatat perencana itinerary/anggaran sebagai fase masa depan, bukan pekerjaan sekarang.
- [x] Aturan kalender ketersediaan mencerminkan kapasitas nyata per tanggal/kendaraan; jangan membuat kelangkaan palsu. Jika belum diketahui, gunakan status seperti “Periksa ketersediaan” atau “Konfirmasi terlebih dahulu”.
- [x] Aturan komunikasi publik melarang mengungkap cerita internal pembangunan kembali, pencarian mitra, atau kondisi armada.
- [ ] Belum ada perubahan kode produk/website yang dibuat dalam pekerjaan roadmap ini.
- [ ] Belum ada PR yang dibuat untuk branch ini pada pemeriksaan terakhir.
- [ ] Belum ada merge ke `main`.
- [ ] Belum dilakukan audit visual browser menyeluruh, pengujian end-to-end, atau verifikasi deployment dalam pekerjaan ini.
- [ ] Kesiapan nyata pemasok, harga, inventaris, dan operasi layanan belum dibuktikan oleh dokumen roadmap.

## Keputusan produk yang harus dipertahankan

1. **Fokus awal:** tiket/aktivitas dan paket tour. Transport disiapkan dalam struktur produk, tetapi jangan menjual seolah ketersediaan sudah pasti.
2. **Sumber kebenaran ketersediaan:** data kapasitas dan konfirmasi aktual. Periksa ulang sebelum booking dikonfirmasi dan perbarui kapasitas setelah booking untuk menghindari double booking.
3. **Harga:** dugaan harga BDM 30–40% di atas referensi hanyalah hipotesis; evaluasi tiap produk berdasarkan biaya pemasok, isi paket, mutu, risiko, biaya tambahan, dan nilai nyata.
4. **Konten destinasi:** gunakan referensi lokal untuk riset, bukan menyalin teks/desain/foto. Verifikasi fakta sejarah, jam buka, harga, dan operasional dengan sumber tepercaya.
5. **Lokalisasi:** Bahasa Indonesia, English, English yang sesuai untuk wisatawan India, Bahasa Melayu Malaysia, Singapore English yang wajar, dan Arabic pada fase yang sesuai. Jangan menyimpulkan agama seseorang dari kewarganegaraan. Bahasa dan mata uang adalah pengaturan terpisah.
6. **Pembayaran dan booking:** halaman statis bukan bukti bahwa pembayaran, akun, ketersediaan, atau booking otomatis bekerja. Jangan mengambil deposit sebelum harga, ketersediaan, syarat, dan refund dijelaskan.
7. **Privasi preview:** `noindex` bukan perlindungan akses. Untuk preview sensitif, gunakan akses yang benar-benar dibatasi; jangan menganggap halaman GitHub Pages publik sebagai privat.
8. **Arsitektur masa depan:** frontend modular, backend Go/Golang, kemungkinan Google Cloud; implementasikan hanya setelah kebutuhan tervalidasi dan lingkungan tersedia.

## Langkah berikutnya yang direkomendasikan

**Langkah pertama: lakukan pemeriksaan repository terkini sebelum menulis kode.**

1. Periksa branch default, branch kerja, perubahan terbaru, PR terbuka/tertutup, dan status workflow/deployment yang tersedia.
2. Cocokkan isi `ROADMAP.md` dan `README.md` dengan repository aktual. Perbarui catatan ini jika status telah berubah.
3. Audit halaman yang sudah ada untuk menentukan alur MVP terkecil dari menemukan tiket/paket → memahami detail dan harga → mengirim permintaan yang dapat ditindaklanjuti. Jangan menganggap seluruh halaman yang ada harus dilengkapi.
4. Prioritaskan satu alur mobile yang paling bernilai; tulis kriteria penerimaan dan daftar pengujian sebelum mengubah kode.
5. Kerjakan dalam branch/PR yang jelas, uji tautan, validasi form, tampilan mobile, dan fallback bila data belum tersedia. Jangan mengaktifkan pembayaran atau mengklaim ketersediaan langsung tanpa backend dan data yang benar.
6. Setelah perubahan, catat file yang diubah, hasil uji yang benar-benar dijalankan, kendala, status PR/merge, status deployment, serta tugas tunggal berikutnya di dokumen ini.

Jangan melompat langsung membangun planner itinerary/anggaran, marketplace penuh, akun, portal mitra/admin, atau pembayaran otomatis sebelum alur produk awal dan operasi layanan terbukti dibutuhkan.

## Format pembaruan status

Setiap kali ada pekerjaan penting, perbarui bagian status di atas dengan bahasa sederhana:
- **Selesai dan diverifikasi:** apa yang berubah dan bagaimana diperiksa.
- **Dibuat tetapi belum diverifikasi:** apa yang dibuat dan apa yang belum diuji.
- **Belum dikerjakan:** pekerjaan penting yang masih menunggu.
- **PR/merge/deployment:** status aktual dan tautan yang relevan.
- **Langkah berikutnya:** satu prioritas yang paling masuk akal.

Tidak perlu menjadikan nomor commit sebagai syarat untuk memahami konteks. Jika berguna untuk audit, tautkan riwayat GitHub, tetapi narasi status dan bukti verifikasi harus tetap cukup jelas tanpa harus menghafal SHA.
