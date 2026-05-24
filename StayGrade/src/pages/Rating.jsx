import { A } from "@solidjs/router"
import { For } from "solid-js"
import HeaderCard from "../components/HeaderCard";
import ReviewCard from "../components/ReviewCard";
import FacilityCard from "../components/FacilityCard";
import AboutCard from "../components/AboutCard";

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

    return (
        <div id="body">
            <HeaderCard login={true} />

            <div id="GambarHotel" style={{ display: "flex" }}>
                <div style={{ position: "relative", width: "100vw", height: "30vw", display: "flex", "align-items": "flex-end" }}>
                    <img
                        src={hotel.image}
                        alt={hotel.alternative}
                        style={{ width: "100%", height: "100%", display: "block", position: "absolute" }}
                    />
                    <h1 style={{ position: "absolute", "z-index": 2, color: "white", borderRadius: "6px", "padding-left": "10px" }}>
                        {/*color dari nama hotel ntar tolong diubah*/}
                        {hotel.name}
                    </h1>
                </div>
            </div>

            <div style={{ display: "grid", "grid-template-columns": "2fr 2fr" }}>
                <AboutCard
                    about={"dummy about hotel"}
                />
                <FacilityCard />
            </div>

            <div>
                <div>
                    <h1>Review</h1>
                    {true && ( //dummy
                        <button onClick={props.onReviewClick}>Tulis Review</button>
                    )}
                </div>
                <div id="kotakLuar" >
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
    );
};

export default Rating;
