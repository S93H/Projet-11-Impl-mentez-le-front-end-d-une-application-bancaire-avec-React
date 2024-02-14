// importation des composants nécessaires de React Router Dom.
import {Routes, Route} from "react-router-dom";

// importation des composants spécifiques à chaque itinéraires.
import Home from "./Home";
import Login from "./login";
import User from "./user";

function App() {
    return(
        <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/login" element={<Login />} />
             <Route path="/user" element={<User />} />
        </Routes>
    );
}

export default App;