import { createStore } from "solid-js/store";

export const [hotelStore, setHotelStore] = createStore({
    hotels: [],
    selectedHotel: null
});