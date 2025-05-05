import Swal from "sweetalert2";
import useAllOfficials from "../../../Hooks/useAllOfficials";
import axios from "axios";
import Loading from "../../../Components/Loading/Loading";
import UseUser from "../../../Hooks/UseUser";
import man from "/src/assets/Man1.png";

const ManageStaff = () => {
  const [Officials, isOfficialsLoading, refetch] = useAllOfficials();
  const handleRoleUpdate = (newRole, user) => {
    const updateData = {
      Name: user?.Name,
      email: user?.email,
      role: newRole,
      img: user?.img,
      BookingID: user?.BookingID,
      Reviews: user?.Reviews,
    };
    axios
      .put(`http://localhost:3000/user/${user?.email}`, updateData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: `${user.Name} is ${newRole} now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const { userData } = UseUser();
  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${user?.Name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#012940",
      cancelButtonColor: "#28b392",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/user/${user?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              icon: "success",
              title: `${user.Name} has been deleted from the database`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
  if (isOfficialsLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>#</label>
            </th>
            <th>Name</th>
            <th>Role</th>
            <th>Buttons</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Officials?.map((usersData, i) => (
            <tr
              key={i}
              className={
                userData?.email === usersData?.email
                  ? "bg-orange-300 dark:text-gray-500"
                  : null
              }
            >
              <th>
                <label>{i + 1}</label>
              </th>
              <td>
                <div>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={usersData?.img ? usersData?.img : man}
                          alt="User Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">
                        {usersData?.Name} <br />
                      </p>
                      <span className="text-sm">{usersData?.email}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td>{usersData?.role}</td>
              <th>
                {userData?.role === "Admin" &&
                usersData?.role !== "SuperAdmin" ? (
                  <select
                    onChange={(e) =>
                      Swal.fire({
                        title: "Are you sure?",
                        text: `Do you want to update ${usersData?.Name} as ${e.target.value}?`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#012940",
                        cancelButtonColor: "#28b392",
                        confirmButtonText: "Yes",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          const newRole = e.target.value;
                          handleRoleUpdate(newRole, usersData);
                        }
                      })
                    }
                    defaultValue="Update Role"
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option disabled>Update Role</option>
                    <option
                      className={
                        usersData?.role === "Customer" ? "hidden" : null
                      }
                    >
                      Customer
                    </option>
                    <option
                      className={usersData?.role === "Admin" ? "hidden" : null}
                    >
                      Admin
                    </option>

                    <option
                      className={usersData?.role === "Staff" ? "hidden" : null}
                    >
                      Staff
                    </option>
                  </select>
                ) : null}
              </th>

              <th>
                {userData?.role === "Admin" &&
                usersData?.role !== "SuperAdmin" ? (
                  <button
                    onClick={() => handleDelete(usersData)}
                    className="p-3 border-2 border-neutral-600 text-white bg-red-600"
                  >
                    X
                  </button>
                ) : null}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStaff;
