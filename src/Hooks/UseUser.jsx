import { useContext } from "react";
import { AuthContext } from "../Components/Provider/AuthProvider";
import UseAxious from "./UseAxious";
import { useQuery } from "@tanstack/react-query";

const UseUser = () => {
  const { user } = useContext(AuthContext);
  const AxiousSecure = UseAxious();

  const fetchUser = async () => {
    const response = await AxiousSecure.get(`/user/${user?.email}`);
    return response.data;
  };

  const {
    data: userData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: fetchUser,
    enabled: !!user?.email,
  });

  return { userData, isLoading, isError, error, refetch };
};

export default UseUser;
