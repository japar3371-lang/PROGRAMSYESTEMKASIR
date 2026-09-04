// ============================================================
// SISTEM KASIR KANTIN SEKOLAH
// TypeScript · Terminal Interactive
// Cara menjalankan : npx tsx kasir-kantin.ts
// ------------------------------------------------------------
// PETA MATERI — TypeScript Guidebook (Bab 0–3)
// https://typescript-guidebook.vercel.app
// ------------------------------------------------------------
//   BAB 0 — Pengenalan & Computational Thinking
//     bab0/computational-thinking  → Dekomposisi, Pola, Abstraksi, Algorithm
//     bab0/struktur-project        → Struktur project & file
//     bab0/program-pertama         → Program pertama di terminal
// ------------------------------------------------------------
//   BAB 1 — Variabel & Tipe Data
//     bab1/apa-itu-variabel        → Variabel sebagai kotak penyimpan data
//     bab1/let-vs-const            → let (berubah) vs const (tetap)
//     bab1/string                  → Tipe teks (nama, alamat)
//     bab1/number                  → Tipe angka (harga, stok, total)
//     bab1/boolean                 → Tipe benar/salah (status member)
//     bab1/type-inference          → TypeScript menebak tipe otomatis
//     bab1/literal-type            → Tipe yang membatasi nilai spesifik
//     bab1/template-literal        → String dinamis dengan backtick `...`
// ------------------------------------------------------------
//   BAB 2 — Operator & Percabangan
//     bab2/operator-aritmatika     → + - * / (harga × jumlah)
//     bab2/operator-penugasan      → = += -= ++ (akumulasi total)
//     bab2/operator-perbandingan   → === !== > >= < <=
//     bab2/operator-logika         → && || ! (validasi input)
//     bab2/if-else / nested-if     → Diskon bertingkat
//     bab2/ternary-operator        → Label stok: HABIS / HAMPIR HABIS
//     bab2/switch                  → Menu utama & metode pembayaran
// ------------------------------------------------------------
//   BAB 3 — Perulangan
//     bab3/for                     → Format Rupiah (iterasi digit)
//     bab3/while                   → Validasi input, proses pembayaran
//     bab3/do-while                → Menu utama & kelola produk
//     bab3/for-of                  → Iterasi array menu & keranjang
//     bab3/for-in                  → Iterasi object penjualan per produk
//     bab3/break-continue          → Keluar/skip dalam loop
//     bab3/nested-loop             → Statistik: transaksi → baris
// ------------------------------------------------------------
//   FITUR APLIKASI
//     1. Kasir (transaksi penjualan)
//     2. Kelola Produk (tambah, ubah harga, ubah stok)
//     3. Statistik & Laporan Transaksi
// ============================================================

import * as readline from "node:readline";

// ============================================================
// BAB 0 — ABSTRAKSI: mendefinisikan "cetakan" data dengan interface
//   → bab0/computational-thinking: Abstraksi = fokus pada yang penting
//   Interface berfungsi sebagai cetakan/kontrak: setiap item menu
//   HARUS punya nomor, nama, harga, dan stok.
// ============================================================
interface MenuItem {
  nomor: number;   // BAB 1 → bab1/number: tipe angka
  nama: string;    // BAB 1 → bab1/string: tipe teks
  harga: number;   // BAB 1 → bab1/number: harga dalam Rupiah
  stok: number;    // BAB 1 → bab1/number: jumlah stok tersedia
}

// BAB 0 → Abstraksi: KeranjangItem = satu baris belanja
interface KeranjangItem {
  menu: MenuItem;    // menyimpan referensi produk
  jumlah: number;    // BAB 1 → number: berapa yang dibeli
  subtotal: number;  // BAB 2 → operator aritmatika: harga × jumlah
}

// BAB 0 → Abstraksi: BarisPenjualan = data barang di struk
interface BarisPenjualan {
  nama: string;    // BAB 1 → string
  jumlah: number;  // BAB 1 → number
  subtotal: number;// BAB 2 → aritmatika
}

