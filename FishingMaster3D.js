import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// DATABASE IKAN (66 jenis)
const FISH_DB = [
    { id: 1, area: "lake", name: "Ikan Bandeng", rarity: "Common", basePrice: 15, speed: 1.4, emoji: "🐟", color: "#a0aec0", hint: "🏞️ Banyak berkeliaran di air tawar Danau Nuansa" },
    { id: 2, area: "lake", name: "Nila Mujair", rarity: "Common", basePrice: 18, speed: 1.5, emoji: "🐠", color: "#a0aec0", hint: "🏞️ Sering didapat di tepian Danau Nuansa" },
    { id: 3, area: "lake", name: "Mas Koki Danau", rarity: "Common", basePrice: 22, speed: 1.6, emoji: "🐡", color: "#a0aec0", hint: "🏞️ Berenang santai di air tenang Danau Nuansa" },
    { id: 4, area: "lake", name: "Lele Jawa", rarity: "Common", basePrice: 25, speed: 1.7, emoji: "🐟", color: "#a0aec0", hint: "🏞️ Bersembunyi di dasar lumpur Danau Nuansa" },
    { id: 5, area: "sea", name: "Kakap Merah", rarity: "Rare", basePrice: 50, speed: 2.1, emoji: "🐠", color: "#48bb78", hint: "🌊 Penghuni asli terumbu karang Laut Lepas" },
    { id: 6, area: "sea", name: "Salmon Emas", rarity: "Rare", basePrice: 65, speed: 2.3, emoji: "🐟", color: "#48bb78", hint: "🌊 Melompat liar melawan arus Laut Lepas" },
    { id: 7, area: "sea", name: "Kerapu Macan", rarity: "Rare", basePrice: 75, speed: 2.4, emoji: "🐡", color: "#48bb78", hint: "🌊 Bersembunyi di sela batuan karang Laut Lepas" },
    { id: 8, area: "sea", name: "Tuna Sirip Kuning", rarity: "Rare", basePrice: 85, speed: 2.6, emoji: "🐟", color: "#48bb78", hint: "🌊 Berenang sangat cepat di arus tengah Laut Lepas" },
    { id: 9, area: "nightsea", name: "Bawal Bintang Aura", rarity: "Epic", basePrice: 160, speed: 3.2, emoji: "✨🐟", color: "#9f7aea", hint: "🌙 Memancarkan cahaya redup di Selat Misteri" },
    { id: 10, area: "nightsea", name: "Belut Listrik Neon", rarity: "Epic", basePrice: 210, speed: 3.6, emoji: "⚡🐍", color: "#9f7aea", hint: "🌙 Suka menyengat di Selat Misteri waktu Malam" },
    { id: 11, area: "nightsea", name: "Gurita Kraken Purba", rarity: "Legendary", basePrice: 850, speed: 5.0, emoji: "🐙", color: "#ed8936", hint: "🌙 Menarik kapal karam di kegelapan Selat Misteri" },
    { id: 12, area: "nightsea", name: "Dewa Poseidon", rarity: "Mythic", basePrice: 2500, speed: 6.2, emoji: "🔱🧜‍♂️", color: "#e53e3e", hint: "🌙 Penguasa tertinggi Selat Misteri di kala Malam" },
    { id: 13, area: "icesea", name: "Arwana Super Red", rarity: "Epic", basePrice: 195, speed: 3.4, emoji: "🐉", color: "#9f7aea", hint: "❄️ Bermigrasi secara magis di bawah es Samudra Arktik" },
    { id: 14, area: "icesea", name: "Moby Dick Kid", rarity: "Legendary", basePrice: 720, speed: 4.7, emoji: "🐋", color: "#ed8936", hint: "❄️ Paus putih cilik di area Samudra Arktik" },
    { id: 15, area: "icesea", name: "Hiu Gergaji Mistis", rarity: "Legendary", basePrice: 920, speed: 5.2, emoji: "🐊", color: "#ed8936", hint: "❄️ Berpatroli di bawah es tebal Samudra Arktik" },
    { id: 16, area: "icesea", name: "Ikan Dewa Giok", rarity: "Mythic", basePrice: 4000, speed: 7.2, emoji: "✨👑", color: "#e53e3e", hint: "❄️ Legenda magis tersembunyi di Samudra Arktik" },
    { id: 17, area: "volcano", name: "Ikan Pari Totol Blue", rarity: "Epic", basePrice: 230, speed: 3.8, emoji: "🛸", color: "#9f7aea", hint: "🌋 Berenang di atas endapan sulfur Palung Krakatau" },
    { id: 18, area: "volcano", name: "Marlin Biru Jahanam", rarity: "Legendary", basePrice: 560, speed: 4.5, emoji: "🦈", color: "#ed8936", hint: "🌋 Menembus magma panas di Palung Krakatau saat Hujan" },
    { id: 19, area: "volcano", name: "Naga Leviathan Abyss", rarity: "Mythic", basePrice: 2900, speed: 6.5, emoji: "🐉🌊", color: "#e53e3e", hint: "🌋 Bangkit dari kegelapan kawah Palung Krakatau" },
    { id: 20, area: "volcano", name: "Megalodon Purba", rarity: "Mythic", basePrice: 3300, speed: 6.8, emoji: "🦈🔥", color: "#e53e3e", hint: "🌋 Predator terganas di Palung Krakatau saat Hujan" },
    { id: 21, area: "lake", name: "Gabus Tasik", rarity: "Common", basePrice: 20, speed: 1.5, emoji: "🐟", color: "#a0aec0", hint: "🏞️ Predator ganas di rawa-rawa Danau Nuansa" },
    { id: 22, area: "sea", name: "Teri Pelangi", rarity: "Common", basePrice: 12, speed: 1.8, emoji: "🐟", color: "#a0aec0", hint: "🌊 Berenang dalam kelompok besar di Laut Lepas" },
    { id: 23, area: "lake", name: "Betta Biota", rarity: "Common", basePrice: 28, speed: 1.4, emoji: "🐠", color: "#a0aec0", hint: "🏞️ Ikan cupang liar di perairan tenang Danau Nuansa" },
    { id: 24, area: "sea", name: "Baronang Laga", rarity: "Rare", basePrice: 55, speed: 2.2, emoji: "🐟", color: "#48bb78", hint: "🌊 Menyukai terumbu karang di Laut Lepas" },
    { id: 25, area: "icesea", name: "Salmon Salju", rarity: "Rare", basePrice: 70, speed: 2.4, emoji: "🐟", color: "#48bb78", hint: "❄️ Bermigrasi di perairan dingin Samudra Arktik" },
    { id: 26, area: "nightsea", name: "Layaran Malam", rarity: "Rare", basePrice: 60, speed: 2.5, emoji: "🐟", color: "#48bb78", hint: "🌙 Berenang cepat di permukaan Selat Misteri" },
    { id: 27, area: "volcano", name: "Lumba-lumba Api", rarity: "Epic", basePrice: 250, speed: 3.6, emoji: "🐬", color: "#9f7aea", hint: "🌋 Melompat di atas magma Palung Krakatau" },
    { id: 28, area: "icesea", name: "Paus Beluga Kristal", rarity: "Epic", basePrice: 220, speed: 3.3, emoji: "🐋", color: "#9f7aea", hint: "❄️ Suaranya memecah es di Samudra Arktik" },
    { id: 29, area: "nightsea", name: "Hiu Martil Siluman", rarity: "Epic", basePrice: 240, speed: 3.7, emoji: "🦈", color: "#9f7aea", hint: "🌙 Memburu mangsa dalam kegelapan Selat Misteri" },
    { id: 30, area: "volcano", name: "Kraken Magma", rarity: "Legendary", basePrice: 950, speed: 5.2, emoji: "🐙🔥", color: "#ed8936", hint: "🌋 Bangkit dari kedalaman lahar Palung Krakatau" },
    { id: 31, area: "nightsea", name: "Putri Duyung Siren", rarity: "Legendary", basePrice: 880, speed: 4.9, emoji: "🧜‍♀️✨", color: "#ed8936", hint: "🌙 Nyanyiannya memikat nelayan di Selat Misteri" },
    { id: 32, area: "icesea", name: "Wyvern Es", rarity: "Legendary", basePrice: 1050, speed: 5.5, emoji: "🐉❄️", color: "#ed8936", hint: "❄️ Naga kecil penjaga harta karun Samudra Arktik" },
    { id: 33, area: "volcano", name: "Phoenix Laut", rarity: "Mythic", basePrice: 4200, speed: 7.5, emoji: "🐦‍🔥🌊", color: "#e53e3e", hint: "🌋 Terlahir kembali dari abu vulkanik Palung Krakatau" },
    { id: 34, area: "nightsea", name: "Cthulhu Dormant", rarity: "Mythic", basePrice: 5000, speed: 6.8, emoji: "🐙👁️", color: "#e53e3e", hint: "🌙 Tidur di dasar palung terdalam Selat Misteri" },
    { id: 35, area: "icesea", name: "Jormungandr Muda", rarity: "Mythic", basePrice: 4500, speed: 7.0, emoji: "🐍🌊", color: "#e53e3e", hint: "❄️ Ular laut raksasa yang melingkari Samudra Arktik" },
    { id: 36, area: "lake", name: "Toman Bintang", rarity: "Epic", basePrice: 300, speed: 3.5, emoji: "🐟✨", color: "#9f7aea", hint: "🏞️ Predator puncak Danau Nuansa yang memiliki sisik bercahaya" },
    { id: 37, area: "lake", name: "Seluang Hijau", rarity: "Common", basePrice: 14, speed: 1.9, emoji: "🐟", color: "#a0aec0", hint: "🏞️ Berenang berombak di permukaan Danau Nuansa" },
    { id: 38, area: "lake", name: "Kryptopterus", rarity: "Rare", basePrice: 45, speed: 2.4, emoji: "🐟", color: "#48bb78", hint: "🏞️ Ikan kaca transparan yang sulit dilihat di Danau Nuansa" },
    { id: 39, area: "lake", name: "Sepat Raksasa", rarity: "Legendary", basePrice: 780, speed: 4.8, emoji: "🐡💨", color: "#ed8936", hint: "🏞️ Menghuni lubuk terdalam Danau Nuansa, jarang muncul" },
    { id: 40, area: "lake", name: "Arwana Silver", rarity: "Epic", basePrice: 280, speed: 3.6, emoji: "🐉", color: "#9f7aea", hint: "🏞️ Ikan purba yang melompat tinggi di Danau Nuansa" },
    { id: 41, area: "lake", name: "Belida Lampion", rarity: "Rare", basePrice: 68, speed: 2.5, emoji: "🐟🔦", color: "#48bb78", hint: "🏞️ Bersinar redup di malam hari di Danau Nuansa" },
    { id: 42, area: "sea", name: "Cakalang Hitam", rarity: "Rare", basePrice: 72, speed: 2.7, emoji: "🐟", color: "#48bb78", hint: "🌊 Berenang dalam kawanan besar di Laut Lepas" },
    { id: 43, area: "sea", name: "Tenggiri Batik", rarity: "Epic", basePrice: 190, speed: 3.3, emoji: "🐟🎨", color: "#9f7aea", hint: "🌊 Memiliki corak batik alami di tubuhnya" },
    { id: 44, area: "sea", name: "Lemuru Perak", rarity: "Common", basePrice: 18, speed: 1.8, emoji: "🐟", color: "#a0aec0", hint: "🌊 Ikan kecil yang menjadi mangsa para predator Laut Lepas" },
    { id: 45, area: "sea", name: "Hiu Karang Abu", rarity: "Legendary", basePrice: 690, speed: 4.6, emoji: "🦈", color: "#ed8936", hint: "🌊 Berpatroli di sekitar terumbu karang Laut Lepas" },
    { id: 46, area: "sea", name: "Pari Manta Raksasa", rarity: "Mythic", basePrice: 3200, speed: 6.0, emoji: "🛸🐟", color: "#e53e3e", hint: "🌊 Melayang anggun di arus dalam Laut Lepas" },
    { id: 47, area: "sea", name: "Baronang Emas", rarity: "Rare", basePrice: 58, speed: 2.3, emoji: "🐟🌟", color: "#48bb78", hint: "🌊 Menyukai daerah berbatu di Laut Lepas" },
    { id: 48, area: "nightsea", name: "Ikan Hantu Abyss", rarity: "Legendary", basePrice: 820, speed: 5.1, emoji: "👻🐟", color: "#ed8936", hint: "🌙 Hampir tidak terlihat di kegelapan Selat Misteri" },
    { id: 49, area: "nightsea", name: "Kuda Laut Gelap", rarity: "Common", basePrice: 30, speed: 1.5, emoji: "🐴🐟", color: "#a0aec0", hint: "🌙 Berenang lambat di antara rerumputan laut Selat Misteri" },
    { id: 50, area: "nightsea", name: "Gurita Bercahaya", rarity: "Epic", basePrice: 270, speed: 3.8, emoji: "🐙💡", color: "#9f7aea", hint: "🌙 Memancarkan cahaya biru saat terancam di Selat Misteri" },
    { id: 51, area: "nightsea", name: "Belut Ular Dua Kepala", rarity: "Mythic", basePrice: 4800, speed: 7.3, emoji: "🐍🐍", color: "#e53e3e", hint: "🌙 Legenda mengerikan yang dijumpai di palung Selat Misteri" },
    { id: 52, area: "nightsea", name: "Kakap Malam", rarity: "Rare", basePrice: 62, speed: 2.4, emoji: "🐠🌙", color: "#48bb78", hint: "🌙 Aktif berburu saat gelap di Selat Misteri" },
    { id: 53, area: "nightsea", name: "Naga Laut Asia", rarity: "Legendary", basePrice: 950, speed: 5.3, emoji: "🐉", color: "#ed8936", hint: "🌙 Ikan berjumbai yang meliuk-liuk di Selat Misteri" },
    { id: 54, area: "icesea", name: "Salmon Glacier", rarity: "Rare", basePrice: 85, speed: 2.6, emoji: "🐟❄️", color: "#48bb78", hint: "❄️ Bermigrasi melawan arus es di Samudra Arktik" },
    { id: 55, area: "icesea", name: "Hiu Greenland", rarity: "Legendary", basePrice: 740, speed: 3.9, emoji: "🦈🧊", color: "#ed8936", hint: "❄️ Berusia panjang, berenang lambat di Samudra Arktik" },
    { id: 56, area: "icesea", name: "Capelin Aurora", rarity: "Common", basePrice: 20, speed: 1.9, emoji: "🐟✨", color: "#a0aec0", hint: "❄️ Muncul bergelombang seperti cahaya aurora di Samudra Arktik" },
    { id: 57, area: "icesea", name: "Kod Atlantik", rarity: "Rare", basePrice: 55, speed: 2.2, emoji: "🐟", color: "#48bb78", hint: "❄️ Ikan komersial yang melimpah di Samudra Arktik" },
    { id: 58, area: "icesea", name: "Berkut Emas", rarity: "Mythic", basePrice: 5500, speed: 7.8, emoji: "🦅🐟", color: "#e53e3e", hint: "❄️ Ikan bersirip emas yang menjadi legenda Samudra Arktik" },
    { id: 59, area: "icesea", name: "Lumpfish Spiky", rarity: "Epic", basePrice: 210, speed: 3.0, emoji: "🎈🐟", color: "#9f7aea", hint: "❄️ Berduri dan membulat saat terancam di Samudra Arktik" },
    { id: 60, area: "volcano", name: "Ikan Batu Lava", rarity: "Epic", basePrice: 245, speed: 3.5, emoji: "🪨🐟", color: "#9f7aea", hint: "🌋 Menyamar sempurna di bebatuan hitam Palung Krakatau" },
    { id: 61, area: "volcano", name: "Cumi-Cumi Blaze", rarity: "Legendary", basePrice: 890, speed: 5.4, emoji: "🦑🔥", color: "#ed8936", hint: "🌋 Bertinta bercahaya merah di Palung Krakatau" },
    { id: 62, area: "volcano", name: "Nila Vulkanik", rarity: "Common", basePrice: 26, speed: 1.7, emoji: "🐠", color: "#a0aec0", hint: "🌋 Beradaptasi dengan air hangat sekitar Palung Krakatau" },
    { id: 63, area: "volcano", name: "Belut Magma", rarity: "Mythic", basePrice: 6200, speed: 8.0, emoji: "🐍🌋", color: "#e53e3e", hint: "🌋 Meliuk-liuk di celah-celah lava Palung Krakatau" },
    { id: 64, area: "volcano", name: "Ikan Gergaji Abyss", rarity: "Legendary", basePrice: 880, speed: 5.1, emoji: "🪚🐟", color: "#ed8936", hint: "🌋 Moncong bergerigi tajam di Palung Krakatau" },
    { id: 65, area: "volcano", name: "Keumamah Hitam", rarity: "Rare", basePrice: 78, speed: 2.7, emoji: "🐟⚫", color: "#48bb78", hint: "🌋 Ikan tuna kecil yang gesit di Palung Krakatau" },
    { id: 66, area: "lake", name: "Sacred Qurban Leviathan", rarity: "Mythic", basePrice: 15000, speed: 9.5, emoji: "🐮✨", color: "#f59e0b", hint: "🕌 Muncul setahun sekali di Danau Nuansa pada tanggal 27 Mei. Simbol berkah Idul Adha!" },
    { id: 67, area: "nightsea", name: "Naga Tengah Malam", rarity: "Mythic", basePrice: 7500, speed: 8.5, emoji: "🐉🌙", color: "#c084fc", hint: "🌙 Hanya muncul tepat pukul 11 malam di Selat Misteri. Legenda yang sangat langka!" },
// Ikan Sapu-Sapu - muncul 50% di semua tempat, harga 1 koin
{ id: 68, area: "all", name: "Ikan Sapu-Sapu", rarity: "Common", basePrice: 1, speed: 0.8, emoji: "🧹🐟", color: "#a0aec0", hint: "🧹 Ikan pembersih dasar perairan, kemunculannya sangat sering!" },

// Ikan Tai - pilih salah satu area (contoh: lake)
{ id: 69, area: "lake", name: "Ikan Tai", rarity: "Common", basePrice: 8, speed: 1.2, emoji: "💩🐟", color: "#a0aec0", hint: "🏞️ Ikan kecil yang suka bersembunyi di sela-sela batu Danau Nuansa" },

// ========== 15 IKAN COMMON BARU ==========
{ id: 70, area: "lake", name: "Wader Banyu", rarity: "Common", basePrice: 12, speed: 1.3, emoji: "🐟", color: "#a0aec0", hint: "🏞️ Ikan kecil yang gesit di Danau Nuansa" },
{ id: 71, area: "lake", name: "Bilih Danau", rarity: "Common", basePrice: 14, speed: 1.4, emoji: "🐟", color: "#a0aec0", hint: "🏞️ Endemik perairan tawar Danau Nuansa" },
{ id: 72, area: "sea", name: "Kuro", rarity: "Common", basePrice: 16, speed: 1.6, emoji: "🐠", color: "#a0aec0", hint: "🌊 Ikan karang kecil di Laut Lepas" },
{ id: 73, area: "sea", name: "Lencam Pasir", rarity: "Common", basePrice: 18, speed: 1.5, emoji: "🐟", color: "#a0aec0", hint: "🌊 Bersembunyi di dasar berpasir Laut Lepas" },
{ id: 74, area: "sea", name: "Belanak Perak", rarity: "Common", basePrice: 15, speed: 1.7, emoji: "🐟", color: "#a0aec0", hint: "🌊 Suka melompat di permukaan Laut Lepas" },
{ id: 75, area: "nightsea", name: "Kumis-kumis Gelap", rarity: "Common", basePrice: 20, speed: 1.6, emoji: "🐟", color: "#a0aec0", hint: "🌙 Ikan nokturnal pemakan plankton di Selat Misteri" },
{ id: 76, area: "nightsea", name: "Sebelah Malam", rarity: "Common", basePrice: 22, speed: 1.5, emoji: "🐠", color: "#a0aec0", hint: "🌙 Tubuh pipih, aktif saat gelap di Selat Misteri" },
{ id: 77, area: "icesea", name: "Capelin Kutub", rarity: "Common", basePrice: 19, speed: 1.7, emoji: "🐟", color: "#a0aec0", hint: "❄️ Ikan kecil yang bermigrasi di Samudra Arktik" },
{ id: 78, area: "icesea", name: "Kod Es", rarity: "Common", basePrice: 24, speed: 1.5, emoji: "🐟", color: "#a0aec0", hint: "❄️ Tahan hidup di bawah suhu beku Samudra Arktik" },
{ id: 79, area: "icesea", name: "Sculpin Berduri", rarity: "Common", basePrice: 21, speed: 1.4, emoji: "🐡", color: "#a0aec0", hint: "❄️ Bersembunyi di sela-sela es Samudra Arktik" },
{ id: 80, area: "volcano", name: "Cobber Hitam", rarity: "Common", basePrice: 23, speed: 1.6, emoji: "🐟", color: "#a0aec0", hint: "🌋 Beradaptasi dengan air hangat Palung Krakatau" },
{ id: 81, area: "volcano", name: "Blenny Lava", rarity: "Common", basePrice: 20, speed: 1.5, emoji: "🐠", color: "#a0aec0", hint: "🌋 Pemakan ganggang di bebatuan vulkanik Palung Krakatau" },
{ id: 82, area: "volcano", name: "Damselfish Abu-abu", rarity: "Common", basePrice: 18, speed: 1.6, emoji: "🐟", color: "#a0aec0", hint: "🌋 Bertahan di perairan dengan pH rendah Palung Krakatau" },
{ id: 83, area: "lake", name: "Mujaer Hujan", rarity: "Common", basePrice: 17, speed: 1.5, emoji: "🐠", color: "#a0aec0", hint: "🏞️ Muncul setelah hujan di Danau Nuansa" },
{ id: 84, area: "lake", name: "Tawes Bodi", rarity: "Common", basePrice: 16, speed: 1.5, emoji: "🐟", color: "#a0aec0", hint: "🏞️ Ikan herbivora yang jinak di Danau Nuansa" },

// ========== 7 IKAN EPIC BARU ==========
{ id: 85, area: "lake", name: "Arwana Hijau Palas", rarity: "Epic", basePrice: 320, speed: 3.8, emoji: "🐉💚", color: "#9f7aea", hint: "🏞️ Iwan purba dengan sisik hijau metalik di Danau Nuansa" },
{ id: 86, area: "sea", name: "Napoleon Wrasse", rarity: "Epic", basePrice: 350, speed: 3.6, emoji: "🐟👑", color: "#9f7aea", hint: "🌊 Ikan khas Kepala bongkok di terumbu Laut Lepas" },
{ id: 87, area: "nightsea", name: "Hiu Koboi Malam", rarity: "Epic", basePrice: 340, speed: 3.9, emoji: "🦈🌙", color: "#9f7aea", hint: "🌙 Berburu berkelompok di Selat Misteri" },
{ id: 88, area: "icesea", name: "Sturgeon Es", rarity: "Epic", basePrice: 370, speed: 3.5, emoji: "🐟❄️", color: "#9f7aea", hint: "❄️ Ikan purba berusia panjang di Samudra Arktik" },
{ id: 89, area: "volcano", name: "Triggerfish Lahar", rarity: "Epic", basePrice: 360, speed: 3.7, emoji: "🐡🔥", color: "#9f7aea", hint: "🌋 Giginya kuat seperti batu vulkanik Palung Krakatau" },
{ id: 90, area: "lake", name: "Channa Maru", rarity: "Epic", basePrice: 330, speed: 3.7, emoji: "🐍🐟", color: "#9f7aea", hint: "🏞️ Ikan gabus dengan motif batik di Danau Nuansa" },
{ id: 91, area: "sea", name: "Tarpon Atlantik", rarity: "Epic", basePrice: 380, speed: 4.0, emoji: "🐟💨", color: "#9f7aea", hint: "🌊 Melompat liar saat terkena kail di Laut Lepas" },

// ========== 2 IKAN MYTHIC BARU ==========
{ id: 92, area: "nightsea", name: "Siren Abyss Caller", rarity: "Mythic", basePrice: 4800, speed: 7.8, emoji: "🧜‍♀️🌀", color: "#e53e3e", hint: "🌙 Nyanyiannya dapat memanggil badai di Selat Misteri" },
{ id: 93, area: "icesea", name: "Frost Leviathan", rarity: "Mythic", basePrice: 5200, speed: 8.2, emoji: "🐉❄️👑", color: "#e53e3e", hint: "❄️ Raja kegelapan abadi di Samudra Arktik, muncul saat badai salju" },
// Ikan Bowo - di Danau Nuansa
{ id: 94, area: "lake", name: "Ikan Bowo", rarity: "Legendary", basePrice: 2500, speed: 5.5, emoji: "🐼🐟", color: "#f97316", hint: "🏞️ Ikan langka dengan wajah lucu seperti panda, hanya muncul di Danau Nuansa saat cuaca cerah!" },
// Ikan Tikus Berdasi - spesial (MENGURANGI KOIN)
{ id: 95, area: "all", name: "Tikus Berdasi", rarity: "Common", basePrice: 20, speed: 1.2, emoji: "🇮🇩👔🐀", color: "#a0aec0", hint: "🇮🇩 Tikus kecil berdasi merah putih, jika ditangkap dompet Anda ikut terkuras! 🐀💸" },
];

