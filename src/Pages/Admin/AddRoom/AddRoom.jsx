import { useState } from "react";
import {
  CLOUD_NAME,
  Preset,
} from "../../../Components/Cloudinary/Cloudinary.confog";
import Swal from "sweetalert2";
import UseAxiousSecure from "../../../Hooks/UseAxiousSecure";

const AddRoom = () => {
  const [roomImg, setRoomImg] = useState(null);
  const [roomImg1, setRoomImg1] = useState(null);
  const [roomImg2, setRoomImg2] = useState(null);
  const axiosSecure = UseAxiousSecure();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      Swal.fire({
        title: "Uploading Room...",
        text: "Please wait while images are being uploaded.",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Show: Room Image Uploading
      Swal.update({ title: "Uploading Cover Image..." });
      const data1 = new FormData();
      data1.append("file", roomImg);
      data1.append("upload_preset", Preset);
      data1.append("cloud_name", CLOUD_NAME);

      const res1 = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data1,
        }
      );
      const imagefile1 = await res1.json();
      const img = imagefile1?.secure_url;

      // Show: 2nd Room Image Uploading
      Swal.update({ title: "Uploading Room Image 1..." });
      const data2 = new FormData();
      data2.append("file", roomImg1);
      data2.append("upload_preset", Preset);
      data2.append("cloud_name", CLOUD_NAME);

      const res2 = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data2,
        }
      );
      const imagefile2 = await res2.json();
      const roomImages1 = imagefile2?.secure_url;

      // Show: 3rd Room Image Uploading
      Swal.update({ title: "Uploading Room Image 2..." });
      const data3 = new FormData();
      data3.append("file", roomImg2);
      data3.append("upload_preset", Preset);
      data3.append("cloud_name", CLOUD_NAME);

      const res3 = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data3,
        }
      );
      const imagefile3 = await res3.json();
      const roomImages2 = imagefile3?.secure_url;

      const formData = {
        title: form.title.value,
        description: form.description.value,
        pricePerNight: Number(form.pricePerNight.value),
        roomSize: Number(form.roomSize.value),
        bedFor: Number(form.bedFor.value),
        AC: form.AC.value,
        TV: form.TV.value,
        BeachView: form.BeachView.value,
        roomCode: form.roomCode.value,
        Breakfast: form.Breakfast.value,
        Laundry: form.Laundry.value,
        img: img,
        roomImages: [roomImages1, roomImages2],
        unAvailable: [],
      };

      // Show Uploading Data
      Swal.update({ title: "Uploading Room Data..." });

      const res = await axiosSecure.post(`/room`, formData);

      if (res?.data?.modifiedCount || res?.data?.insertedId) {
        form.reset();
        setRoomImg(null);
        setRoomImg1(null);
        setRoomImg2(null);

        Swal.fire("Success!", "Room created successfully!", "success");
      } else {
        Swal.fire("Error!", "Room creation failed!", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto  p-6 rounded-2xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Add New Room</h2>

        <input
          type="text"
          name="title"
          placeholder="Room Title"
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Room Description"
          className="w-full p-2 border rounded"
          rows="4"
          required
        />

        <div>
          <label className="block mb-1">Main Image</label>
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={(e) => setRoomImg(e.target.files[0])}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Room Image 1</label>
          <input
            type="file"
            name="roomImages1"
            accept="image/*"
            onChange={(e) => setRoomImg1(e.target.files[0])}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Room Image 2</label>
          <input
            type="file"
            name="roomImages2"
            accept="image/*"
            onChange={(e) => setRoomImg2(e.target.files[0])}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Price</label>
            <input
              type="number"
              name="pricePerNight"
              placeholder="Price per Night"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Room Size</label>
            <input
              type="number"
              name="roomSize"
              placeholder="Room Size (sq. ft.)"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Bed</label>

            <input
              type="number"
              name="bedFor"
              placeholder="Beds For (number of people)"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Room Code</label>

            <input
              type="number"
              name="roomCode"
              placeholder="Room Code"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Breakfast</label>
            <select
              name="Breakfast"
              className="w-full border p-2 rounded"
              required
            >
              <option value="Include">Include</option>
              <option value="Not Include">Not Include</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Laundry</label>
            <select
              name="Laundry"
              className="w-full border p-2 rounded"
              required
            >
              <option value="Include">Include</option>
              <option value="Not Include">Not Include</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">AC</label>
            <select name="AC" className="w-full border p-2 rounded" required>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">TV</label>
            <select name="TV" className="w-full border p-2 rounded" required>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Beach View</label>
            <select
              name="BeachView"
              className="w-full border p-2 rounded"
              required
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
        >
          Submit Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
