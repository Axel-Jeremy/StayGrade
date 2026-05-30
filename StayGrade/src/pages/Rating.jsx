import { A, useParams } from "@solidjs/router"
import { For, createResource, Show } from "solid-js"
import { useAuth } from "../components/AuthContext";
import HeaderCard from "../components/HeaderCard";
import ReviewCard from "../components/ReviewCard";
import FacilityCard from "../components/FacilityCard";
import AboutCard from "../components/AboutCard";
import { createSignal} from "solid-js";
import ReviewModal from "../components/ReviewModal";
import "../style/Header.css";
import "../style/Facility.css";
import "../style/ReviewModal.css";
import "../style/ReviewCard.css";
import style from "../style/Rate.module.css"
import catoImage from "../cato.jpg";

// 1. Buat fungsi fetcher untuk Hotel dan Review
const fetchHotelDetail = async (id) => {
    const response = await fetch(`http://localhost:5000/api/hotels/${id}`);
    if (!response.ok) throw new Error("Gagal mengambil data hotel");
    return response.json();
};

const fetchReviews = async (id) => {
    const response = await fetch(`http://localhost:5000/api/reviews/${id}`);
    if (!response.ok) throw new Error("Gagal mengambil ulasan");
    return response.json();
};

function Rating(props) {
    const [showModal, setShowModal] = createSignal(false);

    const { role } = useAuth();
    const params = useParams();

    const [hotel] = createResource(() => params.id, fetchHotelDetail);
    const [ratings] = createResource(() => params.id, fetchReviews);
    return (
    <Show when={hotel()} fallback={<p>Loading...</p>}>
        <div
            id="body"
            class={showModal() ? "blurred" : ""}
        >
            <HeaderCard login={true} />

            <div class={style.hotelBanner}>
                <img
                    src={hotel.image}
                    alt={hotel.alternative}
                />
                <div class={style.hotelInfo}>
                    <h1 class={style.hotelName}>
                        {hotel.name}
                    </h1>
                </div>
            </div>

            <div class={style.containerGrid}>
                <AboutCard about={"dummy about hotel"} />
                <FacilityCard />
            </div>

            <div>
                <div class={style.containerUpperContent}>
                    <h1>Review</h1>

                    {role() === 'user' ? (<button onClick={() => setShowModal(true)} class={style.btnReview}>
                        Tulis Review
                    </button>) : null}
                    
                </div>

                <div class={style.containerBottomContent}>
                    <For each={ratings}>
                        {(rating) => (
                            <ReviewCard
                                rating={rating.rating}
                                name={rating.name}
                                comment={rating.comment}
                                time={rating.time}
                            />
                        )}
                    </For>
                </div>
            </div>
        </div>

        {showModal() && (
            <ReviewModal
                hotelName={hotel.name}
                onClose={() => setShowModal(false)}
            />
        )}
    </Show>
    );
};

export default Rating;