const AREAS = {
    lake: { name: "Danau Nuansa", waterColor: 0x1d4ed8, bgFog: 0xbfdbfe, mult: 0.9 },
    sea: { name: "Laut Lepas", waterColor: 0x0369a1, bgFog: 0xbae6fd, mult: 1.1 },
    nightsea: { name: "Selat Misteri", waterColor: 0x0f172a, bgFog: 0x1e1b4b, mult: 1.4 },
    icesea: { name: "Samudra Arktik", waterColor: 0x06b6d4, bgFog: 0xecfeff, mult: 1.3 },
    volcano: { name: "Palung Krakatau", waterColor: 0x7f1d1d, bgFog: 0x450a0a, mult: 1.8 }
};

const AREA_UNLOCK_COST = {
    lake: 0,
    sea: 5000,
    nightsea: 15000,
    icesea: 35000,
    volcano: 75000
};

let player = { coins: 500, level: 1, exp: 0, rodLevel: 0, lineLevel: 0, baitLevel: 0 };
let hasGoldSkin = false;
let hasDiamondSkin = false;
let inventory = [];
let aquarium = [];
let fishCaughtStreak = 0;
let totalCatches = 0;
let chestRewardCount = 0;
let dailyMissionProgress = 0;
let dailyMissionClaimed = false;
let collectedRarities = new Set();
let currentArea = "lake";
let unlockedAreas = {
    lake: true,
    sea: false,
    nightsea: false,
    icesea: false,
    volcano: false
};
let currentWeather = "☀️ Cerah";
let fishAlbumStats = {};
let feedStock = 0;
let baitStock = 10;
let acidRainActive = false;
let acidRainEndTime = 0;
let acidRainTimeout = null;
let activePellets = [];
let isFishing = false;
let currentFish = null;
let pointerProgress = 0;
let pointerDirection = 1;
let engineInterval = null;

// Ramuan Anti Sapu-Sapu
let antiSapuEffect = false;
let antiSapuTimer = null;
let antiSapuRemaining = 0;

let zoneLeft = 35;
let zoneWidth = 30;
let isAquariumDimension = false;

let networkSpeedMode = "normal";
let fishMovementSpeed = 1.0;

let weatherInterval = null;
let acidRainCheckInterval = null;
let aquariumRefreshInterval = null;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const labelRenderer = new CSS2DRenderer();
let waterMesh, boatGroup, lineMesh, bobberObject;
let visualFishes = [];

function showToast(msg, isError = false) {
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.style.background = isError ? '#e53e3e' : '#38a169';
    toast.style.color = '#fff';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

function init3DWorld() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(labelRenderer.domElement);

    resetCameraForDimension();

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const sunLight = new THREE.DirectionalLight(0xfffbeb, 1.0);
    sunLight.position.set(5, 15, 5);
    scene.add(sunLight);

    const waterGeo = new THREE.PlaneGeometry(30, 30, 16, 16);
    const waterMat = new THREE.MeshStandardMaterial({
        color: AREAS[currentArea].waterColor,
        roughness: 0.2,
        metalness: 0.5,
        flatShading: true
    });
    waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = -0.5;
    scene.add(waterMesh);

    boatGroup = new THREE.Group();
    const hullGeo = new THREE.ConeGeometry(1, 2.5, 4);
    const hullMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12 });
    const hull = new THREE.Mesh(hullGeo, hullMat);
    hull.rotation.x = Math.PI / 2;
    hull.scale.set(1.2, 1, 0.5);
    boatGroup.add(hull);

    const bodyGeo = new THREE.CylinderGeometry(0.2, 0.25, 0.8);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, 0.5, 0.2);
    boatGroup.add(body);

    boatGroup.position.set(0, -0.2, 2.5);
    scene.add(boatGroup);

    const bobberDiv = document.createElement('div');
    bobberDiv.textContent = '🔴';
    bobberDiv.style.fontSize = '20px';
    bobberObject = new CSS2DObject(bobberDiv);
    bobberObject.position.set(0, -0.4, -2);
    scene.add(bobberObject);

    const linePoints = [new THREE.Vector3(0, 0.8, 2.7), new THREE.Vector3(0, -0.4, -2)];
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
    lineMesh = new THREE.Line(lineGeo, lineMat);
    scene.add(lineMesh);

    refresh3DVisualFishes();
    animateEngine();
}

function resetCameraForDimension() {
    if (!isAquariumDimension) {
        camera.position.set(0, 6, 11);
        camera.lookAt(0, 0, -1);
        if (boatGroup) boatGroup.visible = true;
        if (bobberObject) bobberObject.visible = true;
        if (lineMesh) lineMesh.visible = true;
    } else {
        camera.position.set(0, -1.8, 6);
        camera.lookAt(0, -1.8, -5);
        if (boatGroup) boatGroup.visible = false;
        if (bobberObject) bobberObject.visible = false;
        if (lineMesh) lineMesh.visible = false;
    }
}

function refresh3DVisualFishes() {
    visualFishes.forEach(f => {
        if (f.mesh) scene.remove(f.mesh);
        if (f.obj) scene.remove(f.obj);
    });
    visualFishes = [];

// Di dalam refresh3DVisualFishes(), sebelum menentukan localPool
const today = new Date();
const isMay27 = (today.getMonth() === 4 && today.getDate() === 27);

let localPool = FISH_DB.filter(f => f.area === currentArea);
if (!isMay27) localPool = localPool.filter(f => f.id !== 66);

// TAMBAHKAN INI
const currentHourWIB = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })).getHours();
if (currentHourWIB !== 23) {
    localPool = localPool.filter(f => f.id !== 67); // Sembunyikan Naga Tengah Malam dari tampilan 3D
}

    if (!isAquariumDimension) {
        
        
        for (let i = 0; i < 7; i++) {
            let template = localPool[Math.floor(Math.random() * localPool.length)] || FISH_DB[0];
            create3DFishNode(template.emoji);
        }
    } else {
        if (aquarium.length === 0) return;
        const shuffled = [...aquarium];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const fishToShow = shuffled.slice(0, 15);
        fishToShow.forEach(item => {
            const sizeLevel = item.sizeLevel || 0;
            const fontSize = 24 + (sizeLevel * 4);
            let fDiv = document.createElement('div');
            fDiv.textContent = item.fish.emoji;
            fDiv.style.fontSize = fontSize + 'px';
            fDiv.style.filter = 'drop-shadow(0 2px 8px rgba(255,255,255,0.3))';
            let fObj = new CSS2DObject(fDiv);
            fObj.position.set((Math.random() - 0.5) * 12, -0.5 - (Math.random() * 3.2), (Math.random() - 0.5) * 6 - 2);
            scene.add(fObj);
            visualFishes.push({
                obj: fObj,
                baseSpeed: 0.01 + Math.random() * 0.02,
                fishRef: item
            });
        });
    }
}

function create3DFishNode(emojiStr) {
    let fDiv = document.createElement('div');
    fDiv.textContent = emojiStr;
    fDiv.style.fontSize = '24px';
    fDiv.style.filter = 'drop-shadow(0 2px 8px rgba(255,255,255,0.3))';
    let fObj = new CSS2DObject(fDiv);
    if (!isAquariumDimension) {
        fObj.position.set((Math.random() - 0.5) * 16, -0.4, (Math.random() - 0.5) * 10 - 1);
    } else {
        fObj.position.set((Math.random() - 0.5) * 12, -0.5 - (Math.random() * 3.2), (Math.random() - 0.5) * 6 - 2);
    }
    scene.add(fObj);
    visualFishes.push({ mesh: fObj, speed: 0.015 + Math.random() * 0.025 });
}

