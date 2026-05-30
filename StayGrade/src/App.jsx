import { Router, Route } from "@solidjs/router";
import Login from '../src/pages/Login.jsx'
import Register from '../src/pages/Register.jsx'
import Homepage from '../src/pages/Homepage';
import Rating from '../src/pages/Rating';
import YourReview from '../src/pages/YourReview.jsx';
import NotFound from '../src/pages/NotFound.jsx';

const App = () => {
  
  return (
    <>
      <Router>
        <Route path="/" component={Homepage} />
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/rating" component={Rating}/>
        <Route path="/yourReview" component={YourReview}/>
        <Route path="*" component={NotFound}></Route>
      </Router>
    </>
  );
};

export default App;