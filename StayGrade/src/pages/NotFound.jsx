import { A } from "@solidjs/router"
import style from "../style/NotFound.module.css"

function NotFound() {
    return (
        <div class={style.container}>
            <h1>404: Page Not Found</h1>
            <A href="/">Back to Homepage</A>
        </div>
    );
}

export default NotFound;