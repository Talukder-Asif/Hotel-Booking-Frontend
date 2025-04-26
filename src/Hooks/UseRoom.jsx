import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxious from "./UseAxious";
import { AuthContext } from "../Components/Provider/AuthProvider";

const UseRoom = () => {
  const { user } = useContext(AuthContext);
  const AxiousSecure = UseAxious();

  const fetchBookings = async () => {
    const response = await AxiousSecure.get(`/myBookings?email=${user.email}`);
    return response.data;
  };

  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: fetchBookings,
    enabled: !!user?.email,
  });

  return { bookings, isLoading, isError, error, refetch };
};

export default UseRoom;
