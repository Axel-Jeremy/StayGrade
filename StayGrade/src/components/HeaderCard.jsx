import { A, useNavigate } from "@solidjs/router";
import { useAuth } from "./AuthContext";
import searchIcon from "../style/Asset/search-line.svg";
import logo from '../style/Asset/Logo/logo.svg';

function HeaderCard() {
    const navigate = useNavigate();
    const { role, setRole, setName, setEmail } = useAuth();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/logout", {
                method: "POST",
                credentials: "include"
            });

            if (response.ok) {
                setRole("guest");
                setName("guest");
                setEmail("guest");
                navigate("/");
            } else {
                const errorData = await response.json();
                console.error("Logout gagal:", errorData.message);
            }
        } catch (error) {
            console.error("Gagal melakukan logout:", error);
        }
    };

    return (
        <div>
            <div class="containerHeader">
                <A href="/"><img class="logoimg" src={logo} alt="Logo Aplikasi" /></A>
                
                <div class="containerSearch">
                    <img src={searchIcon} alt="Logo magnifying glass" />
                    <input type="text" placeholder="Search" class="searchInput"></input>
                </div>
                {role() === 'guest' ? (
                    <button class="btnLogin" onClick={() => navigate("/login")}>Sign in</button>
                ) : (
                    <div class="containerCL">
                        {role() === 'user' && (
                            <A href="/yourReview" class="link"><u>Your Review</u></A>
                        )}
                        <button class="btnLogin" onClick={handleLogout}>Logout</button>
                        <div class="containerCircle">H</div>
                    </div>
                )}
            </div>

            <hr class="line" />
        </div>
    )
}

export default HeaderCard;