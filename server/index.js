const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');

const app = express();

//Variabel untuk konfigurasi penyimpanan file gambar hotel yang diupload menggunakan multer
const storage = multer.diskStorage({
    //Untuk menentukan tujuan penyimpanan file yang diupload
    destination: (req, file, cb) => {
        cb(null, 'Picture/');
    },
    //Pembuatan nama file yang emnggunakan date agar tidak terjadi duplikasi nama file
    filename: (req, file, cb) => {
        const namaUnik = Date.now() + '-' + file.originalname;
        cb(null, namaUnik);
    }
});

const upload = multer({storage});

//Menyediakan akses ke folder Picture biar bisa mengguanakan gambar hotel yang diupload
app.use('/Picture/', express.static(path.join(__dirname, 'Picture')));

//konfigurasi CORS biar API bisa diakses 
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // ngebolehin cookie session dikirim antar port
}));

//Gua gatau ini apa secara detail, tapi kalo ga salah baca ini teh buat ngebaca data request yang bentuknya json dan url-encode
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.use(session({
    secret: 'staygrade',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, // Mencegah pencurian cookie lewat JavaScript di browser
        secure: false, //https
        maxAge: 1000 * 60 * 60 * 24 // 1 hari
    }
}));

//variabel yang nyimpen path data json biar bisa dipake buat baca sama nulis
const dbPath = path.resolve(__dirname, 'data.json');
//varibel buat ngebaca dan ngubah isi dari file json, agar bisa di ubah jd JS?
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
//Vaariebel buat nulis data baru ke file json, dengan format yang rapi biar gampang dibaca
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');

// ------------------------------
// Start Bagian GET
//-------------------------------

//Check Status login dari user
app.get('/api/login', (req, res) => {
    if (req.session.user) { //Check sessionnya ada atau engga, kalo ada berarti user udah login
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: 'User Belum login' });
    }
});

//Ngambil semua data hotel, terus buat nambahin rating sama jumlah reviewnya berdasarkan data review yang ada di data.json
app.get('/api/hotels', (req, res) => {
    const data = readDB();

    //Ngemapping data hotel buat nambahin info rating sama jumlah review ke masing-masing hotel.
    const hotels = data.hotels.map((hotel) => {
        //Variabel buat ngefilter review yang sesuai sama hotel yang lagi diproses
        const hotelReviews = data.reviews.filter((review) => review.hotelId === hotel.id);
        const totalReviews = hotelReviews.length;
        let finalRating = 0;

        //Kalo ternyata di hotelnya ada reviewnya, baru dihitung rata-rata ratingnya
        if (totalReviews > 0) {
            const sumRating = hotelReviews.reduce((sum, current) => sum + current.rating, 0);
            finalRating = (sumRating / totalReviews).toFixed(1);
        }

        return {
            ...hotel,
            rating: totalReviews > 0 ? finalRating : 0.0,
            reviewCount: totalReviews
        };
    })

    res.header('Content-Type', 'application/json');
    res.json(hotels) 
});

//Mengambil data detail 1 hotel berdasarkan id
app.get('/api/hotels/:id', (req, res) => {
    const data = readDB();
    //Varibel yang berfungsi buat nampung id hotel terus ke tipe data number biar bisa dibandingin sama data hotel yang ada di data.json (Basis 10)
    const hotelId = parseInt(req.params.id, 10);

    // cari hotel yang id-nya sesuai
    const hotel = data.hotels.find(h => h.id === hotelId);

    if (!hotel) {
        return res.status(404).json({ message: "Hotel tidak ditemukan" });
    }

    res.json(hotel);
});

//Mengambil semua review untuk 1 hotel berdasarkan id hotel
app.get('/api/reviews/:hotelId', (req, res) => {
    const data = readDB();
    const hotelId = parseInt(req.params.hotelId, 10);

    // filter review sesuai hotel yang dipilih
    const reviews = data.reviews.filter(r => r.hotelId === hotelId);

    res.json(reviews);
});

// Mengambil seluruh daftar review berdasarkan email user
app.get('/api/reviews/user/:email', (req, res) => {
    const data = readDB();
    const userEmail = req.params.email;

    // filter review cuma email yang cocok
    const userReviews = data.reviews.filter(r => r.email === userEmail);

    const reviewsWithHotelName = userReviews.map((review) => {
        const hotel = data.hotels.find(h => h.id === review.hotelId)

        return {
            ...review,
            name: hotel ? hotel.name : "Hotel Tidak Dikenal" 
        };
    })

    res.json(reviewsWithHotelName);
});
// ------------------------------
// End Bagian GET
//-------------------------------

