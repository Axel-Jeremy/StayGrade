function AboutCard(props) {
    return (
        <div style={{ "padding": "20px" }}>
            <h1>Tentang Hotel</h1>
            <p style={{ "padding-left": "0.3rem" }}>{props.about}</p>
        </div>
    );
}

export default AboutCard;