function animateEngine() {
    requestAnimationFrame(animateEngine);
    const time = Date.now() * 0.002;
    if (waterMesh) waterMesh.position.y = -0.5 + Math.sin(time) * 0.04;
    if (boatGroup && !isAquariumDimension) {
        boatGroup.position.y = -0.2 + Math.sin(time * 1.1) * 0.03;
        boatGroup.rotation.z = Math.sin(time * 0.8) * 0.02;
    }
    if (isFishing && bobberObject && !isAquariumDimension) {
        bobberObject.position.y = -0.4 + Math.sin(Date.now() * 0.02) * 0.15;
    }
    visualFishes.forEach(f => {
        if (f.mesh) {
            f.mesh.position.x += f.speed;
            let maxBound = isAquariumDimension ? 6 : 8;
            if (f.mesh.position.x > maxBound) f.mesh.position.x = -maxBound;
        }
    });
    let areaConf = AREAS[currentArea];
    if (!isAquariumDimension) {
        scene.background = new THREE.Color(areaConf.bgFog);
        scene.fog = new THREE.FogExp2(areaConf.bgFog, 0.03);
        if (waterMesh) waterMesh.material.color.setHex(areaConf.waterColor);
    } else {
        let underwaterColor = 0x0e7490;
        scene.background = new THREE.Color(underwaterColor);
        scene.fog = new THREE.FogExp2(underwaterColor, 0.06);
        if (waterMesh) waterMesh.material.color.setHex(underwaterColor);
        moveFishToPellet();
    }
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

function calculateTargetZone(rarity) {
    let baseWidth = 32;
    if (rarity === "Rare") baseWidth = 25;
    if (rarity === "Epic") baseWidth = 19;
    if (rarity === "Legendary") baseWidth = 13;
    if (rarity === "Mythic") baseWidth = 8;
    zoneWidth = baseWidth + (player.rodLevel * 3);
    zoneWidth = Math.min(zoneWidth, 50);
    zoneLeft = 20 + Math.random() * (60 - zoneWidth);
    const zoneDiv = document.getElementById('targetZone');
    zoneDiv.style.left = zoneLeft + '%';
    zoneDiv.style.width = zoneWidth + '%';
}

function getRandomFish() {
    let areaConf = AREAS[currentArea];
    // Cek apakah sekarang jam 11 malam (23:00)
// Paksa pakai waktu WIB (Jakarta)
const nowWIB = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
const currentHour = new Date(nowWIB).getHours();
const isElevenPM = (currentHour === 23);

// Ikan Naga Tengah Malam hanya muncul jam 11 malam di area nightsea
if (isElevenPM && currentArea === "nightsea") {
    // 30% chance muncul kalau jam 11 malam
    if (Math.random() < 0.3) {
        let midnightDragon = {
            id: 67, area: "nightsea", name: "Naga Tengah Malam", rarity: "Mythic",
            basePrice: 7500, speed: 8.5, emoji: "🐉🌙", color: "#c084fc",
            hint: "🌙 Muncul hanya di jam 11 malam di Selat Misteri!"
        };
        let baitMult = 1 + (player.baitLevel * 0.15);
        let weatherPriceBonus = (currentWeather === "🌙 Malam") ? 1.5 : 1.0;
        midnightDragon.calculatedPrice = Math.floor(midnightDragon.basePrice * areaConf.mult * baitMult * weatherPriceBonus);
        showToast("🌙🐉 Jam 11 malam! Naga Tengah Malam muncul di Selat Misteri! 🐉🌙", false);
        return midnightDragon;
    }
}
    const today = new Date();
    const isMay27 = (today.getMonth() === 4 && today.getDate() === 27);
    if (isMay27 && currentArea === "lake" && Math.random() < 0.25) {
        let specialFish = {
            id: 66, area: "lake", name: "Sacred Qurban Leviathan", rarity: "Mythic",
            basePrice: 15000, speed: 9.5, emoji: "🐮✨", color: "#f59e0b",
            hint: "🕌 Kemunculan spesial Idul Adha di Danau Nuansa!"
        };
        let baitMult = 1 + (player.baitLevel * 0.15);
        let weatherPriceBonus = (currentWeather === "🌙 Malam") ? 1.5 : 1.0;
        specialFish.calculatedPrice = Math.floor(specialFish.basePrice * areaConf.mult * baitMult * weatherPriceBonus);
        showToast("🌙✨ Aura sakral terdeteksi! Sacred Qurban Leviathan muncul di Danau Nuansa! ✨🐮", false);
        return specialFish;
    }
    
    let localPool = FISH_DB.filter(f => (f.area === currentArea || f.area === "all") && f.id !== 66 && f.id !== 67 && f.id !== 68 && f.id !== 95);
    if (localPool.length === 0) localPool = [FISH_DB[0]];
    let rand = Math.random();
    let selectedRarity = "Common";
    if (rand > 0.40 && rand <= 0.75) selectedRarity = "Rare";
    if (rand > 0.75 && rand <= 0.92) selectedRarity = "Epic";
    if (rand > 0.92 && rand <= 0.98) selectedRarity = "Legendary";
    if (rand > 0.98) selectedRarity = "Mythic";
    if (currentWeather === "🌧️ Hujan" && Math.random() > 0.5) {
        selectedRarity = Math.random() > 0.6 ? "Mythic" : "Legendary";
    }
    
// CEK IKAN SAPU-SAPU (50% kemunculan di semua tempat) - TAPI TIDAK SAAT RAMUAN AKTIF
if (!antiSapuEffect && Math.random() < 0.5) {
    let sapuSapu = {
        id: 68, area: "all", name: "Ikan Sapu-Sapu", rarity: "Common",
        basePrice: 1, speed: 0.8, emoji: "🧹🐟", color: "#a0aec0",
        hint: "🧹 Ikan pembersih dasar perairan!"
    };
    let baitMult = 1 + (player.baitLevel * 0.15);
    let weatherPriceBonus = (currentWeather === "🌙 Malam") ? 1.5 : 1.0;
    let rawPrice = sapuSapu.basePrice * areaConf.mult * baitMult * weatherPriceBonus;
    sapuSapu.calculatedPrice = Math.max(1, Math.ceil(rawPrice));
    let priceDisplay = sapuSapu.calculatedPrice;
    showToast(`🧹 Ikan Sapu-Sapu muncul! Harga: ${priceDisplay} koin`, false);
    return sapuSapu;
}

// CEK TIKUS BERDASI (10% chance di semua area)
if (Math.random() < 0.10) {
    let tikusBerdasi = {
        id: 95, area: "all", name: "Tikus Berdasi", rarity: "Common",
        basePrice: 20, speed: 1.2, emoji: "🇮🇩👔🐀", color: "#a0aec0",
        hint: "🇮🇩 Tikus kecil berdasi merah putih, jika ditangkap dompet Anda ikut terkuras! 🐀💸"
    };
    let baitMult = 1 + (player.baitLevel * 0.15);
    let weatherPriceBonus = (currentWeather === "🌙 Malam") ? 1.5 : 1.0;
    tikusBerdasi.calculatedPrice = Math.floor(tikusBerdasi.basePrice * areaConf.mult * baitMult * weatherPriceBonus);
    showToast("🐀 Tikus Berdasi terdeteksi! Hati-hati dompetmu! 💸", true);
    return tikusBerdasi;
}
if (currentWeather === "🐟 Hujan Ikan") {
    // 80% chance dapat ikan rarity terendah di area tersebut
    if (Math.random() < 0.8) {
        // Cari ikan dengan rarity terendah di area ini
        let lowestRarity = "Common";
        let commonFish = localPool.filter(f => f.rarity === "Common");
        if (commonFish.length === 0) {
            // Kalau gak ada Common, cari Rare
            commonFish = localPool.filter(f => f.rarity === "Rare");
        }
        if (commonFish.length === 0) commonFish = localPool;
        
        let targetFish = { ...commonFish[Math.floor(Math.random() * commonFish.length)] };
        let baitMult = 1 + (player.baitLevel * 0.15);
        let weatherPriceBonus = 1.0; // Hujan ikan tidak bonus harga
        targetFish.calculatedPrice = Math.floor(targetFish.basePrice * areaConf.mult * baitMult * weatherPriceBonus);
        showToast("🐟 HUJAN IKAN! Ikan biasa berjatuhan dari langit! 🌧️🐟", false);
        return targetFish;
    }
}
    
    let finalSelectionList = localPool.filter(f => f.rarity === selectedRarity);
    if (finalSelectionList.length === 0) finalSelectionList = localPool;
    let targetFish = { ...finalSelectionList[Math.floor(Math.random() * finalSelectionList.length)] };
    let baitMult = 1 + (player.baitLevel * 0.15);
    let weatherPriceBonus = (currentWeather === "🌙 Malam") ? 1.5 : 1.0;
    targetFish.calculatedPrice = Math.floor(targetFish.basePrice * areaConf.mult * baitMult * weatherPriceBonus);
    return targetFish;
}

function startCasting() {
    if (isAquariumDimension) return;
    if (isFishing || document.getElementById('premiumCatchOverlay').classList.contains('show')) return;
    if (baitStock <= 0) {
        showToast("🎣 Umpan habis! Beli di Pasar.", true);
        return;
    }
    
    baitStock--;
    updateGameInterfaces();
    isFishing = true;
    currentFish = getRandomFish();
    calculateTargetZone(currentFish.rarity);
    pointerProgress = 0;
    pointerDirection = 1;
    let baseSpeed = currentFish.speed;
    let reduction = player.lineLevel * 0.35;
    let finalSpeed = Math.max(1.3, baseSpeed - reduction);
    if (engineInterval) clearInterval(engineInterval);
    engineInterval = setInterval(() => {
        pointerProgress += pointerDirection * (finalSpeed * 1.5);
        if (pointerProgress >= 100) { pointerProgress = 100; pointerDirection = -1; }
        if (pointerProgress <= 0) { pointerProgress = 0; pointerDirection = 1; }
        document.getElementById('timingPointer').style.left = pointerProgress + '%';
    }, 30);
    document.getElementById('currentFishDisplay').innerHTML = `🎣 Tarik! Ada tarikan dari <strong>${currentFish.emoji} ${currentFish.name}</strong>`;
    showToast("Kail Dimakan! Tahan di posisi hijau!");
}

function triggerPremiumCatchUI(fish, finalWeight, finalLength) {
    document.getElementById('popupRarityBadge').textContent = fish.rarity;
    document.getElementById('popupRarityBadge').style.background = fish.color;
    document.getElementById('popupFishEmoji').textContent = fish.emoji;
    document.getElementById('popupFishName').textContent = fish.name;
    document.getElementById('popupFishWeight').textContent = `${finalWeight} kg`;
    document.getElementById('popupFishLength').textContent = `${finalLength} cm`;
    document.getElementById('popupFishPrice').textContent = `🪙 ${fish.calculatedPrice}`;
    const card = document.getElementById('premiumCatchCard');
    card.style.boxShadow = `0 0 35px ${fish.color}cc, 0 10px 30px rgba(0,0,0,0.7)`;
    card.style.borderColor = fish.color;
    document.getElementById('premiumCatchOverlay').classList.add('show');
    // Sembunyikan batangan emas saat popup muncul
toggleGoldDecorationVisibility();
}

function executeCatch() {
    if (!isFishing || !currentFish) {
        startCasting();
        return;
    }
    clearInterval(engineInterval);
    isFishing = false;
    let isInsideZone = (pointerProgress >= zoneLeft) && (pointerProgress <= (zoneLeft + zoneWidth));
    if (isInsideZone) {
    let earning = currentFish.calculatedPrice;
    
    // ===== EFEK SPESIAL IKAN TIKUS BERDASI =====
    let isTikusBerdasi = (currentFish.id === 95);
    let tikusPenalty = 0;
    
    if (isTikusBerdasi) {
        // Koin berkurang 100, tapi harga jual tetap 20 (atau sesuai calculatedPrice)
        tikusPenalty = 100;
        player.coins -= tikusPenalty;
        showToast(`🐀🇮🇩 Tikus Berdasi mencuri ${tikusPenalty} koin dari dompetmu! 💸`, true);
        
        // Toast kedua untuk efek dramatis
        setTimeout(() => {
            showToast(`💸 Sisa koin: ${player.coins} 🪙`, false);
        }, 1500);
    }
    
    player.coins += earning;
        let expUp = Math.floor(earning / 4) + 10;
        player.exp += expUp;
        let nextExp = player.level * 100;
        if (player.exp >= nextExp) {
            player.exp -= nextExp;
            player.level++;
            player.coins += 250;
            showToast(`🎉 LEVEL UP! Level ${player.level}. Bonus +250 Koin!`);
        }
        fishCaughtStreak++;
        totalCatches++;
        collectedRarities.add(currentFish.rarity);
        let weightBase = currentFish.rarity === "Common" ? 1.2 : currentFish.rarity === "Rare" ? 5 : currentFish.rarity === "Epic" ? 15 : currentFish.rarity === "Legendary" ? 55 : 210;
        let finalWeight = parseFloat((weightBase + Math.random() * (weightBase * 0.7)).toFixed(1));
        let finalLength = Math.floor(finalWeight * 10 + 12);
        if (!fishAlbumStats[currentFish.name]) {
            fishAlbumStats[currentFish.name] = { unlocked: true, maxWeight: finalWeight };
            showToast(`📖 Ikan Baru Masuk Koleksi Album: ${currentFish.name}!`);
        } else {
            if (finalWeight > fishAlbumStats[currentFish.name].maxWeight) {
                fishAlbumStats[currentFish.name].maxWeight = finalWeight;
                showToast(`🏆 Rekor Baru Terberat: ${finalWeight} kg!`);
            }
        }
        if (fishCaughtStreak >= 3) {
            player.coins += 50;
            showToast(`🔥 STREAK COMBO x${fishCaughtStreak}! Bonus +50 Koin`);
        }
        if (totalCatches % 10 === 0) {
            let bonusChest = 300 + Math.floor(Math.random() * 200);
            player.coins += bonusChest;
            chestRewardCount++;
            showToast(`🎁 Peti Harta Karun Laut Terangkat! +${bonusChest} Koin!`);
        }
        if (!dailyMissionClaimed && (currentFish.rarity === "Epic" || currentFish.rarity === "Legendary" || currentFish.rarity === "Mythic")) {
            dailyMissionProgress++;
            if (dailyMissionProgress >= 3) {
                player.coins += 200;
                dailyMissionClaimed = true;
                document.getElementById('missionText').innerHTML = "✅ Misi Harian Beres! <br><span style='color:#4ade80; font-weight:bold;'>+200 Koin diamankan.</span>";
            } else {
                document.getElementById('missionText').textContent = `🎯 Target: Tangkap 3 ikan Epic/Langka (${dailyMissionProgress}/3)`;
            }
        }
        let invItem = inventory.find(i => i.fish.name === currentFish.name);
        if (invItem) invItem.qty++;
        else inventory.push({ fish: currentFish, qty: 1, sizeLevel: 0, capturedPrice: currentFish.calculatedPrice });
        triggerPremiumCatchUI(currentFish, finalWeight, finalLength);
    } else {
        fishCaughtStreak = 0;
        showToast(`❌ Lepas! Ikan ${currentFish.name} terlalu liar.`, true);
    }
    document.getElementById('currentFishDisplay').textContent = "🌊 Sentuh area air untuk melempar kail!";
    document.getElementById('comboStreak').textContent = fishCaughtStreak;
    document.getElementById('timingPointer').style.left = '0%';
    updateGameInterfaces();
    saveGameData();
}

document.getElementById('popupClaimBtn').onclick = () => {
    document.getElementById('premiumCatchOverlay').classList.remove('show');
    // Tampilkan kembali batangan emas jika seharusnya muncul
    toggleGoldDecorationVisibility();
};

function clearAllIntervals() {
    if (engineInterval) clearInterval(engineInterval);
    if (weatherInterval) clearInterval(weatherInterval);
    if (acidRainCheckInterval) clearInterval(acidRainCheckInterval);
    if (aquariumRefreshInterval) clearInterval(aquariumRefreshInterval);
    if (window.acidRainInterval) clearInterval(window.acidRainInterval);
    if (weatherRainInterval) clearInterval(weatherRainInterval);
}

function restartIntervalsAfterAreaChange() {
    if (weatherInterval) clearInterval(weatherInterval);
    weatherInterval = setInterval(() => {
        if (acidRainActive) return;
        let weathers = ["☀️ Cerah", "🌧️ Hujan", "🌙 Malam", "🏜️ Musim Paceklik"];
        currentWeather = weathers[Math.floor(Math.random() * weathers.length)];
        document.getElementById('weatherIcon').textContent = currentWeather;
        updateWeatherVisuals(currentWeather);
        if (currentWeather === "🌧️ Hujan") showToast("Cuaca Hujan! Peluang ikan legendaris/mythic setempat naik!");
        if (currentWeather === "🌙 Malam") showToast("Malam tiba! Harga jual ikan naik 1.5x lipat!");
        const weatherIconElem = document.getElementById('weatherIcon');
        if (currentWeather === "🌙 Malam") {
            weatherIconElem.classList.add('weather-icon-night');
        } else {
            weatherIconElem.classList.remove('weather-icon-night');
        }
        refresh3DVisualFishes();
    }, 25000);
    if (acidRainCheckInterval) clearInterval(acidRainCheckInterval);
    acidRainCheckInterval = setInterval(() => {
        if (acidRainActive) return;
        const lastAcidRain = localStorage.getItem('lastAcidRainTime');
        const now = Date.now();
        if (lastAcidRain && (now - parseInt(lastAcidRain)) < 600000) return;
        if (Math.random() < 0.05) {
            localStorage.setItem('lastAcidRainTime', now.toString());
            startAcidRain();
        }
    }, 120000);
    if (aquariumRefreshInterval) clearInterval(aquariumRefreshInterval);
    aquariumRefreshInterval = setInterval(() => {
        if (isAquariumDimension && aquarium.length > 15) {
            refresh3DVisualFishes();
        }
    }, 30000);
}

function saveGameData() {
    const dataPackage = {
        coins: player.coins, level: player.level, exp: player.exp,
        rod: player.rodLevel, line: player.lineLevel, bait: player.baitLevel,
        inv: inventory, aquarium: aquarium, streak: fishCaughtStreak, total: totalCatches,
        chests: chestRewardCount, missionProgress: dailyMissionProgress, missionClaimed: dailyMissionClaimed,
        rarities: Array.from(collectedRarities),
        albumStats: fishAlbumStats,
        feedStock: feedStock,
        baitStock: baitStock,
        acidRainActive: acidRainActive,
        acidRainEndTime: acidRainEndTime, hasGoldSkin: hasGoldSkin,
        unlockedAreas: unlockedAreas,
        currentArea: currentArea,
        kurbanPahala: kurbanPahala,
        kurbanDagingStock: kurbanDagingStock,
        hasBoatSkin: hasBoatSkin,
        hasRodSkin: hasRodSkin,
        hasDiamondSkin: hasDiamondSkin,
        kurbanMilestone: kurbanMilestone, antiSapuEffect: antiSapuEffect,
antiSapuRemaining: antiSapuRemaining,
    };
    localStorage.setItem('FishingMasterPro_Save', JSON.stringify(dataPackage));
}

// DEKLARASI VARIABEL KURBAN
let kurbanPahala = 0;
let kurbanMilestone = 0;
let hasBoatSkin = false;
let hasRodSkin = false;
let currentSacrificeFish = null;
let kurbanDagingStock = 0;

function sacrificeFish(fish) {
    if (!fish || fish.id !== 66) {
        showToast("❌ Ini bukan hewan kurban yang sah!", true);
        return;
    }
    const invIndex = inventory.findIndex(i => i.fish.id === 66);
    if (invIndex === -1) {
        showToast("❌ Tidak ada hewan kurban di ember!", true);
        return;
    }
    const qty = inventory[invIndex].qty;
    if (qty > 1) {
        inventory[invIndex].qty--;
    } else {
        inventory.splice(invIndex, 1);
    }
    const dagingGain = 1;
    kurbanDagingStock += dagingGain;
    showToast(`🔪 HEWAN DISEMBELIH! +${dagingGain} Daging Kurban`, false);
    updateGameInterfaces();
    saveGameData();
}

function shareMeat() {
    if (kurbanDagingStock <= 0) {
        showToast("❌ Tidak ada daging kurban untuk dibagikan!", true);
        return;
    }
    kurbanDagingStock--;
    const pahalaGain = 10;
    kurbanPahala += pahalaGain;
    showToast(`🍖 Daging dibagikan! +${pahalaGain} Pahala (Total: ${kurbanPahala}/100)`, false);
    const shareToast = document.createElement('div');
    shareToast.className = 'toast-msg';
    shareToast.style.background = '#2d6a4f';
    shareToast.style.color = '#ffd966';
    shareToast.innerHTML = `🍖✨ Daging kurban telah dibagikan! +${pahalaGain} Pahala ✨🍖`;
    document.body.appendChild(shareToast);
    setTimeout(() => shareToast.remove(), 3000);
    checkKurbanMilestone();
    updateGameInterfaces();
    saveGameData();
}

function checkKurbanMilestone() {
    if (kurbanPahala >= 100) {
        const hadiahKe = kurbanMilestone + 1;
        if (hadiahKe === 1) {
            player.coins += 5000;
            showToast(`🎁 HADIAH KURBAN KE-1! +5000 Koin 🪙`, false);
            kurbanPahala -= 100;
            kurbanMilestone = 1;
        } else if (hadiahKe === 2) {
    hasBoatSkin = true;
    localStorage.setItem('boatSkinActive', 'true');  // ← TAMBAHKAN INI
    applyBoatSkin();
    showToast(`🎁 HADIAH KURBAN KE-2! 🌟 Skin Perahu Kurban 🌟`, false);
    kurbanPahala -= 100;
    kurbanMilestone = 2;
} else if (hadiahKe === 3) {
    hasRodSkin = true;
    localStorage.setItem('rodSkinActive', 'true');   // ← TAMBAHKAN INI
    applyRodSkin();
    showToast(`🎁 HADIAH KURBAN KE-3! 🎣 Skin Pancingan Kurban 🎣`, false);
    kurbanPahala -= 100;
    kurbanMilestone = 3;
} else {
            player.coins += 5000;
            showToast(`🎁 HADIAH KURBAN KE-${hadiahKe}! +5000 Koin 🪙`, false);
            kurbanPahala -= 100;
        }
        updateGameInterfaces();
        saveGameData();
        if (kurbanPahala >= 100) checkKurbanMilestone();
    }
}

// ==================== SKIN KURBAN (VERSI TOGGLE) ====================

function applyRodSkin() {
    if (!hasRodSkin) return;
    
    if (bobberObject) {
        bobberObject.element.textContent = '🐮';
        bobberObject.element.style.fontSize = '28px';
        bobberObject.element.style.filter = 'drop-shadow(0 0 8px #ffaa33)';
    }
    if (lineMesh) {
        lineMesh.material.color.setHex(0xffaa33);
    }
}

function removeRodSkin() {
    if (bobberObject) {
        bobberObject.element.textContent = '🔴';
        bobberObject.element.style.fontSize = '20px';
        bobberObject.element.style.filter = 'none';
    }
    if (lineMesh) {
        lineMesh.material.color.setHex(0xffffff);
    }
}

function toggleRodSkin() {
    if (!hasRodSkin) {
        showToast("❌ Skin pancing kurban belum dimiliki!", true);
        return;
    }
    
    // Cek status aktif dari localStorage
    const isActive = localStorage.getItem('rodSkinActive') === 'true';
    
    if (isActive) {
        // Nonaktifkan
        removeRodSkin();
        localStorage.setItem('rodSkinActive', 'false');
        showToast("🎣 Skin pancing kurban DINONAKTIFKAN", false);
    } else {
        // Aktifkan
        applyRodSkin();
        localStorage.setItem('rodSkinActive', 'true');
        showToast("🐮 Skin pancing kurban DIAKTIFKAN! 🎣", false);
    }
}

// ==================== SKIN KAPAL ====================

function applyBoatSkin() {
    if (!hasBoatSkin) return;
    
    if (boatGroup && boatGroup.children.length > 0) {
        boatGroup.children.forEach(child => {
            if (child.isMesh) {
                child.material.color.setHex(0x48bb78);
                child.material.emissive = new THREE.Color(0x226622);
                child.material.emissiveIntensity = 0.3;
            }
        });
    }
}

function removeBoatSkin() {
    if (boatGroup && boatGroup.children.length > 0) {
        boatGroup.children.forEach(child => {
            if (child.isMesh) {
                child.material.color.setHex(0x7c2d12);
                child.material.emissive = new THREE.Color(0x000000);
                child.material.emissiveIntensity = 0;
            }
        });
    }
}

function toggleBoatSkin() {
    if (!hasBoatSkin) {
        showToast("❌ Skin kapal kurban belum dimiliki!", true);
        return;
    }
    
    const isActive = localStorage.getItem('boatSkinActive') === 'true';
    
    if (isActive) {
        removeBoatSkin();
        localStorage.setItem('boatSkinActive', 'false');
        showToast("⛵ Skin kapal kurban DINONAKTIFKAN", false);
    } else {
        applyBoatSkin();
        localStorage.setItem('boatSkinActive', 'true');
        showToast("🌟 Skin kapal kurban DIAKTIFKAN! 🚢", false);
    }
}

// Fungsi untuk memuat status skin saat game loading
function loadSkinStatus() {
    // Rod skin
    const rodActive = localStorage.getItem('rodSkinActive') === 'true';
    if (hasRodSkin && rodActive) {
        applyRodSkin();
    } else if (hasRodSkin && !rodActive) {
        removeRodSkin();
    }
    
    // Boat skin
    const boatActive = localStorage.getItem('boatSkinActive') === 'true';
    if (hasBoatSkin && boatActive) {
        applyBoatSkin();
    } else if (hasBoatSkin && !boatActive) {
        removeBoatSkin();
    }
}

function addPahalaToUI() {
    let existingPahala = document.getElementById('pahalaCard');
    if (!existingPahala) {
        const topBar = document.querySelector('.top-bar');
        const pahalaCard = document.createElement('div');
        pahalaCard.className = 'stat-card';
        pahalaCard.id = 'pahalaCard';
        pahalaCard.innerHTML = '🕌 <span id="pahalaAmount">0</span> / 100 Pahala';
        topBar.appendChild(pahalaCard);
    }
    document.getElementById('pahalaAmount').textContent = kurbanPahala;
}

function addShareMeatButton() {
    let existingBtn = document.getElementById('shareMeatBtn');
    if (!existingBtn) {
        const missionPanel = document.getElementById('missionPanel');
        const panelContent = missionPanel.querySelector('.panel-content');
        const shareBtn = document.createElement('button');
        shareBtn.id = 'shareMeatBtn';
        shareBtn.textContent = '🍖 BAGIKAN DAGING KURBAN (1 Daging → Pahala) 🍖';
        shareBtn.style.background = '#e67e22';
        shareBtn.style.color = 'white';
        shareBtn.style.padding = '10px';
        shareBtn.style.marginTop = '15px';
        shareBtn.style.borderRadius = '12px';
        shareBtn.style.width = '100%';
        shareBtn.style.fontWeight = 'bold';
        shareBtn.onclick = () => shareMeat();
        panelContent.appendChild(shareBtn);
    }
}

function addMeatStockToUI() {
    let existingMeat = document.getElementById('meatStockCard');
    if (!existingMeat) {
        const topBar = document.querySelector('.top-bar');
        const meatCard = document.createElement('div');
        meatCard.className = 'stat-card';
        meatCard.id = 'meatStockCard';
        meatCard.innerHTML = '🍖 <span id="meatStockAmount">0</span> Daging';
        topBar.appendChild(meatCard);
    }
    document.getElementById('meatStockAmount').textContent = kurbanDagingStock;
}

function unlockArea(areaId, cost) {
    if (unlockedAreas[areaId]) {
        showToast(`🌍 ${AREAS[areaId].name} sudah terbuka!`, false);
        return false;
    }
    if (player.coins >= cost) {
        player.coins -= cost;
        unlockedAreas[areaId] = true;
        saveGameData();
        updateGameInterfaces();
        showToast(`🔓 ${AREAS[areaId].name} terbuka! Koinmu: ${player.coins} 🪙`, false);
        return true;
    } else {
        showToast(`💰 Koin tidak cukup! Butuh ${cost} koin untuk membuka ${AREAS[areaId].name}`, true);
        return false;
    }
}

function loadGameData() {
    let saved = localStorage.getItem('FishingMasterPro_Save');
    if (saved) {
        try {
            let d = JSON.parse(saved);
            player.coins = d.coins ?? 500;
            player.level = d.level ?? 1;
            player.exp = d.exp ?? 0;
            player.rodLevel = d.rod ?? 0;
            player.lineLevel = d.line ?? 0;
            player.baitLevel = d.bait ?? 0;
            inventory = d.inv ?? [];
            aquarium = d.aquarium ?? [];
            fishCaughtStreak = d.streak ?? 0;
            totalCatches = d.total ?? 0;
            chestRewardCount = d.chests ?? 0;
            dailyMissionProgress = d.missionProgress ?? 0;
            dailyMissionClaimed = d.missionClaimed ?? false;
            if (d.rarities) collectedRarities = new Set(d.rarities);
            fishAlbumStats = d.albumStats ?? {};
            feedStock = d.feedStock ?? 0;
            baitStock = d.baitStock ?? 10;
            acidRainActive = d.acidRainActive ?? false;
            acidRainEndTime = d.acidRainEndTime ?? 0;
            kurbanPahala = d.kurbanPahala ?? 0;
            kurbanMilestone = d.kurbanMilestone ?? 0;
            hasBoatSkin = d.hasBoatSkin ?? false;
            hasRodSkin = d.hasRodSkin ?? false;
            hasGoldSkin = d.hasGoldSkin ?? false;
            hasDiamondSkin = d.hasDiamondSkin ?? false;
            kurbanDagingStock = d.kurbanDagingStock ?? 0;
            antiSapuEffect = d.antiSapuEffect ?? false;
antiSapuRemaining = d.antiSapuRemaining ?? 0;

// Restore timer jika masih ada sisa waktu
if (antiSapuEffect && antiSapuRemaining > 0) {
    activateAntiSapuPotion(antiSapuRemaining, "Ramuan (lanjutan)");
}
            
// Load unlocked areas (PERBAIKAN)
console.log("Raw unlockedAreas dari save:", d.unlockedAreas);
console.log("Tipe data:", typeof d.unlockedAreas);
if (d.unlockedAreas && Object.keys(d.unlockedAreas).length > 0) {
    unlockedAreas = d.unlockedAreas;
    console.log("Area terbuka yang dimuat:", unlockedAreas);
} else {
    unlockedAreas = {
        lake: true,
        sea: false,
        nightsea: false,
        icesea: false,
        volcano: false
    };
    console.log("Menggunakan default area:", unlockedAreas);
}

// Load area aktif terakhir
if (d.currentArea && unlockedAreas[d.currentArea]) {
    currentArea = d.currentArea;
} else {
    currentArea = 'lake';
}
// Langsung update dropdown di sini sebelum inisialisasi lain
setTimeout(() => {
    const sel = document.getElementById('areaSelect');
    if (sel) sel.value = currentArea;
}, 0);
            
            // Apply skins
if (hasGoldSkin) applyGoldSkin();
if (hasDiamondSkin) applyDiamondSkin();
loadSkinStatus();
            
            updateWeatherVisuals(currentWeather);
        } catch (e) {
            console.error("Gagal memuat data game:", e);
        }
    }
}

function applyGoldSkin() {
    if (!hasGoldSkin) return;
    const panel = document.getElementById('fishingPanel');
    panel.classList.add('gold-skin');
    
    // Hapus hiasan lama jika ada
    if (window.goldDecorationElements) {
        window.goldDecorationElements.forEach(el => el.remove());
        window.goldDecorationElements = [];
    }
    
    // Hapus container lama
    const oldContainer = document.getElementById('goldDecorationContainer');
    if (oldContainer) oldContainer.remove();
    
    // Container untuk semua hiasan
    let decoContainer = document.createElement('div');
    decoContainer.id = 'goldDecorationContainer';
    decoContainer.style.position = 'fixed';
    decoContainer.style.top = '0';
    decoContainer.style.left = '0';
    decoContainer.style.width = '100%';
    decoContainer.style.height = '100%';
    decoContainer.style.pointerEvents = 'none';
    decoContainer.style.zIndex = '9999';
    document.body.appendChild(decoContainer);
    
    // Ambil posisi panel
    const panelRect = panel.getBoundingClientRect();
    
    // Fungsi bikin batangan
    // Fungsi bikin batangan emas PREMIUM (tanpa emoji, style dari CSS)
function createGoldBar() {
    const bar = document.createElement('div');
    bar.className = 'gold-bar-deco';
    // Hapus semua style inline agar murni pakai CSS
    // CSS sudah mengatur semua tampilan (gradien, ukiran, kilau)
    return bar;
}
    
// ========== KIRI ATAS (1 BATANGAN) ==========
const topLeft = document.createElement('div');
topLeft.style.position = 'fixed';
topLeft.style.left = (panelRect.left - 20) + 'px';
topLeft.style.top = (panelRect.top - 15) + 'px';
topLeft.style.zIndex = '210';
const barTL = createGoldBar();
barTL.style.transform = 'rotate(-5deg)';
topLeft.appendChild(barTL);
decoContainer.appendChild(topLeft);

// ========== KIRI BAWAH (1 BATANGAN) ==========
const bottomLeft = document.createElement('div');
bottomLeft.style.position = 'fixed';
bottomLeft.style.left = (panelRect.left - 20) + 'px';
bottomLeft.style.bottom = (window.innerHeight - panelRect.bottom - 15) + 'px';
bottomLeft.style.zIndex = '210';
const barBL = createGoldBar();
barBL.style.transform = 'rotate(6deg)';
bottomLeft.appendChild(barBL);
decoContainer.appendChild(bottomLeft);

// ========== KANAN BAWAH (1 BATANGAN) ==========
const bottomRight = document.createElement('div');
bottomRight.style.position = 'fixed';
bottomRight.style.right = (window.innerWidth - panelRect.right - 20) + 'px';
bottomRight.style.bottom = (window.innerHeight - panelRect.bottom - 15) + 'px';
bottomRight.style.zIndex = '210';
const barBR = createGoldBar();
barBR.style.transform = 'rotate(12deg)';
bottomRight.appendChild(barBR);
decoContainer.appendChild(bottomRight);

// Simpan referensi (3 posisi berbeda)
window.goldDecorationElements = [topLeft, bottomLeft, bottomRight];
    window.goldDecorationContainer = decoContainer;
    
    console.log("✅ Gold skin hiasan dipasang di:", panelRect.left, panelRect.top);
}

function applyDiamondSkin() {
    if (!hasDiamondSkin) return;
    const panel = document.getElementById('fishingPanel');
    panel.classList.add('diamond-skin');
    
    // Hapus hiasan berlian lama jika ada
    if (window.diamondCorners) {
        window.diamondCorners.forEach(corner => corner.remove());
    }
    window.diamondCorners = [];
    
    // 3 berlian di pojok garis panel: kiri atas, kiri bawah, kanan bawah
    const positions = [
        { top: '-10px', left: '-10px' },      // pojok kiri atas
        { bottom: '-10px', left: '-10px' },   // pojok kiri bawah
        { bottom: '-10px', right: '-10px' }   // pojok kanan bawah
    ];
    
    positions.forEach(pos => {
        const diamond = document.createElement('div');
        diamond.className = 'diamond-corner';
        Object.assign(diamond.style, pos);
        panel.appendChild(diamond);
        window.diamondCorners.push(diamond);
    });
    
    console.log("✅ Diamond skin CSS murni + efek partikel aktif");
}

function resetToDefaultUISkin() {
    if (hasGoldSkin) {
        hasGoldSkin = false;
        const panel = document.getElementById('fishingPanel');
        panel.classList.remove('gold-skin');
        if (window.goldDecorationElements) {
            window.goldDecorationElements.forEach(el => el.remove());
            window.goldDecorationElements = [];
        }
    }
    if (hasDiamondSkin) {
        hasDiamondSkin = false;
        const panel = document.getElementById('fishingPanel');
        panel.classList.remove('diamond-skin');
        // PERBAIKAN: gunakan window.diamondCorners
        if (window.diamondCorners) {
            window.diamondCorners.forEach(corner => corner.remove());
            window.diamondCorners = [];
        }
    }
    showToast("✨ Skin UI kembali ke tampilan default", false);
    updateGameInterfaces();
    saveGameData();
}

function toggleGoldDecorationVisibility() {
    if (hasGoldSkin && window.goldDecorationElements) {
        const isCatchPopupOpen = document.getElementById('premiumCatchOverlay').classList.contains('show');
        const anyPanelOpen = document.querySelector('.panel.show') !== null;
        const shouldHide = isAquariumDimension || anyPanelOpen || isCatchPopupOpen;
        window.goldDecorationElements.forEach(el => {
            if (el) el.style.display = shouldHide ? 'none' : 'block';
        });
    }
    // PERBAIKAN: ganti window.diamondDecorationElements menjadi window.diamondCorners
    if (hasDiamondSkin && window.diamondCorners) {
        const isCatchPopupOpen = document.getElementById('premiumCatchOverlay').classList.contains('show');
        const anyPanelOpen = document.querySelector('.panel.show') !== null;
        const shouldHide = isAquariumDimension || anyPanelOpen || isCatchPopupOpen;
        window.diamondCorners.forEach(el => {
            if (el) el.style.display = shouldHide ? 'none' : 'block';
        });
    }
}

function createGoldBurstEffect() {
   if (hasDiamondSkin) return;
    if (!hasGoldSkin ||
    isAquariumDimension) return;
    const catchBtn = document.getElementById('catchButton');
    const rect = catchBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    for (let i = 0; i < 20; i++) {
        const goldBar = document.createElement('div');
        goldBar.style.width = (12 + Math.random() * 8) + 'px';
        goldBar.style.height = (6 + Math.random() * 4) + 'px';
        goldBar.style.background = `linear-gradient(135deg, #ffea00, #ffd700, #ffaa00)`;
        goldBar.style.borderRadius = '2px';
        goldBar.style.position = 'fixed';
        goldBar.style.left = centerX + 'px';
        goldBar.style.top = centerY + 'px';
        goldBar.style.zIndex = '9999';
        goldBar.style.pointerEvents = 'none';
        goldBar.style.transition = 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        goldBar.style.opacity = '1';
        goldBar.style.boxShadow = '0 0 8px #ffd700';
        document.body.appendChild(goldBar);
        const angle = Math.random() * Math.PI * 2;
        const distance = 60 + Math.random() * 120;
        const xMove = Math.cos(angle) * distance * (Math.random() > 0.5 ? 1 : -1);
        const yMove = Math.sin(angle) * distance - 70 - Math.random() * 40;
        const rotation = Math.random() * 540 - 270;
        setTimeout(() => {
            goldBar.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${rotation}deg)`;
            goldBar.style.opacity = '0';
        }, 10);
        setTimeout(() => {
            goldBar.remove();
        }, 900);
    }
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.left = centerX - 50 + 'px';
    flash.style.top = centerY - 50 + 'px';
    flash.style.width = '100px';
    flash.style.height = '100px';
    flash.style.borderRadius = '50%';
    flash.style.background = 'radial-gradient(circle, rgba(255,215,0,0.6), transparent)';
    flash.style.zIndex = '9998';
    flash.style.pointerEvents = 'none';
    flash.style.transition = 'all 0.3s ease-out';
    document.body.appendChild(flash);
    setTimeout(() => {
        flash.style.transform = 'scale(3)';
        flash.style.opacity = '0';
    }, 10);
    setTimeout(() => {
        flash.remove();
    }, 300);
}

function createDiamondBurstEffect() {
    if (!hasDiamondSkin || isAquariumDimension) return;
    const catchBtn = document.getElementById('catchButton');
    const rect = catchBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // === FLASH: inti putih + halo biru-ungu ===
    const flashCore = document.createElement('div');
    flashCore.style.cssText = `position:fixed;left:${centerX-25}px;top:${centerY-25}px;width:50px;height:50px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,1),rgba(200,240,255,0.85),rgba(96,165,250,0.3),transparent);z-index:9999;pointer-events:none;transition:all 0.22s ease-out;filter:blur(1px);`;
    document.body.appendChild(flashCore);
    setTimeout(() => { flashCore.style.transform='scale(4.5)'; flashCore.style.opacity='0'; }, 10);
    setTimeout(() => flashCore.remove(), 260);

    const flashHalo = document.createElement('div');
    flashHalo.style.cssText = `position:fixed;left:${centerX-45}px;top:${centerY-45}px;width:90px;height:90px;border-radius:50%;background:radial-gradient(circle,transparent 20%,rgba(147,210,255,0.45) 50%,rgba(168,85,247,0.35) 70%,transparent);z-index:9997;pointer-events:none;transition:all 0.38s ease-out;filter:blur(2px);`;
    document.body.appendChild(flashHalo);
    setTimeout(() => { flashHalo.style.transform='scale(3.8)'; flashHalo.style.opacity='0'; }, 20);
    setTimeout(() => flashHalo.remove(), 420);

    // === GELOMBANG 1: 30 serpihan kristal berbentuk bervariasi ===
    const shapes = [
        'polygon(50% 0%,100% 50%,50% 100%,0% 50%)',
        'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)',
        'polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)',
        'polygon(50% 0%,100% 100%,0% 100%)',
        'polygon(50% 0%,85% 25%,85% 75%,50% 100%,15% 75%,15% 25%)'
    ];
    const palettes = [
        ['#ffffff','#c8f0ff','#60a5fa'],
        ['#e0d4ff','#a855f7','#7c3aed'],
        ['#c8f0ff','#93d2ff','#3b82f6'],
        ['#d4f0ff','#67e8f9','#0891b2'],
        ['#ffffff','#f0f9ff','#bae6fd']
    ];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        const sz = 6 + Math.random() * 14;
        const pal = palettes[Math.floor(Math.random() * palettes.length)];
        const shp = shapes[Math.floor(Math.random() * shapes.length)];
        const angle = (i / 30) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const dist = 55 + Math.random() * 145;
        const xM = Math.cos(angle) * dist;
        const yM = Math.sin(angle) * dist - 25 - Math.random() * 75;
        const rot = Math.random() * 700 - 350;
        const dur = 680 + Math.random() * 380;
        const delay = Math.random() * 70;
        p.style.cssText = `position:fixed;left:${centerX-sz/2}px;top:${centerY-sz/2}px;width:${sz}px;height:${sz}px;background:linear-gradient(135deg,${pal[0]},${pal[1]},${pal[2]});clip-path:${shp};z-index:9999;pointer-events:none;transition:all ${dur}ms cubic-bezier(0.12,0.5,0.38,1);opacity:1;box-shadow:0 0 ${sz}px ${pal[1]},0 0 ${sz*1.8}px ${pal[2]};filter:brightness(1.35);`;
        document.body.appendChild(p);
        setTimeout(() => { p.style.transform=`translate(${xM}px,${yM}px) rotate(${rot}deg) scale(0)`; p.style.opacity='0'; }, delay);
        setTimeout(() => p.remove(), delay + dur + 40);
    }

    // === GELOMBANG 2: 3 cincin shockwave mengembang ===
    [['rgba(200,240,255,0.88)','rgba(96,165,250,0.35)',480],
     ['rgba(168,85,247,0.65)','rgba(168,85,247,0.12)',580],
     ['rgba(255,255,255,0.5)','rgba(147,210,255,0.18)',700]
    ].forEach(([stroke,glow,dur],idx) => {
        const ring = document.createElement('div');
        const s0 = 18;
        ring.style.cssText = `position:fixed;left:${centerX-s0/2}px;top:${centerY-s0/2}px;width:${s0}px;height:${s0}px;border-radius:50%;border:2px solid ${stroke};box-shadow:0 0 10px ${glow},inset 0 0 6px ${glow};z-index:9998;pointer-events:none;transition:all ${dur}ms cubic-bezier(0.08,0.5,0.28,1);opacity:1;`;
        document.body.appendChild(ring);
        const sE = 170 + idx * 55;
        setTimeout(() => {
            ring.style.left=`${centerX-sE/2}px`; ring.style.top=`${centerY-sE/2}px`;
            ring.style.width=`${sE}px`; ring.style.height=`${sE}px`;
            ring.style.opacity='0'; ring.style.borderWidth='0.5px';
        }, 25 + idx * 70);
        setTimeout(() => ring.remove(), 25 + idx*70 + dur + 30);
    });

    // === GELOMBANG 3: 8 bintang pijar melayang ke atas ===
    for (let s = 0; s < 8; s++) {
        setTimeout(() => {
            const star = document.createElement('div');
            const sx = centerX + (Math.random()-0.5)*110;
            const sy = centerY + (Math.random()-0.5)*55;
            const ss = 4 + Math.random()*5;
            star.style.cssText = `position:fixed;left:${sx}px;top:${sy}px;width:${ss}px;height:${ss}px;background:#ffffff;clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);z-index:10000;pointer-events:none;box-shadow:0 0 8px #c8f0ff,0 0 16px #60a5fa;filter:brightness(2.2);transition:all 880ms ease-out;opacity:1;`;
            document.body.appendChild(star);
            setTimeout(() => { star.style.transform=`translateY(-${45+Math.random()*75}px) scale(0)`; star.style.opacity='0'; }, 15);
            setTimeout(() => star.remove(), 920);
        }, 90 + s * 55);
    }
}

