import { useNavigate } from "@solidjs/router";

function HotelCard(props) {
    const navigate = useNavigate();

    // logika buat delete hotel by admin
    function handleDelete() {
        
    }
    return (
        <div class="content">
            <div class="containerImg">
                <img src={props.image} alt={props.name} />
            </div>
            <div  id="deskripsi hotel">
                <p class="text">{props.name}</p>
                <p class="text">{props.location}</p>
                <p class="text">{props.prices} / night</p>
            </div>
            <div>
                <p class="text">{props.rating} / 5.0</p>
                <p class="text">{props.reviewCount} Reviews</p>
                
                {props.reviewClick && (
                <button class="btnReview" onClick={()=>{props.onReviewClick;navigate("/rating");}}>
                    Review
                </button>)}

                {/* urus CSS 2 ini ya fajar - kin */}
                {props.detailClick && (
                <button class="btnReview" onClick={()=>{props.onDetailClick;navigate("/rating");}}>
                    Details
                </button>)}

                {props.deleteClick && (
                <button class="btnReview" onClick={handleDelete}>
                    Delete
                </button>)}
            
            </div>
        </div>



    );
}

export default HotelCard;