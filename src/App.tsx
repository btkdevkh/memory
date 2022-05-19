import { Fragment } from "react";
import OostaooCards from "./components/game/OostaooCards";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <OostaooCards /> 
      </div>
    </Fragment>
  );
}

export default App;