function updateGameInterfaces() {
    document.getElementById('coinAmount').textContent = player.coins;
    document.getElementById('playerLevel').textContent = player.level;
    document.getElementById('playerExp').textContent = player.exp;
    document.getElementById('expNext').textContent = player.level * 100;
    document.getElementById('collectionCount').textContent = collectedRarities.size;
    document.getElementById('chestCount').textContent = chestRewardCount;
    document.getElementById('comboStreak').textContent = fishCaughtStreak;
    document.getElementById('feedStock').textContent = feedStock;
    document.getElementById('baitStock').textContent = baitStock;
    document.getElementById('aquariumBaitStock').textContent = baitStock;
    renderShopList();
    renderInventoryList();
    renderAquariumList();
    renderAlbumGrid();
    if (!acidRainActive) {
        updateWeatherVisuals(currentWeather);
    }
    const weatherIconElem = document.getElementById('weatherIcon');
    addPahalaToUI();
    document.getElementById('pahalaAmount').textContent = kurbanPahala;
    addShareMeatButton();
    addMeatStockToUI();
    if (currentWeather === "🌙 Malam") {
        weatherIconElem.classList.add('weather-icon-night');
    } else {
        weatherIconElem.classList.remove('weather-icon-night');
    }
}

// ========== FUNGSI RAMUAN ANTI SAPU-SAPU ==========
function activateAntiSapuPotion(durationSeconds, potionName) {
    // Hentikan timer yang sedang berjalan
    if (antiSapuTimer) {
        clearTimeout(antiSapuTimer);
        clearInterval(antiSapuInterval);
    }
    
    antiSapuEffect = true;
    antiSapuRemaining = durationSeconds;
    
    showToast(`✨ ${potionName} aktif! Ikan Sapu-Sapu tidak akan muncul selama ${durationSeconds} detik! ✨`, false);
    
    // Update UI
    updateAntiSapuStatusUI();
    
    // Timer countdown
    if (window.antiSapuInterval) clearInterval(window.antiSapuInterval);
    window.antiSapuInterval = setInterval(() => {
        if (antiSapuEffect && antiSapuRemaining > 0) {
            antiSapuRemaining--;
            updateAntiSapuStatusUI();
            
            if (antiSapuRemaining <= 0) {
                clearInterval(window.antiSapuInterval);
                antiSapuEffect = false;
                updateAntiSapuStatusUI();
                showToast(`⏰ Efek ramuan habis. Ikan Sapu-Sapu bisa muncul kembali.`, false);
            }
        }
    }, 1000);
    
    // Auto end after duration
    antiSapuTimer = setTimeout(() => {
        if (antiSapuEffect) {
            antiSapuEffect = false;
            if (window.antiSapuInterval) clearInterval(window.antiSapuInterval);
            updateAntiSapuStatusUI();
        }
    }, durationSeconds * 1000);
    
    saveGameData();
}

