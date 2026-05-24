import { Navigate, useNavigate } from "@solidjs/router";
import HotelCard from "../components/HotelCard"
import { useAuth } from "../components/AuthContext";
import { For } from "solid-js";
import "../style/Header.css";
import style from "../style/Home.module.css"
import "../style/HotelCard.css";
import HeaderCard from "../components/HeaderCard";



export default function Homepage() {
    const { role } = useAuth();

    const hotelsNotLogin = [
        { id: 1, image: "aaa", name: "Hotel A", location: "Menteng, Jakarta", prices: "100-200", rating: "4.8", reviewCount: "70" },
        { id: 2, image: "aaa", name: "Hotel B", location: "Taman Kopo indah, Bandung", prices: "100-200", rating: "4.3", reviewCount: "10" },

    ]
    const hotels = [
        { id: 1, image: "aaa", name: "Hotel A", location: "Menteng, Jakarta", prices: "100-200", rating: "4.8", reviewCount: "70", reviewClick: true },
        { id: 2, image: "aaa", name: "Hotel B", location: "Taman Kopo indah, Bandung", prices: "100-200", rating: "4.3", reviewCount: "10", reviewClick: true },
    ]
    return (
        <div>
            <HeaderCard login={false} />

            <div class={style.containerMain}>
                <div class={style.containerImg}>
                    <img src="" alt="GAMBAR IKLAN" />
                </div>
                <br />
                <div class={style.containerCard}>
                    {role() === "user" && (
                        <For each={hotels}>
                            {(hotel) => (
                                <div class={style.Card}>
                                    <HotelCard
                                        image={hotel.image}
                                        name={hotel.name}
                                        location={hotel.location}
                                        prices={hotel.prices}
                                        rating={hotel.rating}
                                        reviewCount={hotel.reviewCount}
                                        reviewClick={hotel.reviewClick}
                                    />
                                </div>
                            )}
                        </For>
                    )}

                    {role() === "guest" && (
                        <For each={hotelsNotLogin}>
                            {(hotel) => (
                                <div class={style.Card}>
                                    <HotelCard
                                        image={hotel.image}
                                        name={hotel.name}
                                        location={hotel.location}
                                        prices={hotel.prices}
                                        rating={hotel.rating}
                                        reviewCount={hotel.reviewCount}
                                    />
                                </div>
                            )}
                        </For>
                        )
                    }
                </div>
            </div>
        </div>
    );
}