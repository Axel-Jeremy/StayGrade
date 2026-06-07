function GreetingCard(props) {
    const greeting = getCustomGreeting();
    return (
        <div class="greetingContainer">
            {props.login !== 'guest' ?
                (<h2 class="">{greeting}{props.name}!</h2>)
                : (<h2 class="">{greeting}Guest!</h2>)
            }
        </div>
    )
}

export default GreetingCard;

//buat tentuin good morning, afternoon ato night
function getCustomGreeting() {
    const currentHour = new Date().getHours();
    let greeting = "";

    if (currentHour < 12)
        greeting = "Good Morning, ";
    else if (currentHour < 18)
        greeting = "Good Afternoon, ";
    else
        greeting = "Good Night, ";

    return greeting;
}