import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const UseRoom = ({ value }) => {
  const axiosPublic = useAxios();

  const fetchRoom = async () => {
    const response = await axiosPublic.get(`/rooms?order=${value}`);
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
