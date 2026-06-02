import { useNavigate } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"

function HotelCard(props) {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = createSignal(false);

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
                if (props.refetch) {
                    props.refetch();
                }
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan");
        } finally {
            setShowDeleteModal(false);
        }
    }

    return (
        <div class="content">
            <div class="containerImg">
                <img src={props.image} alt={props.name} />
            </div>
            <div id="deskripsi hotel">
                <p class="text">{props.name}</p>
                <p class="text">{props.location}</p>
                <p class="text">{props.prices} / night</p>
            </div>
            <div style={{ display: "flex", "flex-direction": "column" }}>
                <div class="containerParagraph ">
                    <p class="text">{props.rating} / 5.0</p>
                    <p class="text">{props.reviewCount} Reviews</p>
                </div>

                {props.reviewClick && (
                    <button
                        class="btnReview"
                        onClick={() => {
                            props.onReviewClick;
                            navigate(`/rating/${props.id}`);
                        }}
                    >
                        Review
                    </button>
                )}

                <div class="ContainerBtnCard">
                    {/* urus CSS 2 ini ya fajar - kin */}
                    {props.detailClick && (
                        <button
                            class="btnDD"
                            onClick={() => {
                                props.onDetailClick;
                                navigate(`/rating/${props.id}`);
                            }}
                        >
                            Details
                        </button>
                    )}

                    {props.deleteClick && (
                        <button class="btnDD" onClick={() => setShowDeleteModal(true)}>
                            Delete
                        </button>
                    )}

                    <Show when={showDeleteModal()}>
                        <DeleteConfirmationModal
                            onCancel={() => {setShowDeleteModal(false)}}
                            onConfirm={handleDelete}
                        />
                    </Show>
                </div>
            </div>
        </div>
    );
}

export default HotelCard;
