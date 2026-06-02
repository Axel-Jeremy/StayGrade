import { createSignal, For } from "solid-js";

function EditReviewModal(props) {

    const [rating, setRating] =
        createSignal(props.rating);

    const [comment, setComment] =
        createSignal(props.comment);

    const stars = [1, 2, 3, 4, 5];

    async function handleSave() {
        try {
            const response = await fetch(
                `http://localhost:5000/api/reviews/${props.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        rating: rating(),
                        comment: comment()
                    })
                }
            );

            if (response.ok) {
                alert("Review berhasil diupdate");

                props.onSuccess();
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div class="modal-overlay">
            <div class="modal-content">

                <h2>Edit Review</h2>

                <div class="star-container">
                    <For each={stars}>
                        {(star) => (
                            <span
                                class={
                                    star <= rating()
                                        ? "star active"
                                        : "star"
                                }
                                onClick={() =>
                                    setRating(star)
                                }
                            >
                                ★
                            </span>
                        )}
                    </For>
                </div>

                <textarea
                    class="review-input"
                    value={comment()}
                    onInput={(e) =>
                        setComment(
                            e.target.value
                        )
                    }
                />

                <button onClick={handleSave}>
                    Save
                </button>

            </div>
        </div>
    );
}

export default EditReviewModal;