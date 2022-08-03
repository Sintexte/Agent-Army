import Home from "./component/Home"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Disconnect from "./component/Disconnect";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/disconnect" element={<Disconnect />} />
      </Routes>
    </Router>
  );
}

export default App;
