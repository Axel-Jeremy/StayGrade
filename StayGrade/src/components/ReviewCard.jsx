function ReviewCard(props) {
    return (
        <div>
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
            <div>
                <button type="button" onClick={deleteReview}>Edit</button>
                <button type="button" onClick={EditReview}>Delete</button>
            </div>
        </div>
    );
}

export default ReviewCard;

function deleteReview(){

}

function EditReview(){

}