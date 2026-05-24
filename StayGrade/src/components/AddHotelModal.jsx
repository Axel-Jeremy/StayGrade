import "./AddHotelModal.css";

function AddHotelModal(props) {
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
                        />
                    </div>

                    <div class="form-group">
                        <label>Lokasi *</label>
                        <input
                            type="text"
                            placeholder="Contoh: Jakarta, Indonesia"
                        />
                    </div>

                    <div class="form-group">
                        <label>URL Gambar *</label>
                        <textarea
                            rows="3"
                            placeholder="Preview Gambar"
                        />
                    </div>

                    <div class="form-group">
                        <label>Deskripsi *</label>
                        <textarea
                            rows="4"
                            placeholder="Preview Gambar"
                        />
                    </div>

                    <div class="form-group">
                        <label>Fasilitas *</label>
                        <input
                            type="text"
                            placeholder="Contoh: Wifi, Breakfast, Dll"
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