// BAB 0 → Abstraksi: RiwayatTransaksi = snapshot satu transaksi
interface RiwayatTransaksi {
  no: number;              // BAB 1 → number: nomor urut transaksi
  pembeli: string;         // BAB 1 → string: nama pembeli
  isMember: boolean;       // BAB 1 → bab1/boolean: true/false
  totalBelanja: number;    // BAB 1 → number
  diskon: number;          // BAB 1 → number
  pajak: number;           // BAB 1 → number
  totalBayar: number;      // BAB 1 → number
  baris: BarisPenjualan[]; // BAB 1 → array: kumpulan data barang
}

// ============================================================
// BAB 1 — VARIABEL & TIPE DATA
//   → bab1/apa-itu-variabel: variabel = kotak penyimpan data
//   → bab1/let-vs-const: const untuk referensi tetap, let untuk berubah
// ============================================================

// BAB 0 → Program Pertama: membuat program interaktif
// BAB 1 → const: referensi readline tidak berubah
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// BAB 1 → let vs const:
//   antreanInput pakai const → referensi array tetap, isi boleh berubah
//   pemanggil pakai let → nilainya bisa berubah (null atau fungsi)
const antreanInput: string[] = []; // BAB 1 → array of string
let pemanggil: ((baris: string) => void) | null = null; // BAB 1 → union type: fungsi atau null

rl.on("line", (baris: string) => {
  if (pemanggil !== null) {
    const lanjutkan = pemanggil;
    pemanggil = null;
    lanjutkan(baris);
  } else {
    antreanInput.push(baris);
  }
});

function tanya(pertanyaan: string): Promise<string> {
  process.stdout.write(pertanyaan);
  if (antreanInput.length > 0) {
    const baris = antreanInput.shift() as string;
    return Promise.resolve(baris.trim());
  }
  return new Promise((resolve) => {
    pemanggil = (baris: string) => resolve(baris.trim());
  });
}

// Hanya ambil angka dari input (hapus huruf/titik/koma)
function bacaAngka(input: string): number {
  const bersih = input.replace(/[^0-9]/g, "");
  return Number(bersih) || 0;
}

// Format angka menjadi Rupiah, contoh: 18000 -> Rp18.000
// CONTOH PERULANGAN for (klasik, lewat indeks)
function formatRupiah(angka: number): string {
  const teks = String(Math.round(Math.abs(angka)));
  let hasil = "";
  let hitung = 0;
  for (let i = teks.length - 1; i >= 0; i--) {
    hasil = teks[i] + hasil;
    hitung++;
    if (hitung % 3 === 0 && i !== 0) {
      hasil = "." + hasil;
    }
  }
  return (angka < 0 ? "-" : "") + "Rp" + hasil;
}

// ============================================================
// BAB 1 — DATA PROGRAM (state)
//   → bab1/let-vs-const: const untuk array & counter awal
//   → bab1/type-inference: TypeScript menebak tipe dari nilai awal
// ============================================================

// BAB 1 → const: referensi array menu tetap (isi boleh ditambah/diubah)
// BAB 1 → array of MenuItem: setiap elemen adalah object
const menu: MenuItem[] = [
  { nomor: 1, nama: "Nasi Goreng Spesial",   harga: 18000, stok: 20 },
  { nomor: 2, nama: "Mie Goreng Jawa",       harga: 15000, stok: 25 },
  { nomor: 3, nama: "Ayam Geprek",           harga: 18000, stok: 15 },
  { nomor: 4, nama: "Sate Ayam (5 tusuk)",   harga: 16000, stok: 12 },
  { nomor: 5, nama: "Es Teh Manis",          harga: 5000,  stok: 40 },
  { nomor: 6, nama: "Es Jeruk Peras",        harga: 8000,  stok: 30 },
  { nomor: 7, nama: "Susu Coklat",           harga: 9000,  stok: 22 },
  { nomor: 8, nama: "Roti Bakar Coklat",     harga: 8000,  stok: 18 },
  { nomor: 9, nama: "Kerupuk",               harga: 2000,  stok: 50 },
  { nomor: 10, nama: "Pisang Goreng (3pcs)", harga: 6000,  stok: 35 },
];

const riwayat: RiwayatTransaksi[] = []; // BAB 1 → const + array: kumpulan transaksi
let noTransaksiBerikut = 1;             // BAB 1 → let: nilainya berubah-ubah (auto-increment)

// ============================================================
// BAB 2 & 3 — FUNGSI BANTU KECIL
// ============================================================

