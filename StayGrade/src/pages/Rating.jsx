import { A } from "@solidjs/router"
import { For } from "solid-js"
import HeaderCard from "~/components/HeaderCard";
import ReviewCard from "~/components/ReviewCard";
import FacilityCard from "~/components/FacilityCard";

function Rating() {
    const hotel = {
        id: 1,
        image: "aaa",
        name: "Hotel A",
        location: "Menteng, Jakarta",
        prices: "100-200",
        rating: "4.8",
        reviewCount: "70"
    }

    const ratings = [
        { rating: 5, name: "Fadjar", comment: "Pengalaman menginap luar biasa.", time: "5" },
        { rating: 3, name: "Alek", comment: "Mantap.", time: "2" },
    ]

    return (
        <div>
            <HeaderCard />
            <div>
                <img src={hotel.image}></img>
                <h1>${hotel.name}</h1>
            </div>

            <div>
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
    );
};

export default Rating;