function updateAntiSapuStatusUI() {
    let statusDiv = document.getElementById('antiSapuStatus');
    if (!statusDiv) {
        // Buat elemen status di BAWAH tombol SETTINGS (tanpa mengubah posisi tombol)
        const settingsBtn = document.getElementById('settingsBtnLeft');
        if (!settingsBtn) return;
        
        // Buat elemen status (diletakkan di bawah tombol settings)
        statusDiv = document.createElement('div');
        statusDiv.id = 'antiSapuStatus';
        statusDiv.style.background = 'rgba(139,92,246,0.2)';
        statusDiv.style.border = '2px solid #4ade80';
statusDiv.style.boxShadow = '0 0 8px rgba(74,222,128,0.5)';
        statusDiv.style.borderRadius = '20px';
        statusDiv.style.padding = '6px 14px';
        statusDiv.style.fontSize = '0.7rem';
        statusDiv.style.fontWeight = 'bold';
        statusDiv.style.color = '#c084fc';
        statusDiv.style.display = 'flex';
        statusDiv.style.flexDirection = 'column';
        statusDiv.style.textAlign = 'center';
        statusDiv.style.alignItems = 'center';
        statusDiv.style.gap = '2px';
        statusDiv.style.marginTop = '18px';
        statusDiv.style.marginLeft = '15px';
        statusDiv.style.width = 'fit-content';
        
        // Sisipkan setelah tombol settings (tanpa memindahkan tombol)
        settingsBtn.insertAdjacentElement('afterend', statusDiv);
    }
    
    if (antiSapuEffect && antiSapuRemaining > 0) {
        const minutes = Math.floor(antiSapuRemaining / 60);
        const seconds = antiSapuRemaining % 60;
        statusDiv.innerHTML = `🧪✨ ANTI SAPU-SAPU ✨🧪<br>⏱️ ${minutes}:${seconds.toString().padStart(2,'0')}`;
        statusDiv.style.display = 'flex';
    } else {
        statusDiv.style.display = 'none';
    }
}

