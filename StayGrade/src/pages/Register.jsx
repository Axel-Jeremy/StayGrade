import { A, useNavigate } from "@solidjs/router"
import style from "../style/Log&Sign.module.css"
import "../style/font.css"
import { createSignal } from "solid-js";
import { useAuth } from "../components/AuthContext";
import logo from '../style/Asset/Logo/logo.svg';

function Register() {
    const navigate = useNavigate();
    const { setRole, setName } = useAuth();

    const [namaLengkap, setNamaLengkap] = createSignal("");
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [confirmPassword, setConfirmPassword] = createSignal("");

    function handleNamaInput(event) {
        setNamaLengkap(event.target.value);
    }

    function handleEmailInput(event) {
        setEmail(event.target.value);
    }

    function handlePasswordInput(event) {
        setPassword(event.target.value);
    }

    function handleConfirmPasswordInput(event) {
        setConfirmPassword(event.target.value);
    }

    async function handleRegister() {
        if (!namaLengkap()) {
            alert("Nama lengkap tidak boleh kosong!");
            return;
        }
        if (!email()) {
            alert("Email tidak boleh kosong!");
            return;
        }
        if (!password()) {
            alert("Password tidak boleh kosong!");
            return;
        }
        if (!confirmPassword()) {
            alert("Konfirmasi password tidak boleh kosong!");
            return;
        }
        if (password() !== confirmPassword()) {
            alert("Password dan konfirmasi password tidak sama");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    name: namaLengkap(),
                    email: email(),
                    password: password(),
                })
            });

            const data = await response.json();

            if (response.ok) {
                setRole(data.role);
                setName(data.name || namaLengkap());
                navigate('/');
            } else {
                alert("Register failed: " + data.message);
            }
        } catch (error) {
            console.error("Error registering:", error);
            alert("Register failed: " + (error.message || "Terjadi kesalahan"));
        }
    }

    return (
        <div class={style.containerRoot}>
            <img class={style.logo} src={logo} alt="Logo Aplikasi" />
            <div class={style.mainContainer}>
                <h1>Register</h1>
                {/* <nav>
                    <A href="/">Home Page</A>
                </nav> */}
                <div>
                    <h4 class={style.textLabel}>Nama Lengkap*</h4>
                    <input type="text" placeholder="Masukkan Nama Lengkap Anda" class={style.inputField} oninput={handleNamaInput} value={namaLengkap()} />
                    <h4 class={style.textLabel}>Email*</h4>
                    <input type="text" placeholder="Masukkan Email Anda" class={style.inputField} oninput={handleEmailInput} value={email()} />
                    <h4 class={style.textLabel}>Password*</h4>
                    <input type="password" placeholder="Masukkan Password Anda" class={style.inputField} oninput={handlePasswordInput} value={password()} />
                    <h4 class={style.textLabel}>Konfirmasi Password*</h4>
                    <input type="password" placeholder="Masukkan Konfirmasi Password Anda" class={style.inputField} oninput={handleConfirmPasswordInput} value={confirmPassword()} />
                </div>

                <div class={style.buttonContainer}>
                    <button onClick={handleRegister} class={style.btnsubmit}>
                        Register
                    </button>
                    <div class={style.link}>
                        <div>
                            <label>Sudah Punya Akun?</label>
                            <A href="/login">Log In</A>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Register;
