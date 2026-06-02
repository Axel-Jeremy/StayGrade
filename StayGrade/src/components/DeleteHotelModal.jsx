function DeleteHotelModal(props) {
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