// BAB 2 → bab2/if-else: if ... else if ... else
//   Contoh: menentukan label berdasarkan kondisi stok
function labelStok(stok: number): string {
  if (stok === 0) {                    // BAB 2 → operator perbandingan ===
    return " [HABIS]";
  } else if (stok <= 5) {             // BAB 2 → operator perbandingan <=
    return " [HAMPIR HABIS]";
  } else {
    return "";
  }
}

// BAB 3 → bab3/for-of: iterasi array untuk mencari item
//   + BAB 2 → if + return: keluar jika ketemu
function cariMenu(nomor: number): MenuItem | null {
  for (const m of menu) {              // BAB 3 → for...of: putar setiap elemen array
    if (m.nomor === nomor) return m;    // BAB 2 → perbandingan ===
  }
  return null;
}

// BAB 3 → for-of: cari nomor terbesar untuk auto-increment
function nomorProdukBerikutnya(): number {
  let maks = 0;                        // BAB 1 → let: nilainya berubah
  for (const m of menu) {              // BAB 3 → for...of
    if (m.nomor > maks) maks = m.nomor;// BAB 2 → perbandingan >
  }
  return maks + 1;                     // BAB 2 → operator aritmatika +
}

// ============================================================
// BAB 1 & 3 — FUNGSI TAMPIL
// ============================================================

// BAB 0 → bab0/program-pertama: program pertama menampilkan teks
// BAB 1 → template literal: backtick untuk output multi-baris
function tampilkanJudul(): void {
  console.log("");
  console.log("==================================================");
  console.log("        🍽️  SISTEM KASIR KANTIN SEKOLAH");
  console.log("          (KANTIN SMKS ANTARTIKA 1 SDA)");
  console.log("==================================================");
}

// BAB 1 → bab1/template-literal: `${...}` menyisipkan nilai variabel
// BAB 3 → bab3/for-of: iterasi array menu
// BAB 2 → bab2/ternary-operator: `kondisi ? nilaiA : nilaiB`
function tampilkanMenuProduk(): void {
  console.log("");
  console.log(`--- DAFTAR MENU (${menu.length} produk) ---`); // BAB 1 → template literal
  for (const m of menu) {  // BAB 3 → for...of: putar setiap produk
    // BAB 2 → ternary bertingkat: cek stok → pilih label
    const penanda =
      m.stok === 0 ? " [HABIS]" : m.stok <= 5 ? " [HAMPIR HABIS]" : "";
    // BAB 1 → template literal: `${m.nama}` `${formatRupiah(...)}`
    console.log(
      `${m.nomor}. ${m.nama.padEnd(22)} ${formatRupiah(m.harga).padEnd(11)} Stok:${String(m.stok).padEnd(3)}${penanda}`
    );
  }
  console.log("");
}

function tampilkanStok(): void {
  console.log("");
  console.log("--- STATUS STOK ---");
  for (const m of menu) {
    console.log(`${m.nomor}. ${m.nama.padEnd(22)} Stok: ${String(m.stok).padEnd(4)} ${labelStok(m.stok).trim()}`);
  }
  console.log("");
}

// BAB 3 → for-of: iterasi isi keranjang
// BAB 2 → if: cek apakah keranjang kosong
function tampilkanKeranjang(keranjang: KeranjangItem[]): void {
  console.log("");
  console.log("------------- KERANJANG -------------");
  if (keranjang.length === 0) {    // BAB 2 → perbandingan ===
    console.log("(keranjang kosong)");
    console.log("-------------------------------------");
    return;                         // BAB 2 → return: keluar dari fungsi
  }
  let i = 1;                       // BAB 1 → let: berubah setiap iterasi
  for (const k of keranjang) {     // BAB 3 → for...of
    console.log(`${i}. ${k.menu.nama.padEnd(20)} x${k.jumlah} = ${formatRupiah(k.subtotal)}`); // BAB 1 → template literal
    i++;                            // BAB 2 → operator penugasan ++
  }
  console.log("-------------------------------------");
}

// ============================================================
// BAB 2 & 3 — KELOLA PRODUK
//   → bab3/do-while: minimal sekali masuk, ulang sampai pilih kembali
//   → bab2/switch: pilih aksi berdasarkan input
// ============================================================

