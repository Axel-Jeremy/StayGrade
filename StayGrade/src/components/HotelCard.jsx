import { useNavigate } from "@solidjs/router";

function HotelCard(props) {
    const navigate = useNavigate();
    return (
        <div id="Isian" style={{ display: "grid", " grid-template-columns": "1fr 3fr 1fr;" }}>
            <img src={props.image} alt={props.name}/>

            <div  id="deskripsi hotel">
                <p style={{ "font-weight": "bold" }}>{props.name}</p>
                <p>{props.location}</p>
                <p>{props.prices} / night</p>
            </div>
            <div>
                <p>{props.rating} / 5.0</p>
                <p>{props.reviewCount} Reviews</p>
                {props.reviewClick && (
                <button onClick={()=>{props.onReviewClick;navigate("/rating");}}>Review</button>
            )}
            </div>
        </div>



    );
}

export default HotelCard;