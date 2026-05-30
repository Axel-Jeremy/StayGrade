import { Navigate, useNavigate } from "@solidjs/router";
import HotelCard from "../components/HotelCard"
import { useAuth } from "../components/AuthContext";
import { For, createResource } from "solid-js";
import "../style/Header.css";
import style from "../style/Home.module.css"
import "../style/HotelCard.css";
import HeaderCard from "../components/HeaderCard";

const fetchHotels = async () => {
    const response = await fetch("http://localhost:5000/api/hotels");
    if (!response.ok) throw new Error("Gagal mengambil data");
    return response.json();
};

export default function Homepage() {
    const { role } = useAuth();

    const [hotels] = createResource(fetchHotels)
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
                        <For each={hotels()}>
                            {(hotel) => (
                                <div class={style.Card}>
                                    <HotelCard
                                        id={hotel.id}
                                        image={hotel.image}
                                        name={hotel.name}
                                        location={hotel.location}
                                        prices={hotel.prices}
                                        rating={hotel.rating}
                                        reviewCount={hotel.reviewCount}
                                        reviewClick={true}
                                    />
                                </div>
                            )}
                        </For>
                    )}

                    {role() === "guest" && (
                        <For each={hotels()}>
                            {(hotel) => (
                                <div class={style.Card}>
                                    <HotelCard
                                        id={hotel.id}
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

                    {role() === "admin" && (
                        <For each={hotels()}>
                            {(hotel) => (
                                <div class={style.Card}>
                                    <HotelCard
                                        id={hotel.id}
                                        image={hotel.image}
                                        name={hotel.name}
                                        location={hotel.location}
                                        prices={hotel.prices}
                                        rating={hotel.rating}
                                        detailClick={true}
                                        deleteClick={true}
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