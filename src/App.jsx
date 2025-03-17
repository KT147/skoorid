import { Route, Routes} from "react-router-dom"
import './App.css'
import HomePage from "./pages/HomePage"
import AddPlayers from "./pages/AddPlayers"
import Scores from "./pages/Scores"
import FourteenOne from "./pages/FourteenOne"

function App() {

  return (
    <>
      <Routes>
        <Route path ="/" exact element={<HomePage/>}/>
        <Route path ="/add" exact element={<AddPlayers/>}/>
        <Route path ="/scores" exact element={<Scores/>}/>
        <Route path ="/fourteen-one" exact element={<FourteenOne/>}/>
      </Routes>
    </>
  )
}

export default App
