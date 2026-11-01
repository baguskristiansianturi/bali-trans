# SHR-001 — Master Formulir Pemesanan Bersama

**Status penerapan:** SUDAH DITERAPKAN sebagai formulir yang dapat digunakan ulang dan penyesuai layanan  
**Status persetujuan:** Acuan visual utama tercatat di `TEMPLATE-REGISTRY.md`; periksa persetujuan final sebelum menganggap setiap detail sebagai ketentuan tetap  
**HTML utama:** `booking-form.html`  
**CSS utama:** `assets/css/pages/booking-form.css`  
**JavaScript utama:** `assets/js/pages/booking-form.js`  
**Checkout bandara terkait:** `bali-airport-transfer-checkout.html`, `assets/css/pages/bali-airport-transfer-checkout.css`, `assets/js/pages/bali-airport-transfer-checkout.js`

## Tujuan

Menggunakan kembali satu susunan visual formulir pemesanan sambil menyesuaikan kolom, validasi, ringkasan, dan data pengiriman sesuai layanan yang dipilih.

## Mode Layanan yang Tercatat di TEMPLATE-REGISTRY.md

- `airport-transfer`
- `car-rental`
- `full-day-tour`

Penyesuai Dolphin Tour diaktifkan melalui `tourId=lovina-dolphin-tour`. Wisata sehari penuh lainnya tidak boleh otomatis menggunakan harga Dolphin Tour; gunakan perkiraan yang diberikan atau status menunggu penawaran harga.

## Aturan Penggunaan Ulang

- Gunakan kembali susunan dan desain visual formulir utama.
- Penyesuai layanan boleh mengubah kolom, label, validasi, ringkasan, dan data pesan WhatsApp yang memang relevan.
- Jangan membuat desain visual kedua untuk setiap layanan tanpa persetujuan yang jelas.
- Pertahankan paket, kendaraan, dan tambahan yang dipilih ketika pelanggan berpindah dari halaman wisata ke formulir.
- Permintaan pelanggan tetap berstatus permintaan sampai dikonfirmasi oleh tim.

## Batas Kemampuan yang Penting

Ini merupakan prototipe statis dan pengalihan permintaan melalui WhatsApp. Jangan menyebutnya sebagai inventaris pemesanan langsung, reservasi yang sudah dikonfirmasi, atau sistem pembayaran daring. Repository saat ini belum menyediakan backend pemesanan produksi atau pemrosesan pembayaran.

## Persyaratan Pengujian Ulang

Ketika penyesuai layanan berubah, uji layanan yang terdampak dan setidaknya satu layanan lain yang menggunakan formulir bersama. Pertahankan perilaku Airport Transfer dan tata letak formulir yang telah menjadi acuan.
