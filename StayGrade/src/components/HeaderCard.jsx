import { A, useNavigate } from "@solidjs/router";
import searchIcon from "../style/Asset/search-line.svg";
import logo from '../style/Asset/Logo/logo.svg';

function HeaderCard(props) {
    const navigate = useNavigate();
    return (
        <div>
            <div class="containerHeader">
                <img class="logoimg" src={logo} alt="Logo Aplikasi" />
                <div class="containerSearch">
                    <img src={searchIcon} alt="Logo magnifying glass" />
                    <input type="text" placeholder="Search" class="searchInput"></input>
                </div>
                {props.login === 'guest'  ?
                    (<button class="btnLogin" onclick={() => navigate("/Login")}>Sign in</button>)
                    : props.login === 'user' ? 
                    (<div class="containerCL">
                        <A href="/yourReview" class="link"><u>Your Review</u></A>
                        <div class="containerCircle">H</div>
                    </div>) : (<div class="containerCL">
                        <div class="containerCircle">H</div>
                    </div>)
                }
            </div>

            <hr class="line" />
        </div>
    )
}

export default HeaderCard;