import { A } from "@solidjs/router"
import { For } from "solid-js"
import HotelCard from "../components/HotelCard";

function Home() {
  const hotels = [
    { id: 1, image: "aaa", name: "Hotel A", location: "Menteng, Jakarta", prices: "100-200", rating: "4.8", reviewCount: "70" },
    { id: 2, image: "aaa", name: "Hotel B", location: "Taman Kopo indah, Bandung", prices: "100-200", rating: "4.3", reviewCount: "10" },
]
  
  return (
    <div>
      <h1>Home Page</h1>
      <A href="/">Home Page </A>
      <br></br>
      <A href="/login">Login Page </A>
      <br></br>
      <A href="/register">Register Page </A>
      <br></br>
      <A href="/Homepage_guest">Homepage </A>

      <For each={hotels}>
          {(hotel) => (
            <HotelCard
              image={hotel.image}
              name={hotel.name}
              location={hotel.location}
              prices={hotel.prices}
              rating={hotel.rating}
              reviewCount={hotel.reviewCount}
            />
          )}
      </For>
    </div>
  );
};

export default Home;
