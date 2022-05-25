import { Fragment } from "react";
import GameCards from "./components/game/GameCards";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <GameCards /> 
      </div>
    </Fragment>
  );
}

export default App;
