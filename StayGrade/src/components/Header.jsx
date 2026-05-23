export default function header() {
    return (
        <div>
            <div id="Header" style={{ padding: "10px", "padding-left": "50px", "padding-right": "50px", "display": "flex", "flex-direction": "row", "justify-content": "space-between", "justify-items": "center", "padding-top": "20px" }}>
                <img src="" alt="Logo Aplikasi" />
                <div>
                    <img src="" alt="Logo magnifying glass" />
                    <input type="text" placeholder="Search"></input>
                </div>
                <button style={{ "font-size": "1.2rem" }} onclick={() => navigate("/Login")}>Sign in</button>
            </div>

            <hr style={{ "border-color": "black", "border-width": "1px", width: "100%" }} />
        </div>
    )
}