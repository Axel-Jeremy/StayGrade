// import { Navigate, useNavigate } from "@solidjs/router";
import HotelCard from "../components/HotelCard";
import { useAuth } from "../components/AuthContext";
import { For, createResource, createSignal, createEffect } from "solid-js";
import "../style/Header.css";
import style from "../style/Home.module.css";
import "../style/HotelCard.css";
import HeaderCard from "../components/HeaderCard";
import AddHotelModal from "../components/AddHotelModal";
import GreetingCard from "../components/GreetingCard";
import "../style/GreetingCard.css";
import "../style/body.css";

const fetchHotels = async () => {
  const response = await fetch("http://localhost:5000/api/hotels");
  if (!response.ok) throw new Error("Gagal mengambil data");
  return response.json();
};

export default function Homepage() {
  const [showModal, setShowModal] = createSignal(false);
  const [searchTerm, setSearchTerm] = createSignal("");
  const { role, name } = useAuth();

  const [hotels, { refetch }] = createResource(fetchHotels);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = createSignal(1);

  const totalPages = () => Math.max(1, Math.ceil(filteredHotels().length / itemsPerPage));

  const paginatedHotels = () => {
    const list = filteredHotels();
    const start = (currentPage() - 1) * itemsPerPage;
    return list.slice(start, start + itemsPerPage);
  };

  createEffect(() => {
    // reset page if filtered list shorter than current page
    const tp = totalPages();
    if (currentPage() > tp) setCurrentPage(1);
  });

  const filteredHotels = () => {
    if (!hotels()) return [];

    const keyword = searchTerm().toLowerCase().trim();

    if (keyword === "") return hotels();

    return hotels().filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(keyword) ||
        hotel.location.toLowerCase().includes(keyword),
    );
  };

  return (
    <>
      <div class={showModal() ? "blurred" : ""}>
        <HeaderCard login={role()} onSearch={setSearchTerm} />

        <div class={style.containerMain}>
          {role() !== "admin" ? (
            <div class={style.containerImg}>
              <img src="" alt="GAMBAR IKLAN" />
            </div>
          ) : (
            <div>
              <h2>Management Hotel</h2>
              <h2>Kelola daftar hotel yang tersedia di aplikasi</h2>
              <br />
              <button
                class={style.btnAddHotel}
                onClick={() => setShowModal(true)}
              >
                Tambah Hotel
              </button>
            </div>
          )}

          <br />
          <div>
            <GreetingCard login={role()} name={name()} />
            {filteredHotels().length === 0 && (
              <p
                style={{
                  "text-align": "center",
                  color: "#666",
                  "font-size": "18px",
                  margin: "20px 0",
                }}
              >
                Hotel tidak ditemukan.
              </p>
            )}
            <div class={style.containerCard}>
              {role() === "user" && (
                <For each={paginatedHotels()}>
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
                <For each={paginatedHotels()}>
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
              )}

              {role() === "admin" && (
                <For each={paginatedHotels()}>
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
                        refetch={refetch}
                      />
                    </div>
                  )}
                </For>
              )}
            </div>
            {/* Pagination controls */}
            {filteredHotels().length > itemsPerPage && (
              <div style={{ display: "flex", "justify-content": "center", gap: "8px", margin: "16px 0" }}>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage() === 1}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages() }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      onClick={() => setCurrentPage(page)}
                      style={{
                        padding: "4px 8px",
                        "background-color": currentPage() === page ? "#333" : "#fff",
                        color: currentPage() === page ? "#fff" : "#000",
                        border: "1px solid #ccc",
                      }}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages(), p + 1))}
                  disabled={currentPage() === totalPages()}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal() && (
        <AddHotelModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            refetch();
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
