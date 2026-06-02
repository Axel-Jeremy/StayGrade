import "../style/AddHotelModal.css";
import { createSignal } from "solid-js";

function AddHotelModal(props) {

    const [name, setName] = createSignal("");
    const [location, setLocation] = createSignal("");
    const [image, setImage] = createSignal("");
    const [description, setDescription] = createSignal("");
    const [facilities, setFacilities] = createSignal("");
    const [price, setPrice] = createSignal("");

    async function handleAddHotel(e) {
        e.preventDefault();

        if (!name() || !location() || !image() || !description() || !facilities() || !price()) {
            alert("Semua field bertanda * wajib diisi!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/hotels`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name(),
                    location: location(),
                    image: image(),
                    description: description(),
                    facilities: facilities(),
                    price: price(),
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Hotel berhasil ditambahkan!");
                props.onSuccess();
            } else {
                alert("Gagal menambahkan hotel: " + data.message);
            }
        } catch (error) {
            console.error("Error adding hotel:", error);
            alert("Terjadi kesalahan pada server");
        }
    }

    return (
        <div class="modal-overlay">
            <div class="hotel-modal">

                <button
                    class="close-button"
                    onClick={props.onClose}
                >
                    ✕
                </button>

                <h1 class="modal-title">
                    Tambah Hotel Baru
                </h1>

                <form class="hotel-form">

                    <div class="form-group">
                        <label>Nama Hotel *</label>
                        <input
                            type="text"
                            placeholder="Masukkan Nama Hotel"
                            onInput={(e) => setName(e.target.value)}
                            value={name()}
                        />
                    </div>

                    <div class="form-group">
                        <label>Lokasi *</label>
                        <input
                            type="text"
                            placeholder="Contoh: Jakarta, Indonesia"
                            onInput={(e) => setLocation(e.target.value)}
                            value={location()}
                        />
                    </div>

                    <div class="form-group">
                        <label>URL Gambar *</label>
                        <textarea
                            rows="3"
                            placeholder="Preview Gambar"
                            onInput={(e) => setImage(e.target.value)}
                            value={image()}
                        />
                    </div>

                    <div class="form-group">
                        <label>Deskripsi *</label>
                        <textarea
                            rows="4"
                            placeholder="Deskripsi Hotel"
                            onInput={(e) => setDescription(e.target.value)}
                            value={description()}
                        />
                    </div>

                    <div class="form-group">
                        <label>Fasilitas *</label>
                        <input
                            type="text"
                            placeholder="Contoh: Wifi, Breakfast, Dll"
                            onInput={(e) => setFacilities(e.target.value)}
                            value={facilities()}
                        />
                    </div>

                    <div class="form-group">
                        <label>Harga *</label>
                        <input
                            type="text"
                            placeholder="Contoh: 50 - 100"
                            onInput={(e) => setPrice(e.target.value)}
                            value={price()}
                        />
                    </div>

                    <div class="button-container">
                        <button
                            type="button"
                            class="cancel-button"
                            onClick={props.onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            class="post-button"
                            onclick={handleAddHotel}
                        >
                            Post
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default AddHotelModal;