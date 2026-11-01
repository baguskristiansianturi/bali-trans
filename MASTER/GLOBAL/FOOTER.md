# GLB-002 — Master Footer

**Status penerapan:** SUDAH DITERAPKAN  
**Status persetujuan:** BELUM DICATAT DI MASTER INI  
**Sumber markup/logika utama:** `assets/js/global-shell.js`  
**Sumber gaya utama:** `assets/css/global-shell.css`  
**Versi yang diperiksa:** `a8d4282293d98923ecf160f52d95fe6168dd905d`

## Tujuan

Menyediakan footer website bersama untuk halaman yang menggunakan kerangka global.

## Susunan Saat Ini

1. Tautan merek footer dan penanda merek yang dibuat otomatis.
2. Pengantar singkat Bali Trans.
3. Tombol ajakan kontak: “Talk to our team”.
4. Dua blok sorotan:
   - Jelajahi Bali
   - Transportasi privat
5. Lima kelompok navigasi:
   - Temukan
   - Rencanakan perjalanan
   - Bantuan & dukungan
   - Tentang kami
   - Akun Anda
6. Catatan perencanaan yang meminta pelanggan mengonfirmasi detail perjalanan, harga, dan ketersediaan.
7. Hak cipta dan catatan informasi pemesanan.

## Kelompok Navigasi Saat Ini

Label dan tujuan tautan yang tepat dibuat di `assets/js/global-shell.js`. Perbarui sumber tersebut; jangan membuat salinan footer terpisah di HTML masing-masing halaman.

## Aturan Responsif yang Terlihat di CSS

- Susunan footer bawaan: satu kolom.
- Kelompok tautan footer: dua kolom secara bawaan.
- Mulai lebar 768px: pengantar footer dan area tautan menjadi dua bagian; kelompok tautan menggunakan empat kolom.
- Mulai lebar 1100px: kelompok tautan menggunakan lima kolom.
- Baris paling bawah footer berubah dari bertumpuk menjadi horizontal mulai 768px.
- Pada layar sempit, jarak antarbagian diperkecil.

Ini adalah aturan yang tercatat pada sumber kode saat ini, bukan bukti bahwa pemeriksaan perangkat nyata sudah selesai.

## Pengecualian

Halaman yang sengaja tidak menggunakan kerangka global tidak menampilkan footer ini. Pengecualian checkout dicatat di `MASTER/00-SYSTEM-MAP.md`.

## Dampak Perubahan

Dampak tinggi. Tautan footer memengaruhi banyak kelompok halaman. Setelah perubahan, periksa semua rute footer, susunan kolom pada ponsel, tablet/desktop, dan halaman checkout yang tidak menggunakan kerangka global.

## Kekurangan yang Diketahui

- Susunan dan label footer saat ini dicatat sebagai fakta penerapan; jangan menganggap semua label atau kelompok sudah menjadi isi bisnis final yang disetujui.
- Logo/ikon pembayaran belum teridentifikasi sebagai bagian yang dipastikan tersedia pada sumber footer bersama saat ini.
- Jangan menambahkan tombol WhatsApp mengambang atau tombol ajakan global lain yang tidak diminta.
