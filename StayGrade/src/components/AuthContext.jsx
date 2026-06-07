import { createContext, createSignal, useContext, onMount } from "solid-js";

const AuthContext = createContext();

export function AuthProvider(props) {

    const [role, setRole] = createSignal("guest");
    const [name, setName] = createSignal("guest");
    const [email, setEmail] = createSignal("guest");

    onMount(async () => {
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Cache-Control": "no-cache",
                    "Pragma": "no-cache"
                }
            });

            if (response.ok) {
                const data = await response.json();
                setRole(data.role);
                setName(data.name);
                setEmail(data.email);
            } else {
                //belom login, set default jadi guest
                setRole("guest");
                setName("guest");
                setEmail("guest");
            }
        } catch (error) {
            console.error("Gagal memverifikasi session:", error);
            setRole("guest");
            setName("guest");
            setEmail("guest");
        }
    });

    return (
        <AuthContext.Provider
            value={{
                role,
                setRole,
                name,
                setName,
                email,
                setEmail
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}