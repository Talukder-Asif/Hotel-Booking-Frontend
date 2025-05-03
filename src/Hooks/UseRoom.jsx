import { useQuery } from "@tanstack/react-query";
import UseAxiousSecure from "./UseAxiousSecure";

const UseRoom = ({ value }) => {
  const axiosSecure = UseAxiousSecure();

  const fetchRoom = async () => {
    const response = await axiosSecure.get(`/rooms?order=${value}`);
    return response?.data;
  };

  const {
    data: rooms = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["rooms", value],
    queryFn: fetchRoom,
  });

  return { rooms, isLoading, isError, error, refetch };
};

export default UseRoom;
