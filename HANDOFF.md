# Catatan Kelanjutan Kerja — Bali Travel / BDM Trans

> Dokumen ini adalah titik masuk untuk melanjutkan pekerjaan setelah percakapan baru dimulai. Baca dokumen ini dan `ROADMAP.md` sebelum mengubah kode. Jangan meminta pemilik mengulang konteks yang sudah tercatat di sini kecuali ada informasi baru yang benar-benar diperlukan.

## Cara melanjutkan di chat baru

Mulai dengan membaca:
1. `HANDOFF.md` — status kerja terakhir, hal yang sudah/belum diverifikasi, dan langkah berikutnya.
2. `ROADMAP.md` — keputusan strategi dan batasan produk yang lebih lengkap.
3. `README.md` — gambaran struktur repository.

Lalu periksa kondisi GitHub terkini secara langsung. Dokumen ini adalah catatan kerja, bukan pengganti pemeriksaan branch, PR, file, deployment, atau hasil pengujian yang terbaru. Gunakan status aktual repository bila berbeda dari catatan ini.

## Identitas proyek dan prinsip kerja

- Repository: `baguskristiansianturi/bali-trans`.
- Nama kerja website untuk tahap perencanaan: **Bali Travel**. Ini bukan rename repository atau keputusan final nama merek publik.
- Pemilik menggunakan ponsel Android dengan keterbatasan perangkat; prioritaskan perubahan kecil, mudah ditinjau, dan pengujian mobile.
- Beri laporan jujur. Jangan menyebut sesuatu selesai, teruji, ter-deploy, atau siap menerima booking tanpa bukti yang sesuai.
- Bedakan **rencana**, **perubahan kode**, **hasil pengujian**, **deployment**, dan **kesiapan operasional**.
- Jangan memasukkan ide baru ke roadmap sebagai keputusan final tanpa persetujuan pemilik.
- Jangan membahas kepada publik bahwa proyek sedang dibangun kembali, sedang mencari mitra, atau belum memiliki armada. Komunikasi publik harus berfokus pada kebutuhan pelanggan dan informasi layanan yang benar.
- Cloudflare tidak lagi direncanakan. Tidak menggunakan CodeIgniter. Backend Go/Golang dan Google Cloud merupakan arah masa depan, belum dianggap tersedia atau dikonfigurasi.

## Status terakhir yang tercatat

**Tahap: perbaikan navigasi Wishlist pada PR #2; pemeriksaan statis lulus, menunggu review/merge dan verifikasi browser/mobile.**

- [x] Repository canonical dikonfirmasi: `baguskristiansianturi/bali-trans`; nama `bdm-trans-indonesia` yang tertulis di catatan lama bukan nama canonical yang dikembalikan GitHub. Default branch adalah `main`.
- [x] Roadmap dan handoff berada pada branch dokumentasi `docs/brand-led-bdm-revival-roadmap`; branch dokumentasi belum di-merge ke `main`.
- [x] PR #1 ([Improve shared frontend foundations and add wishlist structure](https://github.com/baguskristiansianturi/bali-trans/pull/1)) merged ke `preview/bali-trans` pada commit `fc5b16ee0eb445ab5dc1bfbb2373ddb0b1ada407`; GitHub Actions untuk publish preview dan Pages build/deployment berstatus `success`.
- [x] Branch kerja `work/shared-navigation-audit-2026-10-17` dibuat dari `preview/bali-trans`.
- [x] PR #2 ([Make Wishlist reachable from every page header](https://github.com/baguskristiansianturi/bali-trans/pull/2)) telah di-squash-merge ke `preview/bali-trans` melalui commit `fb6d9e0a2d3cca00f37cd69b8ab9e26c520bf294`.
- [x] Link Wishlist ditambahkan pada header 33 halaman HTML; homepage dan halaman Wishlist dibiarkan karena link sudah ada.
- [x] Pemeriksaan statis terbaru mencakup 35 halaman HTML dan 840 atribut `href`/`src`; tidak ditemukan target file lokal yang hilang. 33/33 link Wishlist yang baru ditambahkan dipastikan mengarah ke `pages/account/wishlist.html`.
- [x] Workflow publish dan Pages build/deployment untuk commit `fb6d9e0a2d3cca00f37cd69b8ab9e26c520bf294` selesai dengan status `success`; [Pages build and deployment run](https://github.com/baguskristiansianturi/bali-trans/actions/runs/38981707689).
- [ ] PR #2 sudah masuk ke branch preview, tetapi tampilan browser/ponsel tetap belum diverifikasi.
- [ ] Standarisasi header/footer belum selesai. Urutan/label navigasi, variasi logo/brand text, footer penuh vs footer checkout, serta CTA masih berbeda antarhalaman.
- [ ] Uji alur Lovina end-to-end, validasi form, retensi state, keyboard/accessibility runtime, dan tampilan mobile belum dilakukan.
- [ ] URL preview `https://baguskristiansianturi.github.io/bali-trans/` belum berhasil diperiksa secara visual melalui lingkungan tool sesi ini. Status workflow sukses tidak disamakan dengan verifikasi visual.
- [ ] Kesiapan supplier, harga final, inventaris, dan operasi layanan masih memerlukan verifikasi terpisah.
- [ ] `main` tidak diubah; belum ada merge ke `main`.

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

1. Periksa ulang workflow publish dan Pages build/deployment untuk commit `fb6d9e0a2d3cca00f37cd69b8ab9e26c520bf294`; catat hasil akhir yang sebenarnya.
2. Setelah deployment berhasil, buka preview di ponsel dan uji menu buka/tutup, link Wishlist dari halaman berbeda, scroll/overflow, dan jalur kembali. Jika URL belum dapat diakses, catat sebagai blocker—jangan menyamakan workflow sukses dengan verifikasi visual.
3. Lanjutkan audit header/footer dalam kelompok kecil: samakan struktur dan label navigasi yang disepakati, identitas logo, CTA, serta footer umum. Pertahankan footer ringkas pada langkah checkout bila memang sengaja dibuat untuk mengurangi distraksi.
4. Uji Lovina Dolphin Experience dari katalog → detail → pilihan → detail tamu → review → test confirmation. Periksa validasi, state yang tersimpan dalam sesi, tombol kembali, dan pesan yang menegaskan bahwa ini bukan booking/pembayaran nyata.
5. Catat hasil yang benar-benar diuji dan perbarui `AUDIT.md` serta `HANDOFF.md`. Jangan menandai tampilan browser/mobile atau deployment sebagai terverifikasi hanya dari pemeriksaan kode/workflow.

Jangan melompat langsung membangun planner itinerary/anggaran, marketplace penuh, atau pembayaran otomatis sebelum alur produk awal dan operasi layanan terbukti dibutuhkan.

## Format pembaruan status

Setiap kali ada pekerjaan penting, perbarui bagian status di atas dengan bahasa sederhana:
- **Selesai dan diverifikasi:** apa yang berubah dan bagaimana diperiksa.
- **Dibuat tetapi belum diverifikasi:** apa yang dibuat dan apa yang belum diuji.
- **Belum dikerjakan:** pekerjaan penting yang masih menunggu.
- **PR/merge/deployment:** status aktual dan tautan yang relevan.
- **Langkah berikutnya:** satu prioritas yang paling masuk akal.

Tidak perlu menjadikan nomor commit sebagai syarat untuk memahami konteks. Jika berguna untuk audit, tautkan riwayat GitHub, tetapi narasi status dan bukti verifikasi harus tetap cukup jelas tanpa harus menghafal SHA.
