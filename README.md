# PROGRAMSYESTEMKASIR
# 🍽️ Sistem Kasir Kantin Sekolah 

Program **kasir kantin interaktif** berbasis Terminal yang ditulis menggunakan **TypeScript**.
Program menerima input langsung dari pengguna, menangani banyak barang dalam satu transaksi,
menghitung diskon & pajak, mendukung berbagai metode pembayaran, sistem poin member,
serta melacak riwayat transaksi selama satu sesi.

> Dibangun dengan konsep TypeScript dasar (BAB 0 - BAB 3):
> `let` · `const` · `string` · `number` · `boolean` · template literal · operator ·
> `if/else if/else` · perulangan (`while`, `do...while`, `for...of`, `for...in`) · `break`/`continue` ·
> array sederhana · fungsi · input terminal. **Tanpa** class, interface, framework, database, atau API.

---

## 📁 Struktur Project

```
kasir-kantin/
│
├── src/
│   └── kasir-kantin.ts   → satu file utama program kasir
│
├── package.json          → informasi & konfigurasi project
├── tsconfig.json         → konfigurasi TypeScript
└── README.md             → dokumentasi project
```

---

## 🚀 Cara Menjalankan

Buka folder **`kasir-kantin`** di VS Code (File → Open Folder), lalu di terminal:

```bash
npm install
npm start
```

atau langsung dengan tsx:

```bash
npx tsx src/kasir-kantin.ts
```

> Jika `npm` / `npx` diblokir kebijakan eksekusi PowerShell, gunakan `npm.cmd` / `npx.cmd`.

---

## 🧾 Daftar Menu (10 item)

```
--- Makanan ---              --- Minuman & Snack ---
1.  Nasi Goreng Spesial      5.  Es Teh Manis
2.  Mie Goreng Jawa          6.  Es Jeruk Peras
3.  Ayam Geprek              7.  Susu Coklat
4.  Sate Ayam (5 tusuk)      8.  Roti Bakar Coklat
                             9.  Kerupuk
                             10. Pisang Goreng (3pcs)
```

---

## ⚙️ Fitur

### Input & Validasi
- Input nama kasir, nama pembeli, status member (y/n)
- Banyak barang dalam satu transaksi, keranjang terus diperbarui
- Validasi stok — jumlah tidak boleh melebihi stok tersedia
- Ketik `99` untuk melihat status stok kapan saja
- Ketik `0` untuk menyelesaikan pesanan

### Perhitungan Harga
- `subtotal = harga × jumlah` untuk setiap barang
- **Diskon berjenjang**:
  - `>= Rp100.000` → 15%
  - `>= Rp50.000`  → 10%
  - `< Rp50.000`   → tanpa diskon
- **Pajak (PPN)**: 10% untuk **non-member**, 0% (bebas pajak) untuk **member**
- Total akhir = (totalBelanja − diskon) + pajak

### Sistem Member & Poin
- Member bebas pajak
- Mendapat poin: `1 poin / Rp10.000` belanja
- Poin diakumulasi dan ditampilkan di struk serta laporan akhir

### Pembayaran Multi-Metode
- Bisa dibayar dengan **gabungan beberapa metode** dalam satu transaksi
- Metode: **Tunai** (tanpa biaya), **QRIS** (biaya Rp1.000), **Kartu Debit** (biaya Rp1.500)
- Perulangan sampai tagihan lunas
- Perhitungan kembalian/kekurangan secara otomatis

### Laporan & Riwayat
- **Transaksi baru** setelah tiap pembayaran
- **Status stok** semua menu (dengan penanda hampir habis / habis)
- **Ringkasan transaksi** satu sesi (jumlah transaksi, total pendapatan, total item)
- **Laporan akhir** saat program ditutup
- Stok menu berkurang otomatis setelah setiap pembelian

---

## ✅ Konsep TypeScript yang Digunakan

| Konsep | Digunakan Di |
|---|---|
| `let` / `const` | Seluruh variabel |
| `string` / `number` / `boolean` | Tipe data parameter & variabel |
| Template literal | Tampilan struk & pesan |
| Operator aritmatika | Perhitungan harga, diskon, pajak |
| Operator penugasan | `+=`, `-=`, `++` |
| Operator perbandingan | `>=`, `<=`, `===`, `!==` |
| Operator logika | `&&`, `||` |
| `if / else if / else` | Validasi & perhitungan |
| `switch` | — (menggunakan if-else-else) |
| `for...of` | Iterasi array menu & keranjang |
| `for...in` | Iterasi objek (opsi tersedia) |
| `while` | Loop utama & pembayaran |
| `do...while` | Loop menu utama |
| `break` | Keluar dari loop validasi |
| `continue` | Lanjutkan loop validasi |
| Nested loop | Iterasi kategori + menu |
| Fungsi | Seluruh logika program |
| Array & object | Data menu, keranjang, riwayat |
| `interface` | Tipe data struktural |
| Type alias | `MetodeBayar` |
| Import/export | Module node:readline |

---

## ✅ Validasi Input

- Nomor menu harus tersedia (1–10); selain itu diminta ulang
- Jumlah harus `> 0` dan tidak melebihi stok
- Nominal pembayaran harus `> 0`
- Konfirmasi y/n diproses dengan benar sebagai boolean
