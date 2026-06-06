import { useLocation } from "@solidjs/router";
import { useAuth } from "../components/AuthContext";
import EditIcon from "../style/Asset/edit-line.svg";
import DelIcon from "../style/Asset/delete-bin-line.svg";
import { createSignal } from "solid-js";
import EditReviewModal from "./EditReviewModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"
import "../style/DeleteCon.css"

function ReviewCard(props) {
  const location = useLocation();
  const { role } = useAuth();

  const [showEditModal, setShowEditModal] = createSignal(false);
  const [showDeleteModal, setShowDeleteModal] = createSignal(false);

  return (
    <>
      <div>
        <div class="containerReviewCard">

          <div class="containerReviewLeftContent">

            <div class="containerProfileBulat">{props.rating}</div>

            <div class="containerKomentar">
              <span
                style={{
                  "font-weight": "bold",
                  "font-size": "1.2rem",
                }}
              >
                {props.name}
              </span>

              <span style={{ color: "#555" }}>{props.comment}</span>
            </div>
          </div>


          <div class="ContainerWaktu">

            {location.pathname === "/yourReview" ? (
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <button
                  class="containerProfileBulat"
                  onClick={() => setShowEditModal(true)}
                >
                  <img
                    src={EditIcon}
                    alt="Edit"
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                  />
                </button>

                <button
                  class="containerProfileBulat"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <img
                    src={DelIcon}
                    alt="Delete"
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                  />
                </button>
              </div>
            ) : null}

            {role() === "admin" ? (
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <button
                  class="containerProfileBulat"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <img
                    src={DelIcon}
                    alt="Delete"
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                  />
                </button>
              </div>
            ) : null}

            <span
              style={{
                color: "#666",
                "font-size": "0.9rem",
              }}
            >
              {props.time}
            </span>
          </div>
        </div>
        <Show when={showDeleteModal()}>
          <DeleteConfirmationModal
            onCancel={() => { setShowDeleteModal(false) }}
            onConfirm={() => deleteReview(props.id)}
          />
        </Show>
      </div>

      {showEditModal() && (
        <EditReviewModal
          id={props.id}
          rating={props.rating}
          comment={props.comment}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            window.location.reload();
          }}
        />
      )}
    </>
  );
}

export default ReviewCard;

async function deleteReview(reviewId) {

  try {
    const response = await fetch(
      `http://localhost:5000/api/reviews/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert("Review berhasil dihapus");
      window.location.reload();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan");
  }
}
