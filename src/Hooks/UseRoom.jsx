import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiousSecure from "./UseAxiousSecure";
import { AuthContext } from "../Components/Provider/AuthProvider";

const UseRoom = ({ value }) => {
  const { user } = useContext(AuthContext);
  const AxiousSecure = UseAxiousSecure();

  console.log(value);

  const fetchRoom = async () => {
    const response = await AxiousSecure.get(`/rooms?order=${value}`);
    return response.data;
  };

  const {
    data: rooms = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["rooms", user?.email],
    queryFn: fetchRoom,
    enabled: !!user?.email,
  });

  return { rooms, isLoading, isError, error, refetch };
};

export default UseRoom;
