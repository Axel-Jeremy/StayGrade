function DeleteHotelModal(props) {

     // logika buat delete hotel by admin
    async function handleDelete() {
        try {
            const response = await fetch(
                `http://localhost:5000/api/hotels/${props.id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                alert("Hotel berhasil dihapus");
                props.onDeleteSuccess();
                // Catatan: Jika ingin lebih "SolidJS", alih-alih reload, 
                // Anda bisa memanggil props.onDeleteSuccess() untuk me-refresh list
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan");
        }
    }
    return (
        <div class="modal-overlay">
            <div class="modal-container">
                
                <h1 class="modal-title">
                    Konfirmasi Hapus?
                </h1>

                <div class="button-container">
                    <button 
                        class="cancel-button" 
                        onClick={props.onCancel}
                    >
                        Cancel
                    </button>
                    
                    <button 
                        class="delete-button" 
                        onClick={props.onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteHotelModal;