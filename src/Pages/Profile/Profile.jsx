import Swal from "sweetalert2";
import UseUser from "../../Hooks/UseUser";
import man from "/src/assets/Man1.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import {
  CLOUD_NAME,
  Preset,
} from "../../Components/Cloudinary/Cloudinary.confog";
import UseAxiousSecure from "../../Hooks/UseAxiousSecure";
import Loading from "../../Components/Loading/Loading";

const Profile = () => {
  const { userData, isUserLoading, refetch } = UseUser();
  const { update } = useContext(AuthContext);
  const AxiousSecure = UseAxiousSecure();
  const [imageUpload, setImageUpload] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const Name = form.name.value;
    const photoURL = userData?.img;

    if (!imageUpload) {
      update(Name, photoURL);

      const userDatas = {
        Name,
        email: userData?.email,
        img: photoURL,
        role: userData?.role,
        BookingID: userData?.BookingID,
        Reviews: userData?.Reviews,
      };

      return await AxiousSecure.put(`/user/${userData?.email}`, userDatas).then(
        (res) => {
          if (res?.data?.modifiedCount) {
            form.reset();
            setImageUpload(null);
            refetch();

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Profile updated successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      );
    }

    try {
      const data = new FormData();
      data.append("file", imageUpload);
      data.append("upload_preset", Preset);
      data.append("cloud_name", CLOUD_NAME);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const imagefile = await res?.json();
      const imageURL = imagefile?.secure_url;

      update(Name, imageURL);

      const userDatas = {
        Name,
        email: userData?.email,
        img: imageURL,
        role: userData?.role,
        BookingID: userData?.BookingID,
        Reviews: userData?.Reviews,
      };

      await AxiousSecure.put(`/user/${userData?.email}`, userDatas).then(
        (res) => {
          if (res?.data?.modifiedCount) {
            form.reset();
            setImageUpload(null);
            refetch();

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Profile updated successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      );
    } catch (error) {
      Swal.fire({
        title: "Error during update",
        text: error.message,
        icon: "error",
      });
    }
  };

  if (isUserLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-screen-lg m-auto py-5">
      <h3 className="mb-5 text-4xl md:text-5xl lg:text-5xl text-gray-900 dark:text-[#8f8f8f] font-bold">
        My Profile
      </h3>
      <div className="flex gap-10 flex-wrap">
        <img
          className="w-40 h-40 rounded-full"
          src={userData?.img ? userData?.img : man}
          alt=""
        />
        <div>
          <h3 className="text-lg mb-5 md:text-xl text-gray-900 dark:text-[#8f8f8f] lg:text-3xl font-bold">
            Full Name: {userData?.Name}
          </h3>
          <h3 className="text-lg mb-5 md:text-xl text-gray-900 dark:text-[#8f8f8f] lg:text-3xl font-bold">
            Email: {userData?.email}
          </h3>

          <h3 className="text-lg mb-5 md:text-xl text-gray-900 dark:text-[#8f8f8f] lg:text-3xl font-bold">
            Role:{" "}
            <span className="border-b-4 border-b-[#012940]">
              {userData?.role}
            </span>
          </h3>
        </div>
      </div>

      <h3 className="my-5 text-4xl md:text-5xl lg:text-5xl text-gray-900 dark:text-[#8f8f8f] font-bold">
        Update Profile
      </h3>
      <form onSubmit={handleUpdate} className="h-full duration-300">
        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            name="name"
            defaultValue={userData?.Name}
            placeholder="Name"
            className="block w-full rounded-md border p-2.5 outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
            required
          />

          <input
            type="file"
            onChange={(e) => setImageUpload(e.target.files[0])}
            className="file-input file-input-bordered w-full block rounded-md border outline-none dark:border-[#002a3f] focus:ring-1 ring-[#002a3f]"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn shadow w-full md:w-1/2 border-[#002a3f] bg-[#002a3f] text-white hover:text-[#002a3f] hover:border-[#2ec4b6] hover:bg-[#2ec4b6] duration-500 m-2 hover:scale-110 hover:shadow-[#2ec4b6] uppercase text-base font-normal"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Profile;
