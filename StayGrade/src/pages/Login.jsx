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
                <nav>
                    <A href="/">Home Page</A>
                </nav>
                <div>
                    <h2 class={style.textLabel}>Email</h2>
                    <input type="text" placeholder="Masukkan Email Anda" class={style.inputField} />
                    <h2 class={style.textLabel}>Password</h2>
                    <input type="text" placeholder="Masukkan Password" class={style.inputField} />
                </div>

            <button onClick={() => {setRole("user");handleClick();}}>Log In as user</button>
            <button onClick={() => {setRole("guest");handleClick();}}>Log In as guest</button>
            <div>   
                <label>Belum Punya Akun?</label><A href="/register">Daftar</A>
            </div>
        </div >
    );
};

export default Login;
