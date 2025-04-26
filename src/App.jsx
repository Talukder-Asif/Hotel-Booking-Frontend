import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Dot from "./Components/Dot/Dot";
import Headroom from "react-headroom";

function App() {
  return (
    <>
      <div>
        <Headroom>
          <Navbar></Navbar>
        </Headroom>

        <Outlet></Outlet>
        <Footer></Footer>

        <Dot></Dot>
      </div>
    </>
  );
}

export default App;
