import { Navigate, useNavigate } from "@solidjs/router";
import HotelCard from "../components/HotelCard"
import { useAuth } from "../components/AuthContext";
import { For, createResource, createSignal } from "solid-js";
import "../style/Header.css";
import style from "../style/Home.module.css"
import "../style/HotelCard.css";
import HeaderCard from "../components/HeaderCard";
import AddHotelModal from "../components/AddHotelModal";
import GreetingCard from "../components/GreetingCard";
import "../style/GreetingCard.css"
import "../style/body.css"

const fetchHotels = async () => {
    const response = await fetch("http://localhost:5000/api/hotels");
    if (!response.ok) throw new Error("Gagal mengambil data");
    return response.json();
};

export default function Homepage() {
    const [showModal, setShowModal] = createSignal(false);
    const { role, name } = useAuth();

    const [hotels, { refetch }] = createResource(fetchHotels);

    return (
        <>
            <div class={showModal() ? "blurred" : ""}>
                <HeaderCard login={role()} />

                <div class={style.containerMain}>
                    {role() !== "admin" ? (<div class={style.containerImg}>
                        <img src="" alt="GAMBAR IKLAN" />
                    </div>) : (<div>
                        <h2>Management Hotel</h2>
                        <h2>Kelola daftar hotel yang tersedia di aplikasi</h2>
                        <br />
                        <button class={style.btnAddHotel} onClick={() => setShowModal(true)}>
                            Tambah Hotel
                        </button>
                    </div>)}

                    <br />
                    <div>
                        <GreetingCard login={role()} name={name()} />
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
                                                detailClick={true}
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
            </div>
            {
                showModal() && (
                    <AddHotelModal
                        onClose={() => setShowModal(false)}
                        onSuccess={() => {
                            refetch();
                            setShowModal(false);
                        }}
                    />
                )
            }
        </>
    );
}