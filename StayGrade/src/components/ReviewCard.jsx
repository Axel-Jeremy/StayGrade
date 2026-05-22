function ReviewCard(props) {
    return (
        <div>
            <div>
                {props.rating}
            </div>
            <div>
                <span>{props.name}</span>
                <span>{props.comment}</span>
            </div>
            <div>
                <span>{props.time}</span>
            </div>
        </div>
    );
}

export default ReviewCard;