import { Route, Routes} from "react-router-dom"
import './App.css'
import HomePage from "./pages/HomePage"
import AddPlayers from "./pages/AddPlayers"
import Scores from "./pages/Scores"
import FourteenOne from "./pages/FourteenOne"
import EightBall from "./pages/EightBall"
import NineBall from "./pages/NineBall"
import TenBall from "./pages/TenBall"
import Snooker from "./pages/Snooker"

function App() {

  return (
    <>
      <Routes>
        <Route path ="/" exact element={<HomePage/>}/>
        <Route path ="/add" exact element={<AddPlayers/>}/>
        <Route path ="/scores" exact element={<Scores/>}/>
        <Route path ="/fourteen-one" exact element={<FourteenOne/>}/>
        <Route path ="/eight-ball" exact element={<EightBall/>}/>
        <Route path ="/nine-ball" exact element={<NineBall/>}/>
        <Route path ="/ten-ball" exact element={<TenBall/>}/>
        <Route path ="/snooker" exact element={<Snooker/>}/>
      </Routes>
    </>
  )
}

export default App