// BAB 3 → bab3/do-while: do { ... } while (kondisi)
//   → Minimal sekali tampilkan menu, ulang sampai user pilih "4"
// BAB 2 → bab2/switch: switch (pilihan) { case "1": ... case "4": ... default: ... }
async function kelolaProduk(): Promise<void> 
{
  let kembali = false;                    // BAB 1 → let: berubah saat user pilih kembali
  do {                                    // BAB 3 → do...while
    console.log("");
    console.log("========== KELOLA PRODUK ==========");
    console.log("  1. Tambah Produk Baru");
    console.log("  2. Ubah Harga Produk");
    console.log("  3. Ubah Stok Produk");
    console.log("  4. Kembali ke Menu Utama");
    const pilihan = await tanya("Pilih aksi : ");

    switch (pilihan) {                    // BAB 2 → bab2/switch
      case "1":
        await tambahProduk();
        break;                            // BAB 3 → break: keluar dari switch
      case "2":
        await ubahHargaProduk();
        break;
      case "3":
        await ubahStokProduk();
        break;
      case "4":
        kembali = true;                   // BAB 2 → operator penugasan =
        break;
      default:                            // BAB 2 → switch default: jika tidak cocok
        console.log("Pilihan tidak valid! Masukkan 1-4.");
    }
  } while (!kembali);                    // BAB 3 → while: selama belum kembali
} // akhir kelolaProduk

// BAB 2 → if: validasi input sebelum menyimpan
async function tambahProduk(): Promise<void> {
  console.log("");
  console.log("--- TAMBAH PRODUK BARU ---");
  const nama = await tanya("Nama produk : ");
  if (nama === "") {                     // BAB 2 → perbandingan ===
    console.log("Nama produk tidak boleh kosong.");
    return;                              // BAB 2 → return: hentikan fungsi
  }
  const harga = bacaAngka(await tanya("Harga (Rp) : "));
  if (harga <= 0) {                     // BAB 2 → perbandingan <=
    console.log("Harga harus lebih dari 0.");
    return;
  }
  const stok = bacaAngka(await tanya("Stok awal  : "));
  if (stok < 0) {                       // BAB 2 → perbandingan <
    console.log("Stok tidak boleh negatif.");
    return;
  }

  // BAB 1 → const: referensi array menu tetap
  //   → .push() menambah elemen baru ke dalam array
  menu.push({ nomor: nomorProdukBerikutnya(), nama, harga, stok });
  console.log(`✅ Produk "${nama}" berhasil ditambahkan.`); // BAB 1 → template literal
}

async function ubahHargaProduk(): Promise<void> {
  console.log("");
  console.log("--- UBAH HARGA PRODUK ---");
  tampilkanMenuProduk();
  const nomor = bacaAngka(await tanya("Nomor produk : "));
  const produk = cariMenu(nomor);
  if (produk === null) {
    console.log("Produk tidak ditemukan.");
    return;
  }
  const hargaBaru = bacaAngka(await tanya(`Harga baru untuk "${produk.nama}" (Rp) : `));
  if (hargaBaru <= 0) {
    console.log("Harga harus lebih dari 0.");
    return;
  }
  produk.harga = hargaBaru; // operator penugasan =
  console.log(`✅ Harga "${produk.nama}" diubah menjadi ${formatRupiah(hargaBaru)}.`);
}

async function ubahStokProduk(): Promise<void> {
  console.log("");
  console.log("--- UBAH STOK PRODUK ---");
  tampilkanMenuProduk();
  const nomor = bacaAngka(await tanya("Nomor produk : "));
  const produk = cariMenu(nomor);
  if (produk === null) {
    console.log("Produk tidak ditemukan.");
    return;
  }
  const stokBaru = bacaAngka(await tanya(`Stok baru untuk "${produk.nama}" : `));
  if (stokBaru < 0) {
    console.log("Stok tidak boleh negatif.");
    return;
  }
  produk.stok = stokBaru;
  console.log(`✅ Stok "${produk.nama}" diubah menjadi ${stokBaru}.`);
}

// ============================================================
// VALIDASI INPUT BELANJA
// ============================================================

