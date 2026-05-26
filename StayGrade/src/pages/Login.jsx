import { A, useNavigate } from "@solidjs/router"
import { useAuth } from "../components/AuthContext";
import style from "../style/Log&Sign.module.css"
import "../style/font.css"

function Login() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/')
    }

    const { setRole } = useAuth();

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
                        class={style.inputField} />
                    <h4 class={style.textLabel}>
                        Password
                    </h4>
                    <input type="text"
                        placeholder="Masukkan Password"
                        class={style.inputField} />
                </div>

                <div class={style.buttonContainer}>
                    <button onClick={() => { setRole("user"); handleClick(); }}
                        class={style.btnsubmit}>
                        Log In
                    </button>
                    <div class={style.link}>
                        <div>
                            <label>Belum Punya Akun?</label>
                            <A href="/register">Daftar</A>
                        </div>
                            <button onClick={() => { setRole("admin"); handleClick(); }}>Log In as admin</button>
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
