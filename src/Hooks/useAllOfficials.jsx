import { useQuery } from "@tanstack/react-query";
import UseAxiousSecure from "./UseAxiousSecure";

const useAllOfficials = () => {
  const axiosSecure = UseAxiousSecure();
  const {
    data: Officials,
    isPending: isOfficialsLoading,
    refetch,
  } = useQuery({
    queryKey: ["Officials"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/officials`);
      return res.data;
    },
  });

  return [Officials, isOfficialsLoading, refetch];
};

export default useAllOfficials;
