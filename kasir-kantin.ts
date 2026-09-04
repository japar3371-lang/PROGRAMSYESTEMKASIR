// ============================================================
// SISTEM KASIR KANTIN SEKOLAH — 10 MENU
// TypeScript · Terminal Interactive
// Konsep: let/const, tipe data, operator, if/else/switch,
//         for/while/do...while, for...of/for...in,
//         break, continue, nested loop, fungsi, array
// ============================================================

import * as readline from "node:readline";

// ============================================================
// INTERFACE & TYPE
// ============================================================
interface MenuItem {
  nomor: number;
  nama: string;
  harga: number;
  stok: number;
}

interface KeranjangItem {
  menu: MenuItem;
  jumlah: number;
  subtotal: number;
}

interface RiwayatTransaksi {
  pembeli: string;
  totalBayar: number;
  item: number;
}

// ============================================================
// INPUT HANDLER
// ============================================================
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function tanya(pertanyaan: string): Promise<string> {
  return new Promise((resolve) => {
    process.stdout.write(pertanyaan);
    rl.once("line", (jawaban) => resolve(jawaban.trim()));
  });
}

function bacaAngka(input: string): number {
  const bersih = input.replace(/[^0-9]/g, "");
  return Number(bersih) || 0;
}

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
// DATA MENU — 10 ITEM KANTIN SEKOLAH
// ============================================================
const menu: MenuItem[] = [
  { nomor: 1, nama: "Nasi Goreng Spesial",  harga: 18000, stok: 20 },
  { nomor: 2, nama: "Mie Goreng Jawa",      harga: 15000, stok: 25 },
  { nomor: 3, nama: "Ayam Geprek",          harga: 18000, stok: 15 },
  { nomor: 4, nama: "Sate Ayam (5 tusuk)",  harga: 16000, stok: 12 },
  { nomor: 5, nama: "Es Teh Manis",         harga: 5000,  stok: 40 },
  { nomor: 6, nama: "Es Jeruk Peras",       harga: 8000,  stok: 30 },
  { nomor: 7, nama: "Susu Coklat",          harga: 9000,  stok: 22 },
  { nomor: 8, nama: "Roti Bakar Coklat",    harga: 8000,  stok: 18 },
  { nomor: 9, nama: "Kerupuk",              harga: 2000,  stok: 50 },
  { nomor: 10, nama: "Pisang Goreng (3pcs)", harga: 6000,  stok: 35 },
];

// ============================================================
// FUNGSI TAMPIL
// ============================================================
function tampilkanJudul(): void {
  console.log("");
  console.log("==================================================");
  console.log("        🍽️  SISTEM KASIR KANTIN SEKOLAH");
  console.log("==================================================");
}

function tampilkanMenuUtama(): void {
  console.log("");
  console.log("--- DAFTAR MENU ---");
  for (const m of menu) {
    const stokRendah = m.stok <= 5 ? " [HAMPIR HABIS]" : "";
    const stokHabisk = m.stok === 0 ? " [HABIS]" : "";
    console.log(
      `${m.nomor}. ${m.nama.padEnd(22)} ${formatRupiah(m.harga).padEnd(11)} Stok:${String(m.stok).padEnd(3)}${stokRendah}${stokHabisk}`
    );
  }
  console.log("");
}

// ============================================================
// FUNGSI CARI & VALIDASI
// ============================================================
function cariMenu(nomor: number): MenuItem | null {
  for (const m of menu) {
    if (m.nomor === nomor) return m;
  }
  return null;
}

function validasiPilihan(): Promise<number> {
  return new Promise(async (resolve) => {
    while (true) {
      const input = await tanya("Pilih menu (1-10) [0=Selesai, 99=Stok]: ");
      const pilih = bacaAngka(input);

      if (pilih === 99) {
        tampilkanStok();
        continue;
      }

      if (pilih === 0) {
        resolve(0);
        return;
      }

      const found = cariMenu(pilih);
      if (found !== null) {
        resolve(pilih);
        return;
      }

      console.log("Pilihan tidak valid! Silakan pilih 1-10, 0=selesai, 99=stok.");
    }
  });
}

function validasiJumlah(stokTersedia: number): Promise<number> {
  return new Promise(async (resolve) => {
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

      resolve(jumlah);
      return;
    }
  });
}

// ============================================================
// FUNGSI STOK
// ============================================================
function tampilkanStok(): void {
  console.log("");
  console.log("--- STATUS STOK ---");
  for (const m of menu) {
    let penanda: string;
    if (m.stok === 0) {
      penanda = "[HABIS]";
    } else if (m.stok <= 5) {
      penanda = "[HAMPIR HABIS]";
    } else {
      penanda = "[OK]";
    }
    console.log(`${m.nomor}. ${m.nama.padEnd(22)} Stok: ${m.stok} ${penanda}`);
  }
  console.log("");
}

