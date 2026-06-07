import { createStore } from "solid-js/store";

export const [reviewStore, setReviewStore] = createStore({
    reviews: []
});