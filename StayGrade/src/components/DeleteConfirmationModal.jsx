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

//ini ga dipake, 
// jadinya dipindahin ke headercard nanti 
// funct di passing kesini, tinggal panggil

//  // logika buat delete hotel by admin
//     async function handleDelete() {
//         try {
//             const response = await fetch(
//                 `http://localhost:5000/api/hotels/${props.id}`,
//                 {
//                     method: "DELETE",
//                 }
//             );

//             if (response.ok) {
//                 alert("Hotel berhasil dihapus");
//                 props.onDeleteSuccess();
//             } else {
//                 const data = await response.json();
//                 alert(data.message);
//             }
//         } catch (error) {
//             console.error(error);
//             alert("Terjadi kesalahan");
//         }
//     }