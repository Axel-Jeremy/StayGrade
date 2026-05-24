import { createSignal, For } from "solid-js";

function ReviewModal(props) {
    const [rating, setRating] = createSignal(0);
    const stars = [1, 2, 3, 4, 5];

    return (
        <div class="modal-overlay">
            <div class="modal-content">

                <button
                    class="close-button"
                    onClick={props.onClose}
                >
                    ✕
                </button>

                <h2 class="hotel-title">
                    {props.hotelName}
                </h2>

                <div class="star-container">
                    <For each={stars}>
                        {(star) => (
                            <span
                                class={
                                    star <= rating()
                                        ? "star active"
                                        : "star"
                                }
                                onClick={() => setRating(star)}
                            >
                                ★
                            </span>
                        )}
                    </For>
                </div>

                <textarea
                    class="review-input"
                    placeholder="Masukkan Review Anda"
                />

                <div class="button-container">
                    <button
                        class="cancel-button"
                        onClick={props.onClose}
                    >
                        Cancel
                    </button>

                    <button class="post-button">
                        Post
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ReviewModal;