function renderShopList() {
    let container = document.getElementById('shopList');
    container.innerHTML = '';
    
    // State untuk tab yang aktif
    let activeTab = localStorage.getItem('lastShopTab') || 'upgrade';
    
    // Buat tombol-tombol kategori
    const tabContainer = document.createElement('div');
    tabContainer.style.display = 'flex';
    tabContainer.style.flexWrap = 'wrap';
    tabContainer.style.gap = '8px';
    tabContainer.style.marginBottom = '15px';
    tabContainer.style.borderBottom = '1px solid rgba(255,217,102,0.3)';
    tabContainer.style.paddingBottom = '10px';
    
    const tabs = [
        { id: 'upgrade', label: '🎣 UPGRADE', color: '#f59e0b' },
        { id: 'skinUI', label: '👑 SKIN UI', color: '#ffd700' },
        { id: 'skinRod', label: '🎣 SKIN PANCING', color: '#9f7aea' },
        { id: 'skinBoat', label: '⛵ SKIN KAPAL', color: '#48bb78' },
        { id: 'consumable', label: '🍖 KONSUMSI', color: '#38a169' }
    ];
    
    const tabButtons = {};
    
    tabs.forEach(tab => {
        const btn = document.createElement('button');
        btn.textContent = tab.label;
        btn.style.background = tab.color;
        btn.style.padding = '6px 12px';
        btn.style.fontSize = '0.7rem';
        btn.style.borderRadius = '20px';
        btn.style.opacity = '0.8';
        btn.style.cursor = 'pointer';
        btn.style.border = 'none';
        btn.style.fontWeight = 'bold';
        btn.style.color = '#fff';
        
        btn.onclick = () => {
    activeTab = tab.id;
    localStorage.setItem('lastShopTab', activeTab); // <-- TAMBAHKAN INI
    // Update tampilan tombol
    Object.values(tabButtons).forEach(b => b.style.opacity = '0.5');
    btn.style.opacity = '1';
    renderContent();
};
        
        tabContainer.appendChild(btn);
        tabButtons[tab.id] = btn;
    });
    
    container.appendChild(tabContainer);
    
    // Area konten
    const contentArea = document.createElement('div');
    contentArea.id = 'shopContentArea';
    container.appendChild(contentArea);
    
    function renderContent() {
        contentArea.innerHTML = '';
        
        if (activeTab === 'upgrade') {
            // UPGRADE PERLENGKAPAN
            const upgrades = [
                { name: "🎣 Joran Karbon Prime", desc: "Memperlebar target area hijau (+3%)", lv: player.rodLevel, cost: 100 + player.rodLevel * 80, max: 5, buy: () => player.rodLevel++ },
                { name: "🧵 Senar Fluoro Siluman", desc: "Memperlambat laju bar pointer", lv: player.lineLevel, cost: 120 + player.lineLevel * 90, max: 5, buy: () => player.lineLevel++ },
                { name: "🪱 Umpan Feromon Pelet", desc: "Meningkatkan harga jual ikan (+15%)", lv: player.baitLevel, cost: 150 + player.baitLevel * 100, max: 5, buy: () => player.baitLevel++ }
            ];
            
            upgrades.forEach(up => {
                let div = document.createElement('div');
                div.className = "shop-item";
                let activeCost = up.cost;
                let isMax = up.lv >= up.max;
                div.innerHTML = `<div class="item-info"><div class="fish-title">${up.name} (Lv.${up.lv})</div><div class="fish-meta">${up.desc}</div></div>`;
                let btn = document.createElement('button');
                btn.textContent = isMax ? "MAX" : `${activeCost} 🪙`;
                btn.disabled = isMax || player.coins < activeCost;
                btn.onclick = () => {
                    if (player.coins >= activeCost && !isMax) {
                        player.coins -= activeCost;
                        up.buy();
                        updateGameInterfaces();
                        saveGameData();
                        showToast("Upgrade Berhasil!");
                    }
                };
                div.appendChild(btn);
                contentArea.appendChild(div);
            });
            
        } else if (activeTab === 'skinUI') {
    const goldSkinDiv = document.createElement('div');
    goldSkinDiv.className = "shop-item";
    goldSkinDiv.style.border = "2px solid #ffd700";
    goldSkinDiv.style.background = "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,100,0,0.1))";
    goldSkinDiv.innerHTML = `<div class="item-info"><div class="fish-title">✨ SKIN EMAS IMPERIUM ✨</div><div class="fish-meta">UI panel mancing jadi mewah & berkelas</div><div class="fish-meta" style="color:#ffd700;">💰 Harga: 75.000 🪙 (beli sekali, aktif/nonaktif gratis)</div></div>`;
    
    const actionBtn = document.createElement('button');
    actionBtn.style.fontWeight = "bold";
    actionBtn.style.padding = "10px 16px";
    actionBtn.style.borderRadius = "8px";
    actionBtn.style.cursor = "pointer";
    
    // Cek apakah skin sudah PERNAH dibeli
    let hasPurchasedGoldSkin = localStorage.getItem('hasPurchasedGoldSkin') === 'true';
    
    if (!hasPurchasedGoldSkin) {
        // Belum pernah beli
        actionBtn.textContent = "💰 BELI 75.000 🪙";
        actionBtn.style.background = "linear-gradient(135deg, #ffd700, #ffaa00)";
        actionBtn.style.color = "#2c1810";
        actionBtn.onclick = () => {
            if (player.coins >= 75000) {
                player.coins -= 75000;
                hasPurchasedGoldSkin = true;
                hasGoldSkin = true;
                localStorage.setItem('hasPurchasedGoldSkin', 'true');
                applyGoldSkin();
                saveGameData();
                updateGameInterfaces();
                showToast("👑 Skin Gold berhasil dibeli dan diaktifkan!", false);
                renderContent(); // refresh tombol
            } else {
                showToast("💰 Koin tidak cukup! Butuh 75.000 koin.", true);
            }
        };
    } else {
        // Sudah pernah beli → toggle aktif/nonaktif GRATIS
        if (hasGoldSkin) {
            actionBtn.textContent = "🔘 NONAKTIFKAN";
            actionBtn.style.background = "#e67e22";
            actionBtn.style.color = "white";
            actionBtn.onclick = () => {
                resetToDefaultUISkin();
                updateGameInterfaces();
                showToast("✨ Skin Gold dinonaktifkan", false);
                renderContent();
            };
        } else {
            actionBtn.textContent = "✨ AKTIFKAN SKIN";
            actionBtn.style.background = "linear-gradient(135deg, #ffd700, #ffaa00)";
            actionBtn.style.color = "#2c1810";
            actionBtn.onclick = () => {
                hasGoldSkin = true;
                applyGoldSkin();
                saveGameData();
                updateGameInterfaces();
                showToast("👑 Skin Gold diaktifkan!", false);
                renderContent();
            };
        }
    }
    goldSkinDiv.appendChild(actionBtn);
    contentArea.appendChild(goldSkinDiv);
    
// SKIN BERLIAN
const diamondSkinDiv = document.createElement('div');
diamondSkinDiv.className = "shop-item";
diamondSkinDiv.style.border = "2px solid #60a5fa";
diamondSkinDiv.style.background = "linear-gradient(135deg, rgba(96,165,250,0.15), rgba(168,85,247,0.1))";
diamondSkinDiv.innerHTML = `<div class="item-info"><div class="fish-title">💎 SKIN BERLIAN PREMIUM 💎</div><div class="fish-meta">UI panel mancing jadi mewah berkilau seperti berlian</div><div class="fish-meta" style="color:#60a5fa;">💰 Harga: 100.000 🪙 (beli sekali, aktif/nonaktif gratis)</div></div>`;

const diamondActionBtn = document.createElement('button');
diamondActionBtn.style.fontWeight = "bold";
diamondActionBtn.style.padding = "10px 16px";
diamondActionBtn.style.borderRadius = "8px";
diamondActionBtn.style.cursor = "pointer";

let hasPurchasedDiamondSkin = localStorage.getItem('hasPurchasedDiamondSkin') === 'true';

if (!hasPurchasedDiamondSkin) {
    diamondActionBtn.textContent = "💰 BELI 100.000 🪙";
    diamondActionBtn.style.background = "linear-gradient(135deg, #60a5fa, #3b82f6)";
    diamondActionBtn.style.color = "white";
    diamondActionBtn.onclick = () => {
        if (player.coins >= 100000) {
            player.coins -= 100000;
            hasPurchasedDiamondSkin = true;
            hasDiamondSkin = true;
            localStorage.setItem('hasPurchasedDiamondSkin', 'true');
            applyDiamondSkin();
            saveGameData();
            updateGameInterfaces();
            showToast("💎 Skin Berlian berhasil dibeli dan diaktifkan!", false);
            renderContent();
        } else {
            showToast("💰 Koin tidak cukup! Butuh 100.000 koin.", true);
        }
    };
} else {
    if (hasDiamondSkin) {
        diamondActionBtn.textContent = "🔘 NONAKTIFKAN";
        diamondActionBtn.style.background = "#e67e22";
        diamondActionBtn.style.color = "white";
        diamondActionBtn.onclick = () => {
            resetToDefaultUISkin();
            updateGameInterfaces();
            showToast("💎 Skin Berlian dinonaktifkan", false);
            renderContent();
        };
    } else {
        diamondActionBtn.textContent = "💎 AKTIFKAN SKIN";
        diamondActionBtn.style.background = "linear-gradient(135deg, #60a5fa, #3b82f6)";
        diamondActionBtn.style.color = "white";
        diamondActionBtn.onclick = () => {
            hasDiamondSkin = true;
            applyDiamondSkin();
            saveGameData();
            updateGameInterfaces();
            showToast("💎 Skin Berlian diaktifkan!", false);
            renderContent();
        };
    }
}
diamondSkinDiv.appendChild(diamondActionBtn);
contentArea.appendChild(diamondSkinDiv);
            
        } else if (activeTab === 'skinRod') {
    const rodSkinDiv = document.createElement('div');
    rodSkinDiv.className = "shop-item";
    
    const isOwned = hasRodSkin;
    const isActive = localStorage.getItem('rodSkinActive') === 'true';
    
    let statusText = "";
    let btnText = "";
    let btnStyle = "";
    
    if (isOwned) {
        // SUDAH DIMILIKI → tampilkan tombol TOGGLE
        statusText = isActive ? "✅ AKTIF" : "⭕ NONAKTIF";
        btnText = isActive ? "🔘 NONAKTIFKAN" : "✨ AKTIFKAN";
        btnStyle = isActive ? "#e67e22" : "linear-gradient(135deg, #9f7aea, #7c3aed)";
        rodSkinDiv.style.border = "2px solid #ffd700";
        rodSkinDiv.style.background = "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,100,0,0.15))";
    } else {
        // BELUM DIMILIKI → cek apakah cukup pahala untuk unlock
        const canUnlock = kurbanPahala >= 300;
        if (canUnlock) {
            statusText = "🔓 SIAP DIAKTIFKAN (Gratis)";
            btnText = "🔓 AKTIFKAN SEKARANG";
            btnStyle = "linear-gradient(135deg, #9f7aea, #7c3aed)";
            rodSkinDiv.style.border = "1px solid #9f7aea";
            rodSkinDiv.style.background = "linear-gradient(135deg, rgba(159,122,234,0.15), rgba(100,100,200,0.1))";
        } else {
            statusText = `🔒 TERKUNCI (Butuh ${300 - kurbanPahala} Pahala lagi)`;
            btnText = `🔒 TERKUNCI`;
            btnStyle = "#4a5568";
            rodSkinDiv.style.border = "1px solid #4a5568";
            rodSkinDiv.style.background = "linear-gradient(135deg, rgba(100,100,100,0.15), rgba(80,80,80,0.1))";
        }
    }
    
    rodSkinDiv.innerHTML = `<div class="item-info">
        <div class="fish-title">🐮 SKIN PANCING KURBAN 🐮 ${isOwned ? (isActive ? '✅' : '⭕') : '🔒'}</div>
        <div class="fish-meta">Bobber jadi ikon kurban + efek warna emas pada senar</div>
        <div class="fish-meta" style="color:#ffd700;">🎁 Hadiah Milestone ke-3 (300 Pahala)</div>
        <div class="fish-meta" style="color:#c4b5fd;">Status: ${statusText}</div>
    </div>`;
    
    const actionBtn = document.createElement('button');
    actionBtn.textContent = btnText;
    actionBtn.style.background = btnStyle;
    actionBtn.style.color = "white";
    actionBtn.style.fontWeight = "bold";
    actionBtn.style.cursor = "pointer";
    
    if (isOwned) {
        // SUDAH PUNYA → toggle aktif/nonaktif
        actionBtn.onclick = () => {
            toggleRodSkin();
            renderContent();  // Refresh tampilan
        };
    } else if (kurbanPahala >= 300) {
        // BELUM PUNYA TAPI CUKUP PAHALA → unlock
        actionBtn.onclick = () => {
            hasRodSkin = true;
            localStorage.setItem('rodSkinActive', 'true');  // Langsung aktif
            applyRodSkin();
            updateGameInterfaces();
            saveGameData();
            showToast("🐮 Selamat! Skin Pancing Kurban telah diaktifkan! 🎣", false);
            renderContent();  // Refresh tampilan
        };
    } else {
        actionBtn.disabled = true;
        actionBtn.style.cursor = "not-allowed";
    }
    
    rodSkinDiv.appendChild(actionBtn);
    contentArea.appendChild(rodSkinDiv);
} else if (activeTab === 'skinBoat') {
    const boatSkinDiv = document.createElement('div');
    boatSkinDiv.className = "shop-item";
    
    const isOwned = hasBoatSkin;
    const isActive = localStorage.getItem('boatSkinActive') === 'true';
    
    let statusText = "";
    let btnText = "";
    let btnStyle = "";
    
    if (isOwned) {
        // SUDAH DIMILIKI → tampilkan tombol TOGGLE
        statusText = isActive ? "✅ AKTIF" : "⭕ NONAKTIF";
        btnText = isActive ? "🔘 NONAKTIFKAN" : "✨ AKTIFKAN";
        btnStyle = isActive ? "#e67e22" : "linear-gradient(135deg, #48bb78, #2f855a)";
        boatSkinDiv.style.border = "2px solid #ffd700";
        boatSkinDiv.style.background = "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,100,0,0.15))";
    } else {
        // BELUM DIMILIKI → cek apakah cukup pahala untuk unlock (200 Pahala)
        const canUnlock = kurbanPahala >= 200;
        if (canUnlock) {
            statusText = "🔓 SIAP DIAKTIFKAN (Gratis)";
            btnText = "🔓 AKTIFKAN SEKARANG";
            btnStyle = "linear-gradient(135deg, #48bb78, #2f855a)";
            boatSkinDiv.style.border = "1px solid #48bb78";
            boatSkinDiv.style.background = "linear-gradient(135deg, rgba(72,187,120,0.15), rgba(50,150,100,0.1))";
        } else {
            statusText = `🔒 TERKUNCI (Butuh ${200 - kurbanPahala} Pahala lagi)`;
            btnText = `🔒 TERKUNCI`;
            btnStyle = "#4a5568";
            boatSkinDiv.style.border = "1px solid #4a5568";
            boatSkinDiv.style.background = "linear-gradient(135deg, rgba(100,100,100,0.15), rgba(80,80,80,0.1))";
        }
    }
    
    boatSkinDiv.innerHTML = `<div class="item-info">
        <div class="fish-title">🌟 SKIN KAPAL LAUT BERKAH 🌟 ${isOwned ? (isActive ? '✅' : '⭕') : '🔒'}</div>
        <div class="fish-meta">Perahu berubah warna jadi emas kehijauan + efek cahaya</div>
        <div class="fish-meta" style="color:#ffd700;">🎁 Hadiah Milestone ke-2 (200 Pahala)</div>
        <div class="fish-meta" style="color:#c4b5fd;">Status: ${statusText}</div>
    </div>`;
    
    const actionBtn = document.createElement('button');
    actionBtn.textContent = btnText;
    actionBtn.style.background = btnStyle;
    actionBtn.style.color = "white";
    actionBtn.style.fontWeight = "bold";
    actionBtn.style.cursor = "pointer";
    
    if (isOwned) {
        // SUDAH PUNYA → toggle aktif/nonaktif
        actionBtn.onclick = () => {
            toggleBoatSkin();
            renderContent();  // Refresh tampilan
        };
    } else if (kurbanPahala >= 200) {
        // BELUM PUNYA TAPI CUKUP PAHALA → unlock
        actionBtn.onclick = () => {
            hasBoatSkin = true;
            localStorage.setItem('boatSkinActive', 'true');  // Langsung aktif
            applyBoatSkin();
            updateGameInterfaces();
            saveGameData();
            showToast("🌟 Selamat! Skin Kapal Laut Berkah telah diaktifkan! 🚢", false);
            renderContent();  // Refresh tampilan
        };
    } else {
        actionBtn.disabled = true;
        actionBtn.style.cursor = "not-allowed";
    }
    
    boatSkinDiv.appendChild(actionBtn);
    contentArea.appendChild(boatSkinDiv);
} else if (activeTab === 'consumable') {
    // KONSUMSI (PAKAN & UMPAN) - UNLIMITED
    
    // Paket Pakan 1 pc
    const feedDiv = document.createElement('div');
    feedDiv.className = "shop-item";
    feedDiv.innerHTML = `<div class="item-info"><div class="fish-title">🍖 Paket Pakan (1 pc)</div><div class="fish-meta">Memberi makan ikan di Akuarium (Stok tidak terbatas)</div></div>`;
    const feedBtn = document.createElement('button');
    feedBtn.textContent = `500 🪙`;
    feedBtn.onclick = () => {
        if (player.coins >= 500) {
            player.coins -= 500;
            feedStock += 1;
            updateGameInterfaces();
            saveGameData();
            showToast("+1 Pakan! (Total: " + feedStock + ")");
        } else {
            showToast("Koin tidak cukup!", true);
        }
    };
    feedDiv.appendChild(feedBtn);
    contentArea.appendChild(feedDiv);
    
    // Paket Umpan 10 pcs
    const baitDiv10 = document.createElement('div');
    baitDiv10.className = "shop-item";
    baitDiv10.innerHTML = `<div class="item-info"><div class="fish-title">🎣 Paket Umpan (10 pcs)</div><div class="fish-meta">Untuk memancing, sekali pakai habis (Stok tidak terbatas)</div></div>`;
    const baitBtn10 = document.createElement('button');
    baitBtn10.textContent = `500 🪙`;
    baitBtn10.onclick = () => {
        if (player.coins >= 500) {
            player.coins -= 500;
            baitStock += 10;
            updateGameInterfaces();
            saveGameData();
            showToast("+10 Umpan! (Total: " + baitStock + ")");
        } else {
            showToast("Koin tidak cukup!", true);
        }
    };
    baitDiv10.appendChild(baitBtn10);
    contentArea.appendChild(baitDiv10);
    
    // Paket Pakan 50 pcs (HEMAT)
    const feedDiv50 = document.createElement('div');
    feedDiv50.className = "shop-item";
    feedDiv50.innerHTML = `<div class="item-info"><div class="fish-title">🍖 Paket Pakan (50 pcs) - HEMAT!</div><div class="fish-meta">Memberi makan ikan di Akuarium, harga lebih murah per pcs (Stok tidak terbatas)</div></div>`;
    const feedBtn50 = document.createElement('button');
    feedBtn50.textContent = `2000 🪙`;
    feedBtn50.onclick = () => {
        if (player.coins >= 2000) {
            player.coins -= 2000;
            feedStock += 50;
            updateGameInterfaces();
            saveGameData();
            showToast("+50 Pakan! (Total: " + feedStock + ")");
        } else {
            showToast("Koin tidak cukup!", true);
        }
    };
    feedDiv50.appendChild(feedBtn50);
    contentArea.appendChild(feedDiv50);
    
    // Paket Umpan 50 pcs (HEMAT)
    const baitDiv50 = document.createElement('div');
    baitDiv50.className = "shop-item";
    baitDiv50.innerHTML = `<div class="item-info"><div class="fish-title">🎣 Paket Umpan (50 pcs) - HEMAT!</div><div class="fish-meta">Untuk memancing, harga lebih murah per pcs (Stok tidak terbatas)</div></div>`;
    const baitBtn50 = document.createElement('button');
    baitBtn50.textContent = `2000 🪙`;
    baitBtn50.onclick = () => {
        if (player.coins >= 2000) {
            player.coins -= 2000;
            baitStock += 50;
            updateGameInterfaces();
            saveGameData();
            showToast("+50 Umpan! (Total: " + baitStock + ")");
        } else {
            showToast("Koin tidak cukup!", true);
        }
    };
    baitDiv50.appendChild(baitBtn50);
    contentArea.appendChild(baitDiv50);

        // ===== RAMUAN ANTI SAPU-SAPU =====
const potionDivider = document.createElement('div');
potionDivider.style.height = '2px';
potionDivider.style.background = 'linear-gradient(90deg, transparent, #8b5cf6, transparent)';
potionDivider.style.margin = '15px 0';
contentArea.appendChild(potionDivider);

const potionLabel = document.createElement('div');
potionLabel.style.textAlign = 'center';
potionLabel.style.margin = '10px 0';
potionLabel.style.fontWeight = 'bold';
potionLabel.style.color = '#c084fc';
potionLabel.innerHTML = '🧪✨ RAMUAN ANTI SAPU-SAPU ✨🧪';
contentArea.appendChild(potionLabel);

// Ramuan Kecil (30 detik)
const smallPotion = document.createElement('div');
smallPotion.className = "shop-item potion-item";
smallPotion.innerHTML = `<div class="item-info"><div class="fish-title">🧪 Ramuan Kecil Anti Sapu-Sapu</div><div class="fish-meta">Mencegah kemunculan Ikan Sapu-Sapu selama 30 detik</div><div class="fish-meta" style="color:#fbbf24;">💰 Harga: 8.000 🪙</div></div>`;
const smallBtn = document.createElement('button');
smallBtn.textContent = `BELI 8.000 🪙`;
smallBtn.style.background = "#8b5cf6";
smallBtn.onclick = () => {
    if (player.coins >= 8000) {
        player.coins -= 8000;
        activateAntiSapuPotion(30, "Ramuan Kecil");
        updateGameInterfaces();
        saveGameData();
    } else {
        showToast("💰 Koin tidak cukup! Butuh 8.000 koin.", true);
    }
};
smallPotion.appendChild(smallBtn);
contentArea.appendChild(smallPotion);

// Ramuan Sedang (1 menit)
const mediumPotion = document.createElement('div');
mediumPotion.className = "shop-item potion-item";
mediumPotion.innerHTML = `<div class="item-info"><div class="fish-title">🧪 Ramuan Sedang Anti Sapu-Sapu</div><div class="fish-meta">Mencegah kemunculan Ikan Sapu-Sapu selama 1 menit</div><div class="fish-meta" style="color:#fbbf24;">💰 Harga: 15.000 🪙</div></div>`;
const mediumBtn = document.createElement('button');
mediumBtn.textContent = `BELI 15.000 🪙`;
mediumBtn.style.background = "#8b5cf6";
mediumBtn.onclick = () => {
    if (player.coins >= 15000) {
        player.coins -= 15000;
        activateAntiSapuPotion(60, "Ramuan Sedang");
        updateGameInterfaces();
        saveGameData();
    } else {
        showToast("💰 Koin tidak cukup! Butuh 15.000 koin.", true);
    }
};
mediumPotion.appendChild(mediumBtn);
contentArea.appendChild(mediumPotion);

// Ramuan Besar (3 menit)
const largePotion = document.createElement('div');
largePotion.className = "shop-item potion-item";
largePotion.innerHTML = `<div class="item-info"><div class="fish-title">🧪 Ramuan Besar Anti Sapu-Sapu</div><div class="fish-meta">Mencegah kemunculan Ikan Sapu-Sapu selama 3 menit</div><div class="fish-meta" style="color:#fbbf24;">💰 Harga: 35.000 🪙</div></div>`;
const largeBtn = document.createElement('button');
largeBtn.textContent = `BELI 35.000 🪙`;
largeBtn.style.background = "#8b5cf6";
largeBtn.onclick = () => {
    if (player.coins >= 35000) {
        player.coins -= 35000;
        activateAntiSapuPotion(180, "Ramuan Besar");
        updateGameInterfaces();
        saveGameData();
    } else {
        showToast("💰 Koin tidak cukup! Butuh 35.000 koin.", true);
    }
};
largePotion.appendChild(largeBtn);
contentArea.appendChild(largePotion);
    }
}

    
// Set tombol aktif berdasarkan localStorage dan simpan ke localStorage
if (tabButtons[activeTab]) {
    tabButtons[activeTab].style.opacity = '1';
} else {
    tabButtons.upgrade.style.opacity = '1';
    activeTab = 'upgrade';
}
// Pastikan localStorage selalu tersimpan dengan tab terakhir yang aktif
localStorage.setItem('lastShopTab', activeTab);
renderContent();
}

function renderInventoryList() {
    let container = document.getElementById('inventoryList');
    container.innerHTML = '';
    if (inventory.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:#888; padding: 10px;'>Ember kosong, ketuk layar air untuk mancing!</p>";
        return;
    }
    inventory.forEach((item, index) => {
        const sizeLv = item.sizeLevel || 0;
        const baseValue = item.capturedPrice || calculateSellPrice(item.fish.basePrice, sizeLv);
        let finalPrice = baseValue;
        if (acidRainActive) finalPrice = Math.floor(baseValue * 0.5);
        let div = document.createElement('div');
        div.className = `fish-item rarity-${item.fish.rarity.toLowerCase()}`;
        const isNightBonus = (currentWeather === "🌙 Malam" && !acidRainActive);
        let bonusText = '';
        if (acidRainActive) {
            bonusText = '<span style="color:#ff4444;">(DISKON 50% - HUJAN ASAM!)</span>';
        } else {
            if (sizeLv > 0) {
                bonusText = `<span style="color:#ffd966;">(⭐ Bonus +${sizeLv * 30}%)</span>`;
            }
            if (isNightBonus) {
                if (bonusText) bonusText += ' ';
                bonusText += `<span class="night-bonus-badge">🌙 BONUS MALAM 1.5x</span>`;
            }
        }
        div.innerHTML = `<div class="item-info"><div class="fish-title">${item.fish.emoji} ${item.fish.name} (x${item.qty}) <span class="size-stars">${getSizeStars(sizeLv)}</span></div><div class="fish-meta">Harga: 🪙${finalPrice} ${bonusText} | ${item.fish.rarity}</div><div class="fish-meta" style="font-size:0.7rem; color:#a0aec0;">${isNightBonus ? `<span>✨ Bonus malam 1.5x: Harga asli 🪙${Math.floor(baseValue / 1.5)} → 🪙${baseValue}</span>` : ''}</div></div>`;
        let actionBox = document.createElement('div');
        actionBox.className = "fish-action-btns";
        if (item.fish.id === 66) {
            let sacrificeBtn = document.createElement('button');
            sacrificeBtn.textContent = "🕌 SEMBELIH";
            sacrificeBtn.style.background = "#b45309";
            sacrificeBtn.style.color = "white";
            sacrificeBtn.onclick = () => { sacrificeFish(item.fish); };
            actionBox.appendChild(sacrificeBtn);
        }
        let sellBtn = document.createElement('button');
        sellBtn.textContent = "Jual";
        sellBtn.style.background = "#ed8936";
        sellBtn.style.color = "white";
        sellBtn.onclick = () => {
            player.coins += finalPrice * item.qty;
            inventory.splice(index, 1);
            updateGameInterfaces();
            saveGameData();
            showToast("Ikan Terjual!");
        };
        let toAquaBtn = document.createElement('button');
        toAquaBtn.textContent = "📥 Pelihara";
        toAquaBtn.style.background = "#2b6cb0";
        toAquaBtn.style.color = "white";
        toAquaBtn.onclick = () => {
            for (let i = 0; i < item.qty; i++) {
                aquarium.push({
                    fish: item.fish, growthProgress: 0,
                    sizeLevel: item.sizeLevel || 0,
                    capturedPrice: item.capturedPrice || calculateSellPrice(item.fish.basePrice, item.sizeLevel || 0)
                });
            }
            inventory.splice(index, 1);
            updateGameInterfaces();
            refresh3DVisualFishes();
            saveGameData();
            showToast(`${item.qty} ekor ${item.fish.name} dipelihara di Akuarium!`);
        };
        actionBox.appendChild(sellBtn);
        actionBox.appendChild(toAquaBtn);
        div.appendChild(actionBox);
        container.appendChild(div);
    });
}

function renderAquariumList() {
    let container = document.getElementById('aquariumList');
    container.innerHTML = '';
    if (aquarium.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:#888; padding: 10px;'>Akuarium kosong, belum ada peliharaan.</p>";
        return;
    }
    aquarium.forEach((item, index) => {
        const growth = item.growthProgress || 0;
        const sizeLv = item.sizeLevel || 0;
        let div = document.createElement('div');
        div.className = `fish-item rarity-${item.fish.rarity.toLowerCase()}`;
        div.innerHTML = `<div class="item-info"><div class="fish-title">${item.fish.emoji} ${item.fish.name} <span class="size-stars">${getSizeStars(sizeLv)}</span></div><div class="fish-meta">Rarity: ${item.fish.rarity}</div><div class="growth-bar-container" style="background:#2d3748; border-radius:10px; height:8px; margin:6px 0; overflow:hidden;"><div class="growth-bar-fill" style="width:${growth}%; height:100%; background:linear-gradient(90deg,#48bb78,#68d391);"></div></div><div class="fish-meta" style="font-size:0.7rem;">Growth: ${growth}%</div></div>`;
        let takeBtn = document.createElement('button');
        takeBtn.textContent = "📤 Ambil";
        takeBtn.style.background = "#4a5568";
        takeBtn.style.color = "white";
        takeBtn.onclick = () => {
            inventory.push({
                fish: item.fish, qty: 1, sizeLevel: sizeLv,
                capturedPrice: item.capturedPrice || calculateSellPrice(item.fish.basePrice, sizeLv)
            });
            aquarium.splice(index, 1);
            updateGameInterfaces();
            refresh3DVisualFishes();
            saveGameData();
            showToast(`${item.fish.name} dikembalikan ke ember.`);
        };
        div.appendChild(takeBtn);
        container.appendChild(div);
    });
}

function renderAlbumGrid() {
    let gridContainer = document.getElementById('albumGridContainer');
    gridContainer.innerHTML = '';
    let totalUnlockedCount = 0;
    FISH_DB.forEach(fish => {
        let isUnlocked = fishAlbumStats[fish.name] ? true : false;
        let card = document.createElement('div');
        card.className = "album-card";
        if (isUnlocked) {
            totalUnlockedCount++;
            card.classList.add('unlocked');
            let maxWeightRecord = fishAlbumStats[fish.name].maxWeight || 0;
            card.innerHTML = `<div class="album-card-emoji">${fish.emoji}</div><div class="album-card-name">${fish.name}</div><div class="album-card-badge" style="background:${fish.color};">${fish.rarity}</div><div class="album-card-status" style="color:#4ade80;">⚖️ Max: ${maxWeightRecord} kg</div>`;
        } else {
            card.innerHTML = `<div class="album-card-emoji" style="opacity: 0.3;">❓</div><div class="album-card-name" style="color:#718096;">???</div><div class="album-card-badge" style="background:#4a5568;">${fish.rarity}</div><div class="album-card-hint">${fish.hint}</div>`;
        }
        gridContainer.appendChild(card);
    });
    const totalFish = FISH_DB.length;
    document.getElementById('albumProgressRatio').textContent = `${totalUnlockedCount} / ${totalFish}`;
    let percentage = (totalUnlockedCount / totalFish) * 100;
    document.getElementById('albumProgressBarFill').style.width = `${percentage}%`;
}

