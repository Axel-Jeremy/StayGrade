    import { Navigate, useNavigate } from "@solidjs/router";
    import HeaderCard from "../components/HeaderCard"
    import HotelCard from "../components/HotelCard"
    import { useAuth } from "../components/AuthContext";
    import { For } from "solid-js";



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

                <div id="Body" style={{ "justify-items": "center", "padding-top": "25px" }}>
                    <div class="Iklan" style={{ border: `2px solid black` }}>
                        <img src="" alt="GAMBAR IKLAN" />
                    </div>
                    <br />
                    <div style={{ display: "flex", gap: "10px", "flex-direction": "column" }}>
                        {role() === "guest" && (
                            <For each={hotelsNotLogin}>
                                {(hotel) => (
                                    <div id="boxLuar" style={{ border: `2px solid black`, width: "auto", height: "auto", "border-radius": 10, padding: "10px" }}>
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
                        {role() === "user" && (
                            <For each={hotels}>
                                {(hotel) => (
                                    <div id="boxLuar" style={{ border: `2px solid black`, width: "auto", height: "auto", "border-radius": 10, padding: "10px" }}>
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

                        {role() === "admin" && (
                            <For each={hotelsNotLogin}>
                                {(hotel) => (
                                    <div id="boxLuar" style={{ border: `2px solid black`, width: "auto", height: "auto", "border-radius": 10, padding: "10px" }}>
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