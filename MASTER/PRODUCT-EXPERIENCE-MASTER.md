# Product & Experience Master — Bali Trans

> **Status:** KERANGKA YANG DISETUJUI UNTUK DIKEMBANGKAN — standar detail belum ditetapkan  
> **Tanggal kerangka:** 2026-11-01  
> **Fungsi:** Mengumpulkan standar karakter produk digital setelah kebutuhan bisnis dan pengalaman pelanggan cukup dipahami.

## 1. Tujuan dan batas

Dokumen ini akan menjadi acuan karakter pengalaman digital agar keputusan desain dan implementasi tidak bergantung pada tebakan atau selera sesaat. Dokumen ini bukan pengganti Business/Plan Master dan bukan spesifikasi kode.

Jangan menetapkan nilai warna, font, ukuran, layout, animasi, atau perilaku final sebelum dibahas, dibandingkan, dan disetujui. Contoh yang ada di website saat ini adalah bukti implementasi, bukan otomatis standar yang telah disetujui.

## 2. Area standar yang akan dibangun

### A. Identitas visual dan karakter merek
- Karakter dan positioning visual.
- Warna utama, sekunder, aksen, netral, kontras, dan semantic colors.
- Tipografi, hirarki, ukuran, weight, line-height, dan aturan penggunaan.
- Ikon: gaya, stroke, ukuran, sumber, dan konsistensi.
- Fotografi, ilustrasi, crop, rasio, dan art direction.
- Border, radius, shadow, elevation, dan surface.

### B. Bahasa dan komunikasi antarmuka
- Voice, tone, dan karakter bahasa.
- Istilah baku, label, heading, CTA, notifikasi, error, dan empty state.
- Bahasa per pasar dan aturan lokalisasi.
- Perbedaan bahasa editorial, pemasaran, instruksi, dan UI.

### C. Layout dan komposisi
- Grid dan container.
- Lebar konten, kolom, sidebar, dan alignment.
- Spacing scale dan ritme vertikal.
- Pola hero, listing, detail, form, katalog, dan halaman editorial.
- Breakpoint serta perilaku mobile, tablet, dan desktop.
- Aturan memilih grid, carousel, list, atau komposisi khusus.

### D. Sistem komponen
Setiap komponen harus memiliki tujuan, anatomy, varian, ukuran, status, data contract, interaksi, aksesibilitas, breakpoint, contoh penggunaan, pengecualian, dan halaman pemakai.

Cakupan awal: navbar, footer, button, link, card (destinasi/artikel/layanan), label/badge, form/input, tabs, carousel, accordion/FAQ, modal, toast/notification, empty state, loading, error state, CTA, breadcrumb, hero, dan note panel.

Komponen tidak otomatis global hanya karena nama atau tampilannya mirip. Klasifikasikan sebagai global, shared, page-specific, atau pattern berdasarkan pemakaian dan perilaku nyata.

### E. Motion dan interaksi
- Hover, focus, active, disabled, selected, expanded, loading, dan error states.
- Durasi, easing, arah, jarak, dan intensitas animasi.
- Transisi carousel, accordion, modal, menu, dan navigasi.
- Reduced motion dan kenyamanan perangkat dengan kemampuan terbatas.
- Aturan kapan animasi tidak diperlukan.

### F. Responsivitas, aksesibilitas, dan performa
- Touch target, keyboard navigation, focus visibility, semantic HTML, label, dan contrast.
- Perilaku layout pada layar kecil.
- Penggunaan gambar/font/script yang efisien.
- Pengujian nyata dan alat audit; jangan menyimpulkan lulus hanya dari breakpoint di CSS.

### G. Pola halaman dan pengalaman
- Tujuan pengguna untuk setiap jenis halaman.
- Hierarki informasi dan alur pengguna.
- Pola pencarian, penjelajahan, perbandingan, pemesanan, bantuan, dan editorial.
- Konsistensi pola tanpa memaksakan semua halaman memakai layout identik.

## 3. Format spesifikasi setiap elemen

Setiap keputusan standar idealnya menyimpan:
1. ID dan nama.
2. Tujuan serta masalah pengguna yang diselesaikan.
3. Spesifikasi visual dan perilaku.
4. Variasi dan status.
5. Aturan responsive.
6. Aksesibilitas dan performa.
7. Contoh benar/salah atau referensi visual.
8. Halaman/komponen yang menggunakan.
9. Status: PEMBAHASAN, USULAN, DISETUJUI, PERLU VALIDASI, atau DIREVISI.
10. Tanggal, alasan, pemilik keputusan, versi, dan riwayat perubahan.

## 4. Hubungan dengan Master dan SOP

- Business/Plan Master memberi alasan bisnis dan prioritas pengalaman.
- Master Pengalaman Pelanggan memberi kebutuhan pengguna dan customer journey.
- Product & Experience Master mengubah kebutuhan tersebut menjadi prinsip pengalaman dan standar desain.
- Technical Master menjelaskan cara standar tersebut diterapkan pada arsitektur kode.
- SOP Implementasi mewajibkan pemeriksaan Product & Experience Master sebelum mengubah UI.
- SOP Audit memeriksa kesesuaian implementasi dengan standar yang sudah disetujui.

## 5. Tahapan pengembangan

1. Diskusikan kebutuhan dan karakter bisnis/produk terlebih dahulu.
2. Kumpulkan referensi profesional dan contoh pembanding.
3. Bandingkan alternatif beserta kelebihan, kekurangan, dan konsekuensinya.
4. Susun keputusan yang diusulkan secara spesifik.
5. Minta persetujuan Mas Bagus.
6. Catat standar yang disetujui dan tandai yang masih perlu validasi.
7. Baru setelah ada izin terpisah, terapkan ke website dan audit dampaknya.

## 6. Batas saat ini

Dokumen ini baru menyimpan peta area yang akan dibahas. Belum ada design token, komponen visual, layout, bahasa UI, atau motion rule final yang ditetapkan oleh dokumen ini. Website yang sudah ada tidak diubah.
