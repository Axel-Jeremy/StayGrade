import { A } from "@solidjs/router"
import { For } from "solid-js"
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

    const { role } = useAuth();
    return (
    <>
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
    </>
    );
};

export default Rating;
