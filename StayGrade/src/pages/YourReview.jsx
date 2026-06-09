import { useNavigate } from "@solidjs/router"
import { createEffect, For, createResource, Show, createSignal } from "solid-js"
import HeaderCard from "../components/HeaderCard";
import ReviewCard from "../components/ReviewCard";
import "../style/Header.css";
import style from "../style/Rate.module.css"
import "../style/ReviewCard.css";
import { useAuth } from "../components/AuthContext";
import "../style/body.css"


const fetchUserReviews = async (userEmail) => {
    // klo user belum login / guest, return array kosong
    if (!userEmail || userEmail === "guest") return [];

    const response = await fetch(`http://localhost:5000/api/reviews/user/${userEmail}`);
    if (!response.ok) throw new Error("Gagal mengambil data review");

    return response.json();
};

function YourReview() {
    const navigate = useNavigate();

    const { role, email } = useAuth();

    createEffect(() => {
        if (role() === 'guest') {
            navigate('/login', { replace: true })
        }
    })
    // const location = useLocation();

    const [ratings, {refetch}] = createResource(email, fetchUserReviews);

    const [searchTerm, setSearchTerm] = createSignal("");

    const filteredReviews = () => {
        if (!ratings()) return [];

        const keyword = searchTerm().toLowerCase().trim();

        if (keyword === "") return ratings();

        return ratings().filter(
            (rating) =>
                // Filter berdasarkan nama hotel (rating.name)
                (rating.name && rating.name.toLowerCase().includes(keyword))
        );
    };

    return (
        <div>
            <HeaderCard
                login={role()}
                onSearch={(value) => setSearchTerm(value)}
            />
            <div>
                <div class={style.containerUpperContent}>
                    <h1>Review Kamu</h1>
                </div>

                <div class={style.containerBottomContent}>
                    <Show when={ratings()} fallback={<p>Loading reviews...</p>}>
                        <Show when={ratings().length > 0} fallback={<p>Kamu belum menulis review apa pun.</p>}>
                            <Show
                                when={filteredReviews().length > 0}
                                fallback={<p>Tidak ada ulasan yang cocok dengan pencarian "{searchTerm()}".</p>}
                            >
                                <For each={filteredReviews()}>
                                    {(rating) => (
                                        <ReviewCard
                                            id={rating.id}
                                            rating={rating.rating}
                                            name={rating.name}
                                            comment={rating.comment}
                                            time={rating.time}
                                            refetch={refetch}
                                        />
                                    )}
                                </For>
                            </Show>

                        </Show>

                    </Show>
                </div>
            </div>
        </div>
    );
};

export default YourReview;