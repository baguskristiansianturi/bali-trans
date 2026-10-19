# Bali Trans — audit direktori destinasi dan aktivitas

Status: checkpoint audit pada branch `preview/bali-trans`. Ini adalah inventaris kerja; bukan pernyataan bahwa semua fakta operasional telah diverifikasi atau semua artikel editorial sudah terbit.

## Cakupan yang sekarang terdaftar

- **150 entri destinasi/tempat aktivitas** di 12 kelompok navigasi: 9 kabupaten/kota administratif Bali dan tiga pulau Nusa Penida, Nusa Lembongan, serta Nusa Ceningan.
- **82 item aktivitas** dalam 11 kategori: laut/olahraga air, petualangan, satwa/safari, alam/air terjun/taman, budaya/pura/warisan, kuliner, wellness, rekreasi/belanja/malam, keluarga/edukasi, perjalanan pulau/perahu, dan transportasi.
- **65 referensi lokasi** digunakan oleh pemetaan aktivitas; pemeriksaan kode tidak menemukan slug lokasi yang tidak terdaftar.
- Artikel editorial statis yang terdaftar saat audit ini: **Pantai Lovina**. Semua 150 destinasi sekarang memiliki URL detail stabil di `/places/<slug>/`. Hub wilayah juga memiliki URL tersendiri untuk sembilan kabupaten/kota, tiga pulau Nusa, dan lima label kawasan besar (Bali Selatan, Tengah, Timur, Utara, Barat). Halaman detail ini memakai data bersama dan metadata judul/deskripsi/canonical yang diisi saat halaman dirender; ini belum menggantikan pekerjaan menulis artikel blog editorial panjang untuk setiap tempat.

## Distribusi entri menurut wilayah

| Wilayah | Entri |
| --- | ---: |
| Buleleng / Bali Utara | 26 |
| Jembrana / Bali Barat | 6 |
| Denpasar | 8 |
| Badung | 18 |
| Tabanan | 15 |
| Gianyar | 21 |
| Bangli | 12 |
| Karangasem | 18 |
| Klungkung daratan | 6 |
| Nusa Penida | 11 |
| Nusa Lembongan | 5 |
| Nusa Ceningan | 4 |
| **Total** | **150** |

Jumlah ini adalah hitungan entri direktori, bukan jumlah seluruh objek wisata yang ada di Bali. Beberapa tempat lokal yang kurang terdokumentasi masih perlu validasi lapangan/sumber resmi; jumlah entri tidak boleh dipasarkan sebagai katalog yang sudah lengkap secara absolut.

## Perubahan implementasi yang sudah dilakukan

1. Memperluas data destinasi dengan 91 entri tambahan, termasuk tempat penting di Badung, Tabanan, Gianyar, Bangli, Karangasem, Denpasar, Jembrana, dan ketiga pulau Nusa.
2. Memasukkan lokasi aktivitas seperti Waterbom Bali, Bali Zoo, Bali Bird Park, Bali Safari & Marine Park, Tanjung Benoa watersports, Ayung rafting, Telaga Waja rafting, dan Bali Treetop Adventure Park.
3. Memperbaiki alur `place`: slug destinasi yang terdaftar sekarang membuka tampilan detail destinasi, bukan layar “artikel sedang diaudit” yang generik.
4. Membuat URL detail stabil untuk 150 destinasi dan URL hub untuk semua kelompok wilayah; halaman membaca slug wilayah/destinasi dari URL saat dibuka langsung atau di-refresh.
5. Memastikan artikel statis yang sudah terbit (Pantai Lovina) dapat dibuka melalui tautan artikel, bukan dialihkan kembali ke tampilan detail SPA.
5. Menghubungkan kategori aktivitas dengan tempat terkait dan CTA pertanyaan ke halaman kontak.
6. Memuat direktori tambahan pada halaman statis Bali Utara sebelum aplikasi dijalankan, supaya referensi data global tidak gagal dimuat. Halaman ini tidak mengklaim harga, operator, tiket, jam buka, atau ketersediaan langsung.

## Audit alur yang masih harus dituntaskan

- Buat artikel blog editorial khusus untuk destinasi yang belum memiliki artikel statis. Saat ini sebagian besar entri masih berupa detail berbasis data.
- Verifikasi nama resmi, ejaan, lokasi administratif, titik peta, dan status operasional setiap tempat.
- Ganti gambar generik dengan foto yang benar-benar sesuai dengan objek; jangan menganggap gambar kategori sebagai foto tempat yang terverifikasi.
- Periksa duplikasi konseptual/varian nama, khususnya kelompok air terjun Buleleng dan tempat konservasi yang melintasi Buleleng–Jembrana.
- Periksa rute dari kategori wilayah ke tempat, dari tempat ke artikel yang terbit, serta dari aktivitas ke lokasi dan kontak.
- Verifikasi harga, jam buka, izin, operator, kebijakan keselamatan dan kesejahteraan satwa sebelum data komersial ditampilkan.
- Periksa metadata SEO dan rendering browser pada semua URL detail/hub; halaman menggunakan shell bersama dan merender konten sesuai slug melalui aplikasi.
- Jalankan QA browser di mobile dan desktop serta uji tautan langsung/refresh/back-forward.

## Status deployment dan verifikasi

- Semua perubahan audit berada di branch `preview/bali-trans`.
- Workflow GitHub Pages yang ada hanya memicu deploy dari branch `main`; perubahan ini belum dinyatakan tayang di situs publik.
- Perbandingan saat audit: branch preview **lebih dari 140 commit di depan dan 49 commit di belakang** `main`, dengan 209 file berbeda pada perbandingan terakhir. Karena divergensi ini, jangan merge seluruh branch secara langsung untuk deployment.
- Workflow pemeriksaan sintaks JavaScript untuk branch preview sudah ditambahkan. Status check yang tersedia saat audit belum mengembalikan hasil, jadi pemeriksaan browser dan hasil deploy tetap harus dikonfirmasi sebelum menyatakan pekerjaan live.

## Referensi riset

Sumber dipakai sebagai pembanding kategori dan daftar tempat; bukan untuk menyalin isi atau klaim komersial.

- Bali Golden Tour — direktori minat wisata: https://www.baligoldentour.com/bali-interest-place.php
- Bali Golden Tour — halaman Badung: https://www.baligoldentour.com/places-of-interest-badung.php
- Bali Golden Tour — halaman Tabanan: https://www.baligoldentour.com/places-of-interest-tabanan.php
- Bali Golden Tour — halaman Gianyar: https://www.baligoldentour.com/places-of-interest-gianyar.php
- Bali Golden Tour — halaman Klungkung: https://www.baligoldentour.com/places-of-interest-klungkung.php
- Bali Golden Tour — halaman Karangasem: https://www.baligoldentour.com/places-of-interest-karangasem.php
- Bali Golden Tour — halaman Buleleng: https://www.baligoldentour.com/places-of-interest-buleleng.php
- Bali Golden Tour — halaman Denpasar: https://www.baligoldentour.com/places-of-interest-denpasar.php
- Bali Golden Tour — halaman Bangli: https://www.baligoldentour.com/places-of-interest-bangli.php
- Bali Golden Tour — halaman Jembrana: https://www.baligoldentour.com/places-of-interest-jembrana.php
- Bali Golden Tour — aktivitas: https://www.baligoldentour.com/bali-activities-tour.php
- Indonesia Travel — pengenalan dan destinasi Bali: https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali/bali
- Dinas Pariwisata Provinsi Bali: https://disparda.baliprov.go.id/