// Variabel untuk modal unlock
let pendingUnlockArea = null;
let pendingUnlockCost = 0;
let pendingUnlockAreaName = "";

document.getElementById('areaSelect').addEventListener('change', (e) => {
    const selectedArea = e.target.value;
    
    // Jika area sudah terbuka, langsung pindah
    if (unlockedAreas[selectedArea]) {
        clearAllIntervals();
        currentArea = selectedArea;
        saveGameData();
        showToast(`🌍 Pindah ke: ${AREAS[currentArea].name}`);
        if (isFishing) {
            // reset fishing state
        }
        refresh3DVisualFishes();
        updateGameInterfaces();
        restartIntervalsAfterAreaChange();
        return;
    }
    
    // Jika area belum terbuka, tampilkan modal keren
    const cost = AREA_UNLOCK_COST[selectedArea];
    const areaName = AREAS[selectedArea].name;
    
    // Simpan data untuk unlock
    pendingUnlockArea = selectedArea;
    pendingUnlockCost = cost;
    pendingUnlockAreaName = areaName;
    
    // Update modal
    document.getElementById('unlockAreaName').textContent = areaName;
    document.getElementById('unlockPriceAmount').textContent = cost.toLocaleString();
    
    // Reset warning
    document.getElementById('unlockWarning').innerHTML = '';
    
    // Sembunyikan dropdown dulu (opsional)
    document.getElementById('areaSelect').value = currentArea;
    
    // Tampilkan modal
    const modal = document.getElementById('unlockModal');
    modal.classList.add('show');
});

// Tombol UNLOCK di modal
document.getElementById('unlockConfirmBtn').onclick = () => {
    if (!pendingUnlockArea) return;
    
    const cost = pendingUnlockCost;
    const areaName = pendingUnlockAreaName;
    const selectedArea = pendingUnlockArea;
    
    if (player.coins >= cost) {
        player.coins -= cost;
        unlockedAreas[selectedArea] = true;
        saveGameData();
        updateGameInterfaces();
        showToast(`🔓 ${areaName} terbuka! -${cost.toLocaleString()} Koin 🪙`, false);
        
        // Tutup modal
        document.getElementById('unlockModal').classList.remove('show');
        
        // Pindah ke area yang baru di-unlock
        clearAllIntervals();
        currentArea = selectedArea;
        saveGameData();
        showToast(`🌍 Pindah ke: ${AREAS[currentArea].name}`);
        refresh3DVisualFishes();
        updateGameInterfaces();
        restartIntervalsAfterAreaChange();
        
        // Reset pending
        pendingUnlockArea = null;
    } else {
        // Tampilkan warning di dalam modal
        document.getElementById('unlockWarning').innerHTML = `💰 Koin tidak cukup! Butuh ${cost.toLocaleString()} koin.`;
        document.getElementById('unlockWarning').style.color = '#ef4444';
    }
};

// Tombol BATAL di modal
document.getElementById('unlockCancelBtn').onclick = () => {
    document.getElementById('unlockModal').classList.remove('show');
    const cancelledName = pendingUnlockAreaName;
    pendingUnlockArea = null;
    pendingUnlockAreaName = "";
    pendingUnlockCost = 0;
    showToast(`❌ Membuka ${cancelledName} dibatalkan.`, false);
};

// Klik di luar modal juga bisa menutup
document.getElementById('unlockModal').onclick = (e) => {
    if (e.target === document.getElementById('unlockModal')) {
        document.getElementById('unlockModal').classList.remove('show');
        pendingUnlockArea = null;
    }
};

weatherInterval = setInterval(() => {
    if (acidRainActive) return;
    let weathers = ["☀️ Cerah", "🌧️ Hujan", "🌙 Malam", "🏜️ Musim Paceklik"];
    currentWeather = weathers[Math.floor(Math.random() * weathers.length)];
    document.getElementById('weatherIcon').textContent = currentWeather;
    updateWeatherVisuals(currentWeather);
    if (currentWeather === "🌧️ Hujan") showToast("Cuaca Hujan! Peluang ikan legendaris/mythic setempat naik!");
    if (currentWeather === "🌙 Malam") showToast("Malam tiba! Harga jual ikan naik 1.5x lipat!");
    const weatherIconElem = document.getElementById('weatherIcon');
    if (currentWeather === "🌙 Malam") {
        weatherIconElem.classList.add('weather-icon-night');
    } else {
        weatherIconElem.classList.remove('weather-icon-night');
    }
    refresh3DVisualFishes();
}, 25000);

acidRainCheckInterval = setInterval(() => {
    if (acidRainActive) return;
    const lastAcidRain = localStorage.getItem('lastAcidRainTime');
    const now = Date.now();
    if (lastAcidRain && (now - parseInt(lastAcidRain)) < 600000) return;
    if (Math.random() < 0.05) {
        localStorage.setItem('lastAcidRainTime', now.toString());
        startAcidRain();
    }
}, 120000);

const mainCatchBtn = document.getElementById('catchButton');
mainCatchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (hasGoldSkin && !isAquariumDimension) {
        createGoldBurstEffect();
    }
    if (hasDiamondSkin && !isAquariumDimension) {
        createDiamondBurstEffect();
    }
    executeCatch();
});

window.addEventListener('click', (e) => {
    if (e.target.closest('.ui-container') || e.target.closest('.fishing-panel') || e.target.closest('#premiumCatchOverlay') || e.target.closest('#dimensionToggleBtn')) return;
    if (!isFishing) startCasting();
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    if (hasGoldSkin && window.goldDecorationElements) {
        const panel = document.getElementById('fishingPanel');
        if (panel) {
            const panelRect = panel.getBoundingClientRect();
            const [stackTL, stackBL, stackBR] = window.goldDecorationElements;
            if (stackTL) {
                stackTL.style.left = (panelRect.left - 18) + 'px';
                stackTL.style.top = (panelRect.top - 8) + 'px';
            }
            if (stackBL) {
                stackBL.style.left = (panelRect.left - 18) + 'px';
                stackBL.style.bottom = (window.innerHeight - panelRect.bottom - 8) + 'px';
            }
            if (stackBR) {
                stackBR.style.right = (window.innerWidth - panelRect.right - 18) + 'px';
                stackBR.style.bottom = (window.innerHeight - panelRect.bottom - 8) + 'px';
            }
        }
    }
});

document.getElementById('sellAllBtn').onclick = () => {
    if (inventory.length === 0) {
        showToast("Tidak ada ikan untuk dijual!", true);
        return;
    }
    let totalProfit = 0;
    inventory.forEach(item => {
        let price = item.capturedPrice || calculateSellPrice(item.fish.basePrice, item.sizeLevel || 0);
        if (acidRainActive) price = Math.floor(price * 0.5);
        totalProfit += price * item.qty;
    });
    player.coins += totalProfit;
    inventory = [];
    updateGameInterfaces();
    saveGameData();
    showToast(`Membongkar semua tangkapan! +🪙${totalProfit}`);
};

document.getElementById('scatterFeedBtn').onclick = (e) => {
    e.stopPropagation();
    if (!isAquariumDimension) {
        showToast("Hanya bisa tebar pakan di DIMENSI AKUARIUM!", true);
        return;
    }
    if (feedStock <= 0) {
        showToast("Stok pakan habis! Beli di Pasar.", true);
        return;
    }
    showToast("Klik/Tap di area air untuk menebar pakan!");
    const onWaterClick = (ev) => {
        const vector = new THREE.Vector2();
        vector.x = (ev.clientX / renderer.domElement.clientWidth) * 2 - 1;
        vector.y = -(ev.clientY / renderer.domElement.clientHeight) * 2 + 1;
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(vector, camera);
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.9);
        const target = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(plane, target)) {
            scatterFeed(target.x, target.z);
        } else {
            console.log("Raycaster tidak mengenai plane, menebar di tengah");
            scatterFeed(0, -2);
            showToast("⚠️ Pelet ditebar di area tengah", false);
        }
        renderer.domElement.removeEventListener('click', onWaterClick);
    };
    renderer.domElement.addEventListener('click', onWaterClick);
    setTimeout(() => renderer.domElement.removeEventListener('click', onWaterClick), 5000);
};

const dimToggleBtn = document.getElementById('dimensionToggleBtn');
const fPanel = document.getElementById('fishingPanel');
const blinkOverlay = document.getElementById('dimensionBlink');

dimToggleBtn.onclick = (e) => {
    e.stopPropagation();
    
    if (isFishing) {
        clearInterval(engineInterval);
        isFishing = false;
        document.getElementById('currentFishDisplay').textContent = "🌊 Sentuh area air untuk melempar kail!";
        document.getElementById('timingPointer').style.left = '0%';
    }
    
    blinkOverlay.style.opacity = '1';
    
    setTimeout(() => {
        isAquariumDimension = !isAquariumDimension;
        
        // Sembunyikan/tampilkan batangan emas ← TAMBAHKAN INI
        toggleGoldDecorationVisibility();
        
        if (isAquariumDimension) {
            dimToggleBtn.textContent = "🎣 KEMBALI MEMANCING";
            dimToggleBtn.style.background = "linear-gradient(135deg, #f59e0b, #d97706)";
            fPanel.style.opacity = '0';
            fPanel.style.pointerEvents = 'none';
            showToast("Pindah Dunia: Dimensi Akuarium Bawah Air 🐳");
        } else {
            dimToggleBtn.textContent = "🔄 DIMENSI AKUARIUM";
            dimToggleBtn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
            fPanel.style.opacity = '1';
            fPanel.style.pointerEvents = 'auto';
            showToast("Kembali ke Permukaan Laut Utama 🛶");
        }
        
        resetCameraForDimension();
        refresh3DVisualFishes();
        
        setTimeout(() => {
            blinkOverlay.style.opacity = '0';
        }, 50);
    }, 150);
};

const panels = {
    shopPanel: document.getElementById('shopPanel'),
    inventoryPanel: document.getElementById('inventoryPanel'),
    aquariumPanel: document.getElementById('aquariumPanel'),
    missionPanel: document.getElementById('missionPanel'),
    albumPanel: document.getElementById('albumPanel')
};

document.getElementById('shopTabBtn').onclick = () => { panels.shopPanel.classList.toggle('show'); panels.inventoryPanel.classList.remove('show'); panels.aquariumPanel.classList.remove('show'); panels.missionPanel.classList.remove('show'); panels.albumPanel.classList.remove('show'); };
document.getElementById('inventoryTabBtn').onclick = () => { panels.inventoryPanel.classList.toggle('show'); panels.shopPanel.classList.remove('show'); panels.aquariumPanel.classList.remove('show'); panels.missionPanel.classList.remove('show'); panels.albumPanel.classList.remove('show'); };
document.getElementById('aquariumTabBtn').onclick = () => { panels.aquariumPanel.classList.toggle('show'); panels.shopPanel.classList.remove('show'); panels.inventoryPanel.classList.remove('show'); panels.missionPanel.classList.remove('show'); panels.albumPanel.classList.remove('show'); };
document.getElementById('missionTabBtn').onclick = () => { panels.missionPanel.classList.toggle('show'); panels.shopPanel.classList.remove('show'); panels.inventoryPanel.classList.remove('show'); panels.aquariumPanel.classList.remove('show'); panels.albumPanel.classList.remove('show'); };
document.getElementById('albumTabBtn').onclick = () => { panels.albumPanel.classList.toggle('show'); panels.shopPanel.classList.remove('show'); panels.inventoryPanel.classList.remove('show'); panels.aquariumPanel.classList.remove('show'); panels.missionPanel.classList.remove('show'); };

document.querySelectorAll('.close-panel').forEach(b => { 
    b.onclick = () => { 
        panels[b.getAttribute('data-panel')].classList.remove('show');
        // Tampilkan kembali batangan emas jika panel ditutup
        toggleGoldDecorationVisibility();
    }; 
});

function collectAllSize5Fish() {
    const size5FishIndices = [];
    aquarium.forEach((item, index) => {
        if (item.sizeLevel >= 5) {
            size5FishIndices.push(index);
        }
    });
    if (size5FishIndices.length === 0) {
        showToast("⭐ Tidak ada ikan dengan Size 5 di akuarium!", true);
        return;
    }
    const totalFish = size5FishIndices.length;
    for (let i = size5FishIndices.length - 1; i >= 0; i--) {
        const idx = size5FishIndices[i];
        const fishItem = aquarium[idx];
        const existingInv = inventory.find(inv => inv.fish.name === fishItem.fish.name);
        if (existingInv) {
            existingInv.qty++;
        } else {
            inventory.push({
                fish: fishItem.fish, qty: 1, sizeLevel: fishItem.sizeLevel,
                capturedPrice: fishItem.capturedPrice || calculateSellPrice(fishItem.fish.basePrice, fishItem.sizeLevel)
            });
        }
        aquarium.splice(idx, 1);
    }
    updateGameInterfaces();
    refresh3DVisualFishes();
    saveGameData();
    showToast(`⭐ Berhasil mengambil ${totalFish} ikan Size 5 ke ember!`, false);
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createStarEffect(), i * 60);
    }
}

function createStarEffect() {
    const star = document.createElement('div');
    star.innerHTML = '⭐';
    star.style.position = 'fixed';
    star.style.fontSize = (20 + Math.random() * 15) + 'px';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = '50%';
    star.style.zIndex = '9999';
    star.style.pointerEvents = 'none';
    star.style.opacity = '1';
    star.style.transition = 'all 1.5s ease-out';
    document.body.appendChild(star);
    setTimeout(() => {
        star.style.transform = `translateY(-${100 + Math.random() * 200}px) rotate(${Math.random() * 360}deg)`;
        star.style.opacity = '0';
    }, 10);
    setTimeout(() => {
        star.remove();
    }, 1500);
}

function getSizeStars(level) {
    return "⭐".repeat(level) + (level < 5 ? "☆".repeat(5 - level) : "");
}

function calculateSellPrice(basePrice, sizeLevel) {
    let price = Math.floor(basePrice * (1 + sizeLevel * 0.3));
    return price;
}

function createPellet(x, z) {
    const pelletDiv = document.createElement('div');
    pelletDiv.textContent = '🍪';
    pelletDiv.className = 'pellet-obj';
    pelletDiv.style.fontSize = '22px';
    pelletDiv.style.filter = 'drop-shadow(0 0 4px #f59e0b)';
    
    const mesh = new CSS2DObject(pelletDiv);
    mesh.position.set(x, -0.9, z);
    scene.add(mesh);
    
    // Beri ID unik agar tidak salah hapus saat di-spam banyak
    const pelletId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    activePellets.push({ 
        id: pelletId, 
        mesh: mesh, 
        pos: new THREE.Vector3(x, -0.9, z) 
    });
    
}

function scatterFeed(x, z) {
    if (feedStock <= 0) {
        showToast("Stok pakan habis! Beli di Pasar.", true);
        return false;
    }
    
    feedStock--;
    updateGameInterfaces();
    
    const jumlah = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < jumlah; i++) {
        const offX = (Math.random() - 0.5) * 2.5;
        const offZ = (Math.random() - 0.5) * 2.5;
        createPellet(x + offX, z + offZ);
    }
    
    showToast(`🍖 Tebar ${jumlah} pelet! Stok: ${feedStock}`);
    saveGameData();
    return true;
}

function moveFishToPellet() {
    if (!isAquariumDimension) return;
    for (let fish of visualFishes) {
        if (!fish.obj) continue;
        if (activePellets.length === 0) {
            fish.obj.position.x += (fish.baseSpeed || 0.015);
            let maxBound = 6;
            if (fish.obj.position.x > maxBound) fish.obj.position.x = -maxBound;
            fish.obj.position.y += Math.sin(Date.now() * 0.002 + (fish.baseSpeed || 0.01) * 100) * 0.003;
            continue;
        }
        let nearest = null;
        let minDist = Infinity;
        for (let pellet of activePellets) {
            const dx = pellet.pos.x - fish.obj.position.x;
            const dy = pellet.pos.y - fish.obj.position.y;
            const dz = pellet.pos.z - fish.obj.position.z;
            const dist = Math.hypot(dx, dy, dz);
            if (dist < minDist) {
                minDist = dist;
                nearest = pellet;
            }
        }
        if (nearest) {
            const dx = nearest.pos.x - fish.obj.position.x;
            const dy = nearest.pos.y - fish.obj.position.y;
            const dz = nearest.pos.z - fish.obj.position.z;
            const distance = Math.hypot(dx, dz);
            const angleXZ = Math.atan2(dz, dx);
            const angleY = Math.atan2(dy, distance);
            const move = (fish.baseSpeed || 0.015) * 2.0;
            fish.obj.position.x += Math.cos(angleXZ) * move;
            fish.obj.position.z += Math.sin(angleXZ) * move;
            fish.obj.position.y += Math.sin(angleY) * move;
            fish.obj.position.y = Math.max(-3.8, Math.min(-0.3, fish.obj.position.y));
            if (minDist < 0.8) {
                const idx = activePellets.findIndex(p => p.mesh === nearest.mesh);
if (idx !== -1) {
    const pellet = activePellets[idx];
    scene.remove(pellet.mesh);
    activePellets.splice(idx, 1);
}
                const gain = 10 + Math.floor(Math.random() * 11);
                const fishRef = fish.fishRef;
                fishRef.growthProgress = (fishRef.growthProgress || 0) + gain;
                if (fishRef.growthProgress >= 100) {
                    fishRef.growthProgress = 0;
                    fishRef.sizeLevel = Math.min(5, (fishRef.sizeLevel || 0) + 1);
                    showToast(`🎉 ${fishRef.fish.name} SIZE LEVEL ${fishRef.sizeLevel}!`);
                    const newSize = 24 + (fishRef.sizeLevel) * 4;
                    fish.obj.element.style.fontSize = newSize + 'px';
                }
                if (fishRef.growthProgress > 100) fishRef.growthProgress = 100;
                showToast(`🐟 ${fishRef.fish.name} memakan pelet! +${gain}% Growth`);
                updateGameInterfaces();
                saveGameData();
            }
        }
    }
}

