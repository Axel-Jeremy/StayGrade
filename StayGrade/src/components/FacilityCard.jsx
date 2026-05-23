import { For } from "solid-js"

function FacilityCard() {
    const facilities = ["Free Wifi", "Kolam Renang", "Free Breakfast"];

    return (
        <div>
            <h1>Fasilitas</h1>
            <div>
                <For each={facilities}>
                    {(facility) => (
                        <div>
                            <p>${facility}</p>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
}

export default FacilityCard;