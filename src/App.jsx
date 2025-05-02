import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Dot from "./Components/Dot/Dot";
import Headroom from "react-headroom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";

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
