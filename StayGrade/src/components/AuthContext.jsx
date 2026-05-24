import { createContext, createSignal, useContext } from "solid-js";

const AuthContext = createContext();

export function AuthProvider(props) {

    const [role, setRole] = createSignal("guest");

    return (
        <AuthContext.Provider
            value={{
                role,
                setRole
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}