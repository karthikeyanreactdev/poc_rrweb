import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import "./App.css";

// import P2 from "./comonents/record";
import PlayerComponent from "./comonents/player";
import RecordComponent from "./comonents/record";

const AppWrapper = () => {
  let routes = useRoutes([
    { path: "/", element: <RecordComponent /> },
    { path: "/player", element: <PlayerComponent /> },
  ]);
  return routes;
};
function App() {
  return (
    <div className="App">
      <Router>
        <AppWrapper />
      </Router>
    </div>
  );
}

export default App;
