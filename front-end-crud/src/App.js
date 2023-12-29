import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import SuccessPage from "./components/SuccessPage";



function App() {
  return (
    <div>

{/* điều hướng các trang trong ứng dụng */}
      <BrowserRouter>
            <Routes>
              <Route path="/home" element= { <Home/>} />
              <Route path="/" element= { <Register/>} />
              <Route path="/login" element= { <Login/>} />
              <Route path="/success" element= { <SuccessPage/>} />
            </Routes>
        </BrowserRouter>
        

      
    </div>
  );
}

export default App;