// CONTOH while + continue + break
async function validasiPilihan(): Promise<number> {
  while (true) {
    const input = await tanya(`Pilih menu (1-${menu.length}) [0=Selesai, 99=Stok]: `);
    const pilih = bacaAngka(input);

    if (pilih === 99) {
      tampilkanStok();
      continue; // ulangi tanpa keluar dari while
    }
    if (pilih === 0) {
      return 0; // selesai belanja
    }
    if (cariMenu(pilih) !== null) {
      return pilih;
    }
    console.log(`Pilihan tidak valid! Silakan pilih 1-${menu.length}, 0=selesai, 99=stok.`);
  }
}

async function validasiJumlah(stokTersedia: number): Promise<number> {
  while (true) {
    const input = await tanya(`Jumlah (stok:${stokTersedia}) : `);
    const jumlah = bacaAngka(input);

    if (jumlah <= 0) {
      console.log("Jumlah harus > 0.");
      continue;
    }
    if (jumlah > stokTersedia) {
      console.log(`Stok hanya ${stokTersedia}!`);
      continue;
    }
    return jumlah;
  }
}

// ============================================================
// PERHITUNGAN — OPERATOR ARITMATIKA & PERCABANGAN
// ============================================================

// CONTOH NESTED IF (if di dalam if)
function hitungDiskon(total: number): { persen: number; besaran: number; ket: string } {
  let persen = 0;
  let ket = "Tidak ada diskon";

  if (total >= 100000) {
    if (total >= 200000) {
      persen = 0.2; // 20%
      ket = "Diskon 20% (belanja >= Rp200.000)";
    } else {
      persen = 0.15; // 15%
      ket = "Diskon 15% (belanja >= Rp150.000)";
    }
  } else if (total >= 50000) {
    persen = 0.1; // 10%
    ket = "Diskon 10% (belanja >= Rp50.000)";
  }

  const besaran = Math.round(total * persen); // operator aritmatika (*)
  return { persen, besaran, ket };
}

// CONTOH TERNARY + operator logika
function hitungPajak(total: number, isMember: boolean): number {
  // Member bebas pajak; operator logika ! untuk negasi
  const kenaPajak = !isMember;
  const pajak = kenaPajak ? total * 0.1 : 0;
  return Math.round(pajak);
}

function hitungPoin(totalBelanja: number, isMember: boolean): number {
  if (!isMember) return 0;
  return Math.floor(totalBelanja / 10000); // operator pembagian
}

// ============================================================
// PEMBAYARAN — CONTOH SWITCH
// ============================================================
type MetodeBayar = "tunai" | "qris" | "debit";

function namaMetode(kode: MetodeBayar): string {
  const nama: Record<MetodeBayar, string> = { tunai: "Tunai", qris: "QRIS", debit: "Kartu Debit" };
  return nama[kode];
}

function biayaMetode(kode: MetodeBayar): number {
  const biaya: Record<MetodeBayar, number> = { tunai: 0, qris: 1000, debit: 1500 };
  return biaya[kode];
}

async function prosesPembayaran(
  totalBayar: number
): Promise<{ totalDibayar: number; kembalian: number; totalBiaya: number; detail: string[] }> {
  const detail: string[] = [];
  let sisa = Math.round(totalBayar); // let: berubah tiap pembayaran
  let totalDibayar = 0;
  let totalBiaya = 0;

  // CONTOH while (selama tagihan belum lunas)
  while (sisa > 0) {
    console.log(`\nSisa tagihan: ${formatRupiah(sisa)}`);
    console.log("Metode pembayaran:");
    console.log("  1. Tunai");
    console.log("  2. QRIS (+Rp1.000)");
    console.log("  3. Kartu Debit (+Rp1.500)");

    const pilihMetode = await tanya("Pilih metode (1/2/3): ");
    let kode: MetodeBayar;
    switch (pilihMetode) {
      case "2":
        kode = "qris";
        break;
      case "3":
        kode = "debit";
        break;
      case "1":
        kode = "tunai";
        break;
      default:
        console.log("Pilihan tidak valid, gunakan Tunai.");
        kode = "tunai";
    }

    const biaya = biayaMetode(kode);
    const totalLewat = sisa + biaya;
    console.log(`Tagihan ${formatRupiah(sisa)} + biaya ${formatRupiah(biaya)} = ${formatRupiah(totalLewat)}`);

    const nominal = bacaAngka(await tanya("Nominal bayar : "));
    if (nominal <= 0) {
      console.log("Nominal harus > 0.");
      continue; // minta nominal ulang
    }

    totalDibayar += nominal; // operator penugasan +=
    totalBiaya += biaya;
    detail.push(`${namaMetode(kode)}: ${formatRupiah(nominal)} (biaya ${formatRupiah(biaya)})`);

    const alokasi = nominal - biaya;
    if (alokasi >= sisa) {
      sisa = 0; // lunas
    } else {
      sisa -= alokasi; // masih ada sisa, bayar lagi
    }
  }

  // kembalian = uang masuk - (tagihan + total biaya layanan)
  const kembalian = totalDibayar - (Math.round(totalBayar) + totalBiaya);
  return { totalDibayar, kembalian, totalBiaya, detail };
}

