import { A, useNavigate } from "@solidjs/router";
import { useAuth } from "./AuthContext";
import searchIcon from "../style/Asset/search-line.png";
import logo from "../style/Asset/Logo/logoHeader.png";

function HeaderCard(props) {
  const navigate = useNavigate();
  const { role, setRole, setName, setEmail, name } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setRole("guest");
        setName("guest");
        setEmail("guest");
        navigate("/login");
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
        <A href="/" class="logoHeader">
          <img class="logoimg" src={logo} alt="Logo Aplikasi" />
        </A>

        <div class="containerSearch">
          <img class="search" src={searchIcon} alt="Logo magnifying glass" />

          <input
            type="text"
            placeholder="Search hotel..."
            class="searchInput"
            onInput={(e) => props.onSearch?.(e.target.value)}
          />
        </div>
        {role() === "guest" ? (
          <button class="btnLogin" onClick={() => navigate("/login")}>
            <div class="textSignIn">Sign in</div>
          </button>
        ) : (
          <div class="containerCL">
            {role() === "user" && (
              <A href="/yourReview" class="link">
                <u>Your Review</u>
              </A>
            )}
            <button class="btnLogin" onClick={handleLogout}>
              {role !== "guest" && (
                <div class="containerCircle">{name()[0]}</div>
              )}
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderCard;
