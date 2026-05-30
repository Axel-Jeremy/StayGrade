const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const cors = require('cors'); // Wajib ditambahkan agar SolidJS bisa akses

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
// express.json() sangat penting di sini karena SolidJS akan mengirim data (POST) dalam format JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- DATABASE PATH ---
const dbPath = path.resolve(__dirname, 'data.json');

// --- HELPER FUNCTION ---
// Perbedaan dari tugas lamamu: Kita buat sebagai fungsi agar data dibaca ulang setiap kali ada request.
// Jika ditaruh di luar (seperti kodemu sebelumnya), server tidak akan membaca data baru 
// jika nanti kamu melakukan POST (tambah ulasan/user baru) tanpa merestart server.
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

// --- ROUTES / ENDPOINTS ---
app.get('/api/hotels', (req, res) => {
    const data = readDB();

    // Nanti kamu bisa mengadaptasi logika filter atau pagination dari tugas lamamu di sini
    // contoh: const filtered = filterHotels(data.hotels, req.query.search);

    res.header('Content-Type', 'application/json');
    // res.json(data.hotels) sebenarnya adalah versi modern dari res.send(JSON.stringify(...)), 
    // namun saya pertahankan gayamu dari referensi sebelumnya.
    res.send(JSON.stringify(data.hotels, null, 2));
});

app.post('/api/users', (req, res) => {
    // tangkep email dan password yang dikirim oleh frontend
    const { email, password } = req.body; 
    
    // Baca seluruh isi database JSON kamu
    const data = readDB();

    // cari satu user yang email dan passwordnya cocok
    const foundUser = data.users.find(
        (user) => user.email === email && user.password === password
    );

    if (foundUser) {
        res.json(foundUser); 
    } else {
        // salah email/password
        res.status(401).json({ message: "Email atau password salah" });
    }
});

// Endpoint untuk mengambil detail SATU hotel berdasarkan ID
app.get('/api/hotels/:id', (req, res) => {
    const data = readDB();
    const hotelId = parseInt(req.params.id, 10);

    // Mencari hotel yang ID-nya cocok
    const hotel = data.hotels.find(h => h.id === hotelId);

    if (!hotel) {
        return res.status(404).json({ message: "Hotel tidak ditemukan" });
    }

    res.json(hotel);
});

// Endpoint untuk mengambil daftar ulasan berdasarkan ID hotel
app.get('/api/reviews/:hotelId', (req, res) => {
    const data = readDB();
    const hotelId = parseInt(req.params.hotelId, 10);

    // Memfilter ulasan yang hanya memiliki hotelId yang cocok
    const reviews = data.reviews.filter(r => r.hotelId === hotelId);

    res.json(reviews);
});

// --- SERVER LISTENER ---
app.listen(5000, () => {
    console.log('Listening at http://localhost:5000 ...');
});