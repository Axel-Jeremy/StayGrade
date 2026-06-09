import "../style/AddHotelModal.css";
import { createSignal, Show } from "solid-js";

function AddHotelModal(props) {

    const [name, setName] = createSignal("");
    const [location, setLocation] = createSignal("");
    const [image, setImage] = createSignal(null);
    const [description, setDescription] = createSignal("");
    const [facilities, setFacilities] = createSignal("");
    const [price, setPrice] = createSignal("");

    function handleImageUpload(e) {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
        }
    }

    async function handleAddHotel(e) {
        e.preventDefault();

        if (!name() || !location() || !image() || !description() || !facilities() || !price()) {
            alert("Semua field bertanda * wajib diisi!");
            return;
        }

        const formData = new FormData();

        formData.append("name", name());
        formData.append("location", location());
        formData.append("description", description());
        formData.append("facilities", facilities());
        formData.append("price", price());
        formData.append("image", image());

        try {
            const response = await fetch(`http://localhost:5000/api/hotels`, {
                method: "POST",
                body: formData
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
                        <label>Upload Gambar *</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ "margin-bottom": "10px" }}
                        />

                        {}
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
                            onClick={handleAddHotel}
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