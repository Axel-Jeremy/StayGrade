// import { Navigate, useNavigate } from "@solidjs/router";
import HotelCard from "../components/HotelCard";
import { useAuth } from "../components/AuthContext";
import { For, createSignal, createEffect, onMount } from "solid-js";
import "../style/Header.css";
import style from "../style/Home.module.css";
import "../style/HotelCard.css";
import HeaderCard from "../components/HeaderCard";
import AddHotelModal from "../components/AddHotelModal";
import GreetingCard from "../components/GreetingCard";
import "../style/GreetingCard.css";
import "../style/body.css";
import { hotelStore, setHotelStore } from "../stores/HotelStore";

export default function Homepage() {
  const [showModal, setShowModal] = createSignal(false);
  const [searchTerm, setSearchTerm] = createSignal("");
  const { role, name } = useAuth();

  onMount(() => {
    loadHotels();
  });

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = createSignal(1);

  const totalPages = () =>
    Math.max(1, Math.ceil(filteredHotels().length / itemsPerPage));

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
    const keyword = searchTerm().toLowerCase().trim();

    if (keyword === "") {
      return hotelStore.hotels;
    }

    return hotelStore.hotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(keyword) ||
        hotel.location.toLowerCase().includes(keyword),
    );
  };

  async function loadHotels() {
    try {
      const response = await fetch("http://localhost:5000/api/hotels");

      const data = await response.json();

      setHotelStore("hotels", data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div class={showModal() ? "blurred" : ""}>
        <HeaderCard login={role()} onSearch={setSearchTerm} />

        <div class={style.containerMain}>
          {role() !== "admin" ? (
            <div class={style.containerImg}>
              <img class={style.imgIklan} src={
                `http://localhost:5000/Picture/karinaSprite.jpg`
              } alt="GAMBAR IKLAN" />
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
                        deleteClick={false}
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
                        deleteClick={false}
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
                        reviewCount={hotel.reviewCount}
                        detailClick={true}
                        deleteClick={true}
                        refetch={loadHotels}
                      />
                    </div>
                  )}
                </For>
              )}
            </div>
            {/* Pagination controls */}
            {filteredHotels().length > itemsPerPage && (
              <div class={style.page}>
                <button
                  class={style.prevnext}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage() === 1}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages() }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      class={style.pagenumber}
                      onClick={() => setCurrentPage(page)}
                      style={{
                        "background-color":
                          currentPage() === page ? "#396552" : "#fff",
                        color: currentPage() === page ? "white" : "black",
                      }}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  class={style.prevnext}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages(), p + 1))
                  }
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
            loadHotels();
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
