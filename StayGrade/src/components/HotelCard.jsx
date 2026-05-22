function HotelCard(props) {
    return (
        <div>
            <img src={props.image} alt={props.name} />

            <div>
                <p>{props.name}</p>
                <p>{props.location}</p>
                <p>{props.prices} / night</p>
            </div>
            <div>
                <p>{props.rating} / 5.0</p>
                <p>{props.reviewCount} Reviews</p>
            </div>

            {props.reviewClick && (
                <button onClick={props.onReviewClick}>Review</button>
            )}
        </div>
    );
}

export default HotelCard;