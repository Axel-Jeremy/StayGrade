import { createSignal, For } from "solid-js";
import { setReviewStore } from "../stores/ReviewStore";

function ReviewModal(props) {
  const [rating, setRating] = createSignal(0);
  const stars = [1, 2, 3, 4, 5];
  const [comment, setComment] = createSignal("");
  // const [time, setTime] = createSignal("");

  const handlePost = async () => {
    if (!comment() || rating() === 0) {
      alert("Data comment dan rating gaboleh kosong");
      return;
    }

    const currentTime = `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;

    // console.log(time());
    const templateData = {
      hotelId: props.hotelId,
      rating: rating(),
      name: props.userName,
      email: props.userEmail,
      comment: comment(),
      time: currentTime,
    };

    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(templateData),
      });
      if (response.ok) {
        const newReview = await response.json();

        setReviewStore("reviews", (reviews) => [...reviews, newReview]);

        alert("Review berhasil diposting!");
        props.onSuccess();
      } else {
        const errorData = await response.json();
        alert("Gagal memposting review: " + errorData.message);
      }
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <div class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" onClick={props.onClose}>
          ✕
        </button>

        <h2 class="hotel-title">{props.hotelName}</h2>

        <div class="star-container">
          <For each={stars}>
            {(star) => (
              <span
                class={star <= rating() ? "star active" : "star"}
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
          value={comment()}
          onInput={(e) => setComment(e.target.value)}
        />

        <div class="button-container">
          <button class="cancel-button" onClick={props.onClose}>
            Cancel
          </button>

          <button class="post-button" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
