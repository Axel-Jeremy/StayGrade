import { Navigate, useNavigate } from "@solidjs/router";
import header from "../components/Header"

export default function Homepageguest() {
    const navigate = useNavigate();

    return (
        <div>
            {header}
            <div id="Body" style={{ "justify-items": "center", "padding-top": "25px" }}>
                <div class="Iklan" style={{ border: `2px solid black` }}>
                    <img src="" alt="GAMBAR IKLAN" />
                </div>
                <br />
                <div id="boxLuar" style={{ border: `2px solid black`, width: "500px", height: "100px", "border-radius": 10 }}>
                    <div id="Isian" style={{ display: "grid", " grid-template-columns": "1fr 1fr 1fr;" }}>
                        <p>temp</p>
                    </div>
                </div>

            </div>
        </div>
    );
}