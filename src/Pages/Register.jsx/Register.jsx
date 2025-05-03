import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
const Register = () => {
  useEffect(() => {
    // Update the document title for this page
    document.title = "Smart Hotel || Register";
  }, []);

  const { creatUser, update, Google } = useContext(AuthContext);
  const naviagte = useNavigate();
  const [fullImage, setFullImage] = useState([]);

  const [previewImage, setPreviewImage] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: async (acceptedFiles) => {
      const reader = new FileReader();
      setFullImage(acceptedFiles[0]);
      console.log(acceptedFiles);

      reader.onload = function (e) {
        setPreviewImage(e.target.result);
      };

      reader.readAsDataURL(acceptedFiles[0]);
    },
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const image = fullImage;
    const result = await axios.post(
      `https://api.imgbb.com/1/upload?key=741f857d3f007eab00beef241dce3448`,
      { image },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    const form = e.target;
    const Name = form.firstName.value + " " + form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;

    let img = result.data;

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The password need to contain 6 character",
      });
      return;
    }

    creatUser(email, password)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        update(Name, img);

        const userData = {
          Name,
          email,
          img: img?.display_url,
          role: "Customer",
          BookingID: [],
          Reviews: [],
        };
        axios
          .post("https://hotel-managment-server-ten.vercel.app/user", userData)
          .then((response) => {
            console.log("User created:", response.data);
          })
          .catch((error) => {
            console.error("Error creating user:", error);
          });

        Swal.fire({
          title: "Your account have been created.",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
        });

        naviagte("/");

        setTimeout(() => {
          location.reload();
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
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
          .post("https://hotel-managment-server-ten.vercel.app/user", userData)
          .then((response) => {
            console.log("User created:", response.data);
          })
          .catch((error) => {
            console.error("Error creating user:", error);
          });
        Swal.fire({
          title: "Your account have been created.",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
        });

        naviagte("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={handleRegister}
      className="form mx-auto max-w-md border-2 border-blue-500 my-12 bg-white p-8 rounded-lg"
    >
      <p className=" text-2xl title text-blue-600 text-center font-semibold relative flex items-center  pb-3 pt-1">
        Register
      </p>
      <p className="message text-gray-700 mb-2 ">
        Signup now and get full access to our app.
      </p>
      <div className="flex gap-6 mb-2">
        <div className="flex-1">
          <label className="relative">
            <input
              required
              name="firstName"
              placeholder="First Name"
              type="text"
              className="input w-full p-2 outline-none border border-gray-400 rounded-lg"
            />
          </label>
        </div>
        <div className="flex-1">
          <label className="relative">
            <input
              required
              name="lastName"
              placeholder="Last Name"
              type="text"
              className="input w-full p-2 outline-none border border-gray-400 rounded-lg"
            />
          </label>
        </div>
      </div>
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
      <div {...getRootProps()} className="relative">
        <input name="img" {...getInputProps()} />
        <div
          className={`dropzone ${
            previewImage ? "p-1 " : "p-[15%]"
          } rounded-lg mt-2 border-dashed border-blue-400 min-h-[90px]  border-2 text-center cursor-pointer`}
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt="Uploaded Image"
              className=" mx-auto  max-h-40"
            />
          ) : (
            <p>Drop your profile Image, or click to select a file.</p>
          )}
        </div>
      </div>

      <button className="submit bg-blue-600 w-full mt-5 p-2 rounded-lg text-white text-lg transition duration-300 ease-in">
        Submit
      </button>
      <button
        onClick={handleGoogle}
        className=" bg-black w-full text-white font-bold py-2 flex items-center justify-center gap-3 px-4 rounded-md mt-4"
      >
        <img className="w-[30px]" src="/continureGoogle.png" alt="" />
        Continue With Google
      </button>
      <p className="signin text-gray-700 text-sm text-center mt-3">
        Already user ?
        <Link to={"/Login"} className="text-blue-500 ml-2 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;
