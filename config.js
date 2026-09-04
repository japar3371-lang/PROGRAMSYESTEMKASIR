exports.APP_NAME = "Sistem Kasir Kantin Sekolah";
exports.APP_VERSION = "1.0.0";

exports.MENU_ITEMS = [
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

exports.DISKON_TIAP = [
  { min: 200000, persen: 0.20, ket: "Diskon 20% (belanja >= Rp200.000)" },
  { min: 150000, persen: 0.15, ket: "Diskon 15% (belanja >= Rp150.000)" },
  { min: 50000,  persen: 0.10, ket: "Diskon 10% (belanja >= Rp50.000)" },
];

exports.PAJAK_NORMA = 0.10;
exports.PEMBELAAN_DISKON = 0;

exports.METODE_BAYAR = {
  tunai: { nama: "Tunai",       biaya: 0 },
  qris:  { nama: "QRIS",        biaya: 1000 },
  debit: { nama: "Kartu Debit", biaya: 1500 },
};

exports.PASSWORD_PENJUAL = "admin123";
exports.STOK_HAMPIR_HABIS = 5;
exports.STOK_HABIS = 0;

exports.PERINGATAN_POIN = 10000;