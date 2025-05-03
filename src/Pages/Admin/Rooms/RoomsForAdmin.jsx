import Loading from "../../../Components/Loading/Loading";
import UseRoom from "../../../Hooks/UseRoom";
import RoomCard from "./RoomCard";

const RoomsForAdmin = () => {
  const { rooms, isLoading, refetch } = UseRoom();

  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      <div className="grid  max-w-[1320px] my-10 gap-10 2xl:grid-cols-2 grid-cols-1 mx-auto">
        {rooms?.map((value) => (
          <RoomCard key={value._id} data={value}></RoomCard>
        ))}
      </div>
    </div>
  );
};

export default RoomsForAdmin;