// ============================================================
// CETAK STRUK
// ============================================================
function cetakStruk(
  noTransaksi: number,
  namaKasir: string,
  namaPembeli: string,
  isMember: boolean,
  keranjang: KeranjangItem[],
  totalBelanja: number,
  diskon: { persen: number; besaran: number; ket: string },
  pajak: number,
  totalBayar: number,
  pembayaran: { totalDibayar: number; kembalian: number; totalBiaya: number; detail: string[] }
): void {
  console.log("\n==================================================");
  console.log("                  STRUK KASIR");
  console.log("==================================================");
  console.log(`No. Transaksi : #${noTransaksi}`);
  console.log(`Kasir         : ${namaKasir}`);
  console.log(`Pembeli       : ${namaPembeli}`);
  console.log(`Status        : ${isMember ? "Member ✅" : "Reguler"}`);
  console.log("--------------------------------------------------");

  // CONTOH for...of untuk mencetak barang
  let no = 1;
  for (const k of keranjang) {
    console.log(`${no}. ${k.menu.nama} x${k.jumlah} = ${formatRupiah(k.subtotal)}`);
    no++;
  }

  console.log("--------------------------------------------------");
  console.log(`Total Belanja     : ${formatRupiah(totalBelanja)}`);
  if (diskon.besaran > 0) {
    console.log(`${diskon.ket} : -${formatRupiah(diskon.besaran)}`);
  } else {
    console.log(`Diskon            : ${diskon.ket}`);
  }
  const subtotalDiskon = totalBelanja - diskon.besaran;
  console.log(`Subtotal          : ${formatRupiah(subtotalDiskon)}`);
  if (pajak > 0) {
    console.log(`Pajak (PPN 10%)   : +${formatRupiah(pajak)}`);
  } else {
    console.log(`Pajak             : Gratis (Member)`);
  }
  console.log(`TOTAL BAYAR       : ${formatRupiah(totalBayar)}`);

  console.log("--------------------------------------------------");
  console.log("PEMBAYARAN:");
  for (const d of pembayaran.detail) {
    console.log(`  ${d}`);
  }
  if (pembayaran.totalBiaya > 0) {
    console.log(`Total Biaya Layanan : ${formatRupiah(pembayaran.totalBiaya)}`);
  }
  console.log(`Total Dibayar     : ${formatRupiah(pembayaran.totalDibayar)}`);
  if (pembayaran.kembalian >= 0) {
    console.log(`Kembalian         : ${formatRupiah(pembayaran.kembalian)}`);
  } else {
    console.log(`Kekurangan        : ${formatRupiah(Math.abs(pembayaran.kembalian))}`);
  }

  console.log("--------------------------------------------------");
  const poin = hitungPoin(totalBelanja, isMember);
  if (isMember) {
    console.log(`Poin Didapat      : ${poin} poin`);
  }
  console.log("==================================================");
  console.log("        JANGAN LUPA KEMBALI 👋");
  console.log("==================================================");
}

