import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  useEffect(() => {
    // Update the document title for this page
    document.title = "Smart Hotel || Login";
  }, []);
  const { In, Google } = useContext(AuthContext);
  const loc = useLocation();
  const nav = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    In(email, password)
      .then((res) => {
        console.log(res.user);

        Swal.fire({
          title: "Welcome Back",
          text: "Log in successfully...",
          icon: "success",
        });
        {
          loc.state ? nav(loc.state) : nav("/");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your password and email doesn't match",
        });
      });
  };

  const handleGoogle = () => {
    Google()
      .then((res) => {
        const userData = {
          Name: res?.user?.displayName,
          email: res?.user?.email,
          img: res?.user?.photoURL,
          role: "Customer",
          BookingID: [],
          Reviews: [],
        };
        axios
          .post("http://localhost:3000/user", userData)
          .then((response) => {
            console.log("User created:", response.data);
          })
          .catch((error) => {
            console.error("Error creating user:", error);
          });
        Swal.fire({
          title: "Log in successfully...",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
        });

        {
          loc.state ? nav(loc.state) : nav("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="form mx-auto max-w-md bg-white border-2 my-[5%] border-blue-500  p-8 rounded-lg"
      >
        <p className=" text-2xl title text-blue-600 text-center font-semibold relative flex items-center  py-3">
          Login
        </p>
        <p className="message text-gray-700 mb-2 ">
          SignIn now to access all the features
        </p>

        <label className="relative ">
          <input
            required
            name="email"
            placeholder="Email"
            type="email"
            className="input w-full p-2 mb-2 outline-none border border-gray-400 rounded-lg"
          />
        </label>
        <label className="relative">
          <input
            required
            name="password"
            placeholder="Your Password"
            type="password"
            className="input w-full p-2 mb-2 outline-none border border-gray-400 rounded-lg"
          />
        </label>

        <button className="submit bg-blue-600 w-full mt-5 p-2 rounded-lg text-white text-lg transition duration-300 ease-in">
          Login
        </button>
        <button
          onClick={handleGoogle}
          className=" bg-black w-full text-white font-bold py-2 flex items-center justify-center gap-3 px-4 rounded-md mt-4"
        >
          <img className="w-[30px]" src="/continureGoogle.png" alt="" />
          Continue With Google
        </button>
        <p className="signin text-gray-700  text-center mt-2 ">
          New user?
          <Link
            to={"/register"}
            className="text-blue-500 ml-2  hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
