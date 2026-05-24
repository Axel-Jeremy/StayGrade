import { A } from "@solidjs/router"
import { For } from "solid-js"
import HeaderCard from "../components/HeaderCard";
import ReviewCard from "../components/ReviewCard";
import FacilityCard from "../components/FacilityCard";
import AboutCard from "../components/AboutCard";
import { createSignal} from "solid-js";
import ReviewModal from "../components/ReviewModal";
import "../style/Header.css";
import catoImage from "../cato.jpg";

function Rating(props) {
    const hotel = {
        id: 1,
        image: "src/cato.jpg",
        alternative: "Gambar hotel",
        name: "Hotel A",
        location: "Menteng, Jakarta",
        prices: "100-200",
        rating: "4.8",
        reviewCount: "70"
    }

    const ratings = [
        { rating: 5, name: "Fadjar", comment: "Pengalaman menginap luar biasa.", time: "5 hari lalu" },
        { rating: 3, name: "Alek", comment: "Mantap.", time: "2 hari lalu" },
    ]

    const [showModal, setShowModal] = createSignal(false);

    return (
    <>
        <div
            id="body"
            class={showModal() ? "blurred" : ""}
        >
            <HeaderCard login={true} />

            <div class="hotelBanner">
                <img
                    src={hotel.image}
                    alt={hotel.alternative}
                />

                <h1 class="hotelName">
                    {hotel.name}
                </h1>
            </div>

            <div style={{ display: "grid", "grid-template-columns": "2fr 2fr" }}>
                <AboutCard about={"dummy about hotel"} />
                <FacilityCard />
            </div>

            <div>
                <div>
                    <h1>Review</h1>

                    <button onClick={() => setShowModal(true)}>
                        Tulis Review
                    </button>
                </div>

                <div id="kotakLuar">
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
    </>
    );
};

export default Rating;
