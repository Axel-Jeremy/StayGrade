import { A } from "@solidjs/router"

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <A href="/">Home Page </A>
      <br></br>
      <A href="/login">Login Page </A>
      <br></br>
      <A href="/register">Register Page </A>

      
    </div>
  );
};

export default Home;