function startAcidRain() {
    if (acidRainActive) return;
    clearWeatherEffects();
    acidRainActive = true;
    const duration = 180 + Math.floor(Math.random() * 120);
    acidRainEndTime = Date.now() + (duration * 1000);
    document.getElementById('weatherIcon').style.display = 'none';
    const acidWarning = document.getElementById('acidRainWarning');
    acidWarning.style.display = 'flex';
    acidWarning.style.background = '#7c2d12';
    showToast("⚠️ HUJAN ASAM! Harga jual turun 50%!", false);
    const warningToast = document.createElement('div');
    warningToast.className = 'toast-msg';
    warningToast.style.background = '#cc0000';
    warningToast.style.color = '#fff';
    warningToast.style.fontWeight = 'bold';
    warningToast.textContent = "⚠️⚠️⚠️ HUJAN ASAM! Harga jual TURUN 50%! ⚠️⚠️⚠️";
    document.body.appendChild(warningToast);
    setTimeout(() => warningToast.remove(), 4000);
    const overlay = document.createElement('div');
    overlay.id = 'acidRainOverlay';
    overlay.className = 'acid-rain-overlay';
    document.body.appendChild(overlay);
    let rainInterval = setInterval(() => {
        if (!acidRainActive) {
            clearInterval(rainInterval);
            return;
        }
        for (let i = 0; i < 3; i++) {
            const drop = document.createElement('div');
            drop.className = 'acid-drop';
            drop.style.left = Math.random() * window.innerWidth + 'px';
            drop.style.animationDuration = (0.8 + Math.random() * 0.7) + 's';
            drop.style.height = (8 + Math.random() * 12) + 'px';
            document.body.appendChild(drop);
            setTimeout(() => drop.remove(), 1000);
        }
    }, 100);
    window.acidRainInterval = rainInterval;
    if (acidRainTimeout) clearTimeout(acidRainTimeout);
    acidRainTimeout = setTimeout(() => {
        endAcidRain();
    }, duration * 1000);
    saveGameData();
}

function endAcidRain() {
    if (!acidRainActive) return;
    acidRainActive = false;
    updateWeatherVisuals(currentWeather);
    acidRainEndTime = 0;
    if (window.acidRainInterval) {
        clearInterval(window.acidRainInterval);
        window.acidRainInterval = null;
    }
    document.getElementById('weatherIcon').style.display = 'flex';
    document.getElementById('acidRainWarning').style.display = 'none';
    const overlay = document.getElementById('acidRainOverlay');
    if (overlay) overlay.remove();
    document.querySelectorAll('.acid-drop').forEach(drop => drop.remove());
    showToast("✅ Hujan asam berakhir. Harga jual kembali normal.", false);
    updateGameInterfaces();
    saveGameData();
}

function checkAcidRainStatus() {
    if (acidRainEndTime > 0 && Date.now() < acidRainEndTime) {
        const remaining = (acidRainEndTime - Date.now()) / 1000;
        if (remaining > 0) {
            acidRainActive = true;
            const overlay = document.createElement('div');
            overlay.id = 'acidRainOverlay';
            overlay.className = 'acid-rain-overlay';
            document.body.appendChild(overlay);
            let rainInterval = setInterval(() => {
                if (!acidRainActive) {
                    clearInterval(rainInterval);
                    return;
                }
                for (let i = 0; i < 3; i++) {
                    const drop = document.createElement('div');
                    drop.className = 'acid-drop';
                    drop.style.left = Math.random() * window.innerWidth + 'px';
                    drop.style.animationDuration = (0.8 + Math.random() * 0.7) + 's';
                    drop.style.height = (8 + Math.random() * 12) + 'px';
                    document.body.appendChild(drop);
                    setTimeout(() => drop.remove(), 1000);
                }
            }, 100);
            window.acidRainInterval = rainInterval;
            if (acidRainTimeout) clearTimeout(acidRainTimeout);
            acidRainTimeout = setTimeout(() => {
                endAcidRain();
            }, remaining * 1000);
            document.getElementById('weatherIcon').style.display = 'none';
            const acidWarning = document.getElementById('acidRainWarning');
            acidWarning.style.display = 'flex';
            acidWarning.style.background = '#7c2d12';
        }
    } else {
        acidRainActive = false;
        acidRainEndTime = 0;
    }
}

let weatherRainInterval = null;
let weatherFishInterval = null;
let weatherStars = [];

function clearWeatherEffects() {
    const oldOverlay = document.getElementById('dynamicWeatherOverlay');
    if (oldOverlay) oldOverlay.remove();
    const oldRays = document.getElementById('sunRaysEffect');
    if (oldRays) oldRays.remove();
    const oldMoon = document.getElementById('moonEffect');
    if (oldMoon) oldMoon.remove();
    document.querySelectorAll('.star').forEach(star => star.remove());
    weatherStars = [];
    if (weatherRainInterval) {
        clearInterval(weatherRainInterval);
        weatherRainInterval = null;
    }
    if (weatherFishInterval) {
        clearInterval(weatherFishInterval);
        weatherFishInterval = null;
    }
}

function applySunnyEffect() {
    clearWeatherEffects();
    const overlay = document.createElement('div');
    overlay.id = 'dynamicWeatherOverlay';
    overlay.className = 'weather-overlay weather-sunny';
    document.body.appendChild(overlay);
    const rays = document.createElement('div');
    rays.id = 'sunRaysEffect';
    rays.className = 'sun-rays';
    document.body.appendChild(rays);
}

function applyRainyEffect() {
    clearWeatherEffects();
    const overlay = document.createElement('div');
    overlay.id = 'dynamicWeatherOverlay';
    overlay.className = 'weather-overlay weather-rainy';
    document.body.appendChild(overlay);
    if (weatherRainInterval) clearInterval(weatherRainInterval);
    weatherRainInterval = setInterval(() => {
        if (acidRainActive) return;
        for (let i = 0; i < 4; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop-blue';
            drop.style.left = Math.random() * window.innerWidth + 'px';
            drop.style.animationDuration = (0.6 + Math.random() * 0.5) + 's';
            drop.style.height = (8 + Math.random() * 10) + 'px';
            document.body.appendChild(drop);
            setTimeout(() => drop.remove(), 1000);
        }
    }, 80);
}

function applyNightEffect() {
    clearWeatherEffects();
    const overlay = document.createElement('div');
    overlay.id = 'dynamicWeatherOverlay';
    overlay.className = 'weather-overlay weather-night';
    document.body.appendChild(overlay);
    const moon = document.createElement('div');
    moon.id = 'moonEffect';
    moon.className = 'moon';
    document.body.appendChild(moon);
    for (let i = 0; i < 60; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = 1 + Math.random() * 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = Math.random() * window.innerHeight * 0.7 + 'px';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (1 + Math.random() * 3) + 's';
        document.body.appendChild(star);
        weatherStars.push(star);
    }
}

function applyFishRainEffect() {
    clearWeatherEffects();
    const overlay = document.createElement('div');
    overlay.id = 'dynamicWeatherOverlay';
    overlay.className = 'weather-overlay weather-fish-rain';
    document.body.appendChild(overlay);
    
    if (weatherFishInterval) clearInterval(weatherFishInterval);
    weatherFishInterval = setInterval(() => {
        if (acidRainActive) return;
        // PERBAIKAN: cek "Musim Paceklik" bukan "Hujan Ikan"
        if (currentWeather !== "🏜️ Musim Paceklik") return;
        
        // Kurangi dari 5 jadi 2 ikan per interval
        for (let i = 0; i < 2; i++) {
            const fishIcon = document.createElement('div');
            fishIcon.className = 'rain-fish';
            fishIcon.textContent = '🐟';
            fishIcon.style.left = Math.random() * window.innerWidth + 'px';
            fishIcon.style.animationDuration = (1.8 + Math.random() * 1.2) + 's';
            fishIcon.style.fontSize = (14 + Math.random() * 6) + 'px';
            fishIcon.style.opacity = '0.7';
            document.body.appendChild(fishIcon);
            setTimeout(() => fishIcon.remove(), 2000);
        }
    }, 300);
}

function updateWeatherVisuals(weatherType) {
    if (acidRainActive) return;
    switch (weatherType) {
        case "☀️ Cerah": applySunnyEffect(); break;
        case "🌧️ Hujan": applyRainyEffect(); break;
        case "🌙 Malam": applyNightEffect(); break;
        case "🏜️ Musim Paceklik": applyFishRainEffect(); break;
        default: clearWeatherEffects(); break;
    }
}

loadGameData();
init3DWorld();
updateGameInterfaces();
checkAcidRainStatus();
setTimeout(() => {
    loadSkinStatus();
}, 100);

aquariumRefreshInterval = setInterval(() => {
    if (isAquariumDimension && aquarium.length > 15) {
        refresh3DVisualFishes();
    }
}, 30000);

let bgmAudio = document.getElementById('bgmAudio');
let bgmEnabled = true;
let bgmVolume = 0.5;

function setNetworkSpeedMode(mode) {
    networkSpeedMode = mode;
    localStorage.setItem('FishingMaster_NetworkSpeed', mode);
    const label = document.getElementById('networkSpeedLabel');
    if (label) {
        if (mode === 'normal') label.innerHTML = 'NORMAL';
        else if (mode === 'turbo') label.innerHTML = 'TURBO ⚡';
        else label.innerHTML = 'LITE 📶';
    }
    const normalBtn = document.getElementById('speedNormalBtn');
    const turboBtn = document.getElementById('speedTurboBtn');
    const liteBtn = document.getElementById('speedLiteBtn');
    if (normalBtn) {
        normalBtn.style.background = mode === 'normal' ? '#38a169' : '#4a5568';
        normalBtn.style.opacity = mode === 'normal' ? '1' : '0.7';
    }
    if (turboBtn) {
        turboBtn.style.background = mode === 'turbo' ? '#e67e22' : '#4a5568';
        turboBtn.style.opacity = mode === 'turbo' ? '1' : '0.7';
    }
    if (liteBtn) {
        liteBtn.style.background = mode === 'lite' ? '#4299e1' : '#4a5568';
        liteBtn.style.opacity = mode === 'lite' ? '1' : '0.7';
    }
    applyNetworkSpeedEffect();
    showToast(`📡 Mode ${mode.toUpperCase()} diaktifkan!`, false);
}

function applyNetworkSpeedEffect() {
    if (networkSpeedMode === 'turbo') {
        fishMovementSpeed = 1.8;
        if (engineInterval) {
            clearInterval(engineInterval);
            if (isFishing && currentFish) {
                let baseSpeed = currentFish.speed;
                let reduction = player.lineLevel * 0.35;
                let finalSpeed = Math.max(1.3, baseSpeed - reduction) * 1.5;
                engineInterval = setInterval(() => {
                    pointerProgress += pointerDirection * (finalSpeed * 1.5);
                    if (pointerProgress >= 100) { pointerProgress = 100; pointerDirection = -1; }
                    if (pointerProgress <= 0) { pointerProgress = 0; pointerDirection = 1; }
                    document.getElementById('timingPointer').style.left = pointerProgress + '%';
                }, 20);
            }
        }
    } else if (networkSpeedMode === 'lite') {
        fishMovementSpeed = 0.6;
        if (engineInterval) {
            clearInterval(engineInterval);
            if (isFishing && currentFish) {
                let baseSpeed = currentFish.speed;
                let reduction = player.lineLevel * 0.35;
                let finalSpeed = Math.max(1.3, baseSpeed - reduction) * 0.7;
                engineInterval = setInterval(() => {
                    pointerProgress += pointerDirection * (finalSpeed * 1.5);
                    if (pointerProgress >= 100) { pointerProgress = 100; pointerDirection = -1; }
                    if (pointerProgress <= 0) { pointerProgress = 0; pointerDirection = 1; }
                    document.getElementById('timingPointer').style.left = pointerProgress + '%';
                }, 40);
            }
        }
    } else {
        fishMovementSpeed = 1.0;
        if (engineInterval) {
            clearInterval(engineInterval);
            if (isFishing && currentFish) {
                let baseSpeed = currentFish.speed;
                let reduction = player.lineLevel * 0.35;
                let finalSpeed = Math.max(1.3, baseSpeed - reduction);
                engineInterval = setInterval(() => {
                    pointerProgress += pointerDirection * (finalSpeed * 1.5);
                    if (pointerProgress >= 100) { pointerProgress = 100; pointerDirection = -1; }
                    if (pointerProgress <= 0) { pointerProgress = 0; pointerDirection = 1; }
                    document.getElementById('timingPointer').style.left = pointerProgress + '%';
                }, 30);
            }
        }
    }
    if (visualFishes.length > 0) {
        visualFishes.forEach(fish => {
            if (fish.mesh) {
                // Simpan kecepatan asli sekali saja, lalu selalu hitung dari sana
                if (!fish.originalSpeed) fish.originalSpeed = fish.speed || 0.025;
                fish.speed = fish.originalSpeed * fishMovementSpeed;
            }
            if (fish.obj) {
                if (!fish.originalBaseSpeed) fish.originalBaseSpeed = fish.baseSpeed || 0.015;
                fish.baseSpeed = fish.originalBaseSpeed * (networkSpeedMode === 'turbo' ? 1.5 : networkSpeedMode === 'lite' ? 0.6 : 1.0);
            }
        });
    }
}

function loadNetworkSpeedMode() {
    const saved = localStorage.getItem('FishingMaster_NetworkSpeed');
    if (saved && (saved === 'normal' || saved === 'turbo' || saved === 'lite')) {
        networkSpeedMode = saved;
    } else {
        networkSpeedMode = 'normal';
    }
    setNetworkSpeedMode(networkSpeedMode);
}

document.getElementById('collectAllSize5Btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    collectAllSize5Fish();
});




function loadSettings() {
    const savedSettings = localStorage.getItem('FishingMaster_Settings');
    if (savedSettings) {
        try {
            const settings = JSON.parse(savedSettings);
            bgmEnabled = settings.bgmEnabled ?? true;
            bgmVolume = settings.bgmVolume ?? 0.5;
            if (bgmAudio) {
                bgmAudio.volume = bgmVolume;
                if (bgmEnabled) bgmAudio.play().catch(() => {});
                else bgmAudio.pause();
            }
            const toggleBtn = document.getElementById('bgmToggleBtn');
            if (toggleBtn) {
                toggleBtn.textContent = bgmEnabled ? "🔊 ON" : "🔇 OFF";
                toggleBtn.style.background = bgmEnabled ? "#38a169" : "#e53e3e";
            }
            const slider = document.getElementById('volumeSlider');
            if (slider) {
                slider.value = bgmVolume * 100;
                document.getElementById('volumeValue').textContent = Math.floor(bgmVolume * 100);
            }
        } catch (e) {}
    }
}

document.getElementById('speedNormalBtn')?.addEventListener('click', () => setNetworkSpeedMode('normal'));
document.getElementById('speedTurboBtn')?.addEventListener('click', () => setNetworkSpeedMode('turbo'));
document.getElementById('speedLiteBtn')?.addEventListener('click', () => setNetworkSpeedMode('lite'));

function saveSettings() {
    localStorage.setItem('FishingMaster_Settings', JSON.stringify({
        bgmEnabled: bgmEnabled,
        bgmVolume: bgmVolume
    }));
}

function toggleBGM() {
    bgmEnabled = !bgmEnabled;
    if (bgmEnabled) {
        bgmAudio.play().catch(e => console.log("Gagal play", e));
    } else {
        bgmAudio.pause();
    }
    saveSettings();
    const toggleBtn = document.getElementById('bgmToggleBtn');
    if (toggleBtn) {
        toggleBtn.textContent = bgmEnabled ? "🔊 ON" : "🔇 OFF";
        toggleBtn.style.background = bgmEnabled ? "#38a169" : "#e53e3e";
    }
}

function setVolume(value) {
    bgmVolume = value / 100;
    if (bgmAudio) bgmAudio.volume = bgmVolume;
    document.getElementById('volumeValue').textContent = value;
    saveSettings();
}

document.getElementById('settingsBtnLeft')?.addEventListener('click', () => {
    document.getElementById('settingsPanel').classList.toggle('show');
});

document.getElementById('closeSettingsBtn')?.addEventListener('click', () => {
    document.getElementById('settingsPanel').classList.remove('show');
});

document.getElementById('bgmToggleBtn')?.addEventListener('click', toggleBGM);
document.getElementById('volumeSlider')?.addEventListener('input', (e) => {
    setVolume(parseInt(e.target.value));
});

loadSettings();
loadNetworkSpeedMode();

// ========== FITUR MISCHIEF (??? TOMBOL NAKAL) ==========
let mischiefActive = false;
let mischiefPopups = [];
let mischiefInterval = null;

function spawnFivePopups() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createMischiefPopup(false);
        }, i * 100); // jeda 0.1 detik antar popup biar gak crash
    }
}

function playGlitchSound() {
    // Buat suara glitch pakai Web Audio API (tanpa file MP3)
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.3;
        oscillator.type = 'sawtooth';
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.3);
        oscillator.stop(audioCtx.currentTime + 0.3);
    } catch(e) {
        console.log("AudioContext tidak didukung");
    }
}

function createMischiefPopup(isSecond = false) {
    // Buat popup di posisi acak
    const popup = document.createElement('div');
    popup.className = 'mischief-popup';
    
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 150;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    popup.style.left = randomX + 'px';
    popup.style.top = randomY + 'px';
    popup.style.position = 'fixed';
    
    popup.innerHTML = `
        <p> kamu konyol 😹</p>
        <button class="mischief-close">✖️ TUTUP</button>
    `;
    
    document.body.appendChild(popup);
    mischiefPopups.push(popup);
    
    // Efek glitch visual
    const glitchOverlay = document.createElement('div');
    glitchOverlay.className = 'glitch-overlay';
    document.body.appendChild(glitchOverlay);
    setTimeout(() => glitchOverlay.remove(), 450);
    
    // Mainkan suara glitch
    playGlitchSound();
    
    // Event listener untuk tombol close
    const closeBtn = popup.querySelector('.mischief-close');
    closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Setiap klik close, LANGSUNG buat 10 popup baru
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createMischiefPopup(false);
        }, i * 50); // jeda 0.05 detik antar popup
    }
    
    // Efek tambahan
    playGlitchSound();
    const glitch2 = document.createElement('div');
    glitch2.className = 'glitch-overlay';
    document.body.appendChild(glitch2);
    setTimeout(() => glitch2.remove(), 300);
});
    
    return popup;
}

function clearAllMischiefPopups() {
    mischiefPopups.forEach(popup => {
        if (popup && popup.remove) popup.remove();
    });
    mischiefPopups = [];
}

// Tombol ??? di settings
const mischiefBtn = document.getElementById('mischiefBtn');
if (mischiefBtn) {
    mischiefBtn.addEventListener('click', () => {
        if (mischiefActive) return;
        
        mischiefActive = true;
        
        // Efek glitch sesaat
        const glitchOverlay = document.createElement('div');
        glitchOverlay.className = 'glitch-overlay';
        document.body.appendChild(glitchOverlay);
        setTimeout(() => glitchOverlay.remove(), 500);
        
        playGlitchSound();
        
        // Buat popup pertama
        createMischiefPopup(false);
        
        // Setiap 3 detik munculkan 5 popup
        if (mischiefInterval) clearInterval(mischiefInterval);
        mischiefInterval = setInterval(() => {
            spawnFivePopups();
        }, 3000);
        
        showToast("❓ Tombol misterius ditekan... 😈", false);
    });
}

document.body.addEventListener('click', function firstClick() {
    if (bgmEnabled && bgmAudio && bgmAudio.paused) {
        bgmAudio.play().catch(e => console.log("Play after click", e));
    }
    document.body.removeEventListener('click', firstClick);
}, { once: true });