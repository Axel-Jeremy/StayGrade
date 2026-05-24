import { A } from "@solidjs/router"
import { For } from "solid-js"
import HeaderCard from "../components/HeaderCard";
import ReviewCard from "../components/ReviewCard";
import { useLocation } from "@solidjs/router";

function YourReview() {
    const ratings = [
        { rating: 5, name: "Alek", comment: "Pengalaman menginap luar biasa.", time: "5 hari lalu" },
        { rating: 4, name: "Alek", comment: "Mantap.", time: "3 hari lalu" },
    ]
    const location = useLocation();
    console.log(location.pathname)
    return (
        
        <div>
            <HeaderCard login={true}/>
            <div>
                <h1>Review</h1>
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

export default YourReview;
