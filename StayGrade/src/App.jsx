import { Router, Route } from "@solidjs/router";
import Login from '../src/pages/Login.jsx'
import Register from '../src/pages/Register.jsx'
import Homepage from '../src/pages/Homepage';

const App = () => {
  
  return (
    <>
      <Router>
        <Route path="/" component={Homepage} />
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Router>
    </>
  );
};

export default App;