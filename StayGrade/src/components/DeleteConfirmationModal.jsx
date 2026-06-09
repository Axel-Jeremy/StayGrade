function DeleteHotelModal(props) {
    return (
        <div class="containerOverlayPopUp">
            <div class="containerPopUp">
                
                <h1 class="modal-title">
                    Konfirmasi Hapus?
                </h1>

                <div class="containerBTNCD">
                    <button 
                        class="btnCancel" 
                        onClick={props.onCancel}
                    >
                        Cancel
                    </button>
                    
                    <button 
                        class="btnConfirmDelete" 
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