import { A, useNavigate } from "@solidjs/router"

function Register() {
    const navigate = useNavigate();

    function handleClick() {
        // ........
        navigate('/')
    }
    return (
        <div>
            <h1>Register</h1>
            <nav>
                <A href="/">Home Page</A>
            </nav>
            <div>
                <h2>Nama Lengkap*</h2>
                <input type="text" placeholder="Masukkan Nama Lengkap Anda" />
                <h2>Email*</h2>
                <input type="text" placeholder="Masukkan Email Anda" />
                <h2>Password*</h2>
                <input type="text" placeholder="Masukkan Password Anda" />
                <h2>Konfirmasi Password*</h2>
                <input type="text" placeholder="Masukkan Konfirmasi Password Anda" />
            </div>

            <button onClick={handleClick}>Register</button>
            <div>
                <label>Sudah Punya Akun?</label><A href="/login">Log In</A>
            </div>
        </div>
    );
};

export default Register;
