import { A, useNavigate } from "@solidjs/router"
import style from "../style/Log&Sign.module.css"
import "../style/font.css"

function Login() {
    const navigate = useNavigate();

    function handleClick() {
        // ........
        navigate('/')
    }
    return (
        <div class={style.containerRoot}>
            <div class={style.mainContainer}>
                <h1>Login</h1>
                <nav>
                    <A href="/">Home Page</A>
                </nav>
                <div>
                    <h2 class={style.textLabel}>Email</h2>
                    <input type="text" placeholder="Masukkan Email Anda" class={style.inputField} />
                    <h2 class={style.textLabel}>Password</h2>
                    <input type="text" placeholder="Masukkan Password" class={style.inputField} />
                </div>

                <button onClick={handleClick} class={style.btnsubmit}>
                    Log In
                </button>
                <div>
                    <label>Belum Punya Akun?</label><A href="/register">Daftar</A>
                </div>
            </div>
        </div>
    );
};

export default Login;
