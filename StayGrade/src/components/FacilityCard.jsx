import { For } from "solid-js"

function FacilityCard(props) {
    return (
        <div>
            <h1 style={{ "margin-bottom": "0px" }}>Fasilitas</h1>
            <div class="containerFacility">
                <For each={props.facilities}>
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