// ------------------------------
// Start Bagian Post
//-------------------------------
//Buat ngehapus data session kalo usernya logout, terus ngehapus cookie session di browser
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: 'Gagal logout' });
        res.clearCookie('connect.sid'); 
        res.json({ message: 'Logout berhasil' });
    });
});

//Buat ngecek apakah email & password ada apa engga, kalo ada nanti dibikinin session
app.post('/api/users', (req, res) => {
    // tangkep email dan password yang dikirim frontend
    const { email, password } = req.body; 
    
    // baca seluruh isi database JSON
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

//Buat menyimpan data user baru ke data.json dan lansgung dibuatin sessionnya
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const data = readDB();

    //Ini buat check usernya udh ngisi seluruh field atau input yang diminta belum
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Semua field harus diisi" });
    }

    //Variebl buat nyari apakah email user yang baru daftar udh terdaftar apa blm
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

    //Ngebuatin session untuk user waktu udh beres register
    req.session.user = {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    };
    res.status(201).json(newUser);
});

//Buat nambahin list hotel baru ke sistem 
app.post('/api/hotels', upload.single('image'), (req, res) => {
    const { name, location, description, facilities, price } = req.body; //Variebl yang menyimpan input teks
    const image = req.file ? `/Picture/${req.file.filename}` : null; //Varibel yang menyimpan path dari input file gambar
    const data = readDB();

    //Ngcheck setiap field atau input udh disi
    if (!name || !location || !image || !description || !facilities || !price) {
        return res.status(400).json({ message: "Semua field harus diisi" });
    }

    // logic buat auto incremental penambahan hotel
    let newId = "1"; 

    //logika increment Ketika ada hotel baru masuk id hotelnya akan bertambah +1 dari id hotel terbesar.
    if (data.hotels && data.hotels.length > 0) {
        const maxId = data.hotels.reduce((max, hotel) => {
            const currentId = parseInt(hotel.id, 10);
            return currentId > max ? currentId : max;
        }, 0);
        newId = (maxId + 1);
    }

    //Struktur data yang diperlukan buat ngedata hotel baru
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

    // push data hotel baru ke array hotels terus simpan ke file JSON
    data.hotels.push(newHotel);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');

    res.status(201).json(newHotel);
});

//Buat nambahin review baru
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

    //Struktur data buat data review baru
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
// ------------------------------
// End Bagian Post
//-------------------------------


//Buat ngehapus review berdasarkan idnya
app.delete('/api/reviews/:id', (req, res) => {
    const reviewId = parseInt(req.params.id, 10);
    const data = readDB();

    //Variabel yang menyimpan id dari reviw yang akan dihapus
    const reviewIndex = data.reviews.findIndex(
        r => r.id === reviewId
    );

    //Kalo ternyata -1 berati ga ada
    if (reviewIndex === -1) {
        return res.status(404).json({
            message: 'Review tidak ditemukan'
        });
    }

    //Kalo ada hapus reviewnya
    data.reviews.splice(reviewIndex, 1);
    writeDB(data);

    res.json({
        message: 'Review berhasil dihapus'
    });
});

//Buat Hapus list hotel berdasarkan idnya
app.delete('/api/hotels/:id', (req, res) => {
    const hotelId = parseInt(req.params.id, 10);
    const data = readDB();

    //Variabel yang nyimpen id hotel yang akan dihapus
    const hotelIndex = data.hotels.findIndex(
        h => h.id === hotelId
    );

    //Kalo hasil idnya -1 berati ga ada
    if (hotelIndex === -1) {
        return res.status(404).json({
            message: 'Hotel tidak ditemukan'
        });
    }

    //Hapus hotel dari daftar hotel
    data.hotels.splice(hotelIndex, 1);
    //Ngehapus seluruh review yang ada pada hotelnya
    data.reviews = data.reviews.filter(
        review => review.hotelId !== hotelId
    );

    writeDB(data);
    res.json({
        message: 'Hotel berhasil dihapus'
    });
});

//Buat ngedit atau ngeupdate review berdasarkan idnya
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

app.listen(5000, () => {
    console.log('Listening at http://localhost:5000 ...');
});