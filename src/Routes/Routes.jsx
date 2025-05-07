import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register.jsx/Register";
import Home from "../Pages/Home/Home";
import Error from "../Components/Error/Error";
import Rooms from "../Pages/Rooms/Rooms";
import RoomDetails from "../Pages/RoomDetails/RoomDetails";
import PrivateProvide from "../Components/Provider/PrivateProvide";
import MyBookings from "../Pages/MyBookings/MyBookings";
import Gallery from "../Pages/Gallery/Gallery";
import HowToBook from "../Components/HowToBook/HowToBook";
import Dashboard from "../Components/Dashboard/Dashboard";
import Profile from "../Pages/Profile/Profile";
import ManageStaff from "../Pages/Admin/ManageStaff/ManageStaff";
import ManageGuest from "../Pages/Admin/ManageGuest/ManageGuest";
import AddRoom from "../Pages/Admin/AddRoom/AddRoom";
import RoomsForAdmin from "../Pages/Admin/Rooms/RoomsForAdmin";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import Status from "../Pages/Admin/Status/Status";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/rooms",
        element: <Rooms></Rooms>,
      },
      {
        path: "/roomDetails/:id",
        element: (
          <PrivateProvide>
            <RoomDetails></RoomDetails>
          </PrivateProvide>
        ),
        loader: ({ params }) =>
          fetch(
            `https://hotel-managment-server-ten.vercel.app/rooms/${params.id}`
          ),
      },
      {
        path: "/myBookings",
        element: (
          <PrivateProvide>
            <MyBookings></MyBookings>
          </PrivateProvide>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateProvide>
            <Profile></Profile>
          </PrivateProvide>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateProvide>
            <PaymentPage></PaymentPage>
          </PrivateProvide>
        ),
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>,
      },
      {
        path: "/howToBook",
        element: <HowToBook></HowToBook>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateProvide>
            <Dashboard></Dashboard>{" "}
          </PrivateProvide>
        ),
        children: [
          {
            path: "/dashboard",
            element: <Profile></Profile>,
          },
          {
            path: "/dashboard/officials",
            element: <ManageStaff></ManageStaff>,
          },
          {
            path: "/dashboard/guests",
            element: <ManageGuest></ManageGuest>,
          },
          {
            path: "/dashboard/add-rooms",
            element: <AddRoom></AddRoom>,
          },
          {
            path: "/dashboard/rooms",
            element: <RoomsForAdmin></RoomsForAdmin>,
          },
          {
            path: "/dashboard/status",
            element: <Status></Status>,
          },
        ],
      },
    ],
  },
]);

export default routes;
