const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const cors = require('cors'); // Wajib ditambahkan agar SolidJS bisa akses
const session = require('express-session');

const app = express();

// --- MIDDLEWARE ---
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // ngebolehin cookie session dikirim antar port
}));

// express.json() sangat penting di sini karena SolidJS akan mengirim data (POST) dalam format JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'staygrade',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, // Mencegah pencurian cookie lewat JavaScript di browser
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 // 1 hari
    }
}));

// --- DATABASE PATH ---
const dbPath = path.resolve(__dirname, 'data.json');

// --- HELPER FUNCTION ---
// Perbedaan dari tugas lamamu: Kita buat sebagai fungsi agar data dibaca ulang setiap kali ada request.
// Jika ditaruh di luar (seperti kodemu sebelumnya), server tidak akan membaca data baru 
// jika nanti kamu melakukan POST (tambah ulasan/user baru) tanpa merestart server.
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');

// --- ROUTES / ENDPOINTS ---
app.get('/api/login', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: 'Belum login' });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: 'Gagal logout' });
        res.clearCookie('connect.sid'); 
        res.json({ message: 'Logout berhasil' });
    });
});

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
        req.session.user = {
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role
        };
        res.json(foundUser);
    } else {
        // salah email/password
        res.status(401).json({ message: "Email atau password salah" });
    }
});

app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const data = readDB();

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Semua field harus diisi" });
    }

    const existingUser = data.users.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).json({ message: "Email sudah terdaftar" });
    }

    const newUser = {
        name,
        email,
        password,
        role: "user"
    };

    data.users.push(newUser);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');

    req.session.user = {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    };
    res.status(201).json(newUser);
});

app.post('/api/hotels', (req, res) => {
    // 1. Ambil data dari request body yang dikirim frontend
    const { name, location, image, description, facilities, price } = req.body;
    const data = readDB();

    // 2. Validasi
    if (!name || !location || !image || !description || !facilities || !price) {
        return res.status(400).json({ message: "Semua field harus diisi" });
    }

    let newId = "1"; // Default jika array hotels masih kosong sama sekali

    if (data.hotels && data.hotels.length > 0) {
        const maxId = data.hotels.reduce((max, hotel) => {
            const currentId = parseInt(hotel.id, 10);
            return currentId > max ? currentId : max;
        }, 0);

        // Tambahkan 1 dari ID tertinggi, lalu ubah kembali jadi string
        newId = (maxId + 1);
    }

    // 3. Buat objek hotel baru
    const newHotel = {
        id: newId,
        name: name,
        location: location,
        image: image,
        about: description,
        facilities: facilities.split(',').map(item => item.trim()), 
        prices: price, 
        rating: 0, 
        reviewCount: 0
    };

    // 4. Masukkan ke array hotels dan simpan ke file JSON
    data.hotels.push(newHotel);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');

    // 5. Kirim respon sukses
    res.status(201).json(newHotel);
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

// buat ngambil daftar ulasan berdasarkan email user
app.get('/api/reviews/user/:email', (req, res) => {
    const data = readDB();
    const userEmail = req.params.email;

    // filter review cuma email yang cocok
    const userReviews = data.reviews.filter(r => r.email === userEmail);

    res.json(userReviews);
});

app.post('/api/reviews', (req, res) => {
    const data = readDB();
    const { hotelId, rating, name, email, comment, time } = req.body;
    const parsedHotelId = parseInt(hotelId, 10);

    //Ngecheck si hotelid dari review yang dikirim ada engga di data.json
    const cekHotel = data.hotels.find(hotel => hotel.id === parsedHotelId);
    if (!cekHotel) {
        return res.status(400).json({ message: "Gagal menambah review. Hotel tidak ditemukan!" });
    }

    //Id review baru bakal selalu +1 dari id review terakhir di data.json
    const idBaru = data.reviews.length > 0
    ? Math.max(...data.reviews.map(reviews => reviews.id)) + 1
    :1;

    const reviewBaru = {
        id: idBaru,
        hotelId: parsedHotelId,
        rating: parseInt(rating, 10),
        name: name,
        email: email,
        comment: comment,
        time: time
    };

    data.reviews.push(reviewBaru);
    writeDB(data);
    res.status(201).json(reviewBaru);
});

app.delete('/api/reviews/:id', (req, res) => {
    const reviewId = parseInt(req.params.id, 10);
    const data = readDB();

    const reviewIndex = data.reviews.findIndex(
        r => r.id === reviewId
    );

    if (reviewIndex === -1) {
        return res.status(404).json({
            message: 'Review tidak ditemukan'
        });
    }

    data.reviews.splice(reviewIndex, 1);

    writeDB(data);

    res.json({
        message: 'Review berhasil dihapus'
    });
});

app.delete('/api/hotels/:id', (req, res) => {
    const hotelId = parseInt(req.params.id, 10);
    const data = readDB();

    const hotelIndex = data.hotels.findIndex(
        h => h.id === hotelId
    );

    if (hotelIndex === -1) {
        return res.status(404).json({
            message: 'Hotel tidak ditemukan'
        });
    }

    data.hotels.splice(hotelIndex, 1);

    data.reviews = data.reviews.filter(
        review => review.hotelId !== hotelId
    );

    writeDB(data);

    res.json({
        message: 'Hotel berhasil dihapus'
    });
});

app.put('/api/reviews/:id', (req, res) => {
    const reviewId = parseInt(req.params.id, 10);
    const { rating, comment } = req.body;

    const data = readDB();

    const review = data.reviews.find(
        r => r.id === reviewId
    );

    if (!review) {
        return res.status(404).json({
            message: 'Review tidak ditemukan'
        });
    }

    review.rating = parseInt(rating, 10);
    review.comment = comment;

    writeDB(data);

    res.json(review);
});

// --- SERVER LISTENER ---
app.listen(5000, () => {
    console.log('Listening at http://localhost:5000 ...');
});