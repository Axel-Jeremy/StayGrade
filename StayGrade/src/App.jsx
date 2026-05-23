import { Router, Route } from "@solidjs/router";
import Home from '/src/pages/Home.jsx'
import Login from '/src/pages/Login.jsx'
import Register from '/src/pages/Register.jsx'
import Homepageguest from "./pages/Homepage_guest";

const App = () => {
  
  return (
    <>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/Homepage_guest" component={Homepageguest}/>
      </Router>
    </>
  );
};

export default App;