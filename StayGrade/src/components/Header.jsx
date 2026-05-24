import { A, useNavigate } from "@solidjs/router";
import searchIcon from "../style/Asset/search-line.svg";

export default function Header(props) {
    const navigate = useNavigate();
    return (
        <div>
            <div class="containerHeader">
                <img src="" alt="Logo Aplikasi" />
                <div class="containerSearch">
                    <img src={searchIcon} alt="Logo magnifying glass"/>
                    <input type="text" placeholder="Search" class="searchInput"></input>
                </div>
                {!props.login ? 
                    (<button class="btnLogin" onclick={() => navigate("/Login")}>Sign in</button>) 
                    :
                    (<div class="containerCL">
                        <A href="/" class={styles.link}>Your Review</A>
                        <div class={styles.containerCircle}>H</div>
                    </div>)
                }
            </div>

            <hr class="line"/>
        </div>
    )
}