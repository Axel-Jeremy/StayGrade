import { useLocation } from "@solidjs/router";
import { useAuth } from "../components/AuthContext";
import EditIcon from "../style/Asset/edit-line.svg";
import DelIcon from "../style/Asset/delete-bin-line.svg";

function ReviewCard(props) {
    const location = useLocation();
    console.log(location.pathname)

    const { role } = useAuth();
    return (
        <div>
            {/*tolong dibagusin si letak letaknya  */}
            <div class="containerReviewCard">
                {/* kiri */}
                <div class="containerReviewLeftContent">
                    {/* profile bulat */}
                    <div class="containerProfileBulat">
                        {props.rating}
                    </div>

                    {/* nama + komentar */}
                    <div class="containerKomentar">
                        <span style={{ "font-weight": "bold", "font-size": "1.2rem" }}>
                            {props.name}
                        </span>

                        <span style={{ color: "#555" }}>
                            {props.comment}
                        </span>
                    </div>
                </div>

                {/* kanan */}
                <div class="ContainerWaktu">
                    {location.pathname === "/yourReview" ? (
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button class="containerProfileBulat">
                                <img src={EditIcon} alt="Edit" style={{ width: "16px", height: "16px" }} />
                            </button>
                            <button class="containerProfileBulat">
                                <img src={DelIcon} alt="Delete" style={{ width: "16px", height: "16px" }} />
                            </button>
                        </div>
                    ):null}

                    {role() === 'admin' ? (
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button class="containerProfileBulat">
                                <img src={DelIcon} alt="Delete" style={{ width: "16px", height: "16px" }} />
                            </button>
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