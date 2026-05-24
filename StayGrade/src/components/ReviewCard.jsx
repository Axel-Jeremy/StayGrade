import { useLocation } from "@solidjs/router";

function ReviewCard(props) {
    const location = useLocation();
    console.log(location.pathname)
    return (
        <div>
            {/*tolong dibagusin si letak letaknya  */}
            <div
                style={{
                    display: "flex",
                    "justify-content": "space-between",
                    "align-items": "center",
                    border: "1px solid black",
                    padding: "1rem",
                    "border-radius": "12px",
                    width: "100%",
                    "box-sizing": "border-box",
                    "background-color": "#f5f5f5"
                }}>
                {/* kiri */}
                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        "align-items": "center",
                        flex: 1
                    }}>
                    {/* profile bulat */}
                    <div
                        style={{
                            width: "45px",
                            height: "45px",
                            "border-radius": "100%",
                            "background-color": "#d9d9d9",
                            display: "flex",
                            "justify-content": "center",
                            "align-items": "center",
                            "font-weight": "bold",
                            "font-size": "1.1rem"
                        }}>
                        {props.rating}
                    </div>

                    {/* nama + komentar */}
                    <div
                        style={{
                            display: "flex",
                            "flex-direction": "column",
                            gap: "0.25rem"
                        }}>
                        <span style={{ "font-weight": "bold", "font-size": "1.2rem" }}>
                            {props.name}
                        </span>

                        <span style={{ color: "#555" }}>
                            {props.comment}
                        </span>
                    </div>
                </div>

                {/* kanan */}
                <div
                    style={{
                        display: "flex",
                        "flex-direction": "column",
                        "align-items": "flex-end",
                        gap: "0.5rem"
                    }}
                >
                    {location.pathname === "/yourReview"? (
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    ):null}

                    <span style={{ color: "#666", "font-size": "0.9rem" }}>
                        {props.time}
                    </span>
                </div>
            </div>

        </div>
    );
}

export default ReviewCard;

function deleteReview() {
    
}

function EditReview() {

}