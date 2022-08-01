import './App.css';
import { Route , Switch , BrowserRouter} from 'react-router-dom';
import Home from "./components/Home";
import LandingPage from "./components/LadingPage"
import CreateDog from "./components/CreateDog"
import Dogdetail from './components/Dogdetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" component={Home}/>
        <Route path="/dog" component={CreateDog}/>
        <Route path="/dogs/:id" component={Dogdetail}/>
      </div>
    </BrowserRouter>
  );
}

export default App;