// ============================================================
// FUNGSI PERHITUNGAN
// ============================================================
function hitungDiskon(total: number): { persen: number; besaran: number; ket: string } {
  let persen = 0;
  let ket = "Tidak ada diskon";

  if (total >= 100000) {
    if (total >= 200000) {
      persen = 0.2;
      ket = "Diskon 20% (belanja >= Rp200.000)";
    } else {
      persen = 0.15;
      ket = "Diskon 15% (belanja >= Rp150.000)";
    }
  } else if (total >= 50000) {
    persen = 0.1;
    ket = "Diskon 10% (belanja >= Rp50.000)";
  }

  const besaran = Math.round(total * persen);
  return { persen, besaran, ket };
}

function hitungPajak(total: number, isMember: boolean): number {
  // Member bebas pajak
  const pajak = isMember ? 0 : total * 0.1;
  return Math.round(pajak);
}

function hitungPoin(totalBelanja: number, isMember: boolean): number {
  if (!isMember) return 0;
  return Math.floor(totalBelanja / 10000);
}

// ============================================================
// FUNGSI TAMPIL KERANJANG
// ============================================================
function tampilkanKeranjang(keranjang: KeranjangItem[]): void {
  console.log("");
  console.log("------------- KERANJANG -------------");
  if (keranjang.length === 0) {
    console.log("(keranjang kosong)");
    console.log("-------------------------------------");
    return;
  }

  let i = 1;
  for (const k of keranjang) {
    console.log(`${i}. ${k.menu.nama.padEnd(20)} x${k.jumlah} = ${formatRupiah(k.subtotal)}`);
    i++;
  }
  console.log("-------------------------------------");
}

// ============================================================
// FUNGSI PEMBAYARAN
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

async function prosesPembayaran(totalBayar: number): Promise<{ totalDibayar: number; kembalian: number; detail: string[] }> {
  const detail: string[] = [];
  let sisa = Math.round(totalBayar);
  let totalDibayar = 0;

  while (sisa > 0) {
    console.log(`\nSisa tagihan: ${formatRupiah(sisa)}`);
    console.log("Metode pembayaran:");
    console.log("  1. Tunai");
    console.log("  2. QRIS (+Rp1.000)");
    console.log("  3. Kartu Debit (+Rp1.500)");

    const pilihMetode = await tanya("Pilih metode (1/2/3): ");
    let kode: MetodeBayar = "tunai";
    if (pilihMetode === "2") kode = "qris";
    else if (pilihMetode === "3") kode = "debit";
    else if (pilihMetode !== "1") {
      console.log("Pilihan tidak valid, gunakan Tunai.");
      continue;
    }

    const biaya = biayaMetode(kode);
    const totalLewat = sisa + biaya;
    console.log(`Tagihan ${formatRupiah(sisa)} + biaya ${formatRupiah(biaya)} = ${formatRupiah(totalLewat)}`);

    const inputNom = await tanya("Nominal bayar : ");
    const nominal = bacaAngka(inputNom);

    if (nominal <= 0) {
      console.log("Nominal harus > 0.");
      continue;
    }

    const alokasi = nominal - biaya;
    if (alokasi >= sisa) {
      totalDibayar += nominal;
      detail.push(`${namaMetode(kode)}: ${formatRupiah(nominal)} (biaya ${formatRupiah(biaya)})`);
      sisa = 0;
    } else {
      totalDibayar += nominal;
      detail.push(`${namaMetode(kode)}: ${formatRupiah(nominal)} (biaya ${formatRupiah(biaya)})`);
      sisa = sisa - alokasi;
    }
  }

  const kembalian = totalDibayar - Math.round(totalBayar);
  return { totalDibayar, kembalian, detail };
}

// ============================================================
// FUNGSI CETAK STRUK
// ============================================================
function cetakStruk(
  namaKasir: string,
  namaPembeli: string,
  isMember: boolean,
  keranjang: KeranjangItem[],
  totalBelanja: number,
  diskon: { persen: number; besaran: number; ket: string },
  pajak: number,
  totalBayar: number,
  pembayaran: { totalDibayar: number; kembalian: number; detail: string[] }
): void {
  const totalKawal = Math.round(totalBayar + pembayaran.kembalian);

  console.log("\n==================================================");
  console.log("                  STRUK KASIR");
  console.log("==================================================");
  console.log(`Kasir     : ${namaKasir}`);
  console.log(`Pembeli   : ${namaPembeli}`);
  console.log(`Status    : ${isMember ? "Member ✅" : "Reguler"}`);
  console.log("--------------------------------------------------");

  let no = 1;
  for (const k of keranjang) {
    console.log(`${no}. ${k.menu.nama} x${k.jumlah} = ${formatRupiah(k.subtotal)}`);
    no++;
  }

  console.log("--------------------------------------------------");
  console.log(`Total Belanja    : ${formatRupiah(totalBelanja)}`);
  if (diskon.besaran > 0) {
    console.log(`${diskon.ket}      : -${formatRupiah(diskon.besaran)}`);
  } else {
    console.log(`Diskon           : ${diskon.ket}`);
  }
  const subtotalDiskon = totalBelanja - diskon.besaran;
  console.log(`Subtotal         : ${formatRupiah(subtotalDiskon)}`);

  if (pajak > 0) {
    console.log(`Pajak (PPN 10%)  : +${formatRupiah(pajak)}`);
  } else {
    console.log(`Pajak            : Gratis (Member)`);
  }
  console.log(`TOTAL BAYAR      : ${formatRupiah(totalBayar)}`);

  console.log("--------------------------------------------------");
  console.log("PEMBAYARAN:");
  for (const d of pembayaran.detail) {
    console.log(`  ${d}`);
  }
  console.log(`Total Dibayar    : ${formatRupiah(pembayaran.totalDibayar)}`);

  if (pembayaran.kembalian >= 0) {
    console.log(`Kembalian        : ${formatRupiah(pembayaran.kembalian)}`);
  } else {
    console.log(`Kekurangan       : ${formatRupiah(Math.abs(pembayaran.kembalian))}`);
  }

  console.log("--------------------------------------------------");
  const poin = hitungPoin(totalBelanja, isMember);
  if (isMember) {
    console.log(`Poin Didapat     : ${poin} poin`);
  }
  console.log("==================================================");
  console.log("        JANGAN LUPA KEMBALI 👋");
  console.log("==================================================");
}

