import { A, useNavigate } from "@solidjs/router"
import style from "../style/Log&Sign.module.css"
import "../style/font.css"

function Register() {
    const navigate = useNavigate();

    function handleClick() {
        // ........
        navigate('/')
    }
    return (
        <div class={style.containerRoot}>

            <div class={style.mainContainer}>
                <h1>Register</h1>
                {/* <nav>
                    <A href="/">Home Page</A>
                </nav> */}
                <div>
                    <h4 class={style.textLabel}>Nama Lengkap*</h4>
                    <input type="text" placeholder="Masukkan Nama Lengkap Anda" class={style.inputField} />
                    <h4 class={style.textLabel}>Email*</h4>
                    <input type="text" placeholder="Masukkan Email Anda" class={style.inputField} />
                    <h4 class={style.textLabel}>Password*</h4>
                    <input type="text" placeholder="Masukkan Password Anda" class={style.inputField} />
                    <h4 class={style.textLabel}>Konfirmasi Password*</h4>
                    <input type="text" placeholder="Masukkan Konfirmasi Password Anda" class={style.inputField} />
                </div>

                <div class={style.buttonContainer}>
                    <button onClick={handleClick} class={style.btnsubmit}>
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
