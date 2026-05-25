import { For } from "solid-js"

function FacilityCard() {
    const facilities = ["Free Wifi", "Kolam Renang", "Free Breakfast"];

    return (
        <div>
            <h1 style={{"margin-bottom": "0px"}}>Fasilitas</h1>
            <div class="containerFacility">
                <For each={facilities}>
                    {(facility) => (
                        <div class="containerContentFacility">
                            <p>{facility}</p>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
}

export default FacilityCard;