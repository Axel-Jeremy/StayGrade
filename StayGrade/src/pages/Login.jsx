import { A, useNavigate } from "@solidjs/router"
import { createSignal } from "solid-js";
import { useAuth } from "../components/AuthContext";
import style from "../style/Log&Sign.module.css"
import "../style/font.css"

function Login() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/')
    }

    const { setRole } = useAuth();

    // Create signals to store form input
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");

    function handleEmailInput(event) {
        setEmail(event.target.value);
    }

    function handlePasswordInput(event) {
        setPassword(event.target.value);
    }

    async function handleLogin() {
        if (!email() || !password()) {
            alert("Email dan password tidak boleh kosong!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email(),
                    password: password(),
                })
            });

            const data = await response.json();

            console.log("Data dari server:", data);
            console.log(data.role)

            if (response.ok) {
                setRole(data.role);
                navigate('/');
            } else {
                alert("Login failed: " + data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Login failed: " + data.message);
        }
    }

    return (
        <div class={style.containerRoot}>
            <div class={style.mainContainer}>
                <h1>Login</h1>
                {/* <nav>
                    <A href="/">Home Page</A>
                </nav> */}
                <div>
                    <h4 class={style.textLabel}>Email</h4>
                    <input type="text"
                        placeholder="Masukkan Email Anda"
                        class={style.inputField}
                        onInput={handleEmailInput} 
                        value={email()}/>

                    <h4 class={style.textLabel}>
                        Password
                    </h4>
                    <input type="password"
                        placeholder="Masukkan Password"
                        class={style.inputField}
                        onInput={handlePasswordInput} 
                        value={password()}/>
                </div>

                <div class={style.buttonContainer}>
                    <button onClick={handleLogin}
                        class={style.btnsubmit}>
                        Log In
                    </button>
                    
                    <div class={style.link}>
                        <div>
                            <label>Belum Punya Akun?</label>
                            <A href="/register">Daftar</A>
                        </div>
                        {/* nanti yg admin apus */}
                        <button onClick={() => { setRole("admin"); handleClick(); }}>
                            Log In as admin
                        </button>

                        <button class={style.guest} onClick={() => { setRole("guest"); handleClick(); }}>
                            Continue as guest
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
