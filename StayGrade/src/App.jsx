import { createSignal } from 'solid-js';
import { Router, Route } from "@solidjs/router";
import Home from '/src/pages/Home.jsx'
import Login from '/src/pages/Login.jsx'
import Register from '/src/pages/Register.jsx'

const App = () => {
  
  return (
    <>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Router>
    </>
  );
};

export default App;