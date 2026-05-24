import { A, useNavigate } from "@solidjs/router";

export default function Header(props) {
    const navigate = useNavigate();
    return (
        <div>
            <div id="Header" style={{ padding: "10px", "padding-left": "50px", "padding-right": "50px", "display": "flex", "flex-direction": "row", "justify-content": "space-between", "justify-items": "center", "padding-top": "20px" }}>
                <img src="" alt="Logo Aplikasi" />
                <div>
                    <img src="" alt="Logo magnifying glass" />
                    <input type="text" placeholder="Search"></input>
                </div>
                {!props.login ? 
                    (<button style={{ "font-size": "1.2rem" }} onclick={() => navigate("/Login")}>Sign in</button>) 
                    :
                    (<div style={{ display: "flex", gap: '10px' }}>
                        <A href="/"><u>Your Review</u></A>
                        <div style={{ "font-weight": "bold", "border-radius": "100%", "background-color": "gray", 
                                    width: "30px", height: "30px", display: "flex", "align-items": "center", 
                                    "justify-content": "center" }}
                        >H</div>
                    </div>)
                }
            </div>

            <hr style={{ "border-color": "black", "border-width": "1px", width: "100%" }} />
        </div>
    )
}