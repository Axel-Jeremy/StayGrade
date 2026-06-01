import { A, useLocation } from "@solidjs/router"
import { For, createResource, Show } from "solid-js"
import HeaderCard from "../components/HeaderCard";
import ReviewCard from "../components/ReviewCard";
import "../style/Header.css";
import style from "../style/Rate.module.css"
import "../style/ReviewCard.css";
import { useAuth } from "../components/AuthContext";


const fetchUserReviews = async (userEmail) => {
    // klo user belum login / guest, return array kosong
    if (!userEmail || userEmail === "guest") return [];

    const response = await fetch(`http://localhost:5000/api/reviews/user/${userEmail}`);
    if (!response.ok) throw new Error("Gagal mengambil data review");
    
    return response.json();
};

function YourReview() {
    const { role, email } = useAuth(); 
    // const location = useLocation();
    
    const [ratings] = createResource(email, fetchUserReviews);

    return (
        <div>
            <HeaderCard login={role() !== "guest"} />
            <div>
                <div class={style.containerUpperContent}>
                    <h1>Review Kamu</h1>
                </div>
                
                <div class={style.containerBottomContent}>
                    <Show when={ratings()} fallback={<p>Loading reviews...</p>}>
                        <Show when={ratings().length > 0} fallback={<p>Kamu belum menulis review apa pun.</p>}>
                            <For each={ratings()}>
                                {(rating) => (
                                    <ReviewCard
                                        rating={rating.rating}
                                        name={rating.name}
                                        comment={rating.comment}
                                        time={rating.time}
                                    />
                                )}
                            </For>
                        </Show>
                        
                    </Show>
                </div>
            </div>
        </div>
    );
};

export default YourReview;