import { useNavigate } from "@solidjs/router";

function HotelCard(props) {
  const navigate = useNavigate();

  // logika buat delete hotel by admin
  async function handleDelete() {
    const confirmDelete = confirm(`Yakin ingin menghapus hotel ${props.name}?`);

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/hotels/${props.id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        alert("Hotel berhasil dihapus");
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
            <button class="btnDD" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
