import { A, useNavigate } from "@solidjs/router"
import { useAuth } from "../components/AuthContext";

function Login() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/')
    }

    const { setRole } = useAuth();

    return (
        <div>
            <h1>Login</h1>
            <nav>
                <A href="/">Home Page</A>
            </nav>
            <div>
                <h2>Email</h2>
                <input type="text" placeholder="Masukkan Email Anda" />
                <h2>Password</h2>
                <input type="text" placeholder="Masukkan Password" />
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
