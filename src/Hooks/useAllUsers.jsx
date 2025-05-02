import { useQuery } from "@tanstack/react-query";
import UseAxiousSecure from "./UseAxiousSecure";

const useAllUsers = () => {
  const axiosSecure = UseAxiousSecure();
  const {
    data: Users,
    isPending: isUsersLoading,
    refetch,
  } = useQuery({
    queryKey: ["Users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  return [Users, isUsersLoading, refetch];
};

export default useAllUsers;
