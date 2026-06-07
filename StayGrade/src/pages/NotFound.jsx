import { A } from "@solidjs/router"
import style from "../style/NotFound.module.css"
import "../style/body.css"

function NotFound() {
    return ( 
        // gausah styling bagus2 not found doang
        <div class={style.container}>
            <h1>404: Page Not Found</h1>
            <A href="/">Back to Homepage</A>
        </div>
    );
}

export default NotFound;