import { A, useParams } from "@solidjs/router"
import { For, createResource, Show } from "solid-js"
import { useAuth } from "../components/AuthContext";
import HeaderCard from "../components/HeaderCard";
import ReviewCard from "../components/ReviewCard";
import FacilityCard from "../components/FacilityCard";
import AboutCard from "../components/AboutCard";
import { createSignal } from "solid-js";
import ReviewModal from "../components/ReviewModal";
import "../style/Header.css";
import "../style/Facility.css";
import "../style/ReviewModal.css";
import "../style/ReviewCard.css";
import style from "../style/Rate.module.css"

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

function Rating() {
    const [showModal, setShowModal] = createSignal(false);

    const { role, name, email } = useAuth();
    const params = useParams();

    const [hotel] = createResource(() => params.id, fetchHotelDetail);
    const [ratings, { refetch }] = createResource(() => params.id, fetchReviews);
    return (
        <Show when={hotel()} fallback={<p>Loading...</p>}>
            <div
                id="body"
                class={showModal() ? "blurred" : ""}
            >
                <HeaderCard login={role()} />

                <div class={style.hotelBanner}>
                    <img
                        src={hotel().image}
                        alt={hotel().alternative}
                    />
                    <div class={style.hotelInfo}>
                        <h1 class={style.hotelName}>
                            {hotel().name}
                        </h1>
                    </div>
                </div>

                <div class={style.containerGrid}>
                    <AboutCard about={hotel().about} />
                    <FacilityCard facilities={hotel().facilities} />
                </div>

                <div>
                    <div class={style.containerUpperContent}>
                        <h1>Review</h1>

                        {role() === 'user' ? (<button onClick={() => setShowModal(true)} class={style.btnReview}>
                            Tulis Review
                        </button>) : null}

                    </div>

                    <div class={style.containerBottomContent}>
                        <Show when={ratings()} fallback={<p>Loading reviews...</p>}>
                            <For each={ratings()}>
                                {(rating) => (
                                    <ReviewCard
                                        id={rating.id}
                                        rating={rating.rating}
                                        name={rating.name}
                                        comment={rating.comment}
                                        time={rating.time}
                                    />
                                )}
                            </For>
                        </Show>

                    </div>
                </div>
            </div>
            {showModal() && (
                <ReviewModal
                    hotelId={params.id}
                    hotelName={hotel().name}
                    userName={name() || "Stranger"}
                    userEmail={email()}
                    onClose={() => setShowModal(false)}
                    onSuccess={() => {
                        refetch();
                        setShowModal(false);
                    }}
                />
            )}
        </Show>
    );
};

export default Rating;