// ============================================================
// ALUR KASIR — TRANSAKSI PENJUALAN
// ============================================================
async function alurKasir(namaKasir: string): Promise<void> {
  let lanjut = true;

  // CONTOH while (luar) berisi while (dalam) => NESTED LOOP
  while (lanjut) {
    const noTransaksi = noTransaksiBerikut;
    noTransaksiBerikut++; // operator penugasan ++

    const keranjang: KeranjangItem[] = [];
    let totalBelanja = 0;

    console.log("\n");
    console.log(`==================== TRANSAKSI #${noTransaksi} ====================`);

    const namaPembeli = await tanya("\nNama Pembeli : ");
    const jawabMember = await tanya("Member? (y/n) : ");
    // perbandingan (===) menghasilkan boolean
    const isMember = jawabMember.toLowerCase() === "y";

    let belanjaSelesai = false;
    while (!belanjaSelesai) {
      tampilkanMenuProduk();
      const pilihan = await validasiPilihan();

      if (pilihan === 0) {
        belanjaSelesai = true;
        break; // CONTOH break
      }

      const produk = cariMenu(pilihan);
      if (produk === null) continue; // CONTOH continue (aman, jaga-jaga)

      const jumlah = await validasiJumlah(produk.stok);
      produk.stok -= jumlah; // stok berkurang (operator -=)

      const subtotal = produk.harga * jumlah; // operator aritmatika
      totalBelanja += subtotal; // operator +=

      // Jika produk sudah ada di keranjang, gabungkan jumlahnya
      const ada = keranjang.find((k) => k.menu.nomor === produk.nomor);
      if (ada !== undefined) {
        ada.jumlah += jumlah;
        ada.subtotal += subtotal;
      } else {
        keranjang.push({ menu: produk, jumlah, subtotal });
      }

      tampilkanKeranjang(keranjang);
      console.log(`Total Belanja: ${formatRupiah(totalBelanja)}`);

      const lanjutBelanja = await tanya("Tambah lagi? (y/n) : ");
      if (lanjutBelanja.toLowerCase() !== "y") {
        belanjaSelesai = true;
      }
    }

    if (keranjang.length === 0) {
      console.log("\nTidak ada barang dibeli. Transaksi dibatalkan.");
      noTransaksiBerikut--;
      continue; // langsung ke transaksi berikutnya
    }

    const diskon = hitungDiskon(totalBelanja);
    const pajak = hitungPajak(totalBelanja, isMember);
    const totalBayar = Math.round(totalBelanja - diskon.besaran + pajak);

    tampilkanKeranjang(keranjang);
    console.log(`\nTotal Belanja : ${formatRupiah(totalBelanja)}`);
    if (diskon.besaran > 0) {
      console.log(`Diskon (${Math.round(diskon.persen * 100)}%)   : -${formatRupiah(diskon.besaran)}`);
    }
    if (pajak > 0) {
      console.log(`Pajak (PPN 10%) : +${formatRupiah(pajak)}`);
    } else {
      console.log(`Pajak          : Gratis (Member)`);
    }
    console.log(`TOTAL BAYAR    : ${formatRupiah(totalBayar)}`);

    const pembayaran = await prosesPembayaran(totalBayar);
    cetakStruk(noTransaksi, namaKasir, namaPembeli, isMember, keranjang, totalBelanja, diskon, pajak, totalBayar, pembayaran);

    // Simpan ke riwayat: salin nama/harga barang saat itu (snapshot)
    riwayat.push({
      no: noTransaksi,
      pembeli: namaPembeli,
      isMember,
      totalBelanja,
      diskon: diskon.besaran,
      pajak,
      totalBayar,
      baris: keranjang.map((k) => ({
        nama: k.menu.nama,
        jumlah: k.jumlah,
        subtotal: k.subtotal,
      })),
    });

    const ulangi = await tanya("\nTransaksi baru? (y/n) : ");
    if (ulangi.toLowerCase() !== "y") {
      lanjut = false;
    }
  }
}

