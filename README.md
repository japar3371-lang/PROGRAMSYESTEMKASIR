# 🍽️ Sistem Kasir Kantin Sekolah

Sistem kasir interaktif berbasis terminal yang dibangun menggunakan **TypeScript**. Dirancang untuk **SMKS ANTARTIKA 1 SDA** dengan menerapkan konsep-konsep dari **[TypeScript Guidebook](https://typescript-guidebook.vercel.app)** Bab 0–3: pengenalan programming, variabel & tipe data, operator & percabangan, serta perulangan.

---

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Persiapan / Prasyarat](#-persiapan--prasyarat)
- [Cara Install](#-cara-install)
- [Cara Menjalankan](#-cara-menjalankan)
- [Cara Pakai](#-cara-pakai)
  - [Menu Utama](#menu-utama)
  - [Kasir (Transaksi Penjualan)](#1-kasir-transaksi-penjualan)
  - [Kelola Produk](#2-kelola-produk)
  - [Statistik & Laporan Transaksi](#3-statistik--laporan-transaksi)
  - [Pengaturan Toko](#4-pengaturan-toko)
- [Daftar Menu Default](#-daftar-menu-default)
- [Aturan Diskon & Pajak](#-aturan-diskon--pajak)
- [Metode Pembayaran](#-metode-pembayaran)
- [Konfigurasi QRIS / DANA](#-konfigurasi-qris--dana)
- [Struktur File](#-struktur-file)
- [Konsep Pemrograman yang Dipraktikkan (Bab 0–3)](#-konsep-pemrograman-yang-dipraktikkan-bab-0-3)

---

## ✨ Fitur

| Fitur | Deskripsi |
|---|---|
| **Kasir Interaktif** | Proses transaksi penjualan dengan input langsung di terminal |
| **Manajemen Keranjang** | Tambah, gabung, dan lihat isi keranjang belanja |
| **Diskon Otomatis** | Diskon otomatis berdasarkan total belanja (10%, 15%, 20%) |
| **Pajak (PPN 10%)** | Pajak otomatis untuk non-member; **member bebas pajak** |
| **Poin Member** | Member mendapat 1 poin setiap belanja Rp10.000 |
| **Multi Pembayaran** | Bisa bayar dengan campuran Tunai, QRIS, atau Kartu Debit |
| **QRIS DANA** | Pembayaran QRIS khusus DANA dengan QR code image & nomor telepon |
| **Cetak Struk** | Struk belanja lengkap dengan rincian pembayaran |
| **Kelola Produk** | Tambah produk baru, ubah harga, dan ubah stok |
| **Statistik Penjualan** | Laporan total pendapatan, produk terlaris, penjualan per produk |
| **Grafik Penjualan (ASCII)** | Visualisasi grafik penjualan per produk, per transaksi, dan tren moving average |
| **Pengaturan Toko** | Ubah nama toko, konfigurasi QRIS/DANA, dan metode pembayaran (password protected) |
| **Manajemen Stok** | Status stok otomatis: `HABIS` dan `HAMPIR HABIS` |

---

## 💻 Teknologi yang Digunakan

| Teknologi | Versi | Keterangan |
|---|---|---|
| **TypeScript** | ^7.0.2 | Bahasa pemrograman utama |
| **tsx** | ^4.23.13 | Runner untuk menjalankan `.ts` langsung tanpa compile manual |
| **Node.js** | >= 18 | Runtime JavaScript |
| **readline** | built-in | Modul bawaan Node.js untuk input terminal |

---

## 🛠️ Persiapan / Prasyarat

Pastikan komputer Anda sudah terinstall:

1. **Node.js** (versi 18 atau lebih baru)
   - Download: [https://nodejs.org](https://nodejs.org)
   - Cek versi di terminal:
     ```bash
     node -v
     ```

2. **npm** (biasanya otomatis terinstall bersama Node.js)
   - Cek versi di terminal:
     ```bash
     npm -v
     ```

---

## 📦 Cara Install

### 1. Clone / Unduh Repository

```bash
# Jika menggunakan Git:
git clone https://github.com/japar3371-lang/PROGRAMSYESTEMKASIR
cd kelompok1

# Atau langsung masuk ke folder project:
cd kelompok1
```

### 2. Install Dependencies

```bash
npm install
```

Perintah ini akan menginstall semua package yang dibutuhkan:
- `typescript` — compiler TypeScript
- `tsx` — runner TypeScript tanpa compile manual
- `@types/node` — tipe data untuk Node.js

### 3. Verifikasi Installasi

Pastikan semua terinstall dengan benar:

```bash
npx tsx --version
npx tsc --version
```

Jika tidak ada error, installasi berhasil! ✅

---

## 🚀 Cara Menjalankan

```bash
npm start
```

Atau langsung:

```bash
npx tsx kasir-kantin.ts
```

Aplikasi akan langsung berjalan di terminal Anda dan menampilkan menu utama.

---

## 📖 Cara Pakai

### Menu Utama

Setelah menjalankan aplikasi, Anda akan diminta memasukkan **nama kasir**, lalu ditampilkan menu utama:

```
==================================================
        🍽️  SISTEM KASIR KANTIN SEKOLAH
      (KANTIN SMKS ANTARTIKA 1 SDA)
==================================================

Nama Kasir : Budi
Selamat datang, Budi!

=============== MENU UTAMA ===============
  1. Kasir (Transaksi Penjualan)
  2. Kelola Produk (Tambah / Ubah Harga & Stok)
  3. Statistik & Laporan Transaksi
  4. Pengaturan Toko
  0. Keluar Program
Pilih menu :
```

| Pilihan | Fungsi |
|---|---|
| `1` | Masuk ke mode kasir (transaksi penjualan) |
| `2` | Kelola data produk (tambah, ubah harga, ubah stok) |
| `3` | Lihat statistik dan laporan transaksi (termasuk grafik ASCII) |
| `4` | Pengaturan toko: nama toko, QRIS/DANA, metode pembayaran (password) |
| `0` | Keluar dari program |

---

### 1. Kasir (Transaksi Penjualan)

**Alur transaksi:**

1. **Masukkan nama pembeli**
2. **Tentukan status member** (`y` untuk member, `n` untuk reguler)
3. **Pilih menu** dengan memasukkan nomor produk
   - Masukkan jumlah yang dibeli
   - Ketik `0` untuk selesai belanja
   - Ketik `99` untuk melihat status stok
4. **Konfirmasi pembayaran** → pilih metode bayar → masukkan nominal
5. **Struk akan dicetak** otomatis di terminal

**Contoh transaksi:**

```
==================== TRANSAKSI #1 ====================

Nama Pembeli : Andi
Member? (y/n) : y

--- DAFTAR MENU (10 produk) ---
1. Nasi Goreng Spesial   Rp18.000   Stok:20
2. Mie Goreng Jawa       Rp15.000   Stok:25
...

Pilih menu (1-10) [0=Selesai, 99=Stok]: 1
Jumlah (stok:20) : 2

------------- KERANJANG -------------
1. Nasi Goreng Spesial  x2 = Rp36.000
-------------------------------------
Total Belanja: Rp36.000

Tambah lagi? (y/n) : n
```

**Cara bayar campuran:**
Anda bisa membayar dengan metode berbeda secara bertahap. Misalnya bayar sebagian dengan tunai, sisanya dengan QRIS. Program akan terus meminta pembayaran sampai tagihan lunas.

---

### 2. Kelola Produk

Dari menu utama, pilih `2` untuk masuk ke mode kelola produk:

```
========== KELOLA PRODUK ==========
  1. Tambah Produk Baru
  2. Ubah Harga Produk
  3. Ubah Stok Produk
  4. Kembali ke Menu Utama
Pilih aksi :
```

| Pilihan | Fungsi | Contoh Input |
|---|---|---|
| `1` | Tambah produk baru | Nama: "Soto Ayam", Harga: 12000, Stok: 20 |
| `2` | Ubah harga produk | Pilih nomor → masukkan harga baru |
| `3` | Ubah stok produk | Pilih nomor → masukkan stok baru |
| `4` | Kembali ke menu utama | — |

---

### 3. Statistik & Laporan Transaksi

Dari menu utama, pilih `3` untuk melihat laporan:

```
==================================================
       STATISTIK & LAPORAN TRANSAKSI
==================================================

--- RINGKASAN PENJUALAN ---
Total Transaksi        : 5
Total Pendapatan       : Rp245.000
Rata-rata per Transaksi: Rp49.000
Total Item Terjual     : 18
Total Diskon Diberikan : Rp24.500
Total Pajak (PPN 10%)  : Rp18.000
Total Poin Member      : 15 poin

--- RINCIAN PER TRANSAKSI ---
#1 | Andi          | Member  | Total Rp50.000
     - Nasi Goreng Spesial   x2 = Rp36.000
     - Es Teh Manis          x1 = Rp5.000

--- PENJUALAN PER PRODUK ---
Nasi Goreng Spesial       8 pcs = Rp144.000
Es Teh Manis             10 pcs = Rp50.000

🏆 Produk terlaris : Es Teh Manis (10 pcs)

--- STATUS STOK TERAKHIR ---
...

==================================================
        📊 GRAFIK PENJUALAN (ASCII)
==================================================

--- GRAFIK PENJUALAN PER PRODUK (Jumlah Terjual) ---
Nasi Goreng Spesial    |████████████████████████████  10 pcs
Es Teh Manis           |████████████████████████████████████  15 pcs
...

--- GRAFIK PENDAPATAN PER TRANSAKSI ---
#1  [M] |▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Rp50.000
#2  [R] |▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Rp75.000
...

--- TREN PENJUALAN (Moving Average 3 Transaksi) ---
T1  |░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ Avg: Rp50.000
T2  |░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ Avg: Rp62.500
...

==================================================
Legenda: █ = Produk, ▓ = Transaksi, ░ = Moving Avg
==================================================
```

---

### 4. Pengaturan Toko

Dari menu utama, pilih `4` untuk masuk ke pengaturan toko (memerlukan password admin):

```
========== PENGATURAN TOKO ==========
  1. Ubah Nama Toko (Saat ini: KANTIN SMKS ANTARTIKA 1 SDA)
  2. Pengaturan QRIS / DANA
  3. Pengaturan Transfer / Rekening
  4. Pengaturan Metode Pembayaran
  5. Ubah Password Admin
  6. Kembali ke Menu Utama
Pilih aksi :
```

**Password Admin Default:** `admin123` (bisa diubah via menu 5)

**Fitur pengaturan (semua perubahan tersimpan permanen ke `settings.json`):**
- **Ubah Nama Toko**: Mengubah nama toko yang ditampilkan di header dan struk
- **Pengaturan QRIS / DANA**: Konfigurasi provider, nomor, URL QR code image, nama merchant
- **Pengaturan Transfer / Rekening**: 
  - Tambah rekening bank/e-wallet baru (BRI, BCA, Mandiri, DANA, ShopeePay, dll)
  - Edit nama, nomor, status aktif/nonaktif
  - Hapus rekening
- **Pengaturan Metode Pembayaran**: Enable/disable metode (Tunai, QRIS, Debit, Transfer Bank) dan ubah biaya admin
- **Ubah Password Admin**: Ganti password akses menu pengaturan toko

> ✅ **Semua perubahan disimpan permanen ke file `settings.json`** — tidak perlu edit `config.ts` atau `config.js`. File `settings.json` dibuat otomatis saat pertama kali jalan.

---

## 📋 Daftar Menu Default

| No | Nama Menu | Harga | Stok Awal |
|---|---|---|---|
| 1 | Nasi Goreng Spesial | Rp18.000 | 20 |
| 2 | Mie Goreng Jawa | Rp15.000 | 25 |
| 3 | Ayam Geprek | Rp18.000 | 15 |
| 4 | Sate Ayam (5 tusuk) | Rp16.000 | 12 |
| 5 | Es Teh Manis | Rp5.000 | 40 |
| 6 | Es Jeruk Peras | Rp8.000 | 30 |
| 7 | Susu Coklat | Rp9.000 | 22 |
| 8 | Roti Bakar Coklat | Rp8.000 | 18 |
| 9 | Kerupuk | Rp2.000 | 50 |
| 10 | Pisang Goreng (3pcs) | Rp6.000 | 35 |

---

## 💰 Aturan Diskon & Pajak

### Diskon

| Total Belanja | Diskon |
|---|---|
| ≥ Rp200.000 | **20%** |
| ≥ Rp150.000 | **15%** |
| ≥ Rp50.000 | **10%** |
| < Rp50.000 | Tidak ada diskon |

### Pajak (PPN)

- **Non-member**: dikenakan pajak PPN **10%**
- **Member**: **BEBAS pajak** 🎉

### Poin Member

- 1 poin untuk setiap kelipatan **Rp10.000** belanja
- Hanya berlaku untuk member

---

## 💳 Metode Pembayaran

| Metode | Biaya Admin Default | Status Default |
|---|---|---|
| **Tunai** | Gratis (Rp0) | ✅ Aktif |
| **QRIS (DANA)** | +Rp1.000 | ✅ Aktif |
| **Kartu Debit** | +Rp1.500 | ✅ Aktif |
| **Transfer Bank** | +Rp2.500 | ❌ Nonaktif |

> 💡 **Tips:** Anda bisa membayar dengan metode campuran (misal: sebagian tunai, sisanya QRIS). Program akan meminta pembayaran berulang sampai tagihan lunas.
> 
> ⚙️ **Konfigurasi**: Semua metode pembayaran (nama, biaya, status aktif/nonaktif) dapat diubah via menu **Pengaturan Toko > Pengaturan Metode Pembayaran** — tersimpan permanen ke `settings.json`.

---

## 🔧 Konfigurasi QRIS / DANA

Sistem QRIS dikonfigurasi khusus untuk **DANA** dengan detail berikut:

| Parameter | Nilai Default | Deskripsi |
|---|---|---|
| **Provider** | `DANA` | Penyedia layanan e-wallet |
| **Nomor DANA** | `08814952272` | Nomor telepon terdaftar DANA merchant |
| **QR Image URL** | (https://media.discordapp.net/attachments/1496781830131552258/1546380648942665758/qr_ID1026528826815_07.09.26_1788756258_1788756258909.jpg?ex=6a9f92b5&is=6a9e4135&hm=0e847c223daf95c9c294700cd8dcbaa8955e1b357a79209d6539dc5dfafd16a5&=&format=webp&width=454&height=640) | URL gambar QR code untuk scan |
| **Merchant Name** | `KANTIN SMKS ANTARTIKA 1 SDA` | Nama merchant yang tampil di aplikasi DANA |

**Saat pembayaran QRIS dipilih**, program akan menampilkan:
```
==================================================
           📱 INFO PEMBAYARAN QRIS (DANA)
==================================================
Provider     : DANA
Nomor DANA   : 08814952272
Merchant     : KANTIN SMKS ANTARTIKA 1 SDA
QR Code URL  : https://media.discordapp.net/...
--------------------------------------------------
Silakan scan QR code di atas menggunakan aplikasi DANA
==================================================
```

**Mengubah konfigurasi QRIS:**
1. Via menu: `Pengaturan Toko` → `Pengaturan QRIS / DANA` (password: `admin123`) — **tersimpan permanen ke `settings.json`**
2. Langsung edit `settings.json` → `qrisConfig` object

```json
"qrisConfig": {
  "provider": "DANA",
  "phoneNumber": "08814952272",
  "qrImageUrl": "https://media.discordapp.net/...",
  "merchantName": "KANTIN SMKS ANTARTIKA 1 SDA"
}
```

---

## 🏦 Transfer Bank / Rekening

Sistem mendukung multiple rekening transfer (bank & e-wallet). Default: **DANA** (08814952272).

**Mengelola rekening transfer:**
1. Via menu: `Pengaturan Toko` → `Pengaturan Transfer / Rekening`
2. Langsung edit `settings.json` → `transferAccounts` array

```json
"transferAccounts": [
  { "id": "dana", "name": "DANA", "type": "ewallet", "number": "08814952272", "enabled": true },
  { "id": "bca", "name": "BCA", "type": "bank", "number": "1234567890", "enabled": true }
]
```

**Saat pembayaran Transfer Bank dipilih**, program menampilkan:
```
==================================================
        🏦 INFO PEMBAYARAN TRANSFER BANK
==================================================
  DANA (ewallet)
  Nomor: 08814952272
  --------------------------------------------------
  BCA (bank)
  Nomor: 1234567890
  --------------------------------------------------
Silakan transfer ke salah satu rekening di atas.
Konfirmasi pembayaran ke kasir setelah transfer.
==================================================
```

---

## 📁 Struktur File

```
kelompok1/
├── kasir-kantin.ts      # File utama — seluruh logika program
├── config.ts            # Konfigurasi default (menu, diskon, pajak, dll.)
├── config.js            # Konfigurasi dalam format JavaScript (CommonJS)
├── settings.json        # Konfigurasi runtime (nama toko, QRIS, transfer, password) — AUTO GENERATED
├── _run_test.js         # Script untuk menjalankan test otomatis
├── _test_input.txt      # Input test untuk testing otomatis
├── package.json         # Konfigurasi project & dependencies
├── tsconfig.json        # Konfigurasi TypeScript
├── node_modules/        # Folder dependencies (otomatis)
└── README.md            # Dokumentasi ini
```

---

## 🧠 Konsep Pemrograman yang Dipraktikkan (Bab 0–3)

Program ini dirancang sebagai **SMKS ANTARTIKA 1 SDA**. Berikut mapping konsep ke materi **[TypeScript Guidebook](https://typescript-guidebook.vercel.app)** Bab 0 s/d Bab 3:

### 📘 Bab 0 — Pengenalan & Persiapan

| Konsep | Penerapan dalam Program |
|---|---|
| **Decomposition** | Program dipecah menjadi fungsi-fungsi kecil: kasir, kelola produk, statistik |
| **Pattern Recognition** | Pola input validasi diulang dengan `while`/`continue` di beberapa fungsi |
| **Abstraksi** | Menggunakan `interface` untuk mendefinisikan tipe data (`MenuItem`, `KeranjangItem`, `RiwayatTransaksi`) |
| **Algorithm** | Alur transaksi kasir: pilih barang → hitung total → diskon → pajak → bayar → cetak struk |

### 📗 Bab 1 — Variabel & Tipe Data

| Konsep | Penerapan dalam Program |
|---|---|
| **`let` vs `const`** | `let` untuk data berubah (stok, total belanja), `const` untuk referensi tetap (array `menu`, `riwayat`) |
| **Tipe Data** | `number` (harga, stok), `string` (nama produk), `boolean` (status member) |
| **Type Inference** | TypeScript menebak tipe otomatis dari nilai awal, misal `let hitung = 0` → `number` |
| **Literal Type** | `type MetodeBayar = "tunai" \| "qris" \| "debit"` untuk membatasi pilihan metode bayar |
| **Template Literal** | Output struk menggunakan backtick dengan `${...}` untuk menyisipkan data dinamis |
| **Array** | `menu: MenuItem[]`, `keranjang: KeranjangItem[]`, `riwayat: RiwayatTransaksi[]` |
| **Object** | Setiap item menu adalah object dengan properti `nomor`, `nama`, `harga`, `stok` |
| **`any` / `unknown`** | Tidak digunakan — semua tipe didefinisikan secara spesifik |

### 📕 Bab 2 — Operator & Percabangan

| Konsep | Penerapan dalam Program |
|---|---|
| **Operator Aritmatika** | `+` (penjumlahan harga), `*` (subtotal), `/` (rata-rata), `+=` / `-=` / `++` (kalkulasi) |
| **Operator Perbandingan** | `===` (cocokkan nomor produk, bandingkan input user) |
| **Operator Logika** | `!` (negasi: `!isMember`, `!kembali`), `&&`, `\|\|` dalam validasi |
| **Operator Penugasan** | `=` (inisialisasi), `+=` (akumulasi total), `-=` (pengurangan stok), `++` (auto-increment) |
| **`if...else if...else`** | Cek diskon berdasarkan total belanja (≥200k → 20%, ≥150k → 15%, ≥50k → 10%) |
| **Nested `if`** | `if (total >= 100000) { if (total >= 200000) ... }` untuk diskon bertingkat |
| **Ternary (`?:`)** | `stok === 0 ? " [HABIS]" : stok <= 5 ? " [HAMPIR HABIS]" : ""` untuk label stok |
| **`switch`** | Pilihan menu utama (kasir/kelola/statistik/keluar) dan pemilihan metode bayar |

### 📙 Bab 3 — Perulangan

| Konsep | Penerapan dalam Program |
|---|---|
| **`for` (klasik)** | Format Rupiah: iterasi digit dari belakang untuk menambah pemisah `.` |
| **`for...of** | Iterasi array `menu` untuk menampilkan daftar produk, keranjang, dan riwayat |
| **`for...in** | Iterasi properti object `penjualan` untuk menampilkan penjualan per produk |
| **`while`** | Validasi input menu/jumlah, proses pembayaran (selama tagihan belum lunas) |
| **`do...while`** | Menu utama dan kelola produk (minimal sekali masuk, ulang sampai pilih kembali) |
| **`break`** | Keluar dari loop belanja saat pengguna pilih `0` (selesai) |
| **`continue`** | Skip ke iterasi berikutnya saat input tidak valid atau stok cek via `99` |
| **Nested Loop** | Loop dalam statistik (loop transaksi → loop baris per transaksi) untuk menghitung total item |

---

## 🧪 Testing

Untuk menjalankan test otomatis:

```bash
node _run_test.js
```

Script ini akan membaca input dari `_test_input.txt` dan menjalankan program dengan input tersebut secara otomatis.

---

## ❓ Troubleshooting

| Masalah | Solusi |
|---|---|
| `npx: command not found` | Install Node.js dari [nodejs.org](https://nodejs.org) |
| `Cannot find module` | Jalankan `npm install` di folder project |
| `tsx: command not found` | Jalankan `npm install` untuk menginstall dependencies |
| Program tidak bisa dijalankan | Pastikan Node.js versi 18+ terinstall |

---

## 📄 License

ISC

---

> Dibuat untuk **SMKS ANTARTIKA 1 SDA** — Kelompok 1