// ============================================================
// PROGRAM UTAMA
// ============================================================
async function main(): Promise<void> {
  const historyTransaksi: RiwayatTransaksi[] = [];
  let totalPoinMember = 0;

  tampilkanJudul();

  const namaKasir = await tanya("\nNama Kasir : ");
  console.log(`Selamat datang, ${namaKasir}!`);

  let lanjut = true;
  let noTransaksi = 0;

  while (lanjut) {
    noTransaksi++;
    const keranjang: KeranjangItem[] = [];
    let totalBelanja = 0;

    console.log("\n");
    console.log(`==================== TRANSAKSI #${noTransaksi} ====================`);

    const namaPembeli = await tanya("\nNama Pembeli : ");
    const jawabMember = await tanya("Member? (y/n) : ");
    const isMember = jawabMember.toLowerCase() === "y" ? true : false;

    let belanjaSelesai = false;

    while (!belanjaSelesai) {
      tampilkanMenuUtama();
      const pilihan = await validasiPilihan();

      if (pilihan === 0) {
        belanjaSelesai = true;
        break;
      }

      const selectedMenu = cariMenu(pilihan)!;
      const jumlah = await validasiJumlah(selectedMenu.stok);

      selectedMenu.stok -= jumlah;

      const subtotal = selectedMenu.harga * jumlah;
      totalBelanja += subtotal;

      const existing = keranjang.find((k) => k.menu.nomor === selectedMenu.nomor);
      if (existing) {
        existing.jumlah += jumlah;
        existing.subtotal += subtotal;
      } else {
        keranjang.push({ menu: selectedMenu, jumlah, subtotal });
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
      noTransaksi--;
      continue;
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
      console.log(`Pajak (PPN 10%): +${formatRupiah(pajak)}`);
    } else {
      console.log(`Pajak         : Gratis (Member)`);
    }
    console.log(`TOTAL BAYAR   : ${formatRupiah(totalBayar)}`);

    const pembayaran = await prosesPembayaran(totalBayar);
    cetakStruk(namaKasir, namaPembeli, isMember, keranjang, totalBelanja, diskon, pajak, totalBayar, pembayaran);

    totalPoinMember += hitungPoin(totalBelanja, isMember);

    historyTransaksi.push({
      pembeli: namaPembeli,
      totalBayar: totalBayar,
      item: keranjang.reduce((sum, k) => sum + k.jumlah, 0),
    });

    const ulangi = await tanya("\nTransaksi baru? (y/n) : ");
    if (ulangi.toLowerCase() !== "y") {
      lanjut = false;
    }
  }

  // ============================================================
  // LAPORAN AKHIR
  // ============================================================
  console.log("\n");
  console.log("==================================================");
  console.log("               LAPORAN AKHIR");
  console.log("==================================================");
  console.log(`Kasir               : ${namaKasir}`);
  console.log(`Total Transaksi     : ${historyTransaksi.length}`);

  let totalPendapatan = 0;
  let totalItem = 0;
  for (const trx of historyTransaksi) {
    totalPendapatan += trx.totalBayar;
    totalItem += trx.item;
    console.log(`  - ${trx.pembeli.padEnd(15)} ${formatRupiah(trx.totalBayar).padEnd(12)} ${trx.item} item`);
  }

  console.log(`Total Pendapatan    : ${formatRupiah(totalPendapatan)}`);
  console.log(`Total Item Terjual  : ${totalItem}`);
  console.log(`Total Poin Member   : ${totalPoinMember} poin`);

  console.log("\n--- STATUS STOK TERAKHIR ---");
  tampilkanStok();

  console.log("\n Terima kasih! 👋");
  rl.close();
}

main();