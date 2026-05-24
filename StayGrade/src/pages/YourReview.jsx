import { A } from "@solidjs/router"
import { For } from "solid-js"
import HeaderCard from "~/components/HeaderCard";
import ReviewCard from "~/components/ReviewCard";

function YourReview() {
    const ratings = [
        { rating: 5, name: "Alek", comment: "Pengalaman menginap luar biasa.", time: "5" },
        { rating: 4, name: "Alek", comment: "Mantap.", time: "3" },
    ]

    return (
        <div>
            <HeaderCard />
            <div>
                <h1>Review</h1>
                <For each={ratings}>
                    {(rating) => (
                        <ReviewCard
                            rating={rating.rating}
                            name={rating.name}
                            comment={rating.comment}
                            time={rating.time}
                            crud={true}
                        />
                    )}
                </For>
            </div>

        </div>
    );
};

export default YourReview;
