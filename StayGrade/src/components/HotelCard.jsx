function HotelCard(props) {
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
                <button class="btnReview" onClick={props.onReviewClick}>
                    Review
                </button>
            )}
            </div>
        </div>



    );
}

export default HotelCard;