// ============================================================
// STATISTIK & LAPORAN TRANSAKSI
// ============================================================
async function tampilkanStatistik(): Promise<void> {
  console.log("\n==================================================");
  console.log("       STATISTIK & LAPORAN TRANSAKSI");
  console.log("==================================================");

  if (riwayat.length === 0) {
    console.log("Belum ada transaksi. Silakan buka menu Kasir dulu.");
    await tanya("\nTekan Enter untuk kembali ke menu utama...");
    return;
  }

  // ---- RINGKASAN ----
  let totalPendapatan = 0;
  let totalItem = 0;
  let totalDiskon = 0;
  let totalPajak = 0;
  let totalPoin = 0;

  // CONTOH NESTED LOOP: luar = transaksi, dalam = barang per transaksi
  for (const t of riwayat) {
    totalPendapatan += t.totalBayar;
    totalDiskon += t.diskon;
    totalPajak += t.pajak;
    totalPoin += hitungPoin(t.totalBelanja, t.isMember);
    for (const b of t.baris) {
      totalItem += b.jumlah;
    }
  }

  // CONTOH TERNARY untuk menjaga pembagian dengan nol
  const rataRata = riwayat.length > 0 ? Math.round(totalPendapatan / riwayat.length) : 0;

  console.log("\n--- RINGKASAN PENJUALAN ---");
  console.log(`Total Transaksi        : ${riwayat.length}`);
  console.log(`Total Pendapatan       : ${formatRupiah(totalPendapatan)}`);
  console.log(`Rata-rata per Transaksi: ${formatRupiah(rataRata)}`);
  console.log(`Total Item Terjual     : ${totalItem}`);
  console.log(`Total Diskon Diberikan : ${formatRupiah(totalDiskon)}`);
  console.log(`Total Pajak (PPN 10%)  : ${formatRupiah(totalPajak)}`);
  console.log(`Total Poin Member      : ${totalPoin} poin`);

  // ---- RINCIAN PER TRANSAKSI ----
  // CONTOH PERULANGAN for (dengan indeks) + NESTED LOOP
  console.log("\n--- RINCIAN PER TRANSAKSI ---");
  for (let i = 0; i < riwayat.length; i++) {
    const t = riwayat[i];
    const status = t.isMember ? "Member" : "Reguler";
    console.log(`#${t.no} | ${t.pembeli.padEnd(14)} | ${status.padEnd(7)} | Total ${formatRupiah(t.totalBayar)}`);
    for (const b of t.baris) {
      console.log(`     - ${b.nama.padEnd(22)} x${b.jumlah} = ${formatRupiah(b.subtotal)}`);
    }
  }

  // ---- PENJUALAN PER PRODUK ----
  const penjualan: Record<string, { pcs: number; omset: number }> = {};
  for (const t of riwayat) {
    for (const b of t.baris) {
      // if untuk menginisialisasi data produk yang baru pertama muncul
      if (penjualan[b.nama] === undefined) {
        penjualan[b.nama] = { pcs: 0, omset: 0 };
      }
      penjualan[b.nama].pcs += b.jumlah;
      penjualan[b.nama].omset += b.subtotal;
    }
  }

  // CONTOH for...in (memutar kunci / properti sebuah object)
  console.log("\n--- PENJUALAN PER PRODUK ---");
  for (const nama in penjualan) {
    const info = penjualan[nama];
    console.log(`${nama.padEnd(24)} ${String(info.pcs).padStart(4)} pcs = ${formatRupiah(info.omset)}`);
  }

  // Produk terlaris: cari jumlah pcs terbesar
  let namaTerlaris = "";
  let pcsTerlaris = 0;
  for (const nama in penjualan) {
    if (penjualan[nama].pcs > pcsTerlaris) {
      namaTerlaris = nama;
      pcsTerlaris = penjualan[nama].pcs;
    }
  }
  console.log(`\n🏆 Produk terlaris : ${namaTerlaris} (${pcsTerlaris} pcs)`);

  console.log("\n--- STATUS STOK TERAKHIR ---");
  tampilkanStok();

  await tanya("\nTekan Enter untuk kembali ke menu utama...");
}

// ============================================================
// PROGRAM UTAMA — CONTOH do...while + switch
// ============================================================
async function main(): Promise<void> {
  tampilkanJudul();

  const namaKasir = await tanya("\nNama Kasir : ");
  console.log(`Selamat datang, ${namaKasir}!`);

  let lanjut = true;
  do {
    console.log("\n=============== MENU UTAMA ===============");
    console.log("  1. Kasir (Transaksi Penjualan)");
    console.log("  2. Kelola Produk (Tambah / Ubah Harga & Stok)");
    console.log("  3. Statistik & Laporan Transaksi");
    console.log("  0. Keluar Program");
    const pilihan = await tanya("Pilih menu : ");

    switch (pilihan) {
      case "1":
        await alurKasir(namaKasir);
        break;
      case "2":
        await kelolaProduk();
        break;
      case "3":
        await tampilkanStatistik();
        break;
      case "0":
        console.log("\nTerima kasih telah menggunakan aplikasi ini. 👋");
        lanjut = false;
        break;
      default:
        console.log("Pilihan tidak valid! Masukkan 0-3.");
    }
  } while (lanjut);

  rl.close